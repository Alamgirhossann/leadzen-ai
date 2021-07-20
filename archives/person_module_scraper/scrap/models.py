from django.db import models
from django.contrib.auth.models import User
from file_upoad.models import FileTable

# Create your models here.
class EmailTable(models.Model):
    email = models.CharField(max_length=50, null=True, blank=True)
    type = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    status = models.CharField(
        max_length=50, default="Not verified", blank=True, null=True
    )
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Emails"


class PhoneTable(models.Model):
    display = models.CharField(max_length=50, null=True, blank=True)
    number = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=10, null=True, blank=True)
    do_not_call = models.BooleanField(default=False)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Phones"


class NameTable(models.Model):
    first_name = models.CharField(max_length=100, blank=True, null=True)
    mddle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Names"


class RelationTable(models.Model):
    display = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Relations"


class JobTable(models.Model):
    organization = models.TextField(max_length=500, blank=True, null=True)
    dsplay = models.TextField(max_length=500, blank=True, null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Jobs"


class EducationTable(models.Model):
    shool = models.TextField(max_length=100, blank=True, null=True)
    display = models.TextField(max_length=500, blank=True, null=True)
    degree = models.TextField(max_length=200, blank=True, null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Educatios"


class GenderTable(models.Model):
    display = models.CharField(max_length=50, blank=True, null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Genders"


class TagTable(models.Model):
    content = models.TextField(max_length=5000, blank=True, null=True)
    name = models.TextField(max_length=5000, blank=True, null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Tags"


class LaguageTable(models.Model):
    region = models.CharField(max_length=100, blank=True, null=True)
    language = models.CharField(max_length=100, blank=True, null=True)
    display = models.CharField(max_length=100, blank=True, null=True)
    name = models.CharField(max_length=100, null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Languages"


class AddressTable(models.Model):
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    street = models.CharField(max_length=100, blank=True, null=True)
    house = models.CharField(max_length=100, blank=True, null=True)
    apartment = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=100, blank=True, null=True)
    po_box = models.CharField(max_length=100, blank=True, null=True)
    display = models.TextField(max_length=500, blank=True, null=True)
    valid_since = models.CharField(max_length=50, blank=True, null=True)
    last_seen = models.CharField(max_length=50, blank=True, null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Addresses"


class UrlTable(models.Model):
    source_id = models.CharField(max_length=100, blank=True, null=True)
    domain = models.CharField(max_length=100, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    url = models.CharField(max_length=2000, blank=True, null=True)
    sponsored = models.BooleanField(null=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Urls"


class DobTable(models.Model):
    display = models.CharField(max_length=100, null=True, blank=True)
    file = models.ForeignKey(FileTable, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Dobs"
