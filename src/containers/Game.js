import React, { useState, useEffect } from 'react';
import { Canvas } from '../components/Canvas';

export const Game = () => {
    const [wrongAnswerCount, incrementWrongAnswer] = useState(0);
    const [wordSlug, updateSlug] = useState(null);
    const [guessedLetter, updateGuess] = useState("");
    useEffect(() => {
        // Did Mount
        // on did mount will fetch the length of a word  and a slug to identify that word in the API

        // Event Handling
        // on keypress should send fetch request to backend with target value and slug
        // API should respond with either an empty array or an array with the letter's index
    });
    return <span className="game"><Canvas wrongAnswerCount={wrongAnswerCount} /></span>;
};