import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, Input, InputGroup, Icon, Col, FlexboxGrid } from "rsuite";
import LogoAvviareSoloBuhito from "../Assets/LogoAvviareSoloBuhito.svg";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const NavBar = () => {
  const history = useHistory();
  const isLoggedIn = false;
  const navBarStyles = {};
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const navInputStyles = {
    marginTop: "10px",
  };
  const [query, setQuery] = useState("");

  return (
    <>
      <Navbar style={navBarStyles}>
        <Navbar.Header>
          <Link to="/">
            {" "}
            <img
              src={LogoAvviareSoloBuhito}
              alt="Logo"
              className="Avviare-logo"
            />
          </Link>
        </Navbar.Header>
        <Navbar.Body>
          <FlexboxGrid align="middle" justify="center">
            <FlexboxGrid.Item componentClass={Col} colspan={24} sm={16}>
              <FlexboxGrid
                align="bottom"
                justify="center"
                styles={navInputStyles}
              >
                <InputGroup>
                  <Input
                    onChange={(val) => {
                      setQuery(val);
                    }}
                  />
                  <InputGroup.Button
                    onClick={() => {
                      history.push(`/Catalog?query=${query}`);
                    }}
                  >
                    <Icon icon="search" />
                  </InputGroup.Button>
                </InputGroup>
              </FlexboxGrid>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} colspan={24} sm={8}>
              {cookie.user && (
                <FlexboxGrid align="middle" justify="end">
                  <Nav>
                    <Link to="/PerfilPropio">
                      <Nav.Item>
                        {" "}
                        <h5>My Profile</h5>
                      </Nav.Item>
                    </Link>
                    <Nav.Item
                      onClick={() => {
                        removeCookie("user");
                      }}
                    >
                      {" "}
                      <h5>Sign Out</h5>
                    </Nav.Item>
                  </Nav>
                </FlexboxGrid>
              )}
              {!cookie.user && (
                <FlexboxGrid align="middle" justify="end">
                  <FlexboxGrid.Item>
                    <Nav>
                      <Link to="/login">
                        <Nav.Item>
                          <h5>Log in</h5>
                        </Nav.Item>
                      </Link>
                      <Link to="/SignUp">
                        <Nav.Item>
                          <h5>Sign Up</h5>
                        </Nav.Item>
                      </Link>
                    </Nav>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              )}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Navbar.Body>
      </Navbar>
    </>
  );
};
