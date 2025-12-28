from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, CoupleSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Couple
# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        couple = Couple.objects.filter(user1=user)
        if couple.exists():
            partner = couple.first().user2
            return Note.objects.filter(author__in=[user, partner]).order_by('-created_at')
        
        couple = Couple.objects.filter(user2=user)
        if couple.exists():
            partner = couple.first().user1
            return Note.objects.filter(author__in=[user, partner]).order_by('-created_at')
        
        return Note.objects.filter(author=user).order_by('-created_at')
    
    def perform_create(self, serializer):
        if(serializer.is_valid()):
            return serializer.save(author = self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserListCreate(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # removed myself from the list
        users = User.objects.exclude(id=self.request.user.id)

        # removed users that already have couple (may work too long)
        for cp in Couple.objects.all():
            users = users.exclude(id=cp.user2.id)
            users = users.exclude(id=cp.user1.id)
        return users
    
class CoupleCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        pass

    def post(self, request, pk):
        user1 = request.user
        try:
            user2 = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        couple = Couple.objects.create(user1=user1, user2=user2)
        serializer = CoupleSerializer(couple)
        return Response(serializer.data, status=201)
    

    # Used to differ me from my partner
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMe(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)