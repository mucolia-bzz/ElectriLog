import React from "react";
import LogoImg from "@/assets/logo.png";

// Header component
export const Header: React.FC = () => (
  <header className="w-full bg-white shadow">
    <div className="container mx-auto px-4 py-4 flex items-center space-x-2">
      <img src={LogoImg} alt="ElectriLog Logo" className="h-18 w-auto" />
      <h1 className="text-xl font-semibold">ElectriLog</h1>
    </div>
  </header>
);
