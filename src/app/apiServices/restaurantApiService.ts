import assert from "assert";
import { serviceApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import axios from "axios";
import { Restaurant } from "../../types/user";

export default class RestaurantApiService {
  private readonly path: string;
  constructor() {
    this.path = serviceApi;
  }

  async getTopRestaurants() {
    try {
      const url = "/restaurants?order=top&page=1&limit=4",
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);

      console.log("state", result.data.data);
      const top_restaurants: Restaurant[] = result.data.data;
      return top_restaurants;
    } catch (err: any) {
      console.log(`ERROR ::: getTopRestaurants ${err.message}`);

      throw err;
    }
  }
}
