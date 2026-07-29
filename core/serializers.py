from decimal import Decimal

from rest_framework import serializers

from core.models import MenuItem, Order, OrderItem, Payment, QueueToken, Vendor


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ["id", "vendor", "name", "category", "price", "image_url", "is_available", "prep_time_minutes"]


class VendorSerializer(serializers.ModelSerializer):
    menu_items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = Vendor
        fields = ["id", "name", "category", "description", "location", "is_active", "current_token", "menu_items"]


class OrderItemWriteSerializer(serializers.Serializer):
    menu_item = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(source="menu_item.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "menu_item", "menu_item_name", "quantity", "unit_price", "line_total"]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["status", "amount", "razorpay_payment_id"]


class QueueTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueueToken
        fields = ["token_number", "issued_at"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    payment = PaymentSerializer(read_only=True)
    queue_token = QueueTokenSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_id",
            "student",
            "vendor",
            "status",
            "total_amount",
            "token_number",
            "created_at",
            "items",
            "payment",
            "queue_token",
        ]
        read_only_fields = ["student", "order_id", "status", "total_amount", "token_number"]


class StudentOrderCreateSerializer(serializers.Serializer):
    vendor = serializers.IntegerField()
    items = OrderItemWriteSerializer(many=True)

    def validate_vendor(self, value):
        if not Vendor.objects.filter(pk=value, is_active=True).exists():
            raise serializers.ValidationError("Vendor is not available.")
        return value

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("At least one item is required.")
        return value

    def create(self, validated_data):
        request = self.context["request"]
        vendor = Vendor.objects.get(pk=validated_data["vendor"])
        items = validated_data["items"]

        order = Order.objects.create(student=request.user, vendor=vendor)
        total = Decimal("0.00")
        for item in items:
            menu_item = MenuItem.objects.get(pk=item["menu_item"], vendor=vendor, is_available=True)
            order_item = OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=item["quantity"],
                unit_price=menu_item.price,
            )
            total += Decimal(order_item.line_total)

        order.total_amount = total
        order.save(update_fields=["total_amount", "updated_at"])
        Payment.objects.create(order=order, amount=total)
        return order


class MerchantOrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["status"]
