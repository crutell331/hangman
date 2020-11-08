import React, { useRef, useEffect } from 'react';

function renderPlatform(ctx) {
    // Top Line
    ctx.beginPath();
    ctx.moveTo(30, 20);
    ctx.lineTo(55, 20);
    ctx.closePath();
    ctx.stroke();

    // Hook Line
    ctx.beginPath();
    ctx.moveTo(55, 20);
    ctx.lineTo(55, 25);
    ctx.closePath();
    ctx.stroke();


    // Vertical Line
    ctx.beginPath();
    ctx.moveTo(30, 20);
    ctx.lineTo(30, 100);
    ctx.closePath();
    ctx.stroke();

    // Bottom Line
    ctx.beginPath();
    ctx.moveTo(15, 100);
    ctx.lineTo(45, 100);
    ctx.closePath();
    ctx.stroke();
};
function renderBodyPart(bodyPart, ctx) {
    // Head 
    switch (bodyPart) {
        case "head":
            ctx.beginPath();
            ctx.arc(55, 30, 5, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            break;

        case "body":
            console.log(bodyPart)
            // Body
            ctx.beginPath();
            ctx.moveTo(55, 35);
            ctx.lineTo(55, 55);
            ctx.closePath();
            ctx.stroke();
            break;

        case "right arm":
            // Right Arm
            ctx.beginPath();
            ctx.moveTo(55, 43);
            ctx.lineTo(45, 40);
            ctx.closePath();
            ctx.stroke();
            break;

        case "left arm":
            // Left Arm
            ctx.beginPath();
            ctx.moveTo(55, 43);
            ctx.lineTo(67, 40);
            ctx.closePath();
            ctx.stroke();
            break;

        case "right leg":
            // Right Leg
            ctx.beginPath();
            ctx.moveTo(55, 55);
            ctx.lineTo(47, 60);
            ctx.closePath();
            ctx.stroke();
            break;

        case "left leg":
            // Left Leg
            ctx.beginPath();
            ctx.moveTo(55, 55);
            ctx.lineTo(63, 60);
            ctx.closePath();
            ctx.stroke();
        default:
            break;
    }
};


export const Canvas = (props) => {
    // create a ref to eventually hold the canvas element
    const canvasRef = useRef(null);

    // use effect because we wont have access to the canvas node until after it mounts and adds itself to the ref
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 2;
        ctx.translate(.5, .5);
        renderPlatform(ctx);

        switch (props.wrongAnswerCount) {
            case 1:
                renderBodyPart("head", ctx);
                break;
            case 2:
                renderBodyPart("head", ctx);
                renderBodyPart("body", ctx);
                break;
            case 3:
                renderBodyPart("head", ctx);
                renderBodyPart("body", ctx);
                renderBodyPart("right arm", ctx);
                break;
            case 4:
                renderBodyPart("head", ctx);
                renderBodyPart("body", ctx);
                renderBodyPart("right arm", ctx);
                renderBodyPart("left arm", ctx);
                break;
            case 5:
                renderBodyPart("head", ctx);
                renderBodyPart("body", ctx);
                renderBodyPart("right arm", ctx);
                renderBodyPart("left arm", ctx);
                renderBodyPart("right leg", ctx);
                break;
            case 6:
                renderBodyPart("head", ctx);
                renderBodyPart("body", ctx);
                renderBodyPart("right arm", ctx);
                renderBodyPart("left arm", ctx);
                renderBodyPart("right leg", ctx);
                renderBodyPart("left leg", ctx);
                break;
            default:
                break;
        }
    }, [props.wrongAnswerCount]);
    return (
        <canvas ref={canvasRef} id="my-canvas" style={{ width: "60vw", height: "70vh", borderStyle: "solid" }}>

        </canvas>
    );
};