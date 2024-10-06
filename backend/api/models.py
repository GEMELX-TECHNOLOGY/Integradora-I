from django.db import models

################ - PRODUCTOS - ################
#Tabla Categoria
class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.TextField(max_length=100)
    referencia = models.CharField(max_length=8)

    def __str__(self):
        return self.nombre
    
#Tabla Productos
class Producto(models.Model):
    cod_producto = models.IntegerField(primary_key=True)
    nombre = models.TextField(max_length=40)
    descripcion = models.CharField(max_length=100)
    referencia = models.CharField(max_length=8)
    modelo = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10,decimal_places=2)
    stock = models.CharField(max_length=100)
    #llave foranea
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre


