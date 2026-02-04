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
import { useEffect ,useState} from 'react';
import { loadUser } from './actions/userAction.js';
import UserOptions from './components/layout/UserOptions/UserOptions.js'
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/layout/Route/ProtectedRoute.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import Shipping from './components/layout/Cart/Shipping.js';
import Cart from './components/layout/Cart/Cart.js';
import ConfirmOrder from './components/layout/Cart/ConfirmOrder.js';
import Payment from './components/layout/Cart/Payment.js';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/layout/Cart/OrderSuccess.js"
function App() {
  // React.useEffect(()=>{
  // WebFont.load({
  //     google:{
  //       familes : ["Roboto","Droid sans","Chilanka"]
  //     }
  //   })

  // },[]);
  const StripeWrapper = ({ stripePromise }) => {
    return (
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    );
  };

  const {isAuthenticated,user} = useSelector((state)=>state.user);
  const [stripeApiKey,setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    try {
      const response = await fetch("/api/v1/stripeapikey");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }
  const [stripePromise, setStripePromise] = useState(null);
  useEffect(()=>{
    if (stripeApiKey) {
      setStripePromise(loadStripe(stripeApiKey));
    }
    store.dispatch(loadUser());
    getStripeApiKey();

  },[stripeApiKey]);

  // console.log("Stripe Key:", stripeApiKey);

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
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path ="/login" element={<LoginSignUp/>}/>
        <Route path ="/cart" element={<Cart/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/login/shipping" element={<Shipping />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/process/payment"
            element={
              stripePromise ? (
                <StripeWrapper stripePromise={stripePromise} />
              ) : null
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/success" element={<OrderSuccess />} />
        </Route>
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
