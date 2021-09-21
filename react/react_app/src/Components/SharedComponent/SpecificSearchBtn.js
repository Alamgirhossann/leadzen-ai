import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Style/style.css";

const SpecificSearchBtn = (details) => {
  const history = useHistory();
  const [toggleCheck, setToggleCheck] = useState(true);
  useEffect(async () => {
    console.log("details...>>>>", details);
    if (details.details === true) {
      setToggleCheck(true);
    } else {
      setToggleCheck(false);
    }
  }, []);

  const handleChange = async (e, event) => {
    console.log("e.target>>>", e.target);
    if (event === true) {
      setToggleCheck(true);
      console.log("true....People");
      history.push({
        pathname: "/repeatedUser",
        state: JSON.stringify({ status: true }),
      });
    } else {
      console.log("false....company");
      setToggleCheck(false);
      history.push({
        pathname: "/company_first_time_user",
        state: JSON.stringify({ status: false }),
      });
    }
    console.log("toggleCheck outside>>>", toggleCheck);
  };
  return (
    // this opt will toggle the people to company

    <div>
      <div className="btnn btn-1">
        <input
          type="checkbox"
          name="switch"
          id="switch"
          checked={toggleCheck}
          onClick={(e) => handleChange(e, e.target.checked)}
        />
        <label htmlFor="switch" />
      </div>
    </div>
  );
};

export default SpecificSearchBtn;
