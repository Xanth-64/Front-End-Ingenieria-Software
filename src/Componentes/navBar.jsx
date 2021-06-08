import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Input, InputGroup, Icon, Col, FlexboxGrid } from "rsuite";
import LogoAvviareSoloBuhito from "../Assets/LogoAvviareSoloBuhito.svg";
export const NavBar = () => {
  const isLoggedIn = false;
  //Redirect fails using Hook
  const navBarStyles = {};
  const navInputStyles = {
    marginTop: "10px",
  };
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
                  <Input />
                  <InputGroup.Button>
                    <Icon icon="search" />
                  </InputGroup.Button>
                </InputGroup>
              </FlexboxGrid>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} colspan={24} sm={8}>
              {isLoggedIn && (
                <Nav>
                  <Nav.Item></Nav.Item>
                  <Nav.Item></Nav.Item>
                </Nav>
              )}
              {!isLoggedIn && (
                <FlexboxGrid align="middle" justify="end">
                  <FlexboxGrid.Item>
                    <Nav>
                      <Link to="/login">
                        <Nav.Item>
                          <h5>Log in</h5>
                        </Nav.Item>
                      </Link>
                      <Link to="/SignUpBase">
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
