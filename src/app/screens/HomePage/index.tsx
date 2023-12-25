import React, { useEffect } from "react";
import Statistics from "./statistics";
import Advertisements from "./advertisements";
import Events from "./events";
import Recommendations from "./recomendations";
import "../../../css/home.css";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import {
  setBestRestaurants,
  setTopRestaurants,
  setTrendProducts,
} from "./slice";
import { Restaurant } from "../../../types/user";
import { useDispatch, useSelector } from "react-redux";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import {
  retrieveBestRestaurants,
  retrieveTopRestaurants,
  retrieveTrendProducts,
} from "./selector";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import ProductApiService from "../../apiServices/productApiService";
import { BestDishes } from "./bestDishes";
import { Product } from "./../../../types/product";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
  setBestRestaurants: (data: Restaurant[]) =>
    dispatch(setBestRestaurants(data)),
  setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
});

//redux selector
const RestaurantsRetriever = createSelector(
  retrieveTopRestaurants,
  retrieveBestRestaurants,
  retrieveTrendProducts,
  (topRestaurants, bestRestaurants, trendProducts) => ({
    topRestaurants,
    bestRestaurants,
    trendProducts,
  })
);

export function HomePage() {
  const { setTopRestaurants, setBestRestaurants, setTrendProducts } =
    actionDispatch(useDispatch());

  const { topRestaurants, bestRestaurants, trendProducts } =
    useSelector(RestaurantsRetriever);
  //selector: store => store
  useEffect(() => {
    // backend data request =>
    const restaurantService = new RestaurantApiService();
    const productService = new ProductApiService();
    restaurantService
      .getTopRestaurants()
      .then((data) => {
        setTopRestaurants(data);
      })
      .catch((err) => console.log(err));
    restaurantService
      .getRestaurants({ page: 1, limit: 4, order: "mb_point" })
      .then((data) => {
        console.log("data", data);

        setBestRestaurants(data);
      })
      .catch((err) => console.log(err));

    productService
      .getTargetProducts({
        order: "product_likes",
        limit: 4,
        page: 1,
      })
      .then((data) => {
        console.log("data", data);

        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants topRestaurants={topRestaurants} />
      <BestRestaurants bestRestaurants={bestRestaurants} />
      <BestDishes trendProducts={trendProducts} />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
