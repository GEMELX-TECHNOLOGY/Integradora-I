import React from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Estadistic from "@/components/Estadistic";
import UsersCard from "@/components/UsersCard";
import Graphic from "@/components/Graphic";
import BetterProduct from "@/components/BetterProduct";

function Home() {
  return (
    <>
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-1">
          <Header />
          <div className="flex items-center">
          <Estadistic/>
          <Graphic/>
          <UsersCard/>
          </div>
          <footer className="pt-3">
            <BetterProduct/>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
