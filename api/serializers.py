from rest_framework import serializers
from .models import UploadedImage


class UploadedImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the UploadedImage Model
    Provides the pk, image, thumbnail, title and description
    """

    class Meta:
        model = UploadedImage
        fields = ('pk', 'image', 'username')
