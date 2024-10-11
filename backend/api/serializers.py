from rest_framework import serializers
from .models import *


#CREATE
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id_user", "username", "password","date_joined","role"]
        extra_kwargs = {"password": {"write_only": True}}


    def create(self, validated_data):
        user = Users.objects.create_user(**validated_data)
        return user

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model: Role
        field = ["id_role","nombre_rol"]

class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())
    class Meta:
        model = Producto
        fields = ['cod_producto','nombre','descripcion','referencia','modelo','marca','precio','stock','categoria']


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre','referencia']