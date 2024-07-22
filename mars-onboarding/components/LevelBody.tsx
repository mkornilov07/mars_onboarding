'use client'
import { questionData } from "./Level"
import { levelIndex } from "./LevelSelector"
import Question from "./Question"
export default function LevelBody({sectionData, language}:{sectionData: Array<questionData>, language : string}) {
    return <Question
    language = {language}
    starterCode = {sectionData[levelIndex].starterCode}
    correctAnswers={sectionData[levelIndex].correctAnswers}/>
}