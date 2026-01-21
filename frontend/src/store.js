import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {thunk} from "redux-thunk";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import {forgotPasswordReducer, profileReducer, userReducer} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
// Import your reducers here
// import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
});
let initialState = {
  cart:{
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
  }
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  // devTools:true,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production", // devtools enabled only in dev
});
export default store;