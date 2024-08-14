'use server'
import Level, { allQuestionData, questionData } from "./Level";
import { validateRequest, getSolvedQuestions, solveQuestion, getCurrentUser, logout} from "@/lib/lucia";
import { cache, use } from "react";
export const fetchSolvedQuestions = cache(async (section : string) => {
    let solvedQuestions;
    let user = await getCurrentUser();
    if (user == null) solvedQuestions = [];
    else solvedQuestions = (await getSolvedQuestions(user.id, section) as any[]).map(e => e.questionIndex)
    return solvedQuestions
})

const  compareAnswer = (answer: string, key : string) => { // do more advanced logic in the future, regex and stuff
    return answer.replaceAll(" ", "").replaceAll('"', "'") == key.replaceAll(" ", "").replaceAll('"', "'");
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
        return logout('/level')
        //return logout(`/level/${section}`)
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
        {
            lesson:<p>You'll need this</p>,
            title : (<code className="bg-transparent">git reset --hard</code>),
            starterCode : "#Oh no! You accidentally messed up the codebase. What do you do? \nBLANK",
            correctAnswers : ["git reset --hard"]
        }, 
        {
            lesson:<p>dummy</p>,
            title : <>dummy</>,
            starterCode : "#dummy BLANK",
            correctAnswers : ["dummy"]
        },
    ],
    "linux" : [
        {
            lesson: 
                (<><p>We execute commands in the Linux <b>terminal</b>, which is a way to interface with the Linux <b>shell</b>, the
                lowest part of the operating system you can access.</p>
                <p>In the shell, you can manipulate files, packages, devices, and more with just commands.</p>
                <p>The first command you will learn is <code>echo</code>, it takes one <b>argument</b> and prints it back in the terminal.</p>
                <p>Example: Executing <code>echo Hello</code> will print <code>Hello</code> to the shell. The command and arguments are separated by spaces.</p>
                <p>What if we want to include a space in our argument, like if we want to print <code>Hello world</code>? We just wrap the
                 argument in quotes (<code>echo "Hello world"</code>). Otherwise, it would look like there's 2 arguments.</p>
                <p>For this lesson, imagine you just opened the terminal and need to print <code>Hello, MARS!</code></p>
                </>),
            title: <>Commands 1</>,
            starterCode: 
`$ BLANK
`,
            correctAnswers: ['echo "Hello, MARS!"']
        },
        {
            lesson: 
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
                <p>We can also use <code>.</code> (current directory) or <code>..</code> (parent directory) in the path. If we are in 
                <code>/user/Mikhail/Documents/school/"CSO1 Homework"</code> and we wanna navigate to 
                <code>/user/Mikhail/Documents/secretplans</code>, we would run</p>
                <p><code>cd ../../secretplans</code></p>
                </>),
            title: <>Navigation</>,
            starterCode: 
`#We need to get to /u/MARS/code/mars-ros/nodes/odometry
$ pwd
/u/MARS/code
$ BLANK
#Oops, I meant /u/MARS/code/hero-serial/odom
$ BLANK
`,
            correctAnswers: ['cd mars-ros/nodes/odometry', 'cd ../../../hero-serial/odom']
        },
        {
            title: <>Commands 2</>,
            lesson: 
                (<><p>Most commands have <b>options</b>, which are optional arguments like <code>-r</code> or <code>-A 52</code> you can provide
                to do some slightly different behavior. When you look at a <code>man</code> (manual) page by running <code>man echo</code>
                for example, you'll see all the options that the <code>echo</code> command takes, along with all other information 
                about <code>echo</code>.</p>
                <p>Options usually come before the arguments of the command, so if you wanted to print <code>Hello</code> and also
                provide the <code>-n</code> option (echo without trailing newline), you would run <code>echo -n Hello</code></p> 
                <p>Here are some commands you will probably use the first time you enter a Linux environment:</p>
                <li><code>ls</code> (list) - lists the files and directories in your working directory</li>
                <li><code>locate FILENAME</code> - finds files that match the name and prints the paths </li>
                <p>Man pages below:</p>
                <li><a target = "_blank" href="https://man7.org/linux/man-pages/man1/ls.1.html"><u>ls man page</u></a></li>
                <li><a target = "_blank" href = "https://www.man7.org/linux/man-pages/man1/locate.1.html"><u>locate man page</u></a></li>
                </>),
            starterCode: 
`$ ls
Homework    Photos
Videos      Games
shrek.jpg

#I could have sworn I had another directory in here. I called it something like .secret_files but it's not appearing!?
$ BLANK

...

#Last time I tried to locate a file called resume.pdf, my computer crashed! How do I limit the number of results to 50 using the -l option?
$ BLANK
`,
            correctAnswers: ['ls -a','locate -l 50 resume.pdf']
        },
        {
            title: <>File Operations</>,
            lesson: 
                (<><p>Now that we can navigate the filesystem, let's learn to manipulate it!</p>
                <li><code>mkdir DIRNAME...</code> (make directory) - makes a new directory called DIRNAME (the ... after NAME means we can specify multiple names 
                separated by spaces)</li>
                <li><code>touch FILENAME...</code> - creates a new file called FILENAME (and other things too, check out the man page!)</li>
                <li><code>rm FILE...</code> (remove) - removes the file called FILE, can also remove directories</li>
                <li><code>mv</code> (move) - </li>
                <p>Man pages:</p>
                <li><a target = "_blank" href = "https://man7.org/linux/man-pages/man1/mkdir.1.html"><u>mkdir</u></a></li>
                <li><a target="_blank" href = "https://man7.org/linux/man-pages/man1/touch.1.html"><u>touch</u></a></li>
                <li><a target = "_blank" href = "https://man7.org/linux/man-pages/man1/rm.1.html"></a>rm</li>
                </>),
            
            starterCode: 
`$ BLANK
`,
            correctAnswers: ['echo "Hello, MARS!"']
        },
        {
            lesson: 
                (<><p>Every program (and command) in Linux takes an input and produces an output. We can use redirection to 
                manipulate these inputs and outputs.</p>
                <p>For example, if we want the <b>output</b> of <code>program1</code>
                to go into a file called <code>output.txt</code>, we'd run <code>program1 &gt; output.txt</code> (or <code>program1 &gt;&gt; output.txt</code> for appending without overwriting).
                </p>
                <p>In the same way, we can read <b>input</b> from a file into a program. We do this by running <code>program1 &lt; input.txt</code>.</p>
                <p>We can <b>pipe</b> programs, or feed the output of <code>program1</code> into <code>program2</code> by
                running <code>program1 | program2</code>. </p>
                <p>Man pages:</p>
                <li><a target="_blank" href = "https://linux.die.net/man/1/hostname"><u>hostname</u></a></li>
                </>),
            title: <>Redirection</>,
            starterCode: `
#We are running code from the NVIDIA Jetson. Our startup scripts, start1.sh and start2.sh, establish the link between the Jetson and the control station.
#First, we need to append "nvidia" to the end of the file /etc/hosts to allow the connection.
$ BLANK
$ ./start1.sh
#The rest of the networking operations are done by the second startup script, but it takes the Jetson's IPv4 address (the "network addresses") as an argument. How can we give it the address without copy-pasting?
$ BLANK`,
            correctAnswers: ['echo nvidia >> /etc/hosts', 'hostname -I | start2.sh']
        },
        
    ],
    "ros": [
        {
            lesson: (<><p>A node that publishes messages in a topic is called a <b>publisher</b>.
                A node that listens to a topic and performs actions based on what messages it receives is called a <b>subscriber</b>.</p>
                <p>Refer to the documentation below:</p>
                <li><a target = "_blank" href = "https://docs.ros.org/en/melodic/api/rospy/html/rospy.topics.Subscriber-class.html"><u>ROSPy - Subscriber</u></a></li>
                <li><a target = "_blank" href = "https://docs.ros.org/en/melodic/api/rospy/html/rospy.topics.Publisher-class.html"><u>ROSPy - Publisher</u></a></li>
                </>),
            starterCode: `
import rospy
from std_msgs.msg import Int64, String
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
        title: <>Subscribers and Publishers</>,
        correctAnswers: ['pub.publish(String("yes"))', 'pub.publish(String("no"))', '"ir_readings", Int64, callback']
    },]
}