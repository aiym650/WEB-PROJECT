from rest_framework import generics
from .models import Manga
from .serializers import MangaSerializer


class MangaList(generics.ListCreateAPIView):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer
