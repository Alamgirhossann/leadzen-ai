import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
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
import ExcelDownload from "./Components/ExportExcel/ExcelDownload";
import FirstTimeUserCompany from "./Components/CompanyInfo/FirstTimeUserCompany";
import SearchResultCompany from "./Components/CompanyInfo/SearchResultCompany";
import DetailInfoCompany from "./Components/CompanyInfo/DetailInfoCompany";
import RealTimePage from "./Components/RealTimeInfo/RealTimePage";
import RealTimePage2 from "./Components/RealTimeInfo/RealTimePage2";
import PrivateRoute from "./Components/SharedComponent/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/resetPassword">
          <ResetPassword />
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/howToUse">
          <HowToUse />
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
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/signUpError">
          <SignUpError />
        </Route>

        <Route path="/detailedInfo">
          <DetailedInfo />
        </Route>
        <Route path="/signUpEmailError">
          <SignUpEmailError />
        </Route>
        <PrivateRoute path="/searchResult" component={SearchResult} exact />
        <PrivateRoute path="/profile" component={Profile} exact />
        <PrivateRoute path="/history" component={History} exact />
        <PrivateRoute
          path="/result_by_name"
          component={SearchResultTexAu}
          exact
        />
        <PrivateRoute
          path="/advanceSearch"
          component={SearchResultTexAu}
          exact
        />
        <PrivateRoute path="/verification" component={Verification} exact />
        <PrivateRoute path="/repeatedUser" component={RepeatedUser} exact />
        <PrivateRoute path="/firstTimeUser" component={FirstTimeUser} exact />
        <Route path="/unverified" component={LoginEmailUnverifiedError} exact />
        <PrivateRoute path="/excelDownload" component={ExcelDownload} />
        <Route path="/login" component={LogIn} />
        <Route path="/" component={LogIn} />
        <Route path="/searchResult" component={SearchResult} />
        <Route path="/result_by_name" component={SearchResultTexAu} />
        <Route path="/search_by_history_type2" component={SearchResult} />
        <Route path="/result_by_history_type1" component={SearchResultTexAu} />
        <Route
          path="/result_by_history_type3"
          component={SearchResultCompany}
        />
        <Route path="/social_url_search" component={SearchResultTexAu} />
        <Route path="/advanceSearch" component={SearchResultTexAu} />
        <Route path="/verification" component={Verification} />
        <Route path="/unverified" component={LoginEmailUnverifiedError} />
        <Route path="/excelDownload" component={ExcelDownload} />
        <Route
          path="/company_first_time_user"
          component={FirstTimeUserCompany}
        />

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
        <Route path="/firstTimeUserCompany">
          <FirstTimeUserCompany />
        </Route>
        <Route path="/searchResultCompany" component={SearchResultCompany} />

        <Route path="/detailInfoCompany">
          <DetailInfoCompany />
        </Route>
        <Route path="/realTimePage">
          <RealTimePage />
        </Route>
        <Route path="/realTimeListView">
          <RealTimePage2 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
