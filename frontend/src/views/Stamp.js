import React, { useState, useRef, useEffect } from "react";
import { Grid, Typography, Button, ButtonGroup } from "@mui/material";
import CertModal from "./CertModal";
import getUnionUrl from "../utils/getUnion";

function Stamp({
  character_level = 0,
  stat = 0,
  union_level = 0,
  union_grade = "",
  date = "0000-00-00",
  hexa_core = [0, 0],
  userMark = "example",
  cert_code = "0000-0000-0000",
}) {
  const canvasRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [color, setColor] = useState("orange");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [unionImageLoaded, setUnionImageLoaded] = useState(false);
  const [solImageLoaded, setSolImageLoaded] = useState(false);
  const [solFragImageLoaded, setSolFragImageLoaded] = useState(false);
  const [baseImage, setBaseImage] = useState(null);
  const [unionImage, setUnionImage] = useState(null);
  const [solImage, setSolImage] = useState(null);
  const [solFragImage, setSolFragImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const font = new FontFace(
    "MaplestoryOTFBold",
    "url(https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff)"
  );

  useEffect(() => {
    font
      .load()
      .then(() => setFontLoaded(true))
      .catch((err) => console.error("Font loading failed", err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = `/images/cert_${color}.png`;
    image.onload = () => {
      setBaseImage(image);
      setImageLoaded(true);
    };
  }, [color]);

  useEffect(() => {
    const union_img = new Image();
    union_img.src = `/images/union/${getUnionUrl(union_grade)}`;
    union_img.onload = () => {
      setUnionImage(union_img);
      setUnionImageLoaded(true);
    };
  }, [union_grade]);

  useEffect(() => {
    const sol_img = new Image();
    const sol_frag_img = new Image();
    sol_img.src = "/images/sol.webp";
    sol_frag_img.src = "/images/sol_frag.webp";
    sol_img.onload = () => {
      setSolImage(sol_img);
      setSolImageLoaded(true);
    };
    sol_frag_img.onload = () => {
      setSolFragImage(sol_frag_img);
      setSolFragImageLoaded(true);
    };
    // eslint-disable-next-line
  }, []);

  const drawCanvas = (context) => {
    context.drawImage(baseImage, 0, 0, 600, 180);
    context.drawImage(unionImage, 20, 105, 45, 45);
    context.drawImage(solImage, 170, 110, 35, 35);
    context.drawImage(solFragImage, 290, 109, 37, 37);
    drawText(context);
  };

  const drawText = (context) => {
    context.fillStyle = "black";
    context.font = "38px MaplestoryOTFBold";
    context.fillText(userMark, 20, 45);

    context.font = "17px MaplestoryOTFBold";
    context.fillText("Lv.", 30, 90);
    context.fillText("전투력", 210, 90);

    context.font = "25px MaplestoryOTFBold";
    context.fillText(`${character_level}+`, 70, 90);
    context.fillText(`${union_level}+`, 70, 135);
    if (stat === 0) {
      context.fillText("< 100만", 265, 90);
    } else {
      context.fillText(
        `${
          stat >= 10000
            ? Math.floor(stat / 10000) + "억 " + (stat % 10000) + "만"
            : stat + "만"
        }+`,
        265,
        90
      );
    }

    context.font = "23px MaplestoryOTFBold";
    context.fillText(`${hexa_core[0]}+`, 210, 135);
    context.fillText(`${hexa_core[1]}+`, 330, 135);

    context.font = "13px MaplestoryOTFBold";
    context.fillText(`발급일 ${date}`, 0, 178);
    context.fillText(`CertKey ${cert_code}`, 135, 178);

    if (userMark !== "") {
      // 워터마크 작성
      context.font = "17px MaplestoryOTFBold";
      context.fillStyle = "rgba(0, 0, 0, 0.05)";

      var spacingX = context.measureText(userMark).width; // 워터마크 간격 설정
      var spacingY = 50;

      context.rotate((-45 * Math.PI) / 180);

      for (var x = -300; x <= 500; x += spacingX) {
        for (var y = 0; y <= 600; y += spacingY) {
          context.fillText(`${userMark} `, x, y);
        }
      }
      context.rotate((45 * Math.PI) / 180);
    }
  };

  useEffect(
    () => {
      if (
        canvasRef.current &&
        fontLoaded &&
        imageLoaded &&
        unionImageLoaded &&
        solImageLoaded &&
        solFragImageLoaded
      ) {
        const context = canvasRef.current.getContext("2d");
        drawCanvas(context);
      }
    }, // eslint-disable-next-line
    [
      fontLoaded,
      imageLoaded,
      unionImageLoaded,
      solImageLoaded,
      solFragImageLoaded,
      baseImage,
      unionImage,
      cert_code,
    ]
  );

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{ width: "600px" }}
      >
        <Grid item>
          <Typography variant="h5" component="h5" align="left">
            미리보기
          </Typography>
        </Grid>
        <Grid item>
          <ButtonGroup variant="contained" aria-label="changing color">
            <Button
              onClick={() => setColor("orange")}
              style={{ backgroundColor: "rgb(255, 214, 141)" }}
            >
              &nbsp;
            </Button>
            <Button
              onClick={() => setColor("blue")}
              style={{ backgroundColor: "rgb(189, 235, 255)" }}
            >
              &nbsp;
            </Button>
            <Button
              onClick={() => setColor("pink")}
              style={{ backgroundColor: "rgb(255, 189, 242)" }}
            >
              &nbsp;
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <canvas id="cert_canvas" ref={canvasRef} width={600} height={180} />
      <div />
      <Button onClick={handleOpen} color="primary" variant="contained">
        검증
      </Button>
      <CertModal open={open} onClose={handleClose} />
    </React.Fragment>
  );
}

export default Stamp;
