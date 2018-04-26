import uuid

from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver


def scramble_uploaded_filename(instance, filename):
    """
    Scramble / uglify the filename of the uploaded file, but keep the files extension (e.g., .jpg or .png)
    :param instance:
    :param filename:
    :return:
    """
    extension = filename.split(".")[-1]
    return "{}.{}".format(uuid.uuid4().hex[:12], extension)


# Create your models here.

# Our main model: Uploaded Image
class UploadedImage(models.Model):
    username = models.CharField("username", max_length=100)
    image = models.ImageField("image", upload_to=scramble_uploaded_filename)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
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
