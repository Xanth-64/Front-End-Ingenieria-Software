import React from "react";
import { Link, BrowserRouter as Router, useHistory } from "react-router-dom";
import lupa from "../Assets/lupa.svg";
import LogoAvviareSoloBuhito from "../Assets/LogoAvviareSoloBuhito.svg";
export const NavBar = () => {
  const isLoggedIn = false;
  const history = useHistory();
  //Redirect fails using Hook
  const searchQuery = (e) => {
    console.log(e);
  };
  return (
    <Router>
      <div className="navBar">
        <div className="Avviare-logo-container">
          <Link to="/">
            {" "}
            <img
              src={LogoAvviareSoloBuhito}
              alt="Logo"
              className="Avviare-logo"
              onClick={() => {
                history.push("/");
              }}
            />
          </Link>
        </div>
        <div className="searchBar-container">
          <form onSubmit={searchQuery} className="searchBar-form">
            <input
              placeholder="Search"
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
          <div className="button-container-nav">
            <div className="login-btn">
              <Link to="/login" replace={true} clasname="Link">
                Profile
              </Link>
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div className="button-container-nav">
            <div
              className="login-btn"
              onClick={() => {
                history.push("/login");
              }}
            >
              <Link to="/login"> Log in</Link>
            </div>
            <div
              className="login-btn"
              onClick={() => {
                history.push("/SignUpBase");
              }}
            >
              <Link to="/SignUpBase" className="Link">
                {" "}
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};
