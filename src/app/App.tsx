import React, { MouseEvent, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantPage } from "./screens/RestaurantPage";
import { OrdersPage } from "./screens/OrdersPage";
import { CommunityPage } from "./screens/CommunityPage";
import { LoginPage } from "./screens/LoginPage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HeplPage";
import { HomePage } from "./screens/HomePage";
import { serverApi } from "../lib/config";
import { Member } from "../types/user";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../lib/sweetAlert";
import { Definer } from "../lib/Definer";
import NavbarHome from "./components/header";
import NavbarRestaurant from "./components/header/restaurant";
import NavbarOthers from "./components/header/others";
import Footer from "./components/footer";
import AuthenticationModal from "./components/auth/index";
import assert from "assert";
import MemberApiService from "./apiServices/memberApiService";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/home.css";
import "../css/order.css";
import "../css/community.css";
import "../css/restaurant.css";
import "../css/member.css";
import "../css/help.css";

function App() {
  //INITIALIZATION
  const [verifedMemberData, setVerifedMemberData] = useState<Member | null>(
    null
  );
  const [path, setPath] = useState();
  const main_path = window.location.pathname;

  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const memberDataJson: any = localStorage.getItem("member_data")
      ? localStorage.getItem("member_data")
      : null;
    const member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
    if (member_data) {
      member_data.mb_image = member_data.mb_image
        ? `${serverApi}/${member_data.mb_image}`.replace(/\\/g, "/")
        : "/auth/default_user.svg";
      setVerifedMemberData(member_data);
    }
  }, [signUpOpen, loginOpen]);

  //HANDLER//
  const handleSignUpOpen = () => setSignUpOpen(!signUpOpen);
  const handleLoginOpen = () => setLoginOpen(!loginOpen);
  const handleLogOutClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleCloseLogOut = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleLogoutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      const res = await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true);
      assert.ok(res, "test");
      return res;
    } catch (err) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };
  return (
    <Router>
      {main_path === "/" ? (
        <NavbarHome
          verifedMemberData={verifedMemberData}
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogoutRequest={handleLogoutRequest}
          anchorEl={anchorEl}
          open={open}
        />
      ) : main_path === "/restaurants" ? (
        <NavbarRestaurant
          verifedMemberData={verifedMemberData}
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogoutRequest={handleLogoutRequest}
          anchorEl={anchorEl}
          open={open}
        />
      ) : (
        <NavbarOthers
          verifedMemberData={verifedMemberData}
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogoutRequest={handleLogoutRequest}
          anchorEl={anchorEl}
          open={open}
        />
      )}

      <Switch>
        <Route path="/restaurants">
          <RestaurantPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        signUpOpen={signUpOpen}
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleSignUpOpen={handleSignUpOpen}
      />
    </Router>
  );
}

export default App;
