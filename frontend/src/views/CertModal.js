import React, { useState } from "react";
import { Modal, Typography, Box, Button, TextField } from "@mui/material";
import config from "../utils/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300, // 너비
  height: 200,
  bgcolor: "background.paper", // 배경색
  boxShadow: 24, // 그림자
  p: 4, // 패딩 (spacing 단위)
  borderRadius: 2, // 모서리 둥글기
  display: "flex", // Flexbox 레이아웃 사용
  flexDirection: "column", // 버튼들을 세로로 정렬
  alignItems: "center", // 수평 방향 중앙 정렬
  justifyContent: "center", // 수직 방향 중앙 정렬
};

function CertModal({ open, onClose }) {
  const [result, setResult] = useState("");
  const [certKey, setCertKey] = useState("");
  const handleCertKey = (e) => setCertKey(e.target.value);

  const isValidFormat = (input) => {
    const pattern = /^\d{4}-\d{4}-\d{4}$/;
    return pattern.test(input);
  };

  const handleSearch = () => {
    if (!isValidFormat(certKey)) {
      setResult("유효하지 않은 입력 값입니다");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ certKey: certKey }),
    };
    fetch(`${config.apiUrl}/api/search-cert`, requestOptions).then(
      (response) => {
        if (response.ok) {
          setResult("유효한 인장입니다");
        } else {
          setResult("유효하지 않은 인장입니다");
        }
      }
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" component="h5">
          인장 조회
        </Typography>
        <TextField
          margin="normal"
          label="Cert Key"
          value={certKey}
          onChange={handleCertKey}
          placeholder="0000-0000-0000"
          variant="outlined"
        ></TextField>
        <div>
          <Typography variant="h6" component="h6" align="center">
            {result ? result : "\u00A0"}
          </Typography>
        </div>
        <div className="modal_button_group">
          <Button color="primary" variant="contained" onClick={handleSearch}>
            조회
          </Button>
          <Button color="primary" variant="outlined" onClick={onClose}>
            닫기
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default CertModal;
