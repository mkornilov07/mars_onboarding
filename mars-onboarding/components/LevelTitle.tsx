'use client'
import React from "react"
import { levelIndex } from "./LevelSelector"
export default function LevelTitle({titles} : {titles: Array<React.JSX.Element>}) {
    return titles[levelIndex]
}