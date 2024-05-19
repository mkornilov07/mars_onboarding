import Link from "next/link";
import Popup from "../../../../components/Popup";
import Level from "../../../../components/Level";
// import 'prismjs/components/prism-python';

export default function LinuxLevel() {
    let title = (<>Redirection</>);
    let lesson = (<><p>Every program (and command) in Linux takes an input and produces an output. We can use redirection to 
        manipulate these inputs and outputs.</p>
        <p>For example, if we want the <b>output</b> of <code>program1</code>
        to go into a file called <code>output.txt</code>, we'd run <code>program1 &gt; output.txt</code> (or <code>program1 &gt;&gt; output.txt</code> for appending without overwriting).
        </p>
        <p>In the same way, we can read <b>input</b> from a file into a program. We do this like so: <code>program1 &lt; input.txt</code>.</p>
        <p>We can <b>pipe</b> programs, or feed the output of <code>program1</code> into <code>program2</code> by
         running <code>program1 | program2</code>. </p>
    </>);
    let starterCode = `
#We are running code from the NVIDIA Jetson. Our startup scripts, start1.sh and start2.sh, establish the link between the Jetson and the control station.
#First, we need to append "nvidia" to the end of the file /etc/hosts to allow the connection.
BLANK
./start1.sh
#The rest of the networking operations are done by the second startup script, but it takes the Jetson's IP address as an argument. How can we give it the address without copy-pasting?
BLANK`;
    return (
        <Level lesson = {lesson} title = {title} starterCode={starterCode} language='bash' correctAnswers={['echo "nvidia" >> /etc/hosts', 'hostname -I | start2.sh']} levelName='Linux Level'></Level>
)};