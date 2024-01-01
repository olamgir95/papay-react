import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import { CartItem } from "../../types/others";
import { Order } from "../../types/order";

export default class OrderApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async createOrder(data: CartItem[]): Promise<CartItem> {
    try {
      const url = "/orders/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const order: CartItem = result.data.data;
      return order;
    } catch (err: any) {
      console.log(`ERROR ::: createOrder ${err.message}`);

      throw err;
    }
  }
}
