import React from "react";
import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);

const restaurants_list = Array.from(Array(10).keys());
const dishes_list = Array.from(Array(8).keys());
const comments_list = Array.from(Array(4).keys());

export default function OneRestaurant() {
  return (
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="top_text">
            <p>Texas De Brazil Restaurant</p>
            <Box className="search_big_box">
              <form action="" className="search_form">
                <input
                  type="serch"
                  className="searchInput"
                  name="resSearch"
                  placeholder="Qidiruv"
                />
                <Button
                  className="button_search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                >
                  Izlash
                </Button>
              </form>
            </Box>
          </Box>
          <Stack className="avatar_big_box">
            <Box className="prev_btn restaurant_prev">
              <ArrowBackIosNewIcon />
            </Box>
            <Swiper
              className="avatars_wrapper"
              slidesPerView={8}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                prevEl: ".restaurant_prev",
                nextEl: ".restaurant_next",
              }}
            >
              {restaurants_list.map((vl, order) => {
                return (
                  <SwiperSlide className="restaurant_avatars" key={order}>
                    <img src="/restaurant/avatar1.png" alt="" />
                    <span>O'zbegim</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box className="next_btn restaurant_next">
              <ArrowForwardIosNewIcon />
            </Box>
          </Stack>
          <Stack className="dish_filter_main">
            <Button variant="contained" color="secondary">
              new
            </Button>
            <Button variant="contained" color="secondary">
              price
            </Button>
            <Button variant="contained" color="secondary">
              likes
            </Button>
            <Button variant="contained" color="secondary">
              views
            </Button>
          </Stack>
          <Stack className="dish_category_main">
            <div className="dish_category_box">
              <Button variant="contained" color="secondary">
                boshqa
              </Button>
              <Button variant="contained" color="secondary">
                desert
              </Button>
              <Button variant="contained" color="secondary">
                ichimlik
              </Button>
              <Button variant="contained" color="secondary">
                salad
              </Button>
              <Button variant="contained" color="secondary">
                ovqatlar
              </Button>
            </div>
            <Stack className="dish_wrapper">
              {dishes_list.map((vl, order) => {
                return (
                  <Box key={order} className="dish_card">
                    <Box className="dish_img">
                      <div className="dish_sale">normal size</div>
                      <Button className="like_view_btn" sx={{ left: "36px" }}>
                        <Badge badgeContent={8} color="primary">
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={`${order}`}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            checked={true}
                          />
                        </Badge>
                      </Button>
                      <Button className="view_btn">
                        <img src="/icons/shopping_cart.svg" alt="" />
                      </Button>
                      <Button className="like_view_btn" sx={{ right: "36px" }}>
                        <Badge badgeContent={1000} color="primary">
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>
                    <Box className="dish_info">
                      <span className="dish_title_text">Vegeterian soup</span>
                      <div className="dish_price">
                        <MonetizationOnIcon />8
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <div className="review_for_restaurant">
        <Container className="review_container">
          <Box className="category_title">Oshxona haqidagi fikrlar</Box>
          <Stack className="review_sec">
            {comments_list.map((vl, index) => {
              return (
                <Box className="review_box" key={index}>
                  <Box className="review_img">
                    <img src="/restaurant/user.png" alt="" />
                  </Box>
                  <span className="review_name">Rayhon Asadova</span>
                  <span className="review_prof">Foydalanuvchi</span>
                  <p className="review_desc">
                    Menga bu oshxona taomi juda yoqdi. Hammaga tavsiya
                    qilaman!!!
                  </p>
                  <Box className="review_stars">
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Container>
      </div>
      <Container className="member_reviews">
        <Box className="category_title">Oshxona haqida</Box>
        <Stack className="member_sec">
          <Box className="about_left">
            <div className="about_left_desc">
              <span className="name">Rayhon</span>
              <p className="desc">
                Biz sizlarga xizmat ko’rsatayotganimizdan bag’oyatda xursadmiz.
                Bizning xaqimizda: O’z faoliyatimizni 1945 - yilda boshlaganmiz
                vaxokazo vaxokazo vaxokazo...
              </p>
            </div>
          </Box>
          <Box className="about_right">
            {Array.from(Array(3).keys()).map((vl, index) => {
              return (
                <Box className="right_members" key={index}>
                  <div className="right_img"> </div>
                  <div className="right_desc">
                    <span>Bizning mohir oshpazlarimiz</span>
                    <p>
                      Bizning oshpazlarimiz dunyoga mashxur olihgohlarda tahsil
                      olib kelishgan
                    </p>
                  </div>
                </Box>
              );
            })}
          </Box>
        </Stack>
        <Stack className="last_section">
          <Box className="category_title">Oshxona Manzili</Box>
          <iframe
            src="https://m.place.naver.com/restaurant/1778015906/location?level=bottom&subtab=location&selected_place_id=1778015906"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
