import React, { useState } from 'react';

const styles = {
    input: {
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
    container: {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap"
    }
}

export default function Guess({ length, submitHandler, indexArray, guess }) {
    let [guessInput, renderGuessInput] = useState(false);
    let [value, setValue] = useState("");
    let inputArray = [];
    function renderInputs() {
        for (let i = 1; i <= length; i++) {
            if (indexArray.includes(i)) {
                inputArray.push(<input key={i} aria-label={`letter #${i}`} alt="guess input" style={styles.input} maxLength={1} value={guess} disabled />)
            } else {
                inputArray.push(<input key={i} aria-label={`letter #${i}`} alt="guess input" style={styles.input} maxLength={1} value={""} disabled />)
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

        </>
    )
};
