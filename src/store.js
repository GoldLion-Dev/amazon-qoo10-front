import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./pages/Listing/listingSlice";
import loginReducer from "./pages/Login/loginSlice";
import reListingReducer from "./pages/ReListing/reListingSlice";
export default configureStore({
  reducer: {
    listing: listingReducer,
    login: loginReducer,
    relisting: reListingReducer,
  },
});
