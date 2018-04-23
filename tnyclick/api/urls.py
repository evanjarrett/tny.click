from django.urls import re_path

from . import views

urlpatterns = [
    re_path(r'^images/(?P<username>\w+)/$', views.UploadAPIView.as_view()),
]
