import { useState } from "react"
import Dropdown from "rsuite/Dropdown"
import {promises as fs} from 'fs';
export default async function LevelSelector({category} : {category : string}) {
    const data = await fs.readFile(`private/${category}.json`, 'utf8').then(JSON.parse)
    return <p>{JSON.stringify(data)} is a {typeof data}</p>//<Dropdown></Dropdown>
}