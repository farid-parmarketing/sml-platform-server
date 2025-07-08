import React from "react";
import { Link } from "react-router-dom";
import homeLinks from "../assets/data/homeLinks";

const HomeLinks = () => {
  return (
    <>
      <div className="home-links-grid">
        {homeLinks.map((item, index) => {
          return (
            <Link to={item.link} className="home-link-div" key={index}>
              <div>
                <p className="fw-bold">{item.title}</p>
                <p className="text-muted">{item.subtitle}</p>
              </div>
              <div className="home-link-img">
                <img src={item.img} alt="" />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default HomeLinks;
