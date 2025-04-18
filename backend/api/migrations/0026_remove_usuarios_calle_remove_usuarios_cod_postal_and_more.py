# Generated by Django 4.1.2 on 2024-11-15 02:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_usuarios_calle_usuarios_cod_postal_usuarios_estado_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuarios',
            name='calle',
        ),
        migrations.RemoveField(
            model_name='usuarios',
            name='cod_Postal',
        ),
        migrations.RemoveField(
            model_name='usuarios',
            name='estado',
        ),
        migrations.RemoveField(
            model_name='usuarios',
            name='numero_ext',
        ),
        migrations.RemoveField(
            model_name='usuarios',
            name='numero_int',
        ),
        migrations.RemoveField(
            model_name='usuarios',
            name='pais',
        ),
        migrations.CreateModel(
            name='Empleados',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('apellido_pa', models.CharField(max_length=255)),
                ('apellido_ma', models.CharField(max_length=255)),
                ('calle', models.CharField(default='', max_length=60)),
                ('numero_ext', models.CharField(default='', max_length=10)),
                ('numero_int', models.CharField(default='', max_length=10)),
                ('cod_Postal', models.CharField(default='', max_length=5)),
                ('estado', models.CharField(default='', max_length=60)),
                ('pais', models.CharField(default='', max_length=60)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
