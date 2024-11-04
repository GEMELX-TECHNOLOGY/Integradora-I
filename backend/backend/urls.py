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
    path("api/v1/v1/obtener_rol/", get_user_role, name="rol-usuaio"),
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

    #URLs Ventas
    path('api/v1/ventas/', VentasView.as_view(), name='productos-mas-vendidos'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
