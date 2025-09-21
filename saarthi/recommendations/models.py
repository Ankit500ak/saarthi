from django.db import models

# Create your models here.

class Internship(models.Model):
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    duration = models.CharField(max_length=50)
    stipend = models.CharField(max_length=50)
    skills = models.JSONField()  # Store skills as a JSON array
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title
