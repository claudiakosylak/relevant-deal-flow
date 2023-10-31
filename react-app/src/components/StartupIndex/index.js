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
            <h2>{startup?.name}</h2>
        </div>
    )
}

export default StartupIndex;
