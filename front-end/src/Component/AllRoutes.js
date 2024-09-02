import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";

 function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profile />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
