import Link from "next/link";
import Popup from "../../../../components/Popup";
import Level from "../../../../components/Level";

export default function GitLevel() {
    let lesson = (<p>You'll need this</p>);
    let title = (<code className="bg-transparent">git reset --hard</code>)
    return (
        <Level lesson = {lesson} title = {title} starterCode='' language='python' correctAnswers={[""]} levelName='Git Level'></Level>
)};