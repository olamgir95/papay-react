import React from "react";
import Statistics from "./statistics";
import TopRestaurants from "./topRestaurants";
import BestDishes from "./bestDishes";
import Advertisements from "./advertisements";
import BestRestaurants from "./bestRestaurants";
import Events from "./events";
import Recommendations from "./recomendations";
import "../../../css/home.css";
export function HomePage() {
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
