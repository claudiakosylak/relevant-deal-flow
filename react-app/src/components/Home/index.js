import React, { useEffect } from "react";
import styles from "./Home.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { getStartupsThunk, getUserStartupsThunk } from "../../store/startup";
import FeedItem from "../FeedItem";
import { Redirect, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Home = ({ startups }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const startups = useSelector(state => state.startup.allStartups);
    const startupsArray = Object.values(startups);
    const user = useSelector(state => state.session.user);
    const location = useLocation();


    const uploadClick = () => {
        if (user) {
            history.push("/upload");
        } else {
            history.push("/signup", { from: "upload" });
        }
    }

    useEffect(() => {
        dispatch(getStartupsThunk());
        dispatch(getUserStartupsThunk());
    }, [location.pathname])

    if (!user && location.pathname === "/my-startups") return <Redirect to="/"></Redirect>

    return (
        <div className={styles.wrapper}>
            {location.pathname === "/my-startups" ? (
                <div className={styles.intro}>
                    My Startups
                </div>
            ) : (
                <div className={styles.intro}>
                    Startup Feed
                </div>
            )}
            <div className={styles.upload} onClick={uploadClick}>
                <i class="fa-solid fa-circle-arrow-up"></i>
                <p>Upload Deck</p>
            </div>
            <div className={styles.feed}>
                {startupsArray?.map(startup => (
                    <FeedItem key={startup.id} startup={startup} user={user}/>
                ))}
            </div>
        </div>
    )
}

export default Home;
