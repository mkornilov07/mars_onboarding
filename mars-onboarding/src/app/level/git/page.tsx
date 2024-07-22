import Link from "next/link";
import Popup from "../../../../components/Popup";
import Level from "../../../../components/Level";
// import 'prismjs/components/prism-python';

export default function GitLevel() {
    let lesson = (<p>You'll need this</p>);
    let title = (<code className="bg-transparent">git reset --hard</code>);
    let starterCode = "#Oh no! You accidentally messed up the codebase. What do you do? \nBLANK";
    return (
        <Level section = "git" lesson = {lesson} title = {title} starterCode={starterCode} language='bash' correctAnswers={["git reset --hard"]} levelName='Git Level'></Level>
)};