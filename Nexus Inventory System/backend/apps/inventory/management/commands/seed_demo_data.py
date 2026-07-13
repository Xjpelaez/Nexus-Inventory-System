from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from apps.inventory.models import Category, InventoryMovement, Product, Supplier
from apps.inventory.services import create_inventory_movement


class Command(BaseCommand):
    help = "Create demo users and inventory data for local development."

    def handle(self, *args, **options):
        User = get_user_model()
        admin, _ = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@nexus.local",
                "first_name": "Nexus",
                "last_name": "Admin",
                "role": User.Role.ADMIN,
                "is_staff": True,
                "is_superuser": True,
            },
        )
        admin.set_password("Admin12345")
        admin.save()

        supervisor, _ = User.objects.get_or_create(
            username="supervisor",
            defaults={
                "email": "supervisor@nexus.local",
                "first_name": "Nexus",
                "last_name": "Supervisor",
                "role": User.Role.SUPERVISOR,
            },
        )
        supervisor.set_password("Supervisor12345")
        supervisor.save()

        hardware, _ = Category.objects.get_or_create(name="Hardware")
        supplies, _ = Category.objects.get_or_create(name="Supplies")
        supplier, _ = Supplier.objects.get_or_create(
            company_name="Northwind Distribution",
            defaults={
                "contact_name": "Ana Torres",
                "phone": "+57 300 000 0000",
                "email": "ventas@northwind.local",
                "city": "Bogota",
                "country": "Colombia",
            },
        )

        products = [
            {
                "code": "NX-LAP-001",
                "name": "Laptop empresarial 14",
                "category": hardware,
                "purchase_price": 2300,
                "sale_price": 2850,
                "current_stock": 12,
                "minimum_stock": 5,
            },
            {
                "code": "NX-MOU-010",
                "name": "Mouse ergonomico",
                "category": hardware,
                "purchase_price": 22,
                "sale_price": 38,
                "current_stock": 8,
                "minimum_stock": 20,
            },
            {
                "code": "NX-PAP-100",
                "name": "Resma papel carta",
                "category": supplies,
                "purchase_price": 4,
                "sale_price": 7,
                "current_stock": 0,
                "minimum_stock": 40,
            },
        ]

        for item in products:
            stock = item.pop("current_stock")
            product, created = Product.objects.get_or_create(
                code=item["code"],
                defaults={**item, "supplier": supplier},
            )
            if created and stock:
                create_inventory_movement(
                    product=product,
                    movement_type=InventoryMovement.MovementType.INBOUND,
                    quantity=stock,
                    user=admin,
                    reason="Carga inicial",
                )

        self.stdout.write(self.style.SUCCESS("Demo data ready. Login: admin / Admin12345"))
