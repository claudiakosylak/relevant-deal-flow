import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import StartupIndex from "./components/StartupIndex";
import UploadDeck from "./components/UploadDeck";
import { getStartupsThunk, getUserStartupsThunk } from "./store/startup";
import AddSecondAccount from "./components/AddSecondAccount";
import { userFavoritesThunk } from "./store/favorite";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const startups = useSelector(state => state.startup.allStartups);
  const userStartups = useSelector(state => state.startup.myStartups);
  const favoriteStartups = useSelector(state => state.favorite.favorites);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStartupsThunk());
    if (user) {
      dispatch(getUserStartupsThunk());
      dispatch(userFavoritesThunk());
    }
}, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getUserStartupsThunk());
    }
  }, [user])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home startups={startups}/>
          </Route>
          <Route exact path="/my-startups">
            <Home startups={userStartups} />
          </Route>
          <Route exact path="/favorites">
            <Home startups={favoriteStartups} />
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
          <Route exact path="/investor-signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/add-investor-account">
            <AddSecondAccount />
          </Route>
          <Route path="/:id">
            <StartupIndex user={user}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
