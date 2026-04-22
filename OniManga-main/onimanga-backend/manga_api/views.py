from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Manga, CartItem, UserProfile, Order
from .serializers import (
    MangaSerializer,
    RegisterSerializer,
    BalanceSerializer,
    CartItemSerializer,
    OrderSerializer
)


class MangaList(generics.ListCreateAPIView):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer
    permission_classes = [AllowAny]


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )


class MangaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer
    permission_classes = [permissions.AllowAny]


class CartItemCreateView(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderUpdateView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderRefundView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        order = self.get_object()
        order.is_refunded = True
        order.save()
        serializer = self.get_serializer(order)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_balance(request):
    profile, created = UserProfile.objects.get_or_create(
        user=request.user,
        defaults={'balance': 100.00}
    )
    serializer = BalanceSerializer({"balance": profile.balance})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def api_status(request):
    return Response({"status": "ok"})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    return Response({"message": "Logged out successfully"})