'use client'
import { questionData } from "./Level"
import Question from "./Question"
export default function LevelBody({sectionData, language, levelIndex}:{sectionData: Array<questionData>, language : string, levelIndex : number}) {
    return <Question
    language = {language}
    starterCode = {sectionData[levelIndex].starterCode}
    correctAnswers={sectionData[levelIndex].correctAnswers}/>
}