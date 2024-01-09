import { Box, Container, Rating, Stack, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Favorite } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import { useParams } from "react-router-dom";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Restaurant } from "../../../types/user";
import { retrieveChosenProduct, retrieveChosenRestaurant } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "./../../apiServices/restaurantApiService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper";
import { setChosenProduct, setChosenRestaurant } from "./slice";
import { serverApi } from "../../../lib/config";
import "../../../css/restaurant.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifyMemberData } from "../../apiServices/verify";

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

//redux selector
const ChosenProductRetriever = createSelector(
  retrieveChosenRestaurant,
  retrieveChosenProduct,
  (chosenRestaurant, chosenProduct) => ({
    chosenRestaurant,
    chosenProduct,
  })
);

export default function ChosenDish(props: any) {
  let { dish_id } = useParams<{ dish_id: string }>();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const { setChosenProduct, setChosenRestaurant } = actionDispatch(
    useDispatch()
  );
  const { chosenProduct, chosenRestaurant } = useSelector(
    ChosenProductRetriever
  );

  const dishRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenDish(dish_id);
      setChosenProduct(product);
      const restaurantService = new RestaurantApiService();
      const restaurant = await restaurantService.getChosenRestaurant(
        product.restaurant_mb_id
      );
      setChosenRestaurant(restaurant);
    } catch (err: any) {
      console.log(`ERROR ::: dishRelatedProcess, ${err.message}`);
    }
  };

  useEffect(() => {
    dishRelatedProcess().then();
  }, [productRebuild]);

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProductTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

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
            {chosenProduct?.product_images.map((vl, index) => {
              return (
                <SwiperSlide className="dish_swiper_slides" key={index}>
                  <img src={`${serverApi}/${vl}`} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            className="dish_swiper2"
            slidesPerView={3}
            spaceBetween={10}
            centeredSlides={false}
            loop={true}
          >
            {chosenProduct?.product_images.map((vl, index) => {
              return (
                <SwiperSlide
                  style={{ width: "157px", marginRight: 10 }}
                  className="dish_swiper_slides"
                  key={index}
                >
                  <img
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      backgroundSize: "cover",
                    }}
                    src={`${serverApi}/${vl}`}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className="chosen_dish_info_container">
          <Stack className="chosen_dish_info_card">
            <strong className="dish_txt">{chosenProduct?.product_name}</strong>
            <span className="resto_name">{chosenRestaurant?.mb_nick}</span>
            <Box className="rating_box">
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <Box className="evalution_box">
                <p className="evaluation_text">
                  <Checkbox
                    {...label}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ fill: "red" }} />}
                    checked={!!chosenProduct?.me_liked[0]?.my_favorite}
                  />
                  <span>{chosenProduct?.product_likes} ta</span>
                </p>
                <Box className="eye">
                  <RemoveRedEyeIcon />
                  <span>{chosenProduct?.product_views} ta</span>
                </Box>
              </Box>
            </Box>
            <p className="dish_desc_info">
              {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description"}
            </p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <Box className="dish_price_box">
              <span>Narx:</span>
              <span>${chosenProduct?.product_price}</span>
            </Box>
            <Box className="button_box">
              <Button
                onClick={(e) => props.onAdd(chosenProduct)}
                variant="contained"
              >
                Savatga qo'shish
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
