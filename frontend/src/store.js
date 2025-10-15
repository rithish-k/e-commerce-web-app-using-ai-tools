import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {thunk} from "redux-thunk";

// Import your reducers here
// import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  // products: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production", // devtools enabled only in dev
});
export default store;