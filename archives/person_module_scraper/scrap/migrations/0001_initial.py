# Generated by Django 3.1.7 on 2021-06-11 08:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('file_upoad', '0005_filetable_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='UrlTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source_id', models.CharField(blank=True, max_length=100, null=True)),
                ('domain', models.CharField(blank=True, max_length=100, null=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('category', models.CharField(blank=True, max_length=50, null=True)),
                ('url', models.CharField(blank=True, max_length=2000, null=True)),
                ('sponsored', models.BooleanField(null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Urls',
            },
        ),
        migrations.CreateModel(
            name='TagTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display', models.CharField(blank=True, max_length=500, null=True)),
                ('classification', models.CharField(blank=True, max_length=100, null=True)),
                ('content', models.TextField(blank=True, max_length=5000, null=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('value', models.CharField(blank=True, max_length=100, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Tags',
            },
        ),
        migrations.CreateModel(
            name='Relations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display', models.CharField(blank=True, max_length=100, null=True)),
                ('type', models.CharField(blank=True, max_length=50, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Relations',
            },
        ),
        migrations.CreateModel(
            name='PhoneTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display', models.CharField(blank=True, max_length=15, null=True)),
                ('number', models.CharField(blank=True, max_length=11, null=True)),
                ('country_code', models.CharField(blank=True, max_length=10, null=True)),
                ('do_not_call', models.BooleanField(default=False)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Phones',
            },
        ),
        migrations.CreateModel(
            name='NameTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=100, null=True)),
                ('mddle_name', models.CharField(blank=True, max_length=100, null=True)),
                ('last_name', models.CharField(blank=True, max_length=100, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Names',
            },
        ),
        migrations.CreateModel(
            name='LaguageTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('region', models.CharField(blank=True, max_length=100, null=True)),
                ('language', models.CharField(blank=True, max_length=100, null=True)),
                ('display', models.CharField(blank=True, max_length=100, null=True)),
                ('name', models.CharField(max_length=100, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Languages',
            },
        ),
        migrations.CreateModel(
            name='JobTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('organization', models.CharField(blank=True, max_length=100, null=True)),
                ('dsplay', models.TextField(blank=True, max_length=500, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Jobs',
            },
        ),
        migrations.CreateModel(
            name='GenderTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display', models.CharField(blank=True, max_length=20, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Genders',
            },
        ),
        migrations.CreateModel(
            name='EmailTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('type', models.CharField(blank=True, max_length=20, null=True)),
                ('address', models.CharField(blank=True, max_length=50, null=True)),
                ('status', models.BooleanField(blank=True, choices=[(True, 'Valid'), (False, 'Innvalid')], default=False, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Emails',
            },
        ),
        migrations.CreateModel(
            name='EducationTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shool', models.TextField(blank=True, max_length=100, null=True)),
                ('display', models.TextField(blank=True, max_length=500, null=True)),
                ('degree', models.TextField(blank=True, max_length=200, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Educatios',
            },
        ),
        migrations.CreateModel(
            name='DobTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display', models.CharField(blank=True, max_length=100, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Dobs',
            },
        ),
        migrations.CreateModel(
            name='AddressTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(blank=True, max_length=50, null=True)),
                ('state', models.CharField(blank=True, max_length=50, null=True)),
                ('city', models.CharField(blank=True, max_length=50, null=True)),
                ('street', models.CharField(blank=True, max_length=100, null=True)),
                ('house', models.CharField(blank=True, max_length=50, null=True)),
                ('apartment', models.CharField(blank=True, max_length=20, null=True)),
                ('zip_code', models.CharField(blank=True, max_length=20, null=True)),
                ('po_box', models.CharField(blank=True, max_length=20, null=True)),
                ('display', models.TextField(blank=True, max_length=500, null=True)),
                ('valid_since', models.CharField(blank=True, max_length=15, null=True)),
                ('last_seen', models.CharField(blank=True, max_length=15, null=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='file_upoad.filetable')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Addresses',
            },
        ),
    ]