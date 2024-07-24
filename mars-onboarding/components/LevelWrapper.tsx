'use server'
import Level from "./Level";
import { validateRequest, getSolvedQuestions, solveQuestion, getCurrentUser, logout} from "@/lib/lucia";
import { GetServerSideProps } from "next";
import { cache, use } from "react";
const fetchSolvedQuestions = cache(async (section : string) => {
    let solvedQuestions;
    let user = await getCurrentUser();
    if (user == null) solvedQuestions = [];
    else solvedQuestions = (await getSolvedQuestions(user.id, section) as any[]).map(e => e.questionIndex)
    return solvedQuestions
})
export default async function LevelWrapper({
    section, suffix, language
} : {
section : string, suffix : string, language : string
}) {
    async function logoutWithRedirect() {
        'use server'
        return logout(`/level/${section}`)
    }
    // Pass data to the page via props
    return <Level section = {section} suffix = {suffix} language = {language} solvedQuestions = {await fetchSolvedQuestions(section)} submitFunc = {solveQuestion} validateReq = {getCurrentUser} logout = {logoutWithRedirect}/>}