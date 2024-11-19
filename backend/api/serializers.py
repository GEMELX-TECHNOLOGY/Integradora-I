from rest_framework import serializers
from .models import *


#Usuarios
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


#Roles
class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id_rol', 'nombre_rol', 'is_staff', 'is_superuser']


#Productos 
class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())
    proveedor = serializers.PrimaryKeyRelatedField(queryset=Proveedor.objects.all())
    class Meta:
        model = Producto
        fields = ['cod_producto','nombre','descripcion','referencia','modelo','marca','precio','stock','product_image','categoria','proveedor']

class UpdateProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'referencia', 'modelo', 'marca', 'precio', 'stock', 'categoria','product_image']


#Categoria
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre_categoria','referencia_categoria']




#Ventas
class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = ['producto','referencia', 'uv', 'pv', 'amt']


class UpdateVentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields=  ['uv', 'pv', 'amt']
#Proveedor
class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ['id_prov', 'nombre','apellido_paterno','apellido_materno','telefono','calle','numero','ciudad','estado','codigo_postal']


#Clientes
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = ['id_cliente', 'nombre', 'apellido_paterno','apellido_materno','telefono','calle','numero','ciudad','estado','codigo_postal','correo']


# Serializador para DetalleCotizacion
class DetalleCotizacionSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()  # Incluir información del producto

    class Meta:
        model = DetalleCotizacion
        fields = ['id_detalle', 'cantidad', 'precio_u', 'producto', 'total_detalle']

# Serializador para Cotizacion
class CotizacionSerializer(serializers.ModelSerializer):
    detallecotizacion_set = DetalleCotizacionSerializer(many=True, read_only=True)  # Relación con detalles

    class Meta:
        model = Cotizacion
        fields = ['id', 'producto','referencia', 'uv', 'pv', 'total_cotizacion', 'detallecotizacion_set']



#Nomina
class NominaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomina
        fields = ['id_nom', 'fecha_pago', 'salario_base', 'bonos', 'salario_nto', 'empleado']


#Horarios
class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = ['id_horario', 'dia_semana', 'hora_entrada', 'hora_salida', 'turno']