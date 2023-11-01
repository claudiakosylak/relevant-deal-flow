import React, { useEffect } from "react";
import styles from "./Home.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { getStartupsThunk } from "../../store/startup";
import FeedItem from "../FeedItem";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const startups = useSelector(state => state.startup.allStartups);
    const startupsArray = Object.values(startups);
    const user = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getStartupsThunk());
    }, [dispatch]);

    const uploadClick = () => {
        if (user) {
            history.push("/upload");
        } else {
            history.push("/signup", {from: "upload"});
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.intro}>
                Startup Feed
            </div>
            <div className={styles.upload} onClick={uploadClick}>
                <i class="fa-solid fa-circle-arrow-up"></i>
                <p>Upload Deck</p>
            </div>
            <div className={styles.feed}>
                {startupsArray?.map(startup => (
                    <FeedItem key={startup.id} startup={startup} />
                ))}
            </div>
        </div>
    )
}

export default Home;
