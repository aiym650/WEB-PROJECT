from django.urls import path
from .views import MangaList

urlpatterns = [
    path("api/manga/", MangaList.as_view(), name="manga-list"),
]
