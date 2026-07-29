from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.models import Order, Vendor
from core.permissions import IsStudent
from core.serializers import OrderSerializer, StudentOrderCreateSerializer, VendorSerializer


class StudentVendorViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsStudent]
    serializer_class = VendorSerializer
    queryset = Vendor.objects.filter(is_active=True).prefetch_related("menu_items")


class StudentOrderViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Order.objects.filter(student=self.request.user).select_related("vendor", "payment", "queue_token")

    def get_serializer_class(self):
        if self.action == "create":
            return StudentOrderCreateSerializer
        return OrderSerializer

    def perform_create(self, serializer):
        self.order = serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        output = OrderSerializer(order, context={"request": request})
        return Response(output.data, status=status.HTTP_201_CREATED)
