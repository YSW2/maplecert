from django.urls import path
from .views import GetUserOcid, GetUserInfo, SearchCertKey

urlpatterns = [
    path("get-ocid", GetUserOcid.as_view()),
    path("get-info", GetUserInfo.as_view()),
    path("search-cert", SearchCertKey.as_view()),
]
