import React from "react";
import PropTypes from "prop-types";
import { GiFoxHead } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <GiFoxHead />
        &nbsp;
        {title}
      </h1>
      <ul>
        <l1>
          <Link to="/">Home</Link>
        </l1>
        <l1>
          <Link to="/about">About</Link>
        </l1>
        <l1>
          <Link to="/register">Register</Link>
        </l1>
        <l1>
          <Link to="/login">Login</Link>
        </l1>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Contact Fox",
};

export default Navbar;
