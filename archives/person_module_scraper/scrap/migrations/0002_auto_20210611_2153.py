# Generated by Django 3.1.7 on 2021-06-11 16:23

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('file_upoad', '0005_filetable_url'),
        ('scrap', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Relations',
            new_name='RelationTable',
        ),
    ]