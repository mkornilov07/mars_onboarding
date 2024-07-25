"use client"
import Link from "next/link";
import Popup from "./Popup";
import { ReactNode, useState } from "react";
import { start } from "repl";
import dynamic from 'next/dynamic'
import Question from "./Question";
import getUser from "./User";
import { useEffect } from "react";
import User from "./User";
import LevelSelector from "./LevelSelector";
import React from "react";
import LevelBody from "./LevelBody";

// const NoSSR = dynamic(() => import('../components/question'), { ssr: false })
export default function Level({
    data, section, suffix, language, solvedQuestions, submitFunc, validateReq, logout
} : {
data: allQuestionData, section : string, suffix : string, language : string, solvedQuestions : Array<number>, submitFunc: (id : string, qid : number, cat : string) => Promise<void>, validateReq : any, logout : any
}) {
    console.log(data)
    const [levelIndex, setLevelIndex] = useState(0);
    const [submitted, setSubmit] = useState(false);
    const titles = data[section].map(question => question.title);
    const checkFuncs = data[section].map(question => question.checkFunction);
    return (
        <div>
            <div className = "flex opacity-90 shadow-md shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f] shadow-black text-white bg-black sticky justify-evenly top w-full h-30">
                <Link href = "/level/" className = "text-white opacity-60 hover:opacity-100 m-5 self-center content-start select-none text-5xl hover:text-red-700">⬅</Link>
                <div className = "flex-row m-6">
                <h1 className = "m-10 select-none opacity-90 font-bold font-mono text-4xl place-self-center">
                    {data[section][levelIndex].title} {"("}{suffix} {levelIndex}{")"}
                </h1>
                <div className = "m-10 place-content-center">
                    <Popup contents = {data[section][levelIndex].lesson} title = {data[section][levelIndex].title}></Popup>
                </div>
                </div>
                <User logout = {logout} validateReq={validateReq}/>
                <LevelSelector solvedQuestions = {solvedQuestions} section = {section} titles = {titles} setLevelIndex={setLevelIndex} setSubmit = {setSubmit} submitted = {submitted} questionId = {levelIndex}></LevelSelector>
            </div>
            <div className = "z-0 flex-col select-none min-h-screen w-full bg-zinc-900 text-white">
                <div className = "flex container mx-auto flex-col max-w-[900px] align-items-center space-evenly">
                    <p className = "flex text-zinc-900 bg-zinc-900">empty placeholder</p>
                    <p className = "flex text-zinc-900 bg-zinc-900">empty placeholder</p>
                    <LevelBody levelIndex={levelIndex} language = {language} sectionData={data[section]} submitFunc={submitFunc} validateReq = {validateReq} section={section} questionIndex={levelIndex} setSubmit={setSubmit} checkFuncs = {checkFuncs}/>
                </div>
            </div>
        </div>);
}

export interface questionData {
    correctAnswers?: string[],
    checkFunction? : (answers : string[]) => boolean[],
    starterCode: string,
    lesson : React.JSX.Element,
    title : React.JSX.Element
}
export interface allQuestionData {
    [section: string] : Array<questionData>
}
