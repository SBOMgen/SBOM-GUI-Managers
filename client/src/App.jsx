import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Repos from "./pages/Repos";

const App = () => {
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
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
