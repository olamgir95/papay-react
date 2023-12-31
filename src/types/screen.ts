import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

//React app state
export interface AppRootState {
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
}

//Home   page
export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}

//Restaurant page
export interface RestaurantPageState {
  targetRestaurants: Restaurant[];
  rendomRestaurants: Restaurant[];
  chosenRestaurant: Restaurant | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}
