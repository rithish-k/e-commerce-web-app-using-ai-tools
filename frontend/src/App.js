import React from 'react';
import SignupForm from './components/SignupForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import Header from './components/layout/Header.js'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App;
