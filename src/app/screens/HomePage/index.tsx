import React, { useEffect } from "react";
import Statistics from "./statistics";
import TopRestaurants from "./topRestaurants";
import BestDishes from "./bestDishes";
import Advertisements from "./advertisements";
import BestRestaurants from "./bestRestaurants";
import Events from "./events";
import Recommendations from "./recomendations";
import "../../../css/home.css";
import { Dispatch } from "@reduxjs/toolkit";
import { setTopRestaurants } from "./slice";
import { Restaurant } from "../../../types/user";
import { useDispatch } from "react-redux";
import RestaurantApiService from "../../apiServices/restaurantApiService";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
});
// redux slector

export function HomePage() {
  const { setTopRestaurants } = actionDispatch(useDispatch());

  //selector: store => store
  useEffect(() => {
    // backend data request =>
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getTopRestaurants()
      .then((data) => {
        setTopRestaurants(data);
      })
      .catch((err) => console.log(err));
    setTopRestaurants([]);
    // slice data => store
    return;
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants />
      <BestRestaurants />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
