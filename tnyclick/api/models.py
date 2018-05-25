import uuid

from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver


def scramble_uploaded_filename(instance):
    """
    Scramble / uglify the filename of the uploaded file, but keep the files extension (e.g., .jpg or .png)
    :param instance:
    :return:
    """
    return "{}.{}".format(instance.name, instance.extension)


# Create your models here.

class UploadedImage(models.Model):
    username = models.CharField("username", max_length=100)
    extension = models.CharField("extension", max_length=10, null=True, blank=True)
    name = models.CharField("name", max_length=20, unique=True, null=True, blank=True)
    image = models.ImageField("image", upload_to=scramble_uploaded_filename)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.extension = self.image.url.split(".")[-1]
        self.name = uuid.uuid4().hex[:12]
        super(UploadedImage, self).save(force_update=force_update)


@receiver(pre_delete, sender=UploadedImage)
def image_delete(sender, instance, **kwargs):
    """
    Delete the whole file when we delete the DB entry
    :param sender:
    :param instance:
    :param kwargs:
    :return:
    """
    instance.image.delete(False)
