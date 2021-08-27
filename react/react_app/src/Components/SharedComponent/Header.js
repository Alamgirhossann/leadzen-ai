import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Header = (props) => {
   const user = props?.user;
  return (
    <div>
      <header className="header-area">
        <nav className="header-navbar navbar navbar-expand-xl bg-light">
          <div className="container-fluid" style={{ paddingRight: "0px" }}>
            <a className="navbar-brand" href="/repeatedUser">
              <img src="assets/images/header-brand-black.png" alt="title" />
            </a>

            {user?.name !== undefined  && <NavBar user={user} />}
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Header;
