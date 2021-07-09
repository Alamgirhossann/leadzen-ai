import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Home from './Components/Home/Home';
import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/SignUp/SignUp';
import SignUpError from './Components/SignUpError/SignUpError';
import LoginError from './Components/LoginError/LoginError';
import WrongPassword from './Components/WrongPassword/WrongPassword';
import SavedList from './Components/SavedList/SavedList';
import Profile from './Components/Profile/Profile';
import UserGuide from './Components/UserGuide/UserGuide';
import PaymentFailed from './Components/PaymentFailed/PaymentFailed';
import Pricing from './Components/Pricing/Pricing';
import HowToUse from './Components/HowToUse/HowToUse';
import Cookies from "js-cookie";

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  
  return (
    <Router>
      <Switch>
      <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/resetPassword'>
          <ResetPassword />
        </Route>
        <Route path='/pricing'>
          <Pricing />
        </Route>
        <Route path='/PaymentFailed'>
          <PaymentFailed />
        </Route>
        <Route path='/howToUse'>
          <HowToUse />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/saveList'>
          <SavedList />
        </Route>
        <Route path='/userGuide'>
          <UserGuide />
        </Route>
        <Route path='/wrongPassword'>
          <WrongPassword />
        </Route>
        <Route path='/loginError'>
          <LoginError />
        </Route>
        <Route path='/login'>
          <LogIn />
        </Route>
        <Route path='/signUp'>
          <SignUp />
        </Route>
        <Route path='/signUpError'>
          <SignUpError />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
