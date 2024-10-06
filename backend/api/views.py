from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Producto,Categoria
from rest_framework import generics
from .serializers import UserSerializer
from .serializers import ProductoSerializer,CategoriaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

#CREATE VIEW OF API AUTHENTICATION
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# API PRODUCTS VIEW (en lista)
class ListaProductosView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

# API PRODUCTS VIEW (en detalle)
class DetalleProductosView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'cod_producto'

#API CATEGORIAS VIEW (lista)
class ListaCategoriasView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

#API CATEGORIAS VIEW (detalle)
class DetalleCategoriaView(generics.RetrieveAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    lookup_field = 'id_categoria'

