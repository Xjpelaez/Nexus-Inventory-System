# Architecture Notes

## Client-Server Architecture

The React application is the client. It handles screens, routes, forms and user interactions.

The Django application is the server. It owns business rules, persistence, authentication and API responses.

## Layered Backend

The backend uses practical layers:

- Models define database structure.
- Serializers validate and transform API data.
- Services hold important business behavior.
- ViewSets expose HTTP endpoints.
- Permissions protect actions by role.

## Why Use A Service For Stock Movements

Changing stock is business-critical. If two people create movements at the same time, the system must avoid wrong stock values.

`create_inventory_movement` uses a database transaction and locks the product row before changing stock. This is safer than changing `current_stock` directly inside a view.

## Module Boundaries

- `users` owns identity and roles.
- `inventory` owns stock-related data.
- `dashboard` reads aggregate data.
- `reports` exports operational data.
- `core` stores shared infrastructure.

## REST Conventions

The API uses resource-based URLs:

- `/api/inventory/products/`
- `/api/inventory/categories/`
- `/api/inventory/suppliers/`
- `/api/inventory/movements/`
- `/api/users/`

HTTP verbs represent actions:

- `GET`: read.
- `POST`: create.
- `PUT/PATCH`: update.
- `DELETE`: delete.
