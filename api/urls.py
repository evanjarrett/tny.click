from django.urls import path

from . import views

urlpatterns = [
    path('images', views.UploadAPIView.as_view()),
    path('token', views.TokenAPIView.as_view(), name='get_auth_token'),
]
