from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "admin", "Administrador"
        SUPERVISOR = "supervisor", "Supervisor"
        EMPLOYEE = "employee", "Empleado"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.EMPLOYEE)

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip()
