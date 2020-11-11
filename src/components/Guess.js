import React, { useState, useEffect } from 'react';

const styles = {
    letterInput: {
        "border": 0,
        "outline": 0,
        "background": "transparent",
        "borderBottom": "2px solid black",
        "width": "30px",
        "marginLeft": "10%",
        "textAlign": "center",
        "marginBottom": "5%"
    },
    guessInput: {
        "width": "30px",
        "marginLeft": "35%",
        "marginRight": ".5%",
        "textAlign": "center",
        "marginBottom": "5%"
    },


}

export default function Guess({ length, submitHandler, indexArray, guess }) {
    let [guessInput, renderGuessInput] = useState(false);
    let [value, setValue] = useState("");
    let [charMap, setCharMap] = useState({});

    // Every time we receive a new guess prop and the indexArray has elements. Update charMap by adding the indices + 1 as keys (symbolizing what number character the letter is in the word), setting key equal to the guess
    useEffect(() => {
        if (indexArray.length > 0) {
            let newMap = {};
            for (let i = 0; i < indexArray.length; i++) {
                if (indexArray[i]) {
                    newMap[indexArray[i]] = guess;
                };
            };
            setCharMap({ ...charMap, ...newMap });
        };
    }, [indexArray]);


    let counter = 0;
    function renderInputs() {
        let inputArray = [];
        for (let i = 1; i <= length; i++) {
            // if charMap has a key at i then there was a correctly guessed letter in that position. We set input value to the letter at that key in charMap. Otherwise we render a blank input
            if (charMap[i]) {
                counter++
                console.log("counter", counter)
                inputArray.push(<input key={i} aria-label={`letter #${i} is ${charMap[i]}`} alt="guess input" style={styles.letterInput} maxLength={1} value={charMap[i]} disabled />)
            } else {
                inputArray.push(<input key={i} aria-label={`letter #${i} is blank. What letter do you think it is? Make a guess.`} alt="guess input" style={styles.letterInput} maxLength={1} value={""} disabled />)
            };
        };
        return inputArray;
    };
    return (
        <>
            <div>
                {renderInputs()}
            </div>
            {guessInput ? null : <button onClick={() => renderGuessInput(true)} style={{ "maxWidth": "10%", "marginLeft": "35%", "cursor": "pointer" }}>Make a Guess: </button>}
            {guessInput ?

                <form style={{ "display": "flex", "flexDirection": "column" }} onSubmit={(e) => {
                    setValue("");
                    submitHandler(e);
                }} >
                    <label style={{ "marginLeft": "35%", "marginBottom": "1%" }}>Make A Guess:</label>
                    <span>
                        <input alt="guess a letter" style={styles.guessInput} maxLength={1} value={value.toUpperCase()} onChange={(e) => setValue(e.target.value)} />
                        <button style={{ "maxWidth": "10%" }}>submit guess</button>
                    </span>
                </form>

                :

                null

            }
            {counter === length ? <h1 className="win">You Win</h1> : console.log("no win")}

        </>
    )
};
