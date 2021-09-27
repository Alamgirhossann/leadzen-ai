import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Header = (props) => {
  const user = props?.user;
  console.log("user>>", user);
  return (
    <div>
      <header className="header-area">
        <nav className="header-navbar navbar navbar-expand-xl bg-light">
          <div className="container-fluid" style={{ paddingRight: "0px" }}>
            {user?.name?(<a className="navbar-brand" href="/repeatedUser">
              <img src="assets/images/logo- without BG.png" alt="title" />
            </a>):<a className="navbar-brand" href="https://leadzen.ai/">
              <img src="assets/images/logo- without BG.png" alt="title" />
            </a>}
            

            {user?.name ? (
              <NavBar user={user} newEvent={props.newEvent} />
            ) : null}
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Header;
