from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Producto, Categoria


#CREATE
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())
    class Meta:
        model = Producto
        fields = ['cod_producto','nombre','descripcion','referencia','modelo','marca','precio','stock','categoria']


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre','referencia']