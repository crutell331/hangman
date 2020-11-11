import React, { useState, useEffect } from 'react';
import { Canvas } from '../components/Canvas';
import Guess from '../components/Guess';

const style = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    "flexDirection": "column",
};

export const Game = () => {
    let [wrongAnswerCount, incrementWrongAnswer] = useState(0);
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
            })

    }, []);

    async function submitHandler(e) {
        console.log("in submit handler")
        // send get request with the letter that was guessed and the slug
        e.preventDefault();
        let guess = e.target[0].value;
        fetch(`http://localhost:5000/api/words?guess=${guess}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Slug": `${wordSlug}`
            }
        })
            .then(resp => resp.json())
            .then(indexArray => {
                if (indexArray.length === 0) {
                    let num = ++wrongAnswerCount
                    console.log("in submit num", num)
                    incrementWrongAnswer(num);
                } else {
                    setGuess();
                    setIndexArray(indexArray);
                };
            })
            .catch(console.log)
    };
    return (
        <div className="game" style={style}>
            <Canvas wrongAnswerCount={wrongAnswerCount} />
            <Guess length={wordLength} submitHandler={submitHandler} indexArray={indexArray} guess={guess} />
        </div>);
};

