# Phase 1 Lesson

## Objetivo de la leccion

Construir la base profesional de Nexus Inventory System: entender el problema, dividir el sistema en modulos y preparar un repositorio que pueda crecer.

## Conceptos importantes

Un inventario real no es solo un CRUD de productos. Tambien necesita usuarios, permisos, proveedores, categorias, movimientos, reportes y reglas para evitar stock incorrecto.

La arquitectura cliente-servidor separa responsabilidades:

- React se encarga de la experiencia de usuario.
- Django se encarga de reglas de negocio, seguridad y datos.

## Codigo

Los archivos iniciales importantes son:

```text
backend/config/settings.py
backend/apps/inventory/models.py
backend/apps/inventory/services.py
frontend/src/routes.tsx
frontend/src/components/layout/AppShell.tsx
docker-compose.yml
```

## Explicacion del codigo

`settings.py` registra Django REST Framework, JWT, filtros, CORS y la documentacion OpenAPI.

`models.py` define las entidades centrales: categorias, proveedores, productos y movimientos.

`services.py` contiene la regla critica del negocio: cuando entra o sale inventario, el stock se actualiza dentro de una transaccion.

`routes.tsx` protege las paginas internas para que solo usuarios autenticados puedan entrar.

`AppShell.tsx` define la estructura visual principal del dashboard.

## Buenas practicas

Un desarrollador senior evita poner reglas importantes directamente en componentes o vistas si pueden crecer. Por eso la actualizacion de stock vive en un servicio de dominio.

Tambien separa archivos por responsabilidad para que el proyecto sea facil de leer, probar y modificar.

## Ejercicio

Antes de continuar, abre `backend/apps/inventory/models.py` y responde:

1. Que diferencia hay entre `Product` e `InventoryMovement`?
2. Por que `current_stock` no deberia cambiarse manualmente desde cualquier parte del codigo?
3. Que rol deberia poder crear usuarios nuevos?
