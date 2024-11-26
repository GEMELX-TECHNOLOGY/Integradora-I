from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.db.models import Subquery, OuterRef, Q
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
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'rol': role_name,
        'profile_image': user.user_profile_image.url if user.user_profile_image else None,
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

################ - Empleados - ################
class GetEmpleados(generics.ListAPIView):

    queryset = Empleados.objects.all()
    serializer_class = EmpleadosSerializer
    permission_classes = [AllowAny]
 
class CreateEmpleados(generics.CreateAPIView):
    queryset = Empleados
    serializer_class = EmpleadosSerializer
    permission_classes= [AllowAny]

class EmpleadoDetail(generics.RetrieveAPIView):
    queryset = Empleados.objects.all()
    serializer_class = EmpleadosSerializer
    permission_classes = [AllowAny]

class UpdateEmpleado(generics.UpdateAPIView):
    queryset = Empleados.objects.all()
    serializer_class = EmpleadosSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]

class DeleteEmpleado(generics.DestroyAPIView):
    queryset = Empleados.objects.all()
    lookup_field = 'id'
    serializer_class = EmpleadosSerializer
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
    permission_classes = [AllowAny]

class DeleteProductView(generics.DestroyAPIView):
    queryset = Producto.objects.all()
    lookup_field = 'cod_producto'
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]
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

