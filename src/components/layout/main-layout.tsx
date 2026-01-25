"use client";

import React from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Hide header/footer on certain pages
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  // Dashboard pages get their own layout
  const isDashboard =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/admin") ||
    location.pathname.includes("/worker/") ||
    location.pathname.includes("/customer/");

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${isDashboard ? "" : ""}`}>{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default MainLayout;
