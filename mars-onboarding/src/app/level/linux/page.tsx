import Link from "next/link";
import Popup from "../../../../components/Popup";
import Level from "../../../../components/Level";

export default function LinuxLevel() {
    let title = (<>Redirection</>);
    let lesson = (<p>Every program (and command) in Linux takes an input and produces an output. We can "pipe" programs,
        or feed the output of <code>program1</code> into <code>program2</code> by running <code>program1 | program2</code> 
    </p>);
    return (
        <Level lesson = {lesson} title = {title} starterCode='' language='shell' correctAnswers={[""]} levelName='Linux Level'></Level>
)};