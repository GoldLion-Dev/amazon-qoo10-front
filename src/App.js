import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/SignUp";
import Listing from "./pages/Listing/Listing";
import ListingDetailPage from "./pages/Listing/ListingDetailPage";
import ReListing from "./pages/ReListing/ReListing";
import Qoo10 from "./pages/Qoo10/Qoo10";
import ImageEdit from "./pages/ImageEdit/ImageEdit";
import { useSelector } from "react-redux";
import { getUserId } from "./utils/getUserId";
import { useEffect, useState } from "react";

function App() {
  const [loginFlag, setLoginFlag] = useState(false);
  const islogin = useSelector((state) => state.login.loginToken);
  const user_id = getUserId();

  if (islogin == "" && user_id == undefined) {
    return <Login />;
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Listing />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/relisting" element={<ReListing />} />
            <Route
              path="/listingDetailPage/:id"
              element={<ListingDetailPage />}
            />
            <Route path="/qoo10" element={<Qoo10 />} />
            <Route path="/image_edit" element={<ImageEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
