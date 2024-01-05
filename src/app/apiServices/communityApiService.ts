import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import { BoArticle, SearchArticlesObj } from "../../types/boArticle";

export default class CommunityApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getTargetArticles(data: SearchArticlesObj): Promise<BoArticle[]> {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR ::: createCommunity ${err.message}`);
      throw err;
    }
  }
}
