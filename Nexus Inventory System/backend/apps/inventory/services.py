from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.inventory.models import InventoryMovement, Product


@transaction.atomic
def create_inventory_movement(*, product: Product, movement_type: str, quantity: int, user, reason: str = "", notes: str = ""):
    if quantity <= 0:
        raise ValidationError({"quantity": "La cantidad debe ser mayor que cero."})

    locked_product = Product.objects.select_for_update().get(pk=product.pk)

    if movement_type == InventoryMovement.MovementType.INBOUND:
        locked_product.current_stock += quantity
    elif movement_type == InventoryMovement.MovementType.OUTBOUND:
        if locked_product.current_stock < quantity:
            raise ValidationError({"quantity": "No hay stock suficiente para esta salida."})
        locked_product.current_stock -= quantity
    elif movement_type == InventoryMovement.MovementType.TRANSFER:
        raise ValidationError({"movement_type": "Las transferencias se implementaran al agregar bodegas."})
    else:
        raise ValidationError({"movement_type": "Tipo de movimiento invalido."})

    locked_product.save(update_fields=["current_stock", "updated_at"])

    return InventoryMovement.objects.create(
        product=locked_product,
        movement_type=movement_type,
        quantity=quantity,
        reason=reason,
        notes=notes,
        performed_by=user,
    )
