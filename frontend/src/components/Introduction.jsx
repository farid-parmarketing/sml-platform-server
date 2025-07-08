import React from "react";
import advocate from "../assets/images/Advocate.jpg";

const Introduction = ({ content }) => {
  return (
    <>
      <div className="introduction">
        <div>
          <h2>Hi, I am Shweta</h2>
          <p>{content}</p>
        </div>
        <div className="introduction-img">
          <img src={advocate} alt="" />
        </div>
      </div>
      <div className="py-4"></div>

      {/*  */}
    </>
  );
};

export default Introduction;
