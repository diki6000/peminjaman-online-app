import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import "./SideLayout.css";

function MainLayout() {
  return (
    <div className="MainContainer">
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
