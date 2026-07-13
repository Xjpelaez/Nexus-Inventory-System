from django.contrib import admin

from apps.inventory.models import Category, InventoryMovement, Product, Supplier


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "created_at")
    search_fields = ("name",)


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ("company_name", "contact_name", "email", "city", "country", "is_active")
    search_fields = ("company_name", "contact_name", "email")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("code", "name", "category", "supplier", "current_stock", "minimum_stock", "is_active")
    list_filter = ("category", "supplier", "is_active")
    search_fields = ("code", "name", "barcode")


@admin.register(InventoryMovement)
class InventoryMovementAdmin(admin.ModelAdmin):
    list_display = ("product", "movement_type", "quantity", "performed_by", "created_at")
    list_filter = ("movement_type", "created_at")
    search_fields = ("product__code", "product__name", "reason")
