from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class FileTable(models.Model):
    file = models.FileField(upload_to="upload", null=True, blank=True)
    col_name = models.CharField(max_length=50, blank=True, null=True)
    datetime = models.CharField(max_length=30, null=True, blank=True)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, blank=True, null=True)
