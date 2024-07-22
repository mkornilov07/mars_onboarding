"use server"
import Link from "next/link";
import Popup from "./Popup";
import { ReactNode } from "react";
import { start } from "repl";
import dynamic from 'next/dynamic'
import Question from "./Question";
// import { validateRequest } from "@/lucia";
import getUser from "./User";
import { useEffect } from "react";
import User from "./User";
import LevelSelector from "./LevelSelector";
import React from "react";

// const NoSSR = dynamic(() => import('../components/question'), { ssr: false })
export default async function Level({
    section, lesson, title, language, starterCode, correctAnswers, levelName
} : {
section : string, lesson : ReactNode, title : ReactNode, language : string, starterCode : string, correctAnswers: string[], levelName: string
}) {
    return (
        <div>
            <div className = "flex opacity-90 shadow-md shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f] shadow-black text-white bg-black sticky justify-evenly top w-full h-30">
                <Link href = "/level/" className = "text-white opacity-60 hover:opacity-100 m-5 self-center content-start select-none text-5xl hover:text-red-700">⬅</Link>
                <h1 className = "m-10 select-none opacity-90 font-bold font-mono text-4xl place-self-center">{levelName} - Level {}</h1>
                <div className = "m-10 place-content-center">
                    <Popup contents = {lesson}></Popup>
                </div>
                <User/>
                <LevelSelector solvedQuestions = {[]} titles = {data[section].map(question => question.title)} ></LevelSelector>
            </div>
            <div className = "z-0 flex-col select-none min-h-screen w-full bg-zinc-900 text-white">
                <div className = "flex container mx-auto flex-col max-w-[900px] align-items-center space-evenly">
                    <p className = "flex text-zinc-900 bg-zinc-900">empty placeholder</p>
                    <p className = "flex text-zinc-900 bg-zinc-900">empty placeholder</p>
                    <Question language={language} starterCode={starterCode} correctAnswers={correctAnswers}></Question>
                </div>
            </div>
        </div>);
}

export interface questionData {
    correctAnswers: string[],
    starterCode: string,
    lesson : React.JSX.Element,
    title : React.JSX.Element
}
export interface allQuestionData {
    [section: string] : Array<questionData>
}
const data : allQuestionData = {
    "git" : [
        {lesson:<p>You'll need this</p>,
        title : (<code className="bg-transparent">git reset --hard</code>),
        starterCode : "#Oh no! You accidentally messed up the codebase. What do you do? \nBLANK",
        correctAnswers : ["git reset --hard"]
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