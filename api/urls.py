from django.urls import path

from rest_framework.authtoken import views as rest_framework_views
from . import views

urlpatterns = [
    path('images', views.UploadAPIView.as_view()),
    path('token', rest_framework_views.obtain_auth_token, name='get_auth_token'),
]