class DeleteCategoriaView(generics.DestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    lookup_field = 'id_categoria'
    permission_classes = [AllowAny]
    def perform_destroy(self, instance):
        print(f'Eliminando producto: {instance}')
        instance.delete()



############### - PROVEEDORES - ################
class CreateProveedorView(generics.CreateAPIView):
    queryset = Proveedor
    serializer_class = ProveedorSerializer
    permission_classes = [AllowAny]

class UpdateProveedorView(generics.UpdateAPIView):
    queryset = Proveedor.objects.all()
    lookup_field = 'id_prov'
    serializer_class = ProveedorSerializer
    permission_classes = [AllowAny]

class DeleteProveedorView(generics.DestroyAPIView):
    queryset = Proveedor.objects.all()
    lookup_field = 'id_prov'
    serializer_class = ProveedorSerializer
    permission_classes = [AllowAny]
    def perform_destroy(self, instance):
        print(f'Eliminando producto: {instance}')
        instance.delete()


class ListaProveedoresView(generics.ListAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer
    permission_classes = [AllowAny]

class DetalleProveedorView(generics.RetrieveAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer
    lookup_field = 'id_prov'
    permission_classes = [AllowAny]


################ - CLIENTES - ################
class CreateClienteView(generics.CreateAPIView):
    queryset = Clientes
    serializer_class = ClienteSerializer
    permission_classes = [AllowAny]

class ListaClientesView(generics.ListAPIView):
    queryset = Clientes.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [AllowAny]
    permission_classes = [AllowAny]

class UpdateClientesView(generics.UpdateAPIView):
    queryset = Clientes.objects.all()
    lookup_field = 'id_cliente'
    serializer_class = ClienteSerializer
    permission_classes = [AllowAny]

class DeleteClientesView(generics.DestroyAPIView):
    queryset = Clientes.objects.all()
    lookup_field = 'id_cliente'
    serializer_class = ClienteSerializer
    permission_classes = [AllowAny]
    def perform_destroy(self, instance):
        print(f'Eliminando producto: {instance}')
        instance.delete()
        


class DetalleClienteView(generics.RetrieveAPIView):
    queryset = Clientes.objects.all()
    serializer_class = ClienteSerializer
    lookup_field = 'id_cliente'
    permission_classes = [AllowAny]


################ - VENTAS - ################
class CreateVentaView(generics.CreateAPIView):
    queryset = Ventas
    serializer_class = VentasSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        venta = serializer.save()
    
        detalles = self.request.data.get('detalles', [])
        for detalle in detalles:
            
            DetalleVenta.objects.create(
                venta=venta,
                producto_id=detalle['producto'],
                cantidad=detalle['cantidad'],
                precio_u=detalle['precio_u']
            )
       
        venta.save()
class ListaVentasView(generics.ListAPIView):
    queryset = Ventas.objects.all()
    serializer_class = VentasSerializer
    permission_classes = [AllowAny]

class DetalleVentaView(generics.RetrieveAPIView):
    queryset = Ventas.objects.all()
    serializer_class = VentasSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]

class UpdateVentaView(generics.UpdateAPIView):
    queryset = Ventas.objects.all()
    lookup_field = 'id'
    serializer_class = VentasSerializer  
    permission_classes = [AllowAny]


class DeleteVentaView(generics.DestroyAPIView):
    queryset = Ventas.objects.all()
    serializer_class = VentasSerializer
    permission_classes = [AllowAny]


# Crear una nueva cotización
class CreateCotizacionView(generics.CreateAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        cotizacion = serializer.save()

        detalles = self.request.data.get('detalles', [])
        for detalle in detalles:
            DetalleCotizacion.objects.create(
                cotizacion=cotizacion,
                producto_id=detalle['producto'],
                cantidad=detalle['cantidad'],
                precio_u=detalle['precio_u']
            )
        
        cotizacion.save()

# Listar todas las cotizaciones
class ListaCotizacionesView(generics.ListAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionSerializer
    permission_classes = [AllowAny]

# Ver los detalles de una cotización
class DetalleCotizacionView(generics.RetrieveAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]

# Actualizar una cotización existente
class UpdateCotizacionView(generics.UpdateAPIView):
    queryset = Cotizacion.objects.all()
    lookup_field = 'id'
    serializer_class = CotizacionSerializer
    permission_classes = [AllowAny]

# Eliminar una cotización
class DeleteCotizacionView(generics.DestroyAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionSerializer
    permission_classes = [AllowAny]


################ - NOMINA - ################
class CreateNominaView(generics.CreateAPIView):
    queryset = Nomina
    serializer_class = NominaSerializer
    permission_classes = [AllowAny]

class ListaNominasView(generics.ListAPIView):
    queryset = Nomina.objects.all()
    serializer_class = NominaSerializer
    permission_classes = [AllowAny]

class EditNominaView(generics.UpdateAPIView):
    queryset = Nomina.objects.all()
    serializer_class = NominaSerializer
    permission_classes = [AllowAny]

class DeleteNominaView(generics.DestroyAPIView):
    queryset = Nomina.objects.all()
    serializer_class= NominaSerializer
    permission_classes = [AllowAny]

################ - HORARIO - ################
class CreateHorarioView(generics.CreateAPIView):
    queryset = Horario
    serializer_class = HorarioSerializer
    permission_classes = [AllowAny]

class ListaHorariosView(generics.ListAPIView):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
    permission_classes = [AllowAny]

class EditHorarioView(generics.UpdateAPIView):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
    permission_classes = [AllowAny]

class DeleteHorarioView(generics.DestroyAPIView):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
    permission_classes = [AllowAny]


################ - CHAT - ################
class MyInbox(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']

        messages = ChatMessage.objects.filter(
            id__in =  Subquery(
                User.objects.filter(
                    Q(sender__reciever=user_id) |
                    Q(reciever__sender=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef('id'),reciever=user_id) |
                            Q(reciever=OuterRef('id'),sender=user_id)
                        ).order_by('-id')[:1].values_list('id',flat=True) 
                    )
                ).values_list('last_msg', flat=True).order_by("-id")
            )
        ).order_by("-id")
            
        return messages
    
class GetMessages(generics.ListAPIView):
    serializer_class= MessageSerializer
    permission_classes=[AllowAny]

    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        reciever_id = self.kwargs['reciever_id']

        messages = ChatMessage.objects.filter(
            sender__in=[sender_id, reciever_id],
            reciever__in=[sender_id, reciever_id]
        )

        return messages
    
class SendMessage(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes=[AllowAny]   

class SearchUser(generics.ListAPIView):
    serializer_class = EmpleadosSerializer
    queryset = Empleados.objects.all()
    lookup_field = 'username'
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        username = self.kwargs['username']
        logged_in_user = self.request.user
        users = Empleados.objects.filter(
            Q(user__username__icontains=username) |
            Q(nombre__icontains=username) |
            Q(user__email__icontains=username) 
        )
        if not users.exists():
            return Response(
                {"detail": "No users founds"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

##############COTIZACIONES#################
class CotizacionCreateView(generics.CreateAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionSerializer
    permission_classes = [AllowAny]
class ListaCotizacionesView(generics.ListAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionSerializer
    permission_classes = [AllowAny]
    
