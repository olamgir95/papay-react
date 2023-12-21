import React, { useEffect } from "react";
import Statistics from "./statistics";
import TopRestaurants from "./topRestaurants";
import BestDishes from "./bestDishes";
import Advertisements from "./advertisements";
import BestRestaurants from "./bestRestaurants";
import Events from "./events";
import Recommendations from "./recomendations";
import "../../../css/home.css";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setTopRestaurants } from "./slice";
import { Restaurant } from "../../../types/user";
import { retrieveTopRestaurants } from "./selector";
import { useDispatch, useSelector } from "react-redux";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
});
// redux slector
const TopRestaurantsRetriever = createSelector(
  retrieveTopRestaurants,
  (topRestaurants) => ({
    topRestaurants,
  })
);
export function HomePage() {
  const { setTopRestaurants } = actionDispatch(useDispatch());
  const { topRestaurants } = useSelector(TopRestaurantsRetriever);
  console.log("topres", topRestaurants);

  //selector: store => store
  useEffect(() => {
    // backend data request =>

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
