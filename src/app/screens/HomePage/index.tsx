import React, { useEffect } from "react";
import Statistics from "./statistics";
import BestDishes from "./bestDishes";
import Advertisements from "./advertisements";
import Events from "./events";
import Recommendations from "./recomendations";
import "../../../css/home.css";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setBestRestaurants, setTopRestaurants } from "./slice";
import { Restaurant } from "../../../types/user";
import { useDispatch, useSelector } from "react-redux";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { retrieveBestRestaurants, retrieveTopRestaurants } from "./selector";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
  setBestRestaurants: (data: Restaurant[]) =>
    dispatch(setBestRestaurants(data)),
});

//redux selector
const RestaurantsRetriever = createSelector(
  retrieveTopRestaurants,
  retrieveBestRestaurants,
  (topRestaurants, bestRestaurants) => ({
    topRestaurants,
    bestRestaurants,
  })
);

export function HomePage() {
  const { setTopRestaurants, setBestRestaurants } = actionDispatch(
    useDispatch()
  );
  const { topRestaurants } = useSelector(RestaurantsRetriever);
  const { bestRestaurants } = useSelector(RestaurantsRetriever);
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
    restaurantService
      .getRestaurants({ page: 1, limit: 4, order: "mb_point" })
      .then((data) => {
        console.log("data", data);

        setBestRestaurants(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants topRestaurants={topRestaurants} />
      <BestRestaurants bestRestaurants={bestRestaurants} />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
