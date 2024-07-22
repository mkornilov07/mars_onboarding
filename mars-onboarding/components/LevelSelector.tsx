'use client'
import React, { useState } from "react";
import Dropdown from "rsuite/Dropdown";
import {promises as fs} from 'fs';
export const [levelIndex, setLevelIndex] = useState(0);
export default function LevelSelector({titles, solvedQuestions} : {titles: Array<React.JSX.Element>, solvedQuestions: Array<number>}) {
    let formattedTitles : Array<React.JSX.Element> = titles.map((title, i) => 
        <>{i}. {title}{solvedQuestions.includes(i) ? " (V)" : ""}</>
    )
    return <></>
    }