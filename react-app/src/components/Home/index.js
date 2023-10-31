import React, { useEffect } from "react";
import styles from "./Home.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { getStartupsThunk } from "../../store/startup";
import FeedItem from "../FeedItem";

const Home = () => {
    const dispatch = useDispatch();
    const startups = useSelector(state => state.startup.allStartups);


    useEffect(() => {
        dispatch(getStartupsThunk());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.intro}>
                Startup Feed
            </div>
            <div className={styles.feed}>
                {startups?.map(startup => (
                    <FeedItem key={startup.id} startup={startup} />
                ))}
            </div>
        </div>
    )
}

export default Home;
