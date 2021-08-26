import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Home from "./Components/Home/Home";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import SignUpError from "./Components/SignUp/SignUpError";
import SignUpEmailError from "./Components/SignUp/SignUpEmailError";
import LoginError from "./Components/LogIn/LoginError";
import WrongPassword from "./Components/LogIn/WrongPassword";
import SavedList from "./Components/SavedList/SavedList";
import Profile from "./Components/Profile/Profile";
import UserGuide from "./Components/UserInfo/UserGuide";
import PaymentFailed from "./Components/PaymentFailed/PaymentFailed";
import Pricing from "./Components/Pricing/Pricing";
import HowToUse from "./Components/HowToUse/HowToUse";
import FirstTimeUser from "./Components/UserInfo/FirstTimeUser";
import History from "./Components/History/History";
import RepeatedUser from "./Components/UserInfo/RepeatedUser";
import DetailedInfo from "./Components/DetailedInfo/DetailedInfo";
import SearchResult from "./Components/SearchResult/SearchResult";
import LoginEmailError from "./Components/LogIn/LoginEmailError";
import PasswordInstruction from "./Components/SignUp/PasswordInstruction";
import ResetLink from "./Components/ResetLink/ResetLink";
import ChromeSignIn from "./Components/ChromeExtension/ChromeSignIn";
import ChromeWrongPassword from "./Components/ChromeExtension/ChromeWrongPassword";
import ChromeSearch from "./Components/ChromeExtension/ChromeSearch";
import AllUsers from "./Components/AdminDashboard/AllUsers";
import DashboardOne from "./Components/AdminDashboard/DashboardOne";
import SearchResultTexAu from "./Components/SearchResult/SearchResultTexAu";
import DashboardTwo from "./Components/AdminDashboard/DashboardTwo";
import Verification from "./Components/SignUp/Verification";
import LoginEmailUnverifiedError from "./Components/LogIn/LoginEmailUnverifiedError";
// import ExcelDownload from "./Components/ExportExcel/ExcelDownload";
// import ExcelFileSave from "./Components/ExportExcel/ExcelFileSave";
import ExcelDownload from "./Components/ExportExcel/ExcelDownload";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route path="/resetPassword">
          <ResetPassword />
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/howToUse">
          <HowToUse />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/savedList">
          <SavedList />
        </Route>
        <Route path="/userGuide">
          <UserGuide />
        </Route>
        <Route path="/wrongPassword">
          <WrongPassword />
        </Route>
        <Route path="/loginError">
          <LoginError />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/signUpError">
          <SignUpError />
        </Route>
        <Route path="/firstTimeUser">
          <FirstTimeUser />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/repeatedUser">
          <RepeatedUser />
        </Route>
        <Route path="/detailedInfo">
          <DetailedInfo />
        </Route>
        <Route path="/signUpEmailError">
          <SignUpEmailError />
        </Route>
        <Route path="/searchResult" component={SearchResult} />
        <Route path="/result_by_name" component={SearchResultTexAu} />
        <Route path="/advanceSearch" component={SearchResultTexAu} />
        <Route path="/verification" component={Verification} />
        <Route path="/unverified" component={LoginEmailUnverifiedError} />
        <Route path="/excelDownload" component={ExcelDownload} />

        <Route path="/loginEmailError">
          <LoginEmailError />
        </Route>
        <Route path="/passwordInstruction">
          <PasswordInstruction />
        </Route>
        <Route path="/paymentFailed">
          <PaymentFailed />
        </Route>
        <Route path="/resetLink">
          <ResetLink />
        </Route>
        <Route path="/chromeSignin">
          <ChromeSignIn />
        </Route>
        <Route path="/chromeWrongPassword">
          <ChromeWrongPassword />
        </Route>
        <Route path="/chromeSearch">
          <ChromeSearch />
        </Route>
        <Route path="/allUsers">
          <AllUsers />
        </Route>
        <Route path="/dashboardOne">
          <DashboardOne />
        </Route>
        <Route path="/dashboardTwo">
          <DashboardTwo />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
