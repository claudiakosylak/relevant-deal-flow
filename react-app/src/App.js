import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import MyStartups from "./components/MyStartups";
import StartupIndex from "./components/StartupIndex";
import UploadDeck from "./components/UploadDeck";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/my-startups">
            <MyStartups user={user}/>
          </Route>
          <Route exact path="/upload">
            <UploadDeck user={user} />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/:id">
            <StartupIndex />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
