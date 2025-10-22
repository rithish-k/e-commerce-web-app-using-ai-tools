import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {thunk} from "redux-thunk";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";

// Import your reducers here
// import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails:productDetailsReducer

});

const store = configureStore({
  reducer: rootReducer,
  // devTools:true,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production", // devtools enabled only in dev
});
export default store;