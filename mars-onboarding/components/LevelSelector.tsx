'use client'
import React, { useState } from "react";
import Dropdown from "rsuite/Dropdown";
import {promises as fs} from 'fs';
import Link from "next/link";
import { Button } from "@nextui-org/react";
export default function LevelSelector({titles, solvedQuestions, setLevelIndex} : {setLevelIndex: (i : number) => void, titles: Array<React.JSX.Element>, solvedQuestions: Array<number>}) {
    
    let formattedTitles : Array<React.JSX.Element> = titles.map((title, i) => 
        <>{i}. {title}{solvedQuestions.includes(i) ? " (V)" : ""}</>
    )
    let itemList : Array<React.JSX.Element> = formattedTitles.map((title, i) =>
    <Dropdown.Item onSelect = {()=>setLevelIndex(i)}>{title}</Dropdown.Item>)
    return <Dropdown title = "Levels">{itemList}</Dropdown>
    }