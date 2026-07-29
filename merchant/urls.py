from rest_framework.routers import DefaultRouter

from merchant.views import MerchantMenuItemViewSet, MerchantOrderViewSet

router = DefaultRouter()
router.register("menu-items", MerchantMenuItemViewSet, basename="merchant-menu-items")
router.register("orders", MerchantOrderViewSet, basename="merchant-orders")

urlpatterns = router.urls
