# Generated by Django 4.1.2 on 2024-11-15 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_rename_direcccion_clientes_calle_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='calle',
            field=models.CharField(default='', max_length=60),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='cod_Postal',
            field=models.CharField(default='', max_length=5),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='estado',
            field=models.CharField(default='', max_length=60),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='numero_ext',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='numero_int',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='pais',
            field=models.CharField(default='', max_length=60),
        ),
    ]
