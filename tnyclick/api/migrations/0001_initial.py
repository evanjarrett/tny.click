# Generated by Django 2.0.4 on 2018-04-26 05:46

import tnyclick.api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UploadedImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, verbose_name='username')),
                ('image', models.ImageField(upload_to=tnyclick.api.models.scramble_uploaded_filename, verbose_name='image')),
            ],
        ),
    ]