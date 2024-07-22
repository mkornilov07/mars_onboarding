'use client'
import { useState } from "react";
import Dropdown from "rsuite/Dropdown";
import {promises as fs} from 'fs';
export const [levelNumber, setLevelNumber] = useState(1);
export default function LevelSelector({titles, solvedQuestions} : {titles: Array<string>, solvedQuestions: Array<number>}) {
    
    return <></>
    }