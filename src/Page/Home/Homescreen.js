import React from "react";
import "./Homescreen.css";
import Logo from "../../assests/Logo.png";
import Button from "../../Component/Button/Button";
import { Link } from "react-router-dom";


const HomeScreen = () => {



  return (
    <div className="Container">
      <div className="main">
        <div className="Logos">
          <img src={Logo} alt="" />
        </div>
        <div className="Text">
          <h1>Christ Holy Church International</h1>
          <h3>A.K.A Nation Builder's (Ododzi Obodo)</h3>
        </div>
        <div className="text">
          <h1>Nsukka Supritendency </h1>
          <h3>Minister's Data</h3>
        </div>
        <div className="btn">
          <Link to="/login">
            <Button text="Login" />
          </Link>
          <Link to="signup">
            <Button text="Signup" backgroundColor="inherit" color="#4A317A" />
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default HomeScreen;
