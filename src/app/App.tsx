import React, { useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/home.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantPage } from "./screens/RestaurantPage";
import { OrdersPage } from "./screens/OrdersPage";
import { CommunityPage } from "./screens/CommunityPage";
import { LoginPage } from "./screens/LoginPage";
import { MembersPage } from "./screens/MembersPage";
import { HelpPage } from "./screens/HeplPage";
import { HomePage } from "./screens/HomePage";
import NavbarHome from "./components/header";
import NavbarRestaurant from "./components/header/restaurant";
import NavbarOthers from "./components/header/others";
import Footer from "./components/footer";

function App() {
  const [path, setPath] = useState();
  const main_path = window.location.pathname;

  return (
    <Router>
      {main_path === "/" ? (
        <NavbarHome setPath={setPath} />
      ) : main_path === "/restaurant" ? (
        <NavbarRestaurant setPath={setPath} />
      ) : (
        <NavbarOthers setPath={setPath} />
      )}
      {/* <nav>
          <ul>
            <li>
              <Link to="/restaurant">RestaurantPage</Link>
            </li>
            <li>
              <Link to="/comunity">ComunityPage</Link>
            </li>
            <li>
              <Link to="/orders">OrdersPage</Link>
            </li>
            <li>
              <Link to="/member-page">MembersPage</Link>
            </li>
            <li>
              <Link to="/help">HelpPage</Link>
            </li>
            <li>
              <Link to="/login">LoginPage</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav> */}

      <Switch>
        <Route path="/restaurant">
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
          <MembersPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
