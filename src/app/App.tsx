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
import { CartItem } from "../types/others";
import { Product } from "../types/product";

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
  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());
  console.log("cart", cartItems);

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
      return res;
    } catch (err) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  const onAdd = (product: Product) => {
    const exist: any = cartItems?.find(
      (item: CartItem) => item?._id === product?._id
    );
    console.log("exist", exist);

    if (exist) {
      const cart_updated = cartItems?.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        price: product.product_price,
        image: product?.product_images[0],
        name: product.product_name,
      };
      const cart_updated = [...cartItems, { ...new_item }];
      console.log("new", cart_updated);

      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems?.find(
      (vl: CartItem) => vl._id === item._id
    );
    if (item_data.quantity === 1) {
      const filter_items: CartItem[] = cartItems.filter(
        (vl) => vl._id !== item._id
      );
      setCartItems(filter_items);
      localStorage.setItem("cart_data", JSON.stringify(filter_items));
    } else {
      const cart_updated = cartItems?.map((vl: CartItem) =>
        vl._id === item_data._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : item
      );
      console.log("rem", cart_updated);
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const deleted_items: CartItem[] = cartItems?.filter(
      (vl) => vl?._id !== item?._id
    );
    setCartItems(deleted_items);
    localStorage.setItem("cart_data", JSON.stringify(deleted_items));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
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
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : main_path.includes("/restaurants") ? (
        <NavbarRestaurant
          verifedMemberData={verifedMemberData}
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogoutRequest={handleLogoutRequest}
          anchorEl={anchorEl}
          open={open}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
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
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      )}

      <Switch>
        <Route path="/restaurants">
          <RestaurantPage onAdd={onAdd} cartItems={cartItems} />
        </Route>
        <Route path="/orders">
          <OrdersPage
            orderRebuild={orderRebuild}
            setOrderRebuild={setOrderRebuild}
            verifyMemberData={verifedMemberData}
          />
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
