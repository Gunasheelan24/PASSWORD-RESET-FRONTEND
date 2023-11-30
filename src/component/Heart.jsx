import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "../Style/SignUp";
import Header from "./Header";
import Forget from "./Forget";

const Heart = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Password" element={<Forget />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Heart;
