import Link from "next/link";
import Popup from "../../../../components/Popup";
import Level from "../../../../components/Level";

export default function GitLevel() {
    let lesson = (<p>You'll need this</p>);
    let title = (<code className="bg-transparent">git reset --hard</code>);
    let starterCode = "%Oh no! You accidentally messed up the codebase. What do you do? \n BLANK";
    return (
        <Level lesson = {lesson} title = {title} starterCode={starterCode} language='python' correctAnswers={["git reset --hard"]} levelName='Git Level'></Level>
)};