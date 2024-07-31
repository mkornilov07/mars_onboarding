'use client'
import { questionData } from "./Level"
import Question from "./Question"
export default function LevelBody({numQuestions, sectionData, goToNextLevel, language, levelIndex, section, questionIndex, submitFunc, validateReq, setSubmit, checkFuncs}:{numQuestions: number, goToNextLevel : any, checkFuncs : any, setSubmit: any, validateReq : any, submitFunc: (id : string, qid : number, cat : string) => Promise<void>, section : string, questionIndex : number, sectionData: Array<questionData>, language : string, levelIndex : number}) {
    return <Question
    numQuestions={numQuestions}
    language = {language}
    starterCode = {sectionData[levelIndex].starterCode}
    goToNextLevel={goToNextLevel}
    category={section}
    questionId={questionIndex}
    submitFunc = {submitFunc}
    validateReq={validateReq}
    setSubmit={setSubmit}/>
}