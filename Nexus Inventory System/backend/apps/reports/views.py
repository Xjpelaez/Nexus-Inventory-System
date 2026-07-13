import csv

from django.http import HttpResponse
from rest_framework.views import APIView

from apps.core.permissions import IsAdminOrSupervisor
from apps.inventory.models import InventoryMovement, Product


class ProductsCsvReportView(APIView):
    permission_classes = [IsAdminOrSupervisor]

    def get(self, request):
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="products-report.csv"'

        writer = csv.writer(response)
        writer.writerow(["code", "name", "category", "supplier", "stock", "minimum_stock", "sale_price"])

        queryset = Product.objects.select_related("category", "supplier").order_by("name")
        for product in queryset:
            writer.writerow(
                [
                    product.code,
                    product.name,
                    product.category.name,
                    product.supplier.company_name,
                    product.current_stock,
                    product.minimum_stock,
                    product.sale_price,
                ]
            )
        return response


class MovementsCsvReportView(APIView):
    permission_classes = [IsAdminOrSupervisor]

    def get(self, request):
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="movements-report.csv"'

        writer = csv.writer(response)
        writer.writerow(["date", "type", "product", "quantity", "user", "reason"])

        queryset = InventoryMovement.objects.select_related("product", "performed_by").order_by("-created_at")
        for movement in queryset:
            writer.writerow(
                [
                    movement.created_at.isoformat(),
                    movement.movement_type,
                    movement.product.name,
                    movement.quantity,
                    movement.performed_by.username,
                    movement.reason,
                ]
            )
        return response
