from rest_framework.routers import DefaultRouter

from adminpanel.views import AdminOrderViewSet, AdminVendorViewSet

router = DefaultRouter()
router.register("vendors", AdminVendorViewSet, basename="admin-vendors")
router.register("orders", AdminOrderViewSet, basename="admin-orders")

urlpatterns = router.urls
