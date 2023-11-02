import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect } from "react";
import styles from "./StartupIndex.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { getStartupThunk } from "../../store/startup";
import copy from "copy-to-clipboard";

const StartupIndex = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const startup = useSelector(state => state.startup.currentStartup);

    useEffect(() => {
        dispatch(getStartupThunk(id));
    }, [dispatch, id])

    const copyToClipboard = () => {
        copy(window.location.href);
        alert("Copied to clipboard!")
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <img src={startup.picture} className={styles.image} alt={`${startup.name} image`}
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1590098563686-06ab8778a6a7?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
                    }></img>
                <div className={styles.right}>
                    <div className={styles.right_top}>
                    <h2>{startup?.name}</h2>
                    <p className={styles.website}>{startup?.website}</p>
                    </div>
                    <div className={styles.founders}>
                        <h3>Founders:</h3>
                        <div className={styles.founder}>{startup?.founder_1}</div>
                        {startup?.founder_2 && (
                            <div className={styles.founder}>{startup?.founder_2}</div>
                        )}
                        {startup?.founder_3 && (
                            <div className={styles.founder}>{startup?.founder_3}</div>
                        )}
                    </div>
                    <a href={startup.deck} download={`${startup.name}_deck`} className={styles.download}>Download Deck</a>
                    <button onClick={copyToClipboard} className={styles.copy}><i class="fa-solid fa-copy"></i>Copy Link</button>
                </div>
            </div>
            <div className={styles.bottom}>
                <h3>About</h3>
                <p className={styles.about}>
                    {startup?.description}
                </p>
            </div>
        </div>
    )
}

export default StartupIndex;
