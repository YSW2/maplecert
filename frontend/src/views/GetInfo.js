import React, { useState } from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";

import Stamp from "./Stamp";
import Guide from "./Guide";
import hexa_data from "../utils/data";
import config from "../utils/config";

function GetInfo() {
  const [userApi, setUserApi] = useState("");
  const [userName, setUserName] = useState("");
  const [userMark, setUserMark] = useState("");
  const [userData, setUserData] = useState({});
  const [stateMessage, setStateMessage] = useState("");

  const allFieldsFilled = userApi !== "" && userName !== "" && userMark !== "";

  const handleChangeApi = (e) => {
    setUserApi(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangeUserMark = (e) => {
    setUserMark(e.target.value);
  };

  const cuttingData = (data) => {
    data.character_level = data.character_level - (data.character_level % 5);
    data.union_level = data.union_level - (data.union_level % 100);
    data.popularity = data.popularity - (data.popularity % 10);
    if (data.stat >= 100000000) {
      data.stat = data.stat - (data.stat % 5000000);
    } else {
      data.stat = data.stat - (data.stat % 1000000);
    }
    data.stat /= 10000;
    data.hexa_core = getHexaCount(data.hexa_core);

    return data;
  };
  const getHexaCount = (hexa_core) => {
    let total_sol = 0;
    let total_sol_frag = 0;

    if (hexa_core == null) return [0, 0];
    for (const hexa_info of hexa_core) {
      // eslint-disable-next-line
      switch (hexa_info.hexa_core_type) {
        case "스킬 코어":
          total_sol += hexa_data.origin_core_sol[hexa_info.hexa_core_level - 1];
          total_sol_frag +=
            hexa_data.origin_core_sol_frag[hexa_info.hexa_core_level - 1];
          break;
        case "마스터리 코어":
          total_sol +=
            hexa_data.mastery_core_sol[hexa_info.hexa_core_level - 1];
          total_sol_frag +=
            hexa_data.mastery_core_sol_frag[hexa_info.hexa_core_level - 1];
          break;
        case "강화 코어":
          total_sol += hexa_data.v_core_sol[hexa_info.hexa_core_level - 1];
          total_sol_frag +=
            hexa_data.v_core_sol_frag[hexa_info.hexa_core_level - 1];
          break;
        case "공용 코어":
          total_sol += hexa_data.public_core_sol[hexa_info.hexa_core_level - 1];
          total_sol_frag +=
            hexa_data.public_core_sol_frag[hexa_info.hexa_core_level - 1];
          break;
      }
    }
    total_sol -= 5; //기본으로 주는 오리진 1렙만큼 차감
    total_sol_frag -= 100;

    total_sol -= total_sol % 10;
    total_sol_frag -= total_sol_frag % 50;

    return [total_sol, total_sol_frag];
  };

  const fetchOcid = async (userApi, userName) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api: userApi, userName: userName }),
    };
    const response = await fetch(
      `${config.apiUrl}/api/get-ocid`,
      requestOptions
    );
    if (response.status === 409) {
      const proceed = window.confirm(
        "발급 내역이 존재합니다. 새로 만드시겠습니까? 기존 인장의 CertKey는 삭제됩니다."
      );
      if (!proceed) {
        // 사용자가 진행하지 않기를 원할 경우
        setStateMessage("작업이 중단되었습니다.");
        throw new Error("사용자에 의해 작업이 중단되었습니다.");
      }
    } else if (!response.ok) {
      setStateMessage("유효하지 않은 입력입니다.");
      throw new Error("유효하지 않은 입력입니다.");
    }
    return await response.json();
  };

  const fetchUserInfo = async (userApi, ocid) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api: userApi, ocid: ocid }),
    };
    const response = await fetch(
      `${config.apiUrl}/api/get-info`,
      requestOptions
    );
    return await response.json();
  };

  const handleSubmitApi = () => {
    if (userMark.length >= 9) {
      setStateMessage("키워드는 최대 8자 까지 입력 가능합니다.");
      return;
    }
    setStateMessage("유저 식별자 조회 중..");
    fetchOcid(userApi, userName)
      .then((data) => {
        setStateMessage("유저 정보 조회 중..");
        return fetchUserInfo(userApi, data.ocid);
      })
      .then((data) => {
        data.userMark = userMark;
        data = cuttingData(data);
        setUserData(data);
        setStateMessage("조회 완료!");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      style={{ gap: "20px" }}
    >
      <Grid item className="getInfo-Grid" align="center">
        <Typography variant="h5" component="h5">
          메이플 인장 생성기
        </Typography>
        <TextField
          label="API"
          name="api"
          variant="outlined"
          value={userApi}
          onChange={handleChangeApi}
          margin="normal"
          style={{ width: "90%" }}
        />
        <TextField
          label="닉네임"
          name="nickname"
          variant="outlined"
          value={userName}
          onChange={handleChangeUserName}
          margin="normal"
          style={{ width: "42.5%", marginRight: "2.5%" }}
        />
        <TextField
          label="키워드"
          name="keyword"
          variant="outlined"
          value={userMark}
          onChange={handleChangeUserMark}
          margin="normal"
          style={{ width: "42.5%", marginLeft: "2.5%" }}
        />
        <Typography variant="h6" component="h6">
          {stateMessage}
        </Typography>
        <Button
          disabled={!allFieldsFilled}
          variant="contained"
          color="primary"
          onClick={handleSubmitApi}
        >
          생성
        </Button>
      </Grid>
      <Stamp {...userData} />
      <Guide />
    </Grid>
  );
}
export default GetInfo;
