import Home from "./pages/home/Home";
import Login from "./pages/login/LoginAdmin";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewUser from "./pages/users/NewUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs, carInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Cars from "./pages/cars/Cars";
import Users from "./pages/users/Users";
import Bids from "./pages/bids/Bids";
import Edit from "./pages/edit/Edit";
import EditUser from "./pages/users/Edit";
import UserDetails from "./pages/users/UserDetails";
import NewBid from "./pages/bids/NewBid";
import BuyNowReq from "./pages/buNowRequests/BuyNowReq";
import NewRequest from "./pages/buNowRequests/NewRequest";

function AdminApp() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      
          <Route path="/admin">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="cars">
              <Route index element={<Cars />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={carInputs} title="Add New Car" />}
              />
              <Route
                path="edit/:carId"
                element={<Edit inputs={carInputs}/>}
              />
            </Route>
            <Route path="users">
              <Route index element={<Users />} />
              <Route path="edit/:userId" element={<EditUser />} />
              <Route path="view/:userId" element={<UserDetails />} />
              <Route
                path="new"
                element={<NewUser title="Add New User" />}
              />
            </Route>
            <Route path="bids">
              <Route index element={<Bids />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<NewBid inputs={productInputs} title="Add New Bid" />}
              />
            </Route>
            <Route path="buy_now_requests">
              <Route index element={<BuyNowReq />} />
              <Route path=":reqId" element={<Single />} />
              <Route
                path="new"
                element={<NewRequest title="Add New Request" />}
              />
            </Route>
          </Route>
        
    </div>
  );
}

export default AdminApp;
