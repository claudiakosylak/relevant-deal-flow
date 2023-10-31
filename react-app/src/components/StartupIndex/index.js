import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect } from "react";
import styles from "./StartupIndex.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { getStartupThunk } from "../../store/startup";

const StartupIndex = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const startup = useSelector(state => state.startup.currentStartup);

    useEffect(() => {
        dispatch(getStartupThunk(id));
    }, [dispatch])

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <img src={startup.deck} className={styles.image}></img>
                <div className={styles.right}>
                    <h2>{startup?.name}</h2>
                    <p className={styles.website}>{startup?.website}</p>
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
