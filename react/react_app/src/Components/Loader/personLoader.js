import React from "react";
import * as animationData from "./loaderAnimationPerson.json";

const personLoader = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default personLoader;
