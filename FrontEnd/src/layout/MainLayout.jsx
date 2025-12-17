import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="MainContainer">
      <Navbar />
      <main className="MainBody">
        <div className="Main-Content">
          <Outlet />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
