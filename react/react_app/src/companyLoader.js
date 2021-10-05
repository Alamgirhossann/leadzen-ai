import React from "react";
import * as animationData from "./companyLoaderanimation.json";

const Loader = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default Loader;
