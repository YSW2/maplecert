from django.db import models
import random

# Create your models here.


# 0~9까지의 난수 12자리 생성
def generate_random_cert():
    while True:
        cert_code = "-".join(
            ["".join([str(random.randint(0, 9)) for _ in range(4)]) for _ in range(3)]
        )
        if not CertData.objects.filter(cert_code=cert_code).exists():
            break
    return cert_code


class CertData(models.Model):
    ocid = models.CharField(max_length=64, unique=True)
    cert_code = models.CharField(
        max_length=14, default=generate_random_cert, unique=True
    )
