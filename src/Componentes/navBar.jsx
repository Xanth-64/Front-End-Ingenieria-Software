import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import lupa from "../Assets/lupa.svg";
import LogoAvviareSoloBuhito from "../Assets/LogoAvviareSoloBuhito.svg";
export const NavBar = () => {
  const isLoggedIn = true;

  const searchQuery = (e) => {
    console.log(e);
  };
  return (
    <Router>
      <div className="navBar">
        <Link>
          {" "}
          <img
            src={LogoAvviareSoloBuhito}
            alt="Logo"
            className="Avviare-logo"
          />
        </Link>
        <div className="searchBar-container">
          <form onSubmit={searchQuery} className="searchBar-form">
            <input
              placeholder="search"
              type="text"
              name="search"
              className="searchBar searchBar-input"
            />{" "}
            <button type="submit" className="searchBar searchBar-lupa">
              <img src={lupa} alt="lupa" className="searchBar-lupa-img" />
            </button>
          </form>
        </div>
        {isLoggedIn && (
          <div className="login-btn">
            <Link to="/profile" clasname="Link">
              Profile
            </Link>
          </div>
        )}
        {!isLoggedIn && (
          <div className="login-btn">
            <Link to="/login" className="Link">
              {" "}
              Log in
            </Link>
          </div>
        )}
      </div>
    </Router>
  );
};
