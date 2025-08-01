import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col h-svh">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
