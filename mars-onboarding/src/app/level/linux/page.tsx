import Link from "next/link";
import Popup from "../../../../components/Popup";
import Level from "../../../../components/Level";

export default function LinuxLevel() {
    let title = (<>Redirection</>);
    let lesson = (<p>The pipe (|) character looks funny</p>);
    return (
        <Level lesson = {lesson} title = {title} starterCode='' language='python' correctAnswers={[""]} levelName='Linux Level'></Level>
)};