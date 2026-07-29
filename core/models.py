from datetime import date

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Max
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserRole(models.TextChoices):
    STUDENT = "student", "Student"
    MERCHANT = "merchant", "Merchant"
    ADMIN = "admin", "Admin"


class OrderStatus(models.TextChoices):
    PLACED = "placed", "Placed"
    PREPARING = "preparing", "Preparing"
    READY = "ready", "Ready"
    COLLECTED = "collected", "Collected"
    REJECTED = "rejected", "Rejected"


class PaymentStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    SUCCESS = "success", "Success"
    FAILED = "failed", "Failed"


class Vendor(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    current_token = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.STUDENT)
    vendor = models.ForeignKey(Vendor, null=True, blank=True, on_delete=models.SET_NULL, related_name="staff")


class MenuItem(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="menu_items")
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(blank=True)
    is_available = models.BooleanField(default=True)
    prep_time_minutes = models.PositiveIntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.vendor.name} - {self.name}"


class Order(models.Model):
    order_id = models.CharField(max_length=24, unique=True, blank=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.PLACED)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    token_number = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order_id

    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = self.generate_order_id()
        if self.token_number is None:
            max_token = (
                Order.objects.filter(vendor=self.vendor).aggregate(max_token=Max("token_number"))["max_token"]
                or 0
            )
            self.token_number = max_token + 1
        super().save(*args, **kwargs)

    @staticmethod
    def generate_order_id() -> str:
        today = date.today().strftime("%Y%m%d")
        today_count = Order.objects.filter(created_at__date=date.today()).count() + 1
        return f"SRMP-{today}-{today_count:04d}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    menu_item = models.ForeignKey(MenuItem, on_delete=models.PROTECT, related_name="order_items")
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def line_total(self):
        return self.quantity * self.unit_price


class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")
    razorpay_payment_id = models.CharField(max_length=120, blank=True)
    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)


class QueueToken(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="queue_tokens")
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="queue_token")
    token_number = models.PositiveIntegerField()
    issued_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["vendor", "token_number"], name="unique_vendor_token")]


@receiver(post_save, sender=Order)
def create_queue_token(sender, instance, created, **kwargs):
    if created:
        QueueToken.objects.create(
            vendor=instance.vendor,
            order=instance,
            token_number=instance.token_number,
        )
