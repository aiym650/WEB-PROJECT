from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Manga, UserProfile, CartItem, Order


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class BalanceSerializer(serializers.Serializer):
    balance = serializers.DecimalField(max_digits=10, decimal_places=2)


class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manga
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def validate_email(self, value):
        email = value.strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("This email is already in use.")
        return email

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        UserProfile.objects.create(user=user, balance=100.00)

        return user


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = "__all__"
        read_only_fields = ["user"]


class OrderSerializer(serializers.ModelSerializer):
    manga_title = serializers.CharField(source='manga.title', read_only=True)
    price = serializers.DecimalField(
        source='manga.price',
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["user"]