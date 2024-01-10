import React, { useEffect } from "react";
import styles from "./Home.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { getStartupsThunk, getUserStartupsThunk } from "../../store/startup";
import FeedItem from "../FeedItem";
import {
    NavLink,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { userFavoritesThunk } from "../../store/favorite";

const Home = ({ startups }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const startups = useSelector(state => state.startup.allStartups);
  const startupsArray = Object.values(startups);
  const user = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => state.favorite.favorites);
  const location = useLocation();

  const uploadClick = () => {
    if (user) {
      history.push("/upload");
    } else {
      history.push("/signup", { from: "upload" });
    }
  };

  useEffect(() => {
    dispatch(getStartupsThunk());
    if (user) {
      dispatch(getUserStartupsThunk());
      dispatch(userFavoritesThunk());
    }
  }, [location.pathname]);

  if (
    ((!user || !user.default_startup) &&
      location.pathname === "/my-startups") ||
    ((!user || user.default_startup) && location.pathname === "/favorites")
  )
    return <Redirect to="/"></Redirect>;

  return (
    <div className={styles.wrapper}>
      {location.pathname === "/my-startups" ? (
        <div className={styles.intro}>My Startups</div>
      ) : location.pathname === "/favorites" ? (
        <div className={styles.intro}>My Favorites</div>
      ) : (
        <div className={styles.intro}>Startup Feed</div>
      )}

      {user && location.pathname === "/my-startups" && startupsArray.length === 0 && (
        <div className={styles.empty}>
            <br></br>
            You haven't registered a startup yet.
            </div>
      )}
      {(!user || (user && user.default_startup)) && (
        <div className={styles.upload} onClick={uploadClick}>
          <i class="fa-solid fa-circle-arrow-up"></i>
          <p>Upload Deck</p>
        </div>
      )}
      <div className={styles.feed}>
        {startupsArray?.map((startup) => (
          <FeedItem
            key={startup.id}
            startup={startup}
            user={user}
            favorites={favorites}
          />
        ))}
        {(user && location.pathname === "/favorites" && startupsArray.length === 0) && (
            <div className={styles.empty}>
                You haven't added any startups to your favorites yet. <br></br><br></br>
                <NavLink to="/" className={styles.browse}>Browse startups</NavLink>
            </div>
        )}
      </div>
    </div>
  );
};

export default Home;
