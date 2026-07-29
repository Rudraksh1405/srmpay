from django.contrib import admin
from django.urls import include, path
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    permission_classes = []

    def get(self, request):
        return Response({"status": "ok", "service": "srm-pay"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", HealthView.as_view(), name="health"),
    path("api/student/", include("student.urls")),
    path("api/merchant/", include("merchant.urls")),
    path("api/admin/", include("adminpanel.urls")),
]
