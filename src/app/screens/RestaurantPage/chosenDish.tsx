import { Box, Card, Checkbox, Container, Rating, Stack } from "@mui/material";
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
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);

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
            spaceBetween={10}
            // slidesPerView={1}
            navigation={true}
            // centeredSlides={false}
            loop={true}
            // modules={[FreeMode, Navigation, Thumbs]}
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
              <Box className="review_stars">
                <Rating
                  name="simple-controlled"
                  value={value}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <Box className="evalution_box">
                <p className="evaluation_text">
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={false}
                  />
                </p>
              </Box>
            </Box>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
