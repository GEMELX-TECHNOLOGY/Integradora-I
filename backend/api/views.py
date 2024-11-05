from django.shortcuts import render
from django.contrib.auth import get_user_model
from .models import *
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

@api_view(['GET'])
def user_details(request):
    user = request.user
    role_name = user.rol.nombre_rol if user.rol else 'No role'
    return Response({
        'first_name': user.first_name,
        'last_name': user.last_name,
        'rol': role_name,
        'profile_image': user.user_profile_image.url if user.user_profile_image else None,  # Ajusta esto según tu modelo
    })

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

class DetalleUsuarioView(generics.RetrieveAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]

class UsuarioDeleteView(generics.DestroyAPIView):
    serializer_class = Usuarios
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Usuarios.objects.all()
    
class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserEditSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]

################ - PRODUCTOS - ################


class CreateProductsView(generics.CreateAPIView):
    queryset = Producto
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]


class ListaProductosView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

class VentasView(generics.ListAPIView):
        queryset = Ventas.objects.order_by('-uv')[:5]  
        serializer_class = VentasSerializer
        permission_classes = [AllowAny]



class DetalleProductosView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'cod_producto'
    permission_classes = [AllowAny]

class UpdateProductView(generics.UpdateAPIView):
    queryset = Producto.objects.all()
    lookup_field = 'cod_producto'
    serializer_class = UpdateProductoSerializer





class DeleteProductView(generics.DestroyAPIView):
    queryset = Producto.objects.all()
    lookup_field = 'cod_producto'
    serializer_class = ProductoSerializer
    def perform_destroy(self, instance):
        print(f'Eliminando producto: {instance}')
        instance.delete()




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

