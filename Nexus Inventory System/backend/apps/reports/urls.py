from django.urls import path

from apps.reports.views import MovementsCsvReportView, ProductsCsvReportView

urlpatterns = [
    path("products.csv", ProductsCsvReportView.as_view(), name="products-csv-report"),
    path("movements.csv", MovementsCsvReportView.as_view(), name="movements-csv-report"),
]
