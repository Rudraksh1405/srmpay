from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from core.models import MenuItem, Order
from core.permissions import IsMerchant
from core.serializers import MenuItemSerializer, MerchantOrderStatusSerializer, OrderSerializer


class MerchantMenuItemViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsMerchant]
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        return MenuItem.objects.filter(vendor=self.request.user.vendor)

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user.vendor)


class MerchantOrderViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsMerchant]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(vendor=self.request.user.vendor).select_related("student", "payment", "queue_token")

    def get_serializer_class(self):
        if self.action in {"update", "partial_update"}:
            return MerchantOrderStatusSerializer
        return OrderSerializer
