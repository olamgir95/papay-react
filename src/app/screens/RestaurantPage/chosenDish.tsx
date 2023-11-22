import {
  Box,
  Card,
  Checkbox,
  Container,
  Rating,
  Stack,
  Button,
} from "@mui/material";
import React, { useState } from "react";
// import Typography from "@mui/joy/Typography";
// import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// import CallIcon from "@mui/icons-material/Call";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import SearchIcon from "@mui/icons-material/Search";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import { CssVarsProvider } from "@mui/joy/styles";
// import { AspectRatio, CardOverflow, IconButton, Link } from "@mui/joy";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";

const chosen_list = Array.from(Array(3).keys());

export default function ChosenDish() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [value, setValue] = useState<number | null>(2);

  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className="chosen_dish_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosen_list.map((vl, order) => {
              return (
                <SwiperSlide key={order}>
                  <img src="/restaurant/gosht.png" alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* <Swiper
            className="dish_swiper"
            spaceBetween={10}
            navigation={true}
            loop={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosen_list.map((vl, order) => {
              return (
                <SwiperSlide key={order}>
                  <img src="/restaurant/gosht2.png" alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper> */}
        </Stack>
        <Stack className="chosen_dish_info_container">
          <Card className="chosen_dish_info_card">
            <strong className="dish_txt">Qovurilgan Go'sht</strong>
            <span className="resto_name">Texas De Brazil</span>
            <Box className="rating_box">
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <Box className="evalution_box">
                <p className="evaluation_text">
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={false}
                  />
                  <span>98 ta</span>
                </p>
                <Box className="eye">
                  <RemoveRedEyeIcon />
                  <span>1000 ta</span>
                </Box>
              </Box>
              <p className="dish_desc_info">
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
              </p>
              <Marginer
                direction="horizontal"
                height="1"
                width="100%"
                bg="#000000"
              />
              <Box className="dish_price_box">
                <span>Narx:</span>
                <span>$11</span>
              </Box>
              <Box className="button_box">
                <Button variant="contained">Savatga qo'shish</Button>
              </Box>
            </Box>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
