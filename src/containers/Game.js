import React, { useState, useEffect } from 'react';
import { Canvas } from '../components/Canvas';

export const Game = () => {
    const [wrongAnswerCount, incrementWrongAnswer] = useState(0);
    return <Canvas wrongAnswerCount={wrongAnswerCount} />;
};