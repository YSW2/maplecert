from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime, timedelta
import json
from .serializers import *
from .utils import *
from .crypto import *
from .models import CertData, generate_random_cert
import pytz

# Create your views here.


class GetUserOcid(APIView):
    serializer_class = userSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            api = serializer.data.get("api")
            userName = serializer.data.get("userName")

            response = get_ocid_by_api(api, userName)
            ocid = response.get("ocid")

            if ocid:
                if CertData.objects.filter(ocid=encrypt_data(ocid)):
                    return Response(response, status=status.HTTP_409_CONFLICT)
                else:
                    return Response(response, status=status.HTTP_200_OK)

            else:
                return Response({}, status=status.HTTP_404_NOT_FOUND)

        else:
            print(serializer.error_messages)
            return Response({}, status=status.HTTP_400_BAD_REQUEST)


class GetStarforce(APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)
        api = data.get("api")
        userName = data.get("userName")
        date = datetime.now()
        date_str = date.strftime("%Y-%m-%d")

        response = get_starforce_api(api, date_str, "history/starforce").get(
            "starforce_history"
        )[0]

        check_num = response["after_starforce_count"]
        check_time = response["date_create"]
        check_name = response["character_name"]
        check_time_trans = datetime.fromisoformat(check_time)
        current_time = datetime.now(pytz.timezone("Asia/Seoul"))
        time_diff = current_time - check_time_trans

        if (
            userName == check_name
            and time_diff <= timedelta(minutes=3)
            and check_num <= 11
        ):
            return Response({"cert": "valid"}, status=status.HTTP_200_OK)

        else:
            return Response({"cert": "invalid"}, status=status.HTTP_200_OK)


class GetUserInfo(APIView):
    serializer_class = ocidSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            api = serializer.data.get("api")
            ocid = serializer.data.get("ocid")
            date = datetime.now()
            yesterday = date - timedelta(days=1)
            date_str = date.strftime("%Y-%m-%d")
            yesterday_str = yesterday.strftime("%Y-%m-%d")

            endpoint_list = {
                "character/basic",
                "character/popularity",
                "character/stat",
                "character/hexamatrix",
                "character/hexamatrix-stat",
                "user/union",
            }

            response = {}
            for endpoint in endpoint_list:
                response.update(
                    excute_maplestory_api(
                        api=api,
                        ocid=ocid,
                        date=yesterday_str,
                        endpoint=endpoint,
                    )
                )

            encrypted_ocid = encrypt_data(ocid)
            queryset = CertData.objects.filter(ocid=encrypted_ocid)
            if queryset.exists():
                cert_data = queryset[0]
                cert_data.ocid = encrypted_ocid
                cert_data.cert_code = generate_random_cert()
                cert_data.save(update_fields=["ocid", "cert_code"])
            else:
                cert_data = CertData.objects.create(ocid=encrypted_ocid)

            fin_response = {
                "character_level": response.get("character_level"),
                "stat": response.get("final_stat")[42].get("stat_value"),
                "popularity": response.get("popularity"),
                "union_level": response.get("union_level"),
                "union_grade": response.get("union_grade"),
                "hexa_core": response.get("character_hexa_core_equipment"),
                "hexa_stat": response.get("character_hexa_stat_core"),
                "date": date_str,
                "cert_code": cert_data.cert_code,
            }

            return Response(fin_response, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)


class SearchCertKey(APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        cert_code = data.get("certKey")
        print(cert_code)
        result = CertData.objects.filter(cert_code=cert_code).first()

        if result:
            return Response({"message": "Found"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Not Found"}, status=status.HTTP_204_NO_CONTENT)
