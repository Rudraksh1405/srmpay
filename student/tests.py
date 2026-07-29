from django.urls import reverse
from rest_framework.test import APITestCase

from core.models import MenuItem, User, UserRole, Vendor


class StudentOrderFlowTests(APITestCase):
    def setUp(self):
        self.vendor = Vendor.objects.create(name="Main Canteen", category="Canteen")
        self.item = MenuItem.objects.create(
            vendor=self.vendor,
            name="Idli",
            category="Breakfast",
            price="30.00",
            prep_time_minutes=5,
        )
        self.student = User.objects.create_user(username="stu1", role=UserRole.STUDENT)

    def test_student_can_create_order_and_get_order_id_and_token(self):
        self.client.force_authenticate(user=self.student)
        url = reverse("student-orders-list")
        payload = {"vendor": self.vendor.id, "items": [{"menu_item": self.item.id, "quantity": 2}]}

        response = self.client.post(url, payload, format="json")

        self.assertEqual(response.status_code, 201)
        self.assertTrue(response.data["order_id"].startswith("SRMP-"))
        self.assertEqual(response.data["token_number"], 1)
        self.assertEqual(response.data["total_amount"], "60.00")

    def test_non_student_cannot_access_student_vendor_list(self):
        merchant = User.objects.create_user(username="merch1", role=UserRole.MERCHANT)
        self.client.force_authenticate(user=merchant)

        response = self.client.get(reverse("student-vendors-list"))

        self.assertEqual(response.status_code, 403)
