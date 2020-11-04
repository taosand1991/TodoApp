# Generated by Django 3.1.3 on 2020-11-02 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'categories'},
        ),
        migrations.AddField(
            model_name='todo',
            name='priority',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]