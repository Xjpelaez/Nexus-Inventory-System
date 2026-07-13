from rest_framework import viewsets

from apps.core.permissions import IsAdminOrReadOnly, IsAdminOrSupervisor
from apps.inventory.models import Category, InventoryMovement, Product, Supplier
from apps.inventory.serializers import (
    CategorySerializer,
    InventoryMovementSerializer,
    ProductSerializer,
    SupplierSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["name", "description"]
    ordering_fields = ["name", "created_at"]
    filterset_fields = ["is_active"]


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["company_name", "contact_name", "email", "city", "country"]
    ordering_fields = ["company_name", "created_at"]
    filterset_fields = ["is_active", "city", "country"]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category", "supplier")
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["code", "name", "description", "barcode", "category__name", "supplier__company_name"]
    ordering_fields = ["name", "code", "current_stock", "sale_price", "created_at"]
    filterset_fields = ["is_active", "category", "supplier"]


class InventoryMovementViewSet(viewsets.ModelViewSet):
    queryset = InventoryMovement.objects.select_related("product", "performed_by")
    serializer_class = InventoryMovementSerializer
    permission_classes = [IsAdminOrSupervisor]
    search_fields = ["product__code", "product__name", "reason", "notes"]
    ordering_fields = ["created_at", "quantity"]
    filterset_fields = ["movement_type", "product", "performed_by"]
