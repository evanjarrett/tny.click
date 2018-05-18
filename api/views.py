from django.http import HttpResponse
from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import UploadedImage
from .serializers import UploadedImageSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class UploadAPIView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer,)
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication,)

    def get(self, request, **kwargs):
        images = UploadedImage.objects.filter(username=request.user.username)
        serializer = UploadedImageSerializer(images, many=True)
        return Response(serializer.data)

    def post(self, request, **kwargs):
        image = request.data["file"]
        serializer = UploadedImageSerializer(data={"image": image, "username": request.user.username})
        if serializer.is_valid():
            serializer.save()
            url = request.build_absolute_uri('/')[:-1]
            return HttpResponse(url + serializer.data["image"], content_type='text/plain',
                status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

