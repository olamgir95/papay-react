import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Member, MemberUpdateData } from "../../types/user";
import { MemberLiken } from "../../types/others";

export default class MemberApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async loginRequest(login_data: any): Promise<Member> {
    try {
      const result = await axios.post(this.path + "/login", login_data, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state", result.data.state);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR ::: loginRequest ${err.message}`);

      throw err;
    }
  }

  async signupRequest(signup_data: any): Promise<Member> {
    try {
      const result = await axios.post(this.path + "/signup", signup_data, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const member: Member = result.data.data;

      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR ::: signupRequest ${err.message}`);
      throw err;
    }
  }

  async logOutRequest(): Promise<Boolean> {
    try {
      const result = await axios.get(this.path + "/logout", {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);

      const logout_result = result.data.state;
      localStorage.removeItem("member_data");

      return logout_result === "success";
    } catch (err: any) {
      console.log(`ERROR ::: logOutRequest ${err.message}`);
      throw err;
    }
  }

  async memberLikeTarget(data: any): Promise<MemberLiken> {
    try {
      const result = await axios.post(this.path + "/member-liken", data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const like_result: MemberLiken = result.data.data;
      console.log("like", like_result);

      return like_result;
    } catch (err: any) {
      console.log(`ERROR ::: memberLikeTarget ${err.message}`);
      throw err;
    }
  }

  async getChosenMember(id: string): Promise<Member> {
    try {
      const url = `/member/${id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const member: Member = result.data.data;

      return member;
    } catch (err: any) {
      console.log(`ERROR ::: memberLikeTarget ${err.message}`);
      throw err;
    }
  }

  async updateMemberData(data: MemberUpdateData): Promise<Member> {
    try {
      let formData = new FormData();
      formData.append("mb_image", data?.mb_image || "");
      formData.append("mb_phone", data?.mb_phone || "");
      formData.append("mb_address", data?.mb_address || "");
      formData.append("mb_description", data?.mb_description || "");
      formData.append("mb_nick", data?.mb_nick || "");
      console.log(formData);
      const result = await axios(`${this.path}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res", result);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const member: Member = result.data.data;
      console.log("member", member);

      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR ::: updateMemberData ${err.message}`);
      throw err;
    }
  }
}
