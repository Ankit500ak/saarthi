from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Interest(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Student(models.Model):
    name = models.CharField(max_length=100)
    education = models.CharField(max_length=200)
    skills = models.ManyToManyField(Skill, related_name='students')
    interests = models.ManyToManyField(Interest, related_name='students')
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Internship(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    required_skills = models.ManyToManyField(Skill, related_name='internships')
    sector = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.title
