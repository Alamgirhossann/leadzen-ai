import React from 'react'
import * as animationData from './loaderAnimation.json'

const Loader = {
         loop: true,
         autoplay: true,
         animationData: animationData.default,
         rendererSettings: {
             preserveAspectRatio: 'xMidYMid slice'
         }
     }
     export default Loader;