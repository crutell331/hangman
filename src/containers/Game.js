import React, { useState, useEffect } from 'react';
import { Canvas } from '../components/Canvas';
import Guess from '../components/Guess';
import WinLoss from '../components/WinLoss';

const styles = {
    game: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        "flexDirection": "column",
    },
    // overlay: {
    //     position: "fixed",
    //     display: "block",
    //     width: "100%",
    //     height: "100%",
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     "backgroundColor": "rgba(0,0,0,0.5)",
    //     zIndex: 2,
    // },
    // overlayHeader: {
    //     position: "absolute",
    //     top: "40%",
    //     left: "50%",
    //     fontSize: "4rem",
    //     color: "white",
    //     transform: "translate(-50%, -50%)",
    // },
    // overlaySubHeader: {
    //     position: "absolute",
    //     top: "50%",
    //     left: "50%",
    //     fontSize: "2.5rem",
    //     color: "white",
    //     transform: "translate(-50%, -50%)",
    //     cursor: "pointer"
    // }
};

export const Game = () => {
    let [wrongAnswerCount, setWrongAnswerCount] = useState(0);
    let [wordSlug, setWordSlug] = useState(null);
    let [indexArray, setIndexArray] = useState([]);
    let [wordLength, setWordLength] = useState(0);
    let [guess, setGuess] = useState("");
    useEffect(() => {
        fetch("http://localhost:5000/api/words/random")
            .then(res => res.json())
            .then(data => {
                setWordSlug(data.slug);
                setWordLength(data.length);
                setWrongAnswerCount(0);
            })

    }, []);

    async function submitHandler(e) {
        // send get request with the letter that was guessed and the slug
        e.preventDefault();
        let letter = e.target[0].value;
        fetch(`http://localhost:5000/api/words?guess=${letter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Slug": `${wordSlug}`
            }
        })
            .then(resp => resp.json())
            // Grab index array from response and set state
            .then(indexArray => {
                if (indexArray.length === 0) {
                    let num = ++wrongAnswerCount
                    setWrongAnswerCount(num);
                } else {
                    setGuess(letter);
                    setIndexArray(indexArray);
                };
            })
            .catch(console.log)
    };

    return (
        <div className="game" style={styles.game}>
            <Canvas wrongAnswerCount={wrongAnswerCount} />
            <Guess length={wordLength} submitHandler={submitHandler} indexArray={indexArray} guess={guess} />
            {wrongAnswerCount === 6 ?
                <WinLoss loss />
                :
                null}
        </div>);
};

