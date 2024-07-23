'use client'
import { questionData } from "./Level"
import Question from "./Question"
export default function LevelBody({sectionData, language, levelIndex, section, questionIndex, submitFunc, validateReq}:{validateReq : any, submitFunc: (id : string, qid : number, cat : string) => Promise<void>, section : string, questionIndex : number, sectionData: Array<questionData>, language : string, levelIndex : number}) {
    return <Question
    language = {language}
    starterCode = {sectionData[levelIndex].starterCode}
    correctAnswers={sectionData[levelIndex].correctAnswers}
    category={section}
    questionId={questionIndex}
    submitFunc = {submitFunc}
    validateReq={validateReq}/>
}