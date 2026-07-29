from django.contrib import admin

from core.models import MenuItem, Order, OrderItem, Payment, QueueToken, User, Vendor


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "role", "vendor", "is_active")
    list_filter = ("role", "is_active")


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "is_active", "current_token")
    list_filter = ("is_active", "category")


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("name", "vendor", "price", "is_available", "prep_time_minutes")
    list_filter = ("vendor", "is_available")


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_id", "student", "vendor", "status", "token_number", "total_amount")
    list_filter = ("status", "vendor")
    inlines = [OrderItemInline]


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("order", "status", "amount", "razorpay_payment_id")
    list_filter = ("status",)


@admin.register(QueueToken)
class QueueTokenAdmin(admin.ModelAdmin):
    list_display = ("vendor", "order", "token_number", "issued_at")
    list_filter = ("vendor",)
