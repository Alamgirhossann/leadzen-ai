import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) =>
        Cookies.get("user_token") ? (
          <Component {...props} />
        ) : (
          history.push({
            state: { userSession: true },
            pathname: "/login",
          })
        )
      }
    />
  );
};

export default PrivateRoute;
