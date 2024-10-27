from rest_framework import serializers
from .models import *


#CREATE
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', "first_name", "last_name", "email", "username", "password", "rol", "user_profile_image","date_joined"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        rol = validated_data.pop('rol', None)
        user = Usuarios(**validated_data)
        user.set_password(validated_data['password'])
        if rol:
            user.rol = rol
        user.save()
        return user
    
class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', "first_name", "last_name", "email", "rol", "user_profile_image"]
        extra_kwargs = {"password": {"write_only": True}}

    

class ChatMessageSerializer(serializers.ModelSerializer):
        #reciever_profile =  UserManager(read_only=True)

        class Meta:
            model = ChatMessage
            fields = ['id', 'user', 'sender', 'reciever', 'message', 'is_read', 'date']

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id_rol', 'nombre_rol', 'is_staff', 'is_superuser']

class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())
    class Meta:
        model = Producto
        fields = ['cod_producto','nombre','descripcion','referencia','modelo','marca','precio','stock','product_image','categoria']

class UpdateProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'referencia', 'modelo', 'marca', 'precio', 'stock', 'categoria','product_image']


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre_categoria','referencia_categoria']

class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = ['referencia', 'uv', 'pv', 'amt']