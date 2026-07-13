from rest_framework import serializers

from apps.inventory.models import Category, InventoryMovement, Product, Supplier
from apps.inventory.services import create_inventory_movement


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description", "is_active", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = [
            "id",
            "company_name",
            "contact_name",
            "phone",
            "email",
            "address",
            "city",
            "country",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ProductSerializer(serializers.ModelSerializer):
    stock_status = serializers.CharField(read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    supplier_name = serializers.CharField(source="supplier.company_name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "code",
            "name",
            "description",
            "purchase_price",
            "sale_price",
            "current_stock",
            "minimum_stock",
            "stock_status",
            "barcode",
            "image",
            "category",
            "category_name",
            "supplier",
            "supplier_name",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "stock_status", "created_at", "updated_at"]

    def validate(self, attrs):
        purchase_price = attrs.get("purchase_price", getattr(self.instance, "purchase_price", 0))
        sale_price = attrs.get("sale_price", getattr(self.instance, "sale_price", 0))
        if sale_price < purchase_price:
            raise serializers.ValidationError(
                {"sale_price": "El precio de venta no debe ser menor que el precio de compra."}
            )
        return attrs


class InventoryMovementSerializer(serializers.ModelSerializer):
    product_code = serializers.CharField(source="product.code", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)
    performed_by_username = serializers.CharField(source="performed_by.username", read_only=True)

    class Meta:
        model = InventoryMovement
        fields = [
            "id",
            "product",
            "product_code",
            "product_name",
            "movement_type",
            "quantity",
            "reason",
            "notes",
            "performed_by",
            "performed_by_username",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "performed_by", "created_at", "updated_at"]

    def create(self, validated_data):
        request = self.context["request"]
        return create_inventory_movement(
            product=validated_data["product"],
            movement_type=validated_data["movement_type"],
            quantity=validated_data["quantity"],
            reason=validated_data.get("reason", ""),
            notes=validated_data.get("notes", ""),
            user=request.user,
        )
