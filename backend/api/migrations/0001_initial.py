# Generated by Django 4.1.2 on 2024-11-27 16:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=20, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('user_profile_image', models.ImageField(blank=True, null=True, upload_to='Perfil/')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id_categoria', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_categoria', models.TextField(max_length=100)),
                ('referencia_categoria', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Clientes',
            fields=[
                ('id_cliente', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.TextField()),
                ('apellido_paterno', models.CharField(max_length=50)),
                ('apellido_materno', models.CharField(max_length=50)),
                ('telefono', models.CharField(max_length=20)),
                ('calle', models.CharField(max_length=100)),
                ('numero', models.CharField(max_length=20)),
                ('ciudad', models.CharField(max_length=50)),
                ('estado', models.CharField(max_length=50)),
                ('codigo_postal', models.CharField(max_length=10)),
                ('correo', models.EmailField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Horario',
            fields=[
                ('id_horario', models.AutoField(primary_key=True, serialize=False)),
                ('dia_semana', models.TextField()),
                ('hora_entrada', models.TimeField()),
                ('hora_salida', models.TimeField()),
                ('turno', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Nomina',
            fields=[
                ('id_nom', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_pago', models.DateField()),
                ('salario_base', models.DecimalField(decimal_places=2, max_digits=10)),
                ('bonos', models.DecimalField(decimal_places=2, max_digits=10)),
                ('salario_nto', models.DecimalField(decimal_places=2, max_digits=10)),
                ('referencia', models.CharField(default='', max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('cod_producto', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nombre', models.TextField(max_length=40)),
                ('descripcion', models.CharField(max_length=100)),
                ('referencia', models.CharField(max_length=30)),
                ('modelo', models.CharField(max_length=100)),
                ('marca', models.CharField(max_length=100)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('stock', models.IntegerField()),
                ('product_image', models.ImageField(blank=True, upload_to='productos/')),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.categoria')),
            ],
        ),
        migrations.CreateModel(
            name='Proveedor',
            fields=[
                ('id_prov', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.TextField()),
                ('apellido_paterno', models.CharField(max_length=50)),
                ('apellido_materno', models.CharField(max_length=50)),
                ('telefono', models.IntegerField()),
                ('calle', models.CharField(max_length=100)),
                ('numero', models.CharField(max_length=20)),
                ('ciudad', models.CharField(max_length=50)),
                ('estado', models.CharField(max_length=50)),
                ('codigo_postal', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Rol',
            fields=[
                ('id_rol', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_rol', models.CharField(max_length=60, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Ventas',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('referencia', models.TextField(max_length=40)),
                ('uv', models.IntegerField()),
                ('pv', models.DecimalField(decimal_places=2, max_digits=10)),
                ('amt', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.producto')),
            ],
        ),
        migrations.AddField(
            model_name='producto',
            name='proveedor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.proveedor'),
        ),
        migrations.CreateModel(
            name='Empleados',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('apellido_pa', models.CharField(max_length=255)),
                ('apellido_ma', models.CharField(max_length=255)),
                ('rfc', models.CharField(default='', max_length=13, unique=True)),
                ('calle', models.CharField(default='', max_length=60)),
                ('numero_ext', models.CharField(default='', max_length=10)),
                ('numero_int', models.CharField(default='', max_length=10)),
                ('cod_Postal', models.CharField(default='', max_length=5)),
                ('estado', models.CharField(default='', max_length=60)),
                ('pais', models.CharField(default='', max_length=60)),
                ('profile_image', models.ImageField(default='Perfil/nophoto.jpg', upload_to='Perfil/')),
                ('horario', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.horario')),
                ('nomina', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.nomina')),
                ('user', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DetalleVenta',
            fields=[
                ('id_detalle', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.DecimalField(decimal_places=2, max_digits=10)),
                ('precio_u', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_detalle', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.producto')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ventas')),
            ],
        ),
        migrations.CreateModel(
            name='DetalleCotizacion',
            fields=[
                ('id_detalle', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.DecimalField(decimal_places=2, max_digits=10)),
                ('precio_u', models.DecimalField(decimal_places=2, max_digits=10)),
                ('referencia', models.TextField(max_length=40)),
                ('total_detalle', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.producto')),
            ],
        ),
        migrations.CreateModel(
            name='Cotizacion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('unidades', models.IntegerField()),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.clientes')),
                ('referencia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.detallecotizacion')),
            ],
        ),
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=1000)),
                ('is_read', models.BooleanField(default=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('reciever', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reciever', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Message',
                'ordering': ['date'],
            },
        ),
        migrations.AddField(
            model_name='usuarios',
            name='rol',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.rol'),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
