from django.urls import path
from . import views

urlpatterns = [
    path("me/", views.getMe, name="get-me"),
    path("notes/", views.NoteListCreate.as_view(), name = "note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name = "delete-note"),
    path("users/", views.UserListCreate.as_view(), name = "user-list"),
    path("users/connect/<int:pk>/", views.CoupleCreateView.as_view(), name = "connect-user"),
]