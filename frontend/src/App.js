import React from 'react';
// import SignupForm from './components/SignupForm';
// import WebFont from "webfontloader"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import Main from './components/Main';
import Header from './components/layout/Header.js'
import Footer from './components/layout/Footer.js'
// import Home from ''
import Home from './components/layout/Home/Home.js'
// import Loader from './components/layout/Loader/Loader.js';
import { Toaster } from "react-hot-toast";
import ProductDetails from './components/layout/Product/ProductDetails.js';
import Products from './components/layout/Product/Products.js';
import About from './components/layout/About/About.js';
import LoginSignUp from './components/User/LoginSignUp.js';
import Profile from './components/User/Profile.js';
import store from "./store.js";
import "./App.css";
import { useEffect } from 'react';
import { loadUser } from './actions/userAction.js';
import UserOptions from './components/layout/UserOptions/UserOptions.js'
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/layout/Route/ProtectedRoute.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
function App() {
  // React.useEffect(()=>{
  // WebFont.load({
  //     google:{
  //       familes : ["Roboto","Droid sans","Chilanka"]
  //     }
  //   })

  // },[]);
  const {isAuthenticated,user} = useSelector((state)=>state.user);
  useEffect(()=>{

    store.dispatch(loadUser());

  },[]);

  return (
    <Router>
        <Header/>
        {isAuthenticated && <UserOptions user = {user}/>}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path ="/login" element={<LoginSignUp/>}/>
        </Routes>
        <Footer/>
        <Toaster position='top-right'/>
    </Router>
  
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/register" element={<SignupForm />} />
    //     <Route path="/login" element={<LoginForm />} />
    //     <Route path="/main" element={<Main/>}/>
    //   </Routes>
    // </BrowserRouter>
  );

}

export default App;
