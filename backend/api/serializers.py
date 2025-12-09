from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Couple, CoupleUsers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class CoupleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Couple
        fields = ["id", "created_at"]

class CoupleUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoupleUsers
        fields = ["id", "couple_id", "user_id"]
        extra_kwargs = {"couple_id": {"read_only": True}, "used_id": {"read_only": True}}