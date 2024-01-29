import React from "react";
import { Box, Typography, Divider } from "@mui/material";

function Guide() {
  return (
    <Box
      sx={{
        padding: "20px",
        margin: "20px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        사용법
      </Typography>
      <Divider style={{ marginBottom: "20px" }} />
      <Typography gutterBottom>
        1.{" "}
        <a
          href="https://openapi.nexon.com/my-application/"
          target="_blank"
          rel="noopener noreferrer"
        >
          홈페이지
        </a>
        에서 로그인
      </Typography>
      <Typography>
        {" "}
        &emsp;애플리케이션 → 애플리케이션 등록
        <br />
        &emsp;게임 선택: 메이플스토리
        <br />
        &emsp;API Key 타입: 서비스 단계
        <br />
        &emsp;서비스명: 메이플 인장 생성기
        <br />
        &emsp;개발환경: WEB
        <br />
        &emsp;URL: example.com
        <br />
        &emsp;소개: ex)메이플 인장 생성기
      </Typography>
      <Typography>
        &emsp;생성 완료 후 애플리케이션 목록에서 메이플 인장 생성기
      </Typography>
      <Typography gutterBottom>
        &emsp;&emsp;→API Key 복사하여 상단에 붙여넣기
      </Typography>

      <Typography gutterBottom>2. 캐릭터의 닉네임 입력</Typography>
      <Typography gutterBottom>
        3. 원하는 키워드를 입력 ex)인벤 닉네임 (최대 8자).
      </Typography>
      <Typography gutterBottom>
        4. '생성' 버튼을 클릭하여 인장을 생성 완료
        <br />
        &emsp;우클릭 → 이미지 저장
      </Typography>
      <Divider style={{ margin: "20px" }} />

      <Typography style={{ color: "red" }}>
        &#8251; 기존에 생성된 인장이 있는 경우 새로 생성할 때 기존 인장의 효력은
        삭제됩니다.
      </Typography>
      <Typography style={{ color: "red" }}>
        &#8251; API 특성상 어제를 기준으로 정보를 불러오기 때문에 반영이 바로
        되지 않을 수<br /> 있습니다.
      </Typography>
    </Box>
  );
}

export default Guide;
