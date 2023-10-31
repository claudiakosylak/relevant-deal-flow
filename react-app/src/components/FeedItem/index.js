import React from "react";
import styles from "./FeedItem.module.sass";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const FeedItem = ({ startup }) => {
    const history = useHistory();
    return (
        <div className={styles.wrapper}>
            <img src={startup.deck} className={styles.deck}></img>
            <div className={styles.right}>
                <div className={styles.right_top}>
                    <h3>{startup.name}</h3>
                    <p>{startup.description}</p>
                </div>
                <button className={styles.button} onClick={() => history.push(`/${startup.id}`)}>View</button>
            </div>
        </div>
    )
}

export default FeedItem;
