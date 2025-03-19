from rest_framework import serializers
from .models import *

#Roles
class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id_rol', 'nombre_rol', 'is_staff', 'is_superuser']

#Usuarios
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', "email", "username", "password", "rol", "user_profile_image","date_joined"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        rol = validated_data.pop('rol', None)
        user = Usuarios(**validated_data)
        user.set_password(validated_data['password'])
        if rol:
            user.rol = rol
        user.save()
        return user
    
class UserGetSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)
    class Meta:
        model = Usuarios
        fields = ['id', "email", "username", "password", "rol", "user_profile_image","date_joined"]


class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', "email", "rol", "user_profile_image"]
        extra_kwargs = {"password": {"write_only": True}}
#Horarios
class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = ['id_horario', 'dia_semana', 'hora_entrada', 'hora_salida', 'turno']

#Nomina
class NominaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomina
        fields = ['id_nom', 'fecha_pago', 'salario_base', 'bonos', 'salario_nto', 'referencia']


class EmpleadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleados
        fields = ['nombre', 'apellido_pa', "apellido_ma", "rfc", "calle", "numero_ext", "numero_int", 'cod_Postal', "estado", 'pais', 'user', 'horario', 'nomina', 'profile_image']

class EmpleadosGetSerializer(serializers.ModelSerializer):
    user = UserGetSerializer(read_only=True)
    horario = HorarioSerializer(read_only=True)
    nomina = NominaSerializer(read_only=True)
    class Meta:
        model = Empleados
        fields = ['nombre', 'apellido_pa', "apellido_ma", "rfc", "calle", "numero_ext", "numero_int", 'cod_Postal', "estado", 'pais', 'user', 'horario', 'nomina', 'profile_image']


#Chat
class MessageSerializer(serializers.ModelSerializer):
    reciever_profile = EmpleadosSerializer(read_only=True)
    sender_profile = EmpleadosSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id','username', 'sender', 'sender_profile', 'reciever', 'reciever_profile', 'message', 'is_read', 'date']





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

class VentasGetSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    class Meta:
        model = Ventas
        fields = ['referencia', 'producto', 'uv', 'pv', 'amt']



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





