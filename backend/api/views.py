from django.shortcuts import render
from django.contrib.auth import get_user_model

User = get_user_model()

from .models import *
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny

################ - USUARIOS - ################
class CreateUserView(generics.CreateAPIView):
    queryset = User
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateRoleView(generics.CreateAPIView):
    queryset = Rol
    serializer_class = RolSerializer
    permission_classes = [AllowAny]

class AllUsersView(generics.ListAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class AllRolView(generics.ListAPIView):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    permission_classes = [AllowAny]

################ - PRODUCTOS - ################

#API CREATE CATEGORIES
class CreateProductsView(generics.CreateAPIView):
    queryset = Producto
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

# API PRODUCTS VIEW (en lista)
class ListaProductosView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]



# API PRODUCTS VIEW (en detalle)
class DetalleProductosView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'cod_producto'
    permission_classes = [AllowAny]

################ - CATEGORIAS - ################

#API CREATE CATEGORIES
class CreateCategoriesView(generics.CreateAPIView):
    queryset = Categoria
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]

#API CATEGORIAS VIEW (lista)
class ListaCategoriasView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]

#API CATEGORIAS VIEW (detalle)
class DetalleCategoriaView(generics.RetrieveAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    lookup_field = 'id_categoria'
    permission_classes = [AllowAny]

