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
    class Meta:
        model = Producto
        fields = ['cod_producto','nombre','descripcion','referencia','modelo','marca','precio','stock','product_image','categoria']

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
        fields = ['referencia', 'uv', 'pv', 'amt']


class UpdateVentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields=  ['uv', 'pv', 'amt']
#Proveedor
class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ['id_prov', 'nombre', 'telefono', 'direccion']

class UpdateProveedorSerializer(serializers.ModelSerializer):
      model = Proveedor
      fields =  ['nombre', 'telefono', 'direccion']

#Clientes
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = ['id_cliente', 'nombre', 'telefono', 'direcccion', 'correo']

class UpdateClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = ['nombre', 'telefono', 'direcccion', 'correo']


# Detalle Venta
class DetalleVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = ['id_detalle', 'cantidad', 'precio_u', 'venta', 'producto']


#Cotizacion
class CotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizaciones
        fields = ['id_cotizacion', 'cliente', 'fecha', 'estado', 'total']

#Detalle Cotizacion
class DetalleCotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCotizaciones
        fields = ['id_de', 'cantidad', 'precio_u', 'subtotal', 'cotizacion', 'producto']


#Devoluciones
class DevolucionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devoluciones
        fields = ['id_dev', 'motivo', 'fecha', 'venta', 'producto']


#Nomina
class NominaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomina
        fields = ['id_nom', 'fecha_pago', 'salario_base', 'bonos', 'salario_nto']


#Horarios
class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = ['id_horario', 'dia_semana', 'hora_entrada', 'hora_salida', 'turno']

