from django.contrib import admin
from django.urls import path, include
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user", AllUsersView.as_view(), name='usuarios'),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/rol", AllRolView.as_view(), name='roles'),
    path("api/rol/registrar", CreateRoleView.as_view(), name="crear-rol"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),

    #URLs Productos
    path('api/productos/', ListaProductosView.as_view(), name='lista_productos_api'),
    path('api/productos/crear', CreateProductsView.as_view(), name='crear-prodcutos'),
    path('api/productos/<str:cod_producto>/', DetalleProductosView.as_view(), name='detalle_producto_api'),

    #URLs categorias
    path('api/categorias/', ListaCategoriasView.as_view(), name='lista_categorias_api'),
    path('api/categorias/crear', CreateCategoriesView.as_view(), name='crear-categorias' ),
    path('api/categorias/<int:id_categoria>/', DetalleCategoriaView.as_view(), name='detalle_categoria_api'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)