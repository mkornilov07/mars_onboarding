'use server'

import Level from "./Level"

export default async function LevelWrapper({
    section, suffix, language
} : {
section : string, suffix : string, language : string
}) {
    let solvedQuestions : string = await fetch("https://google.com")
    
    return <Level section = {section} suffix = {suffix} language = {language} solvedQuestions = {[]}/>}