# Generated by Django 3.1.7 on 2021-06-24 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrap', '0005_auto_20210612_1746'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addresstable',
            name='apartment',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='addresstable',
            name='city',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='addresstable',
            name='country',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='addresstable',
            name='house',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='addresstable',
            name='last_seen',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='addresstable',
            name='po_box',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='addresstable',
            name='state',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='addresstable',
            name='valid_since',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='addresstable',
            name='zip_code',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='gendertable',
            name='display',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='phonetable',
            name='display',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='phonetable',
            name='number',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='urltable',
            name='category',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]