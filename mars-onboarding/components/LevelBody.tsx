'use client'
import { questionData } from "./Level"
import Question from "./Question"
export default function LevelBody({sectionData, language, levelIndex, section, questionIndex, submitFunc, validateReq, setSubmit, checkFuncs}:{checkFuncs : any, setSubmit: any, validateReq : any, submitFunc: (id : string, qid : number, cat : string) => Promise<void>, section : string, questionIndex : number, sectionData: Array<questionData>, language : string, levelIndex : number}) {
    return <Question
    language = {language}
    starterCode = {sectionData[levelIndex].starterCode}
    checkFuncs={checkFuncs}
    category={section}
    questionId={questionIndex}
    submitFunc = {submitFunc}
    validateReq={validateReq}
    setSubmit={setSubmit}/>
}