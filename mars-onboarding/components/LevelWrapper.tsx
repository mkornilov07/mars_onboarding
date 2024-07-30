'use server'
import Level, { allQuestionData, questionData } from "./Level";
import { validateRequest, getSolvedQuestions, solveQuestion, getCurrentUser, logout} from "@/lib/lucia";
import { GetServerSideProps } from "next";
import { cache, use } from "react";
export const fetchSolvedQuestions = cache(async (section : string) => {
    let solvedQuestions;
    let user = await getCurrentUser();
    if (user == null) solvedQuestions = [];
    else solvedQuestions = (await getSolvedQuestions(user.id, section) as any[]).map(e => e.questionIndex)
    return solvedQuestions
})
const  compareAnswer = (answer: string, key : string) => { // do more advanced logic in the future, regex and stuff
    return answer == key;
}
export async function checkAnswers(answers: string[], section : string, questionIndex : number) {
    return answers.map((answer, i)=> compareAnswer(answer, (data[section][questionIndex].correctAnswers??[])[i]));
}
export default async function LevelWrapper({
    section, suffix, language
} : {
section : string, suffix : string, language : string
}) {
    async function logoutWithRedirect() {
        'use server'
        return logout(`/level/${section}`)
    }
    // Pass data to the page via props
    
    const removeSensitiveData = ({lesson, title, starterCode, correctAnswers, checkFunction} : questionData) => ({lesson, title, starterCode, checkFunction})
    let dataWithoutAnswers : allQuestionData = {}
    Object.keys(data).forEach(k => {dataWithoutAnswers[k] = data[k].map(removeSensitiveData);
                                    dataWithoutAnswers[k].forEach((o, i) => {o.checkFunction = async (answers : Array<string>) => {"use server"; return answers.map((answer, j) => compareAnswer(answer, (data[k][i].correctAnswers??"")[j]))}})
})
    return <Level data = {dataWithoutAnswers} section = {section} suffix = {suffix} language = {language} solvedQuestions = {await fetchSolvedQuestions(section)} submitFunc = {solveQuestion} validateReq = {getCurrentUser} logout = {logoutWithRedirect}/>}


/* the data */

const data : allQuestionData = {
    "git" : [
        {lesson:<p>You'll need this</p>,
        title : (<code className="bg-transparent">git reset --hard</code>),
        starterCode : "#Oh no! You accidentally messed up the codebase. What do you do? \nBLANK",
        correctAnswers : ["git reset --hard"]
        }, 
        {lesson:<p>dummy</p>,
            title : <>dummy</>,
            starterCode : "#dummy BLANK",
            correctAnswers : ["dummy"]
            },
    ],
    "linux" : [
        {lesson: 
            (<><p>Files on the disk are organized in a tree-like structure in most operating systems, including Linux. A <b>path</b> is
             the address of the file in that tree.</p>
            <p>For example, <code>hw2.pdf</code> might be located at <code>/user/Mikhail/Documents/school/"CSO1 Homework"/hw2.pdf</code>. This means to
            get to <code>hw2.pdf</code>, we start at the root (<code>/</code>), then access the <code>user</code> directory, then
            the <code>school</code> directory, then the <code>CSO1 Homework</code> directory (directory names can have spaces, but this has to be indicated by quotes),
            and there we'll see the file.</p>
            <p>When we're running the Linux shell, we are working in one directory at a time. You can see which directory you're in
                by running <code>pwd</code> (print working directory).
            </p>
            <p>To change directories, we run <code>cd</code> (change directory), followed by the path.</p>
            <p>If we want to interact with <code>hw2.pdf</code>, we should probably go to its directory using the path from above (the <b>full path</b>):</p>
            <p><code>cd /user/Mikhail/Documents/school/"CSO1 Homework"</code> brings us to the directory.</p>
            <p>We can also use a <b>relative path</b>. If we're already in <code>user/Mikhail/Documents</code>, we don't want to retype all that
            just to get to <code>hw2.pdf</code>. Instead, we just write the part that's missing (no <code>/</code> indicates a relative path):</p>
            <p><code>cd school/"CSO1 Homework"</code></p>
            </>),
        title: <>Navigation 1</>,
        starterCode: 
`#We need to get to /u/MARS/code/mars-ros/src/nodes/odometry
$ pwd
/u/MARS/code
$ BLANK
`,
        correctAnswers: ['cd mars-ros/src/nodes/odometry']
        },
        
        {lesson: 
            (<><p>Every program (and command) in Linux takes an input and produces an output. We can use redirection to 
            manipulate these inputs and outputs.</p>
            <p>For example, if we want the <b>output</b> of <code>program1</code>
            to go into a file called <code>output.txt</code>, we'd run <code>program1 &gt; output.txt</code> (or <code>program1 &gt;&gt; output.txt</code> for appending without overwriting).
            </p>
            <p>In the same way, we can read <b>input</b> from a file into a program. We do this like so: <code>program1 &lt; input.txt</code>.</p>
            <p>We can <b>pipe</b> programs, or feed the output of <code>program1</code> into <code>program2</code> by
            running <code>program1 | program2</code>. </p>
            </>),
        title: <>Redirection</>,
        starterCode: `
#We are running code from the NVIDIA Jetson. Our startup scripts, start1.sh and start2.sh, establish the link between the Jetson and the control station.
#First, we need to append "nvidia" to the end of the file /etc/hosts to allow the connection.
BLANK
./start1.sh
#The rest of the networking operations are done by the second startup script, but it takes the Jetson's IP address as an argument. How can we give it the address without copy-pasting?
BLANK`,
        correctAnswers: ['echo "nvidia" >> /etc/hosts', 'hostname -I | start2.sh']
        },
    ],
    "ros": [
        {lesson: (<><p>A node that publishes messages in a topic is called a <b className='font-extrabold'>publisher</b>.
            A node that listens to a topic and performs actions based on what messages it receives is called a <b className='font-extrabold'>subscriber</b>.</p>
            <p>Refer to the documentation below:</p>
            <li><a target = "_blank" href = "https://docs.ros.org/en/melodic/api/rospy/html/rospy.topics.Subscriber-class.html"><u>ROSPy - Subscriber</u></a></li>
            <li><a target = "_blank" href = "https://docs.ros.org/en/melodic/api/rospy/html/rospy.topics.Publisher-class.html"><u>ROSPy - Publisher</u></a></li>
            </>),
        starterCode: `
def main():
    #Set up a ROS node that receives IR readings from our sensor and determine 
    #whether the collection bin is full by looking at the distance
    #from the sensor to the bottom of the bin
    pub = rospy.Publisher("is_bin_full", String, queue_size=10)
    def callback(data):
        #Publish "yes" if the bin is full (closer than 5 in) and "no" if the bin is not full
        if data < 5:
            BLANK
        else:
            BLANK
    rospy.init("bin_measurer")
    #Subscribe to the "ir_readings" topic, which has messages of type Int64
    rospy.Subscriber(BLANK)
    rospy.spin()

if __name__ == "__main__":
    main()
`,
        title: (<p>Subscribers and Publishers</p>),
        correctAnswers: ['pub.publish(String("yes"))', 'pub.publish(String("no"))', '"ir_readings", Int64, callback']
    },]
}