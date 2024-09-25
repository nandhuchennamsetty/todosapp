import React from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link

const Component = styled(AppBar)`
  background: #ffffff;
  color: #000;
`;
// hello
const Container = styled(Toolbar)`
  justify-content: center;

  & > a {
    padding: 20px;
    text-decoration: none;
    color: #000;
  }

  & > a.active {
    color: #ff0000; /* Active link color */
  }

  & > a:hover {
    color: pink; /* Hover state */
  }
`;

const Header = () => {
  return (
    <Component>
      <Container>
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/login" activeClassName="active">
          Logout
        </NavLink>
      </Container>
    </Component>
  );
};

export default Header;
