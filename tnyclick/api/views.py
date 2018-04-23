from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
from .models import UploadedImage
from .serializers import UploadedImageSerializer


class UploadAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (JSONRenderer,)

    def get(self, request, username):
        images = UploadedImage.objects.filter(username=username)
        serializer = UploadedImageSerializer(images, many=True)
        return Response(serializer.data)

    def post(self, request, username):
        image = request.data["file"]
        serializer = UploadedImageSerializer(data={"image": image, "username": username})
        if serializer.is_valid():
            serializer.save()
            url = request.build_absolute_uri('/')[:-1]
            return HttpResponse(url + serializer.data["image"], content_type='text/plain', status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
