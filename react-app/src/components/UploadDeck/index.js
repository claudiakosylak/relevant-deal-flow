import React, { useState, useEffect } from "react";
import styles from "./UploadDeck.module.sass";
import { useDispatch } from "react-redux";
import { createStartupThunk } from "../../store/startup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";

const UploadDeck = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [deck, setDeck] = useState("");
    const [founder1, setFounder1] = useState("");
    const [founder2, setFounder2] = useState("");
    const [founder3, setFounder3] = useState("");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [backendErrors, setBackendErrors] = useState({});

    useEffect(() => {
        const newErrors = {};
        if (name === "" || name.length < 3 || name.length > 40) newErrors.name = "Startup name must be between 3 and 40 characters long.";
        if (description === "" || description.length < 30 || description.length > 500) newErrors.description = "Please describe your startup in between 30 and 500 characters.";
        if (website !== "" && (website.length < 5 || website.length > 255)) newErrors.website = "Website must be between 5 and 255 characters.";
        if (email !== "" && (email.length < 5 || email.length > 255)) newErrors.email = "Email must be between 5 and 255 characters.";
        if (deck === "") newErrors.deck = "Please upload your deck in .pdf format.";
        if (founder1 === "" && founder2 === "" && founder3 === "") newErrors.founders = "Please enter at least one founder name.";
        if (founder1.length < 5 || founder1.length > 100) newErrors.founder1 = "Name must be between 5 and 100 characters.";
        if (founder2 && (founder2.length < 5 || founder2.length > 100)) newErrors.founder2 = "Name must be between 5 and 100 characters.";
        if (founder3 && (founder3.length < 5 || founder3.length > 100)) newErrors.founder3 = "Name must be between 5 and 100 characters.";
        setErrors(newErrors);
    }, [name, description, website, deck, founder1, founder2, founder3])

    if (!user) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            setHasSubmitted(false);
            const formData = new FormData();
            formData.append('name', name)
            formData.append('description', description)
            formData.append('website', website)
            formData.append('email', email)
            formData.append('picture', picture)
            formData.append('deck', deck)
            formData.append('founder_1', founder1)
            formData.append('founder_2', founder2)
            formData.append('founder_3', founder3)
            dispatch(createStartupThunk(formData)).then(response => {
                if (response.errors) {
                    setBackendErrors(response.errors)
                } else {
                    history.push(`/${response.id}`)
                }
            })
        } else {
            setHasSubmitted(true);
        }
    }


    return (
        <div className={styles.wrapper}>
            <h2>Upload a deck</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    What is your startup name? (You can always change this later.)
                    <input value={name} type="text" onChange={(e) => setName(e.target.value)} className={styles.inputs}></input>
                    {(hasSubmitted && errors.name) && (
                        <p className={styles.errors}>{errors.name}</p>
                    )}
                </label>
                <label>
                    Please write a short description for your startup.
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={styles.inputs}></textarea>
                    {(hasSubmitted && errors.description) && (
                        <p className={styles.errors}>{errors.description}</p>
                    )}
                </label>
                <label>
                    Please enter your company's website (if you have one).
                    <input type="text" className={styles.inputs} value={website} onChange={(e) => setWebsite(e.target.value)}></input>
                    {(hasSubmitted && errors.website) && (
                        <p className={styles.errors}>{errors.website}</p>
                    )}
                    {backendErrors.website && (
                        <p className={styles.errors}>{backendErrors.website}</p>
                    )}
                </label>
                <label>
                    Please enter your company's contact email address.
                    <input type="text" className={styles.inputs} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    {(hasSubmitted && errors.email) && (
                        <p className={styles.errors}>{errors.email}</p>
                    )}
                    {backendErrors.email && (
                        <p className={styles.errors}>{backendErrors.email}</p>
                    )}
                </label>
                <label>
                    Upload an image for your startup.
                    <input type="file" onChange={(e) => setPicture(e.target.files[0])} className={styles.inputs} required accept=".jpg,.png,.jpeg,.gif,.svg,.tiff"></input>
                    {(hasSubmitted && errors.picture) && (
                        <p className={styles.errors}>{errors.picture}</p>
                    )}
                </label>
                <label>
                    Upload your deck in .pdf, .ppt or .pptx format.
                    <input type="file" onChange={(e) => setDeck(e.target.files[0])} className={styles.inputs} required accept=".pdf,.ppt,.pptx"></input>
                    {(hasSubmitted && errors.deck) && (
                        <p className={styles.errors}>{errors.deck}</p>
                    )}
                </label>
                <label className={styles.founders}>
                    Who are your company's founders?
                    {(hasSubmitted && errors.founders) && (
                        <p className={styles.errors}>{errors.founders}</p>
                    )}
                    <input type="text" value={founder1} placeholder="Founder 1" onChange={(e) => setFounder1(e.target.value)} className={styles.inputs}></input>
                    {(hasSubmitted && errors.founder1) && (
                        <p className={styles.errors}>{errors.founder1}</p>
                    )}
                    <input type="text" value={founder2} placeholder="Founder 2" onChange={(e) => setFounder2(e.target.value)} className={styles.inputs}></input>
                    {(hasSubmitted && errors.founder2) && (
                        <p className={styles.errors}>{errors.founder2}</p>
                    )}
                    <input type="text" value={founder3} placeholder="Founder 3" onChange={(e) => setFounder3(e.target.value)} className={styles.inputs}></input>
                    {(hasSubmitted && errors.founder3) && (
                        <p className={styles.errors}>{errors.founder3}</p>
                    )}
                </label>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default UploadDeck;
