from rest_framework.routers import DefaultRouter

from student.views import StudentOrderViewSet, StudentVendorViewSet

router = DefaultRouter()
router.register("vendors", StudentVendorViewSet, basename="student-vendors")
router.register("orders", StudentOrderViewSet, basename="student-orders")

urlpatterns = router.urls
