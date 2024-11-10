from django.contrib import admin
from django.urls import path, include
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    #URLs Usuarios
    path("api/v1/user/", user_details, name='usuarios'),
    path("api/v1/users/", AllUsersView.as_view(), name='users'),
    path("api/v1/user/<int:id>/", DetalleUsuarioView.as_view(), name='user-profile'),
    path("api/v1/user/register/", CreateUserView.as_view(), name="register"),
    path("api/v1/user/edit/<int:id>/", UserUpdateView.as_view(), name='editar-usuario'),
    path("api/v1/user/delete/<int:pk>/", UsuarioDeleteView.as_view(), name='delete-user'),
    
    #URLs Roles
    path("api/v1/roles/", AllRolView.as_view(), name='roles'),
    path("api/v1/rol/registrar", CreateRoleView.as_view(), name="crear-rol"),
    
    #URLs Token
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),

    
    # URLs Productos
    path('api/v1/productos/', ListaProductosView.as_view(), name='lista_productos_api'),
    path('api/v1/productos/crear', CreateProductsView.as_view(), name='crear-productos'),
    path('api/v1/productos/actualizar/<int:cod_producto>/', UpdateProductView.as_view(), name='actualizar_producto'),
    path('api/v1/productos/delete/<int:cod_producto>/', DeleteProductView.as_view(), name='eliminar_producto'),
    path('api/v1/productos/<int:cod_producto>/', DetalleProductosView.as_view(), name='detalle_producto_api'),

    
    #URLs categorias
    path('api/v1/categorias/', ListaCategoriasView.as_view(), name='lista_categorias_api'),
    path('api/v1/categorias/crear/', CreateCategoriesView.as_view(), name='crear-categorias'),
    path('api/v1/categorias/<int:id_categoria>/', DetalleCategoriaView.as_view(), name='detalle_categoria_api'),

   

    #URLs Proveedores
    path('api/v1/proveedores/', ListaProveedoresView.as_view(), name='lista_proveedores_api'),
    path('api/v1/proveedores/crear/', CreateProveedorView.as_view(), name='crear_proveedor'),
    path('api/v1/proveedores/<int:id_prov>/', DetalleProveedorView.as_view(), name='detalle_proveedor_api'),
    path('api/v1/proveedores/actualizar/<int:id_prov>/', UpdateProveedorView.as_view(), name='actualizar_proveedor'),
    path('api/v1/proveedores/delete/<int:id_prov>/', DeleteProveedorView.as_view(), name='eliminar_proveedor'),

    #URLs Clientes
    path('api/v1/clientes/', ListaClientesView.as_view(), name='lista_clientes_api'),
    path('api/v1/clientes/crear/', CreateClienteView.as_view(), name='crear_cliente'),
    path('api/v1/clientes/<int:id_cliente>/', DetalleClienteView.as_view(), name='detalle_cliente_api'),
    path('api/v1/clientes/actualizar/<int:id_cliente>/', UpdateClientesView.as_view(), name='actualizar_clientes'),
    path('api/v1/clientes/delete/<int:id_cliente>/', DeleteClientesView.as_view(), name='eliminar_clientes'),

    #URLs Ventas
    path('api/v1/ventas/', ListaVentasView.as_view(), name='lista_ventas_api'),
    path('api/v1/ventas/crear/', CreateVentaView.as_view(), name='crear_venta'),
    path('api/v1/ventas/actualizar/<int:id>/', UpdateVentaView.as_view(), name='actualizar_ventas'),
    path('api/v1/ventas/<int:id>/', DetalleVentaView.as_view(), name='detalle_venta_api'),

    #urls DetalleVentas
    path('api/v1/detalle_ventas/', ListaDetalleVentasView.as_view(), name='lista_detalle_ventas_api'),
    

    #urls Cotizaciones
    path('api/v1/cotizaciones/', ListaCotizacionesView.as_view(), name='lista_cotizaciones_api'),
    path('api/v1/cotizaciones/crear/', CreateCotizacionView.as_view(), name='crear_cotizacion'),
    path('api/v1/cotizaciones/<int:id_cotizacion>/', DetalleCotizacionView.as_view(), name='detalle_cotizacion_api'),

    #urls DetalleCotizaciones
    path('api/v1/detalle_cotizaciones/', ListaDetalleCotizacionesView.as_view(), name='lista_detalle_cotizaciones_api'),
   

    #urls Devoluciones
    path('api/v1/devoluciones/', ListaDevolucionesView.as_view(), name='lista_devoluciones_api'),
    path('api/v1/devoluciones/crear/', CreateDevolucionView.as_view(), name='crear_devolucion'),

    #urls Nomina
    path('api/v1/nominas/', ListaNominasView.as_view(), name='lista_nominas_api'),
    path('api/v1/nominas/crear/', CreateNominaView.as_view(), name='crear_nomina'),

    #urls Horario
    path('api/v1/horarios/', ListaHorariosView.as_view(), name='lista_horarios_api'),
    path('api/v1/horarios/crear/', CreateHorarioView.as_view(), name='crear_horario'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#URLs Ventas
   # path('api/v1/ventas/', VentasView.as_view(), name='productos-mas-vendidos'), #CHECA ESTA GERA QUE NO INTERFIERA CON TUS GRAFICAS