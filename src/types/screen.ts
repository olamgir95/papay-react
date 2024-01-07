import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Restaurant } from "./user";

//React app state
export interface AppRootState {
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
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

//Orders page

export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

//Community page
export interface CommunityPageState {
  targetBoArticles: BoArticle[];
}

//Member page
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}
