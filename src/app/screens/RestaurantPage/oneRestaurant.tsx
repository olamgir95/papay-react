import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
  Rating,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import SwiperCore, { Navigation } from "swiper";
import { useHistory, useParams } from "react-router-dom";
import {
  setChosenRestaurant,
  setRendomRestaurants,
  setTargetProducts,
} from "./slice";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import {
  retrieveChosenRestaurant,
  retrieveRendomRestaurants,
  retrieveTargetProducts,
} from "./selector";
import { Restaurant } from "../../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { ProductSearchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
SwiperCore.use([Navigation]);

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setRendomRestaurants: (data: Restaurant[]) =>
    dispatch(setRendomRestaurants(data)),
  setChosenRestaurant: (data: Restaurant[]) =>
    dispatch(setChosenRestaurant(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

//redux selector
const targetRestaurantsRetriever = createSelector(
  retrieveRendomRestaurants,
  retrieveChosenRestaurant,
  retrieveTargetProducts,
  (rendomRestaurants, chosenRestaurant, targetProducts) => ({
    rendomRestaurants,
    chosenRestaurant,
    targetProducts,
  })
);

export default function OneRestaurant() {
  const history = useHistory();
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  let { restaurant_id } = useParams<{ restaurant_id: string }>();
  const [chosenRestaurantId, setChosenRestaurantId] = useState<{
    restaurant_id: string;
  }>();
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "createdAt",
      restaurant_mb_id: restaurant_id,
      product_collection: "dish",
    });

  const { setRendomRestaurants, setTargetProducts, setChosenRestaurant } =
    actionDispatch(useDispatch());
  const { rendomRestaurants, targetProducts, chosenRestaurant } = useSelector(
    targetRestaurantsRetriever
  );

  useEffect(() => {
    const productService = new ProductApiService();
    const restaurantService = new RestaurantApiService();

    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));

    restaurantService
      .getRestaurants({ page: 1, limit: 10, order: "random" })
      .then((data) => {
        console.log("data", data);

        setRendomRestaurants(data);
      })
      .catch((err) => console.log(err));
  }, [targetProductSearchObj, productRebuild]);

  const chosenRestaurantHandler = (id: string) => {
    setChosenRestaurantId({ restaurant_id: id });
    targetProductSearchObj.restaurant_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/restaurants/${id}`);
  };

  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  const searchorderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
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
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="top_text">
            <p>Rayhon Restaurant</p>
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
              {rendomRestaurants.map((vl: Restaurant) => {
                const imag_path = `${serverApi}/${vl.mb_image}`;

                return (
                  <SwiperSlide
                    onClick={() => chosenRestaurantHandler(vl._id)}
                    className="restaurant_avatars"
                    key={vl._id}
                  >
                    <img src={imag_path} alt="" />
                    <span>{vl.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box className="next_btn restaurant_next">
              <ArrowForwardIosNewIcon />
            </Box>
          </Stack>
          <Stack className="dish_filter_main">
            <Button
              onClick={() => searchorderHandler("createdAt")}
              variant="contained"
              color="secondary"
            >
              new
            </Button>
            <Button
              onClick={() => searchorderHandler("product_price")}
              variant="contained"
              color="secondary"
            >
              price
            </Button>
            <Button
              onClick={() => searchorderHandler("product_likes")}
              variant="contained"
              color="secondary"
            >
              likes
            </Button>
            <Button
              onClick={() => searchorderHandler("product_views")}
              variant="contained"
              color="secondary"
            >
              views
            </Button>
          </Stack>
          <Stack className="dish_category_main">
            <div className="dish_category_box">
              <Button
                onClick={() => searchCollectionHandler("etc")}
                variant="contained"
                color="secondary"
              >
                boshqa
              </Button>
              <Button
                onClick={() => searchCollectionHandler("desert")}
                variant="contained"
                color="secondary"
              >
                desert
              </Button>
              <Button
                onClick={() => searchCollectionHandler("drink")}
                variant="contained"
                color="secondary"
              >
                drink
              </Button>
              <Button
                onClick={() => searchCollectionHandler("salad")}
                variant="contained"
                color="secondary"
              >
                salad
              </Button>
              <Button
                onClick={() => searchCollectionHandler("dish")}
                variant="contained"
                color="secondary"
              >
                ovqatlar
              </Button>
            </div>
            <Stack className="dish_wrapper">
              {targetProducts?.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                const size_volume =
                  product.product_collection === "drink"
                    ? product.product_volume + "L"
                    : product.product_size + "size";
                return (
                  <Box key={product._id} className="dish_card">
                    <Box
                      className="dish_img"
                      sx={{ backgroundImage: `url(${image_path})` }}
                    >
                      <div className="dish_sale">{size_volume}</div>
                      <Button className="like_view_btn" sx={{ left: "36px" }}>
                        <Badge
                          badgeContent={product.product_likes}
                          color="primary"
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            onClick={targetLikeProduct}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button className="view_btn">
                        <img src="/icons/shopping_cart.svg" alt="" />
                      </Button>
                      <Button className="like_view_btn" sx={{ right: "36px" }}>
                        <Badge
                          badgeContent={product.product_views}
                          color="primary"
                        >
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>
                    <Box className="dish_info">
                      <span className="dish_title_text">
                        {product.product_name}
                      </span>
                      <div className="dish_price">
                        <MonetizationOnIcon /> {product.product_price}
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
            {/* {comments_list.map((vl, index) => {
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
                    <Rating
                      name="simple-controlled"
                      value={value}
                      size="large"
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </Box>
              );
            })} */}
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
            title="your-unique-title"
            src="https://m.place.naver.com/restaurant/1778015906/location?level=bottom&subtab=location&selected_place_id=1778015906"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
