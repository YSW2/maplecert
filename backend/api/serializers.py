from rest_framework import serializers
from .models import CertData


class userSerializer(serializers.Serializer):
    api = serializers.CharField(max_length=150)
    userName = serializers.CharField(max_length=20)


class ocidSerializer(serializers.Serializer):
    api = serializers.CharField(max_length=150)
    ocid = serializers.CharField(max_length=32)


class certSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertData
        fields = ("ocid", "cert_code")
