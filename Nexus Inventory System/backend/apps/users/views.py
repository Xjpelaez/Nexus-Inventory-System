from django.contrib.auth import get_user_model
from rest_framework import viewsets

from apps.core.permissions import IsAdmin
from apps.users.serializers import UserSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    search_fields = ["first_name", "last_name", "email", "username"]
    ordering_fields = ["date_joined", "username", "email", "role"]
    filterset_fields = ["role", "is_active"]
