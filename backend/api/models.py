from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from .manager import UserManager

################ - USUARIOS - ################
#Tabla Rol
class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=60, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre_rol
#Tabla Usuarios
class Usuarios(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    user_profile_image = models.ImageField(upload_to='Perfil/', blank=True, null=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, default=1)

    USERNAME_FIELD = 'username'
    objects = UserManager()

    def __str__(self):
        return self.username
    
    @property
    def is_active(self):
        return self.rol.is_active

    @property
    def is_staff(self):
        return self.rol.is_staff

    @property
    def is_superuser(self):
        return self.rol.is_superuser

################## INVENTARIO ###################
#Tabla Proveedor
class Proveedor(models.Model):
    id_prov = models.AutoField(primary_key=True)
    nombre = models.TextField()
    apellido_paterno = models.CharField(max_length=50)
    apellido_materno = models.CharField(max_length=50)
    telefono = models.IntegerField()
    calle = models.CharField(max_length=100)
    numero = models.CharField(max_length=20)
    ciudad = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)
    codigo_postal = models.CharField(max_length=10)

    def __str__(self):
        return self.nombre

################ - PRODUCTOS - ################
#Tabla Categoria
class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.TextField(max_length=100)
    referencia_categoria = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre_categoria
    
#Tabla Productos
class Producto(models.Model):
    cod_producto = models.CharField(max_length=10, primary_key=True)
    nombre = models.TextField(max_length=40)
    descripcion = models.CharField(max_length=100)
    referencia = models.CharField(max_length=30)
    modelo = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10,decimal_places=2)
    stock = models.IntegerField()
    product_image = models.ImageField(upload_to='productos/', blank=True)
    #llaves foraneas
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre
    

############## RH ##################

#Tabla Horario
class Horario(models.Model):
  id_horario = models.AutoField(primary_key=True)
  dia_semana = models.TextField()
  hora_entrada = models.TimeField()
  hora_salida = models.TimeField()
  turno = models.CharField(max_length=100, choices=[('Matutino', 'Matutino'), ('Vespertino', 'Vespertino')])
  def __str__(self):
        return self.id_horario

class Empleados(models.Model):
    nombre = models.CharField(max_length=255)
    apellido_pa = models.CharField(max_length=255)
    apellido_ma= models.CharField(max_length=255)
    rfc = models.CharField(max_length=13, unique=True, default="")
    calle = models.CharField(max_length=60, default="")
    numero_ext = models.CharField(max_length=10, default="")
    numero_int =  models.CharField(max_length=10, default="" )
    cod_Postal = models.CharField(max_length=5, default="")
    estado = models.CharField(max_length=60, default="")
    pais = models.CharField(max_length=60, default="")
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    horario = models.ForeignKey(Horario, on_delete=models.CASCADE, default="")
    def __str__(self):
        return self.nombre
    

#Tabla Nomina
class Nomina(models.Model):
    id_nom = models.AutoField(primary_key=True)
    fecha_pago = models.DateField()
    salario_base = models.DecimalField(max_digits=10,decimal_places=2)
    bonos = models.DecimalField(max_digits=10,decimal_places=2)
    salario_nto = models.DecimalField(max_digits=10,decimal_places=2)
    empleado = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    def __str__(self):
        return self.empleado
#Tabla Horario

################## VENTAS #################
#Tabla Clientes
class Clientes(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nombre = models.TextField()
    apellido_paterno = models.CharField(max_length=50)
    apellido_materno = models.CharField(max_length=50)
    telefono = models.IntegerField()
    calle = models.CharField(max_length=100)
    numero = models.CharField(max_length=20)
    ciudad = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)
    codigo_postal = models.CharField(max_length=10)
    correo = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
#Tabla Ventas
class Ventas(models.Model):
    id = models.AutoField(primary_key=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    referencia = models.TextField(max_length=40)
    uv = models.IntegerField()
    pv = models.DecimalField(max_digits=10, decimal_places=2)
    amt = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return self.referencia

#Tabla Detalle de Venta
class DetalleVenta(models.Model):
    id_detalle = models.AutoField(primary_key=True)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    precio_u = models.DecimalField(max_digits=10,decimal_places=2)
    venta = models.ForeignKey(Ventas, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return self.venta

#Tabla Cotizaciones
class Cotizaciones(models.Model):
    id_cotizacion = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=50, choices=[('Pendiente', 'Pendiente'), ('Aprobada', 'Aprobada'), ('Rechazada', 'Rechazada')], default='Pendiente')
    total = models.DecimalField(max_digits=10,decimal_places=2, default=0)

    def __str__(self):
        return self.cliente

#Tabla Detalle de Cotizaciones
class DetalleCotizaciones(models.Model):
    id_de = models.AutoField(primary_key=True)
    cantidad = models.IntegerField()
    precio_u = models.DecimalField(max_digits=10,decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    cotizacion = models.ForeignKey(Cotizaciones, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    def __str__(self):
        return self.cotizacion

#Tabla Devoluciones
class Devoluciones(models.Model):
    id_dev = models.AutoField(primary_key=True)
    motivo = models.TextField()
    fecha = models.DateField()
    venta = models.ForeignKey(Ventas, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return self.venta


###########################################
class ChatMessage(models.Model):
    user = models.ForeignKey(Usuarios, on_delete=models.SET_NULL, null=True, related_name="user")
    sender = models.ForeignKey(Usuarios, on_delete=models.SET_NULL, null=True, related_name="sender")
    reciever = models.ForeignKey(Usuarios, on_delete=models.SET_NULL, null=True, related_name="reciever")

    message = models.TextField()

    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']
        verbose_name_plural = "Message"

    def __str__(self):
        return f"{self.sender} - {self.reciever}"

    @property
    def sender_profile(self):
        sender_profile = UserManager.objects.get(user=self.sender)
        return sender_profile
    @property
    def reciever_profile(self):
        reciever_profile = UserManager.objects.get(user=self.reciever)
        return reciever_profile

    