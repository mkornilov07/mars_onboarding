'use client'
import React, { useEffect, useState } from "react";
import {Dropdown, ButtonToolbar} from "rsuite";
import {promises as fs} from 'fs';
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { ReactDOM } from "react";
import { fetchSolvedQuestions } from "./LevelWrapper";
import "rsuite/Dropdown/styles/index.css";

export default function LevelSelector({titles, solvedQuestions, setLevelIndex, setSubmit, submitted, section, questionId, suffix} : {questionId : number, section : string, setSubmit: any, submitted: boolean, setLevelIndex: (i : number) => void, titles: Array<React.JSX.Element>, solvedQuestions: Array<number>, suffix: string}) {
    const [solvedQuestionsState, setSolvedQuestionsState] = useState([] as number[]);
    useEffect(()=>{setSolvedQuestionsState(solvedQuestions)}, [solvedQuestions]);
    useEffect(()=>{
        async function a() {
            const fetchedQuestions = await fetchSolvedQuestions(section)
            console.log(`fetched questions: ${fetchedQuestions}`)
            setSolvedQuestionsState(fetchedQuestions);
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
    <Dropdown.Item className = "text-lg p-9" key= {i} onSelect = {()=>setLevelIndex(i)}>{title}</Dropdown.Item>)
    return <Dropdown style={{padding: 0, margin: 0, display:"inline-block"}} renderToggle = { (props, ref) =>
            <button className = "inline-block p-0 m-0"><h1 className = "select-none opacity-90 font-bold font-mono text-4xl place-self-center" {...props} ref = {ref}>
                {titles[questionId]} ({suffix} {questionId+1}) ▼
            </h1></button>}
            className = "rs-theme-dark inline-block" trigger="click">{itemList}
        </Dropdown>
    }