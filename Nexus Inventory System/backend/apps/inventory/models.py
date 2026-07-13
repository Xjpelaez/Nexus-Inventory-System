from django.conf import settings
from django.db import models

from apps.core.models import ActiveModel, TimeStampedModel


class Category(TimeStampedModel, ActiveModel):
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return self.name


class Supplier(TimeStampedModel, ActiveModel):
    company_name = models.CharField(max_length=180)
    contact_name = models.CharField(max_length=120, blank=True)
    phone = models.CharField(max_length=40, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=80, blank=True)
    country = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["company_name"]

    def __str__(self) -> str:
        return self.company_name


class Product(TimeStampedModel, ActiveModel):
    code = models.CharField(max_length=40, unique=True)
    name = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    purchase_price = models.DecimalField(max_digits=12, decimal_places=2)
    sale_price = models.DecimalField(max_digits=12, decimal_places=2)
    current_stock = models.PositiveIntegerField(default=0)
    minimum_stock = models.PositiveIntegerField(default=0)
    barcode = models.CharField(max_length=80, blank=True)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT, related_name="products")

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.code} - {self.name}"

    @property
    def stock_status(self) -> str:
        if self.current_stock == 0:
            return "out_of_stock"
        if self.current_stock <= self.minimum_stock:
            return "low_stock"
        return "available"


class InventoryMovement(TimeStampedModel):
    class MovementType(models.TextChoices):
        INBOUND = "inbound", "Entrada"
        OUTBOUND = "outbound", "Salida"
        TRANSFER = "transfer", "Transferencia"

    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="movements")
    movement_type = models.CharField(max_length=20, choices=MovementType.choices)
    quantity = models.PositiveIntegerField()
    reason = models.CharField(max_length=160, blank=True)
    notes = models.TextField(blank=True)
    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="inventory_movements",
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.get_movement_type_display()} {self.quantity} - {self.product.code}"
