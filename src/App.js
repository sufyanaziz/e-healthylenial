import { Switch, Route, Redirect } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "./context/storage";
import jwtDecode from "jwt-decode";
import axios from "./axios";

import "./App.css";
import LoadingComponent from "./components/loading";
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
      console.log("you have no t  oken in localstorage");
    }
  }, []);

  return (
    <div className="App">
      {/* Auth User */}
      {user.loading ? (
        <div style={{ width: "100vw", height: "100vh", background: "white" }}>
          <LoadingComponent iconSize={80} width="100%" height="100%" />
        </div>
      ) : user.auth ? (
        <Switch>
          <Route component={List} path="/list" exact />
          <Route component={History} path="/report" exact />
          <Route component={Profile} path="/u/:username" exact />
          <Route component={Dashboard} path="/" exact />
          <Redirect from="/login" to="/" />
          <Redirect from="/register" to="/" />
          <Route component={ErrorPage} path="/*" exact />
        </Switch>
      ) : (
        <Switch>
          {/* UnAuth User */}
          <Route component={Landing} path="/" exact />
          <Route component={Login} path="/login" exact />
          <Route component={Register} path="/register" exact />
        </Switch>
      )}
    </div>
  );
};

export default App;
