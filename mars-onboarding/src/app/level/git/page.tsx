import Link from "next/link";
import Popup from "../../../../components/Popup";
import Level from "../../../../components/Level";

export default function GitLevel() {
    let lesson = (<p>You'll need this</p>);
    let title = (<code>git reset --hard</code>);
    let starterCode = "";
    let correctAnswers= [""];
    return (
        <Level language = "python" lesson = {lesson} title = {title} starterCode = {starterCode} correctAnswers={correctAnswers} levelName='Git Level'/>
    );
};