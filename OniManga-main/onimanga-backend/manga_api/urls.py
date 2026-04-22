from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MangaList, MangaDetail, RegisterView, user_balance, api_status, logout_view, CartItemCreateView, OrderCreateView, OrderUpdateView
from .views import OrderRefundView
urlpatterns = [
    path("api/manga/", MangaList.as_view(), name="manga-list"),
    path("api/manga/<int:pk>/", MangaDetail.as_view(), name="manga-detail"),
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/balance/", user_balance, name="user-balance"),
    path("api/status/", api_status, name="api-status"),
    path("api/logout/", logout_view, name="logout"),
    path("api/cart/", CartItemCreateView.as_view(), name="cart"),
    path("api/orders/", OrderCreateView.as_view(), name="orders"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/orders/<int:pk>/", OrderUpdateView.as_view()),
    path("api/orders/<int:pk>/refund/", OrderRefundView.as_view()),
]

