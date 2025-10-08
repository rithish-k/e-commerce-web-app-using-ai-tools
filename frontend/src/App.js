import React from 'react';
import SignupForm from './components/SignupForm';
import WebFont from "webfontloader"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import Header from './components/layout/Header.js'
import Footer from './components/layout/Footer.js'
// import Home from ''
import Home from './components/layout/Home/Home.js'
function App() {
  // React.useEffect(()=>{
  // WebFont.load({
  //     google:{
  //       familes : ["Roboto","Droid sans","Chilanka"]
  //     }
  //   })

  // },[]);
  return (
    <Router>
        <Header/>
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        <Footer/>
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
