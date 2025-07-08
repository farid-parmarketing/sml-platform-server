import React from "react";
import MainLinks from "../components/MainLinks";

import Banner from "../components/Banner";
import HomeLinks from "../components/HomeLinks";

const Home = () => {
  return (
    <>
      <div className="container full-height-container p-2">
        <Banner />
        <div className="home-page-div">
          <MainLinks />
          <HomeLinks />
        </div>
      </div>
    </>
  );
};

export default Home;
