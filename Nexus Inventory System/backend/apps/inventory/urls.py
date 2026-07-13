from rest_framework.routers import DefaultRouter

from apps.inventory.views import (
    CategoryViewSet,
    InventoryMovementViewSet,
    ProductViewSet,
    SupplierViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="categories")
router.register("suppliers", SupplierViewSet, basename="suppliers")
router.register("products", ProductViewSet, basename="products")
router.register("movements", InventoryMovementViewSet, basename="movements")

urlpatterns = router.urls
