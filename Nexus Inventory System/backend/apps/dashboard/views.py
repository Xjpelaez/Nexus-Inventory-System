from django.db.models import Count, Sum
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.inventory.models import Category, InventoryMovement, Product


class DashboardSummaryView(APIView):
    def get(self, request):
        products = Product.objects.all()
        low_stock = products.filter(current_stock__gt=0, current_stock__lte=models_minimum_stock())
        out_of_stock = products.filter(current_stock=0)

        products_by_category = (
            Category.objects.annotate(total=Count("products"))
            .values("name", "total")
            .order_by("-total")[:8]
        )
        movement_totals = (
            InventoryMovement.objects.values("movement_type")
            .annotate(total_quantity=Sum("quantity"), total_events=Count("id"))
            .order_by("movement_type")
        )

        return Response(
            {
                "total_products": products.count(),
                "low_stock_products": low_stock.count(),
                "out_of_stock_products": out_of_stock.count(),
                "active_categories": Category.objects.filter(is_active=True).count(),
                "latest_inbound": list(
                    InventoryMovement.objects.filter(movement_type="inbound")
                    .select_related("product", "performed_by")
                    .values("id", "product__name", "quantity", "performed_by__username", "created_at")[:5]
                ),
                "latest_outbound": list(
                    InventoryMovement.objects.filter(movement_type="outbound")
                    .select_related("product", "performed_by")
                    .values("id", "product__name", "quantity", "performed_by__username", "created_at")[:5]
                ),
                "products_by_category": list(products_by_category),
                "movement_totals": list(movement_totals),
                "lowest_stock": list(
                    products.order_by("current_stock").values("id", "code", "name", "current_stock")[:5]
                ),
            }
        )


def models_minimum_stock():
    from django.db.models import F

    return F("minimum_stock")
