from django.contrib import admin
from .models import Manga, CartItem, Order


@admin.register(Manga)
class MangaAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'genre', 'price')


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'manga', 'quantity')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'manga', 'delivery_type', 'is_received', 'created_at')