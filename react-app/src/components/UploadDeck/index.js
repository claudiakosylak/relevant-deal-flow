import React, { useState } from "react";
import styles from "./UploadDeck.module.sass";
import { useDispatch } from "react-redux";
import { createStartupThunk } from "../../store/startup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UploadDeck = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [deck, setDeck] = useState("");
    const [founder1, setFounder1] = useState("");
    const [founder2, setFounder2] = useState("");
    const [founder3, setFounder3] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('description', description)
        formData.append('website', website)
        formData.append('deck', deck)
        formData.append('founder_1', founder1)
        formData.append('founder_2', founder2)
        formData.append('founder_3', founder3)
        dispatch(createStartupThunk(formData)).then(response => {
            console.log("response: ", response)
            if (response.errors) {
                console.log(response)
            } else {
                history.push(`/${response.id}`)
            }
        })
    }


    return (
        <div className={styles.wrapper}>
            <h2>Upload a deck</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    What is your startup name? (You can always change this later.)
                    <input value={name} type="text" onChange={(e) => setName(e.target.value)} className={styles.inputs}></input>
                </label>
                <label>
                    Please write a short description for your startup.
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={styles.inputs}></textarea>
                </label>
                <label>
                    Please enter your company's website (if you have one).
                    <input type="text" className={styles.inputs} value={website} onChange={(e) => setWebsite(e.target.value)}></input>
                </label>
                <label>
                    Upload your deck in .pdf format.
                    <input type="text" value={deck} onChange={(e) => setDeck(e.target.value)} className={styles.inputs}></input>
                </label>
                <label className={styles.founders}>
                    Who are your company's founders?
                    <input type="text" value={founder1} placeholder="Founder 1" onChange={(e) => setFounder1(e.target.value)} className={styles.inputs}></input>
                    <input type="text" value={founder2} placeholder="Founder 2" onChange={(e) => setFounder2(e.target.value)} className={styles.inputs}></input>
                    <input type="text" value={founder3} placeholder="Founder 3" onChange={(e) => setFounder3(e.target.value)} className={styles.inputs}></input>
                </label>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default UploadDeck;
