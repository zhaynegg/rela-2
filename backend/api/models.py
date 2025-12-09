from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    
# the model many to many
class Couple(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

class CoupleUsers(models.Model):
    couple_id = models.ForeignKey(Couple, on_delete=models.CASCADE, related_name="couples")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="couples")