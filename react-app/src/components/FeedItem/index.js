import React from "react";
import styles from "./FeedItem.module.sass";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const FeedItem = ({ startup }) => {
    const history = useHistory();
    return (
        <div className={styles.wrapper}>
            <img src={startup.deck} className={styles.deck}
            alt={`${startup.name} picture`}
            onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1590098563686-06ab8778a6a7?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
            ></img>
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
