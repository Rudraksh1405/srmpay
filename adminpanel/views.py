from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from core.models import Order, Vendor
from core.permissions import IsAdminRole
from core.serializers import OrderSerializer, VendorSerializer


class AdminVendorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all().prefetch_related("menu_items")


class AdminOrderViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    serializer_class = OrderSerializer
    queryset = Order.objects.all().select_related("student", "vendor", "payment", "queue_token")
