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
import FirstTimeUser from './Components/FirstTimeUser/FirstTimeUser';
import History from './Components/History/History';
import RepeatedUser from './Components/RepeatedUser/RepeatedUser';
import DetailedInfo from './Components/DetailedInfo/DetailedInfo';
import SpecificUser from './Components/SpecificUser/SpecificUser';
import SearchResult from './Components/SearchResult/SearchResult';
import SearchResult2 from './Components/SearchResult2/SearchResult2';
import SearchResult3 from './Components/SearchResult3/SearchResult3';

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
        <Route path='/savedList'>
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
        <Route path='/firstTimeUser'>
          <FirstTimeUser />
        </Route>
        <Route path='/history'>
          <History />
        </Route>
        <Route path='/repeatedUser'>
          <RepeatedUser />
        </Route>
        <Route path='/detailedInfo'>
          <DetailedInfo />
        </Route>
        <Route path='/specificUser'>
          <SpecificUser />
        </Route>
        <Route path='/searchResult'>
          <SearchResult />
        </Route>
        <Route path='/searchResult2'>
          <SearchResult2 />
        </Route>
        <Route path='/searchResult3'>
          <SearchResult3 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
