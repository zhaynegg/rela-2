from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    

# the model one to one within users
class Couple(models.Model):
    user1 = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user1")
    user2 = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user2")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user1.username} & {self.user2.username}"