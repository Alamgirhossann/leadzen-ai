# Generated by Django 3.1.7 on 2021-06-11 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_upoad', '0004_auto_20210608_1852'),
    ]

    operations = [
        migrations.AddField(
            model_name='filetable',
            name='url',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]