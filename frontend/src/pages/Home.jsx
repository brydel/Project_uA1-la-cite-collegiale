import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue Sur La Page D'accueil</h1>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "blue" }}>
        Allez AU  Dashboard 
      </Link>
    </div>
  );
};

export default Home;
