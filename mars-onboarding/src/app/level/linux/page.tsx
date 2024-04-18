import Link from "next/link";
import Popup from "../../../../components/Popup";
import Level from "../../../../components/Level";

export default function LinuxLevel() {
    let title = (<>Redirection</>);
    let lesson = (<p>The pipe (|) character looks funny</p>);
    let starterCode = "";
    let correctAnswers= [""];
    return (
        <Level language = "python" lesson = {lesson} title = {title} starterCode = {starterCode} correctAnswers={correctAnswers} levelName='Linux Level'/>
    );
};