import { createSlice } from "@reduxjs/toolkit";
import { RestaurantPageState } from "../../../types/screen";

const initialState: RestaurantPageState = {
  targetRestaurants: [],
  rendomRestaurants: [],
  chosenRestaurant: null,
  targetProducts: [],
  chosenProduct: null,
};

const RestaurantPageSlice = createSlice({
  name: "restaurantPage",
  initialState,
  reducers: {
    setTargetRestaurants: (state, action) => {
      state.targetRestaurants = action.payload;
      console.log("action", action);
    },

    setRendomRestaurants: (state, action) => {
      state.rendomRestaurants = action.payload;
    },
    setChosenRestaurant: (state, action) => {
      state.chosenRestaurant = action.payload;
    },
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const {
  setTargetRestaurants,
  setRendomRestaurants,
  setChosenProduct,
  setTargetProducts,
  setChosenRestaurant,
} = RestaurantPageSlice.actions;

export const RestaurantPageReducer = RestaurantPageSlice.reducer;
