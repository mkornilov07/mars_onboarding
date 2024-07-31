'use client'
import React, { useEffect, useState } from "react";
import Dropdown from "rsuite/Dropdown";
import {promises as fs} from 'fs';
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { fetchSolvedQuestions } from "./LevelWrapper";
export default function LevelSelector({titles, solvedQuestions, setLevelIndex, setSubmit, submitted, section, questionId} : {questionId : number, section : string, setSubmit: any, submitted: boolean, setLevelIndex: (i : number) => void, titles: Array<React.JSX.Element>, solvedQuestions: Array<number>}) {
    const [solvedQuestionsState, setSolvedQuestionsState] = useState([] as number[]);
    useEffect(()=>{setSolvedQuestionsState(solvedQuestions)}, [solvedQuestions]);
    useEffect(()=>{
        async function a() {
            setSolvedQuestionsState(await fetchSolvedQuestions(section));
        }
        if(submitted) {
            a();
            setSubmit(false);
        }
    }, [submitted])
    let formattedTitles : Array<React.JSX.Element> = titles.map((title, i) => 
        <><text className={(i == questionId) ? "italic text-red-600" : ""}>{i+1}. {title}{solvedQuestionsState.includes(i) ? <text className = "text-lime-500">✓</text> : ""}</text></>
    )
    let itemList : Array<React.JSX.Element> = formattedTitles.map((title, i) =>
    <Dropdown.Item key= {i} onSelect = {()=>setLevelIndex(i)}>{title}</Dropdown.Item>)
    return <Dropdown title = "Levels">{itemList}</Dropdown>
    }