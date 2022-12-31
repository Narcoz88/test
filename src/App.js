import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Auth from "./pages/auth";
import Page404 from "./pages/page404";
import Confirmation from "./pages/confirmation";
import ForgotPassword from "./pages/forgotPassword";
import Register from "./pages/register";

function App() {
  return (
      <Routes>
          <Route path="/" element={<MainLayout />}>
              <Route index element={<Auth />}/>
              <Route path="register" element={<Register />}/>
              <Route path="forgot" element={<ForgotPassword />}/>
              <Route path="confirm" element={<Confirmation />}/>
              <Route path="*" element={<Page404/>} />
          </Route>
      </Routes>
  );
}

export default App;
