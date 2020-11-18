import { Switch, Route, Redirect } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "./context/storage";
import jwtDecode from "jwt-decode";
import axios from "./axios";

import "./App.css";
// import LoadingComponents from "./components/loading";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import List from "./pages/list";
import History from "./pages/history";
import Profile from "./pages/profile";
import ErrorPage from "./pages/error";

const App = props => {
  const context = useContext(Context);

  const { getUserData, user } = context;

  let token = localStorage.idToken;

  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp * 1000 < Date.now()) {
        console.log("token is expired");
      } else {
        axios.defaults.headers.common["Authorization"] = token;
        getUserData();
      }
    } else {
      console.log("you have no token in localstorage");
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        {/* Auth User */}
        {user.auth && <Route component={List} path="/list" exact />}
        {user.auth && <Route component={History} path="/history" exact />}
        {user.auth && <Route component={Profile} path="/u/:username" exact />}
        {user.auth && <Route component={Dashboard} path="/" exact />}
        {user.auth && <Redirect from="/login" to="/" />}
        {user.auth && <Redirect from="/register" to="/" />}

        {/* UnAuth User */}
        <Route component={Landing} path="/" exact />
        <Route component={Login} path="/login" exact />
        <Route component={Register} path="/register" exact />
        <Route component={ErrorPage} path="/*" exact />
      </Switch>
    </div>
  );
};

export default App;
