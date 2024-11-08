# Generated by Django 4.2 on 2024-11-08 02:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_clientes_proveedor_cotizaciones'),
    ]

    operations = [
        migrations.CreateModel(
            name='Horario',
            fields=[
                ('id_horario', models.AutoField(primary_key=True, serialize=False)),
                ('dia_semana', models.TextField()),
                ('hora_entrada', models.TimeField()),
                ('hora_salida', models.TimeField()),
                ('turno', models.CharField(choices=[('Matutino', 'Matutino'), ('Vespertino', 'Vespertino')], max_length=100)),
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
            ],
        ),
        migrations.AddField(
            model_name='cotizaciones',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='producto',
            name='proveedor',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.proveedor'),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Devoluciones',
            fields=[
                ('id_dev', models.AutoField(primary_key=True, serialize=False)),
                ('motivo', models.TextField()),
                ('fecha', models.DateField()),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.producto')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ventas')),
            ],
        ),
        migrations.CreateModel(
            name='DetalleVenta',
            fields=[
                ('id_detalle', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.DecimalField(decimal_places=2, max_digits=10)),
                ('precio_u', models.DecimalField(decimal_places=2, max_digits=10)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.producto')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ventas')),
            ],
        ),
        migrations.CreateModel(
            name='DetalleCotizaciones',
            fields=[
                ('id_de', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.IntegerField()),
                ('precio_u', models.DecimalField(decimal_places=2, max_digits=10)),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=10)),
                ('cotizacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cotizaciones')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.producto')),
            ],
        ),
    ]
