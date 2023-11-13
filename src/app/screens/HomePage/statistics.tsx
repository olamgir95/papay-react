import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Marginer from "../../components/marginer";

export default function Statistics() {
  return (
    <div className="statistic_frame">
      <Container>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          height={"236px"}
        >
          <Box className="personage_img left">hjy</Box>
          <Stack className="static_box">
            <Box className="static_num">12</Box>
            <Box className="static_text">Restaurants</Box>
          </Stack>
          <Marginer direction="vertical" height="64" width="2" bg="#E3C08D" />
          <Stack className="static_box">
            <Box className="static_num">8</Box>
            <Box className="static_text">Yers Experience</Box>
          </Stack>
          <Marginer direction="vertical" height="64" width="2" bg="#E3C08D" />

          <Stack className="static_box">
            <Box className="static_num">50+</Box>
            <Box className="static_text">Menu Ovqatlar</Box>
          </Stack>
          <Marginer direction="vertical" height="64" width="2" bg="#E3C08D" />

          <Stack className="static_box">
            <Box className="static_num">200+</Box>
            <Box className="static_text">Foydalanuvchilar</Box>
          </Stack>
          <Box className="personage_img right"></Box>
        </Stack>
      </Container>
    </div>
  );
}
