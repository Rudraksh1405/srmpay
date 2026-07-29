from django.test import TestCase

from core.models import Order, User, UserRole, Vendor


class OrderModelTests(TestCase):
    def test_order_generates_order_id_and_token(self):
        vendor = Vendor.objects.create(name="Food Court", category="Food Court")
        student = User.objects.create_user(username="student1", role=UserRole.STUDENT)

        order = Order.objects.create(student=student, vendor=vendor)

        self.assertTrue(order.order_id.startswith("SRMP-"))
        self.assertEqual(order.token_number, 1)
        self.assertEqual(order.queue_token.token_number, 1)
