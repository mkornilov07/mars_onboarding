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
    const  compareAnswer = (answer: string, key : string) => { // do more advanced logic in the future, regex and stuff
        "use server"; return answer == key;
    }
    const removeSensitiveData = ({lesson, title, starterCode, correctAnswers, checkFunction} : questionData) => ({lesson, title, starterCode, checkFunction})
    let dataWithoutAnswers : allQuestionData = {}
    Object.keys(data).forEach(k => {dataWithoutAnswers[k] = data[k].map(removeSensitiveData);
                                    dataWithoutAnswers[k].forEach((o, i) => o.checkFunction = (answers : Array<string>) => {"use server"; return answers.map((answer, j) => compareAnswer(answer, (data[k][i].correctAnswers??"")[j]))})
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