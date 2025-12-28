from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Couple


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]

class CoupleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Couple
        fields = ["id", "user1", "user2", "created_at"]