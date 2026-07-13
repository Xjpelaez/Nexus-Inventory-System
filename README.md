# Nexus Inventory System

Nexus Inventory System is a professional full stack inventory management.

It uses Django REST Framework for the API, PostgreSQL for persistence, JWT for authentication, and React with TypeScript for the dashboard.

## Tech Stack

Backend:

- Python
- Django
- Django REST Framework
- PostgreSQL
- JWT authentication
- Swagger/OpenAPI with drf-spectacular
- Docker

Frontend:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Recharts

## Architecture

The repository is a monorepo:

```text
nexus-inventory-system/
  backend/      Django API, domain models, services and reports
  frontend/     React dashboard and reusable UI components
  docs/         Learning roadmap, architecture notes and lessons
```

Backend apps:

- `apps.users`: custom user model, roles and user CRUD.
- `apps.inventory`: categories, suppliers, products and stock movements.
- `apps.dashboard`: operational KPIs for the dashboard.
- `apps.reports`: CSV exports for products and movements.
- `apps.core`: shared pagination, permissions and base models.

## Getting Started With Docker

1. Create the environment file:

```bash
cp .env.example .env
```

2. Start the stack:

```bash
docker compose up --build
```

3. Open the apps:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Swagger docs: http://localhost:8000/api/docs
- Django admin: http://localhost:8000/admin

Demo login:

```text
username: admin
password: Admin12345
```

## Local Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py seed_demo_data
python manage.py runserver
```

On Windows PowerShell, activate the virtual environment with:

```powershell
.venv\Scripts\Activate.ps1
```

## Local Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Current Features

- JWT login and protected frontend routes.
- Role model: administrator, supervisor and employee.
- Product, category, supplier and movement API modules.
- Stock update service with database transactions.
- Pagination, search, filtering and ordering through DRF.
- Dashboard summary endpoint.
- CSV reports for products and inventory movements.
- Responsive SaaS-style frontend foundation.
- Docker Compose environment for local development.

## Learning Roadmap

This project is intentionally divided into phases:

1. Planning, architecture and data model.
2. Project setup and repository hygiene.
3. Backend domain models and API.
4. Authentication, roles and permissions.
5. Frontend dashboard and reusable components.
6. Frontend/backend integration.
7. Reports and exports.
8. Docker and production readiness.
9. Deployment.
10. Professional README and GitHub polish.

See `docs/roadmap.md` and `docs/lessons/phase-01.md`.

## Git Workflow

Recommended first commands:

```bash
git status
git add .
git commit -m "Initial Nexus Inventory System scaffold"
git branch -M main
```

## API Documentation

When the backend is running, open:

```text
http://localhost:8000/api/docs
```


## License

MIT.
