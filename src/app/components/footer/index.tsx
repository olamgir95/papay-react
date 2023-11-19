import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack className="main_footer_container">
          <Stack flexDirection={"row"} sx={{ height: "242px" }}>
            <Stack className="info">
              <Box>
                <img src="/footer/papays.svg" alt="" />
              </Box>
              <Box className="main_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis unde omnis iste
              </Box>
              <Stack className="contact_links">
                <Link to={""}>
                  <img src="/footer/facebook.svg" alt="" />
                </Link>
                <Link to={""}>
                  <img src="/footer/twitter.svg" alt="" />
                </Link>
                <Link to={""}>
                  <img src="/footer/instagram.svg" alt="" />
                </Link>
                <Link to={""}>
                  <img src="/footer/youtube.svg" alt="" />
                </Link>
              </Stack>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Bo'limlar</Box>
              <Box className="divider"></Box>
              <Box className="targets">
                Bosh Sahifa Oshxonalar Jamiyat Yordam
              </Box>
            </Stack>
            <Stack className="find_us">
              <Box className="find">Bizni top</Box>
              <Box className="divider"></Box>
              <Stack className="details">
                <Box className="details_item">L.</Box>
                <Box className="details_item_2">Uzbekistan.</Box>
              </Stack>
              <Stack className="details">
                <Box className="details_item">P.</Box>
                <Box className="details_item_2">+998 - 99 266 25 62</Box>
              </Stack>
              <Stack className="details">
                <Box className="details_item">E.</Box>
                <Box className="details_item_2">Papays@restaurant.com</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box className="liner" sx={{ mt: "86px" }}></Box>
          <Box className="copyrights">
            Copyright Papays 2022, All right reserved.
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
