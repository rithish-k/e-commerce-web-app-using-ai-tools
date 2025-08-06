import React from 'react';
import SignupForm from './components/SignupForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
