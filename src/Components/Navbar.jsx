import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="top-nav">
      <div className="nav-text-large">Blog App</div>
      <ul className="nav-list">
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/todos">Todos</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
