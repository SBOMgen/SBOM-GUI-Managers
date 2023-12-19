import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Repos from "./pages/Repos";
import { useDispatch } from 'react-redux';
import { toggleAuthentication, addUser } from "./function/authSlice";
import Workflows from "./pages/Workflows";

const App = () => {
  const dispatch = useDispatch();
  

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route 
            path="/repos"
            element={<Repos />}
          />
          <Route
            path="/workflows"
            element={<Workflows />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
