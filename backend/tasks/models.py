from django.db import models

class Task(models.Model):
    name = models.CharField(max_length=20)
    deadline = models.DateField(null=True)
    desc = models.TextField(max_length=500)
    completion = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
