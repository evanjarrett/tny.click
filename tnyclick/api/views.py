from django.contrib.auth import login
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import UploadedImage
from .serializers import UploadedImageSerializer


class UploadAPIView(ListCreateAPIView):

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


class ImageAPIView(RetrieveAPIView):

    def get(self, request, name, **kwargs):
        try:
            image = UploadedImage.objects.get(name=name)
        except UploadedImage.DoesNotExist:
            return HttpResponseNotFound("Image could not be found")

        serializer = UploadedImageSerializer(image, many=False)
        return Response(serializer.data)


class TokenAPIView(ObtainAuthToken):

    @permission_classes((IsAuthenticated,))
    def get(self, request):
        if not request.user.is_authenticated or request.user.is_anonymous:
            raise PermissionDenied

        token, bool = Token.objects.get_or_create(user=request.user)
        return Response({"token": token.key})

    def post(self, request, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
        })
