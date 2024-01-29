from requests import get

BASE_URL = "https://open.api.nexon.com/maplestory/v1/"


def get_ocid_by_api(api, userName):
    headers = {
        "Content-Type": "application/json",
        "x-nxopen-api-key": api,
    }
    data = {"character_name": userName}

    response = get(BASE_URL + "id", data, headers=headers)

    try:
        return response.json()
    except:
        return {"Error": "Issue with request"}


def excute_maplestory_api(api, ocid, date, endpoint):
    headers = {
        "Content-Type": "application/json",
        "x-nxopen-api-key": api,
    }
    data = {"ocid": ocid, "date": date}

    response = get(BASE_URL + endpoint, data, headers=headers)

    try:
        return response.json()
    except:
        return {"Error": "Issue with request"}
