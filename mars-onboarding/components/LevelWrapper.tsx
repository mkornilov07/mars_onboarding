'use server'
import Level, { allQuestionData, questionData } from "./Level";
import { validateRequest, getSolvedQuestions, solveQuestion, getCurrentUser, logout} from "@/lib/lucia";
import { cache, use } from "react";
export const fetchSolvedQuestions = cache(async (section : string) => {
    "use server"
    let solvedQuestions;
    let user = await getCurrentUser();
    if (user == null) solvedQuestions = [];
    else solvedQuestions = (await getSolvedQuestions(user.id, section) as any[]).map(e=>e.questionindex)
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
            title: <>Cloning</>,
            lesson: <><p>A <b>respository</b> or repo is a shared collection of files (usually code)
            managed using Git. Git is a <b>version control system</b> (VCS), meaning it allows you to keep
            multiple versions of your code. Our code is managed using Git, so you could look at all the versions of our code
            starting from 2020. This is useful if we mess something up and need to roll back to a previous version. It's also
            the standard way for controlled collaboration on code.</p>
            <p>Publicly hosted repos have an associated URL. Github is a popular platform for hosting Git repos.
            On Github, you can press "Code" to get the URL of the repo.
            </p>
            <p>If you want to use and contribute to our code, the first thing you need to do is <b>clone</b> our
            repo. This is the first Git command you will learn.</p>
            <p><code>git clone REPO_URL</code> (replace REPO_URL with the repo URL) - clones (downloads) the repo at REPO_URL
            onto your disk. You can now edit the files in your copy. Don't worry, it won't change our code until you <b>push</b>.</p>
            <p><a href = "https://github.com/MARS-UVA/mars-ros"><u>Our main repo</u></a></p></>,
            starterCode: `#Clone the mars-ros repo on the MARS github
$ BLANK`,
            correctAnswers: ["git clone https://github.com/MARS-UVA/mars-ros.git"]
        },

        {
            title: <>Staging and committing changes</>,
            lesson: <><p>Now that the code is on your disk, you can change it the same way you usually edit files locally; you can
                use an IDE like VSCode for code, a text editor like Notepad for most files, a photo editor for image files, etc.</p>
                <p>After you're done editing the files, you need to "save" your changes in your copy of the repo (your <b>local repo</b>),
                and this is done by making a <b>commit</b>, which is a local version of the code.
                </p>
                <p>First, you edit some files <code>fileA</code>, <code>fileB</code>, <code>fileC</code>. Then you need to stage those changes:</p>
                <p><code>git add fileA fileB fileC</code> - stages the changes for committing. Some changes you want to keep off-record, so
                only add the changes you want to be saved. Note that <code>fileA</code>, <code>fileB</code>, <code>fileC</code> are 
                actually <b>file paths</b>, which are covered in the Linux levels.</p>
                <p><code>git commit -m MESSAGE</code> - commits the changes, making a permanent record of how the files were.</p>
                <p>Note: you are still working in your local repo, so nobody else can see these changes yet. That comes later.</p>
                <p>MESSAGE is the <b>commit message</b>, and it's supposed to be something informative, explaining what 
                    you did in this commit. "Fixed loading screen bug",
                    "Drew cowboy hat on the character", "Made the home screen prettier" are pretty good commit messages. Remember,
                    if someone discovers a bug, they will scroll down as deep as needed in the commit history to figure out where
                    the bug started to find the cause. Make it clear what you changed and what you might have broken.
                </p>
                </>,
            starterCode: `#You just got the Lidar to correctly output readings! Share these great findings with the rest of the team.
#The file you changed is read_lidar.py, and you wanna attach the readings as proof as well. They're in a file called lidar_readings.log
#For the commit message, say "fixed lidar output issue"
$ BLANK
$ BLANK`,
            correctAnswers: ["git add read_lidar.py lidar_readings.log", "git commit -m \"fixed lidar output issue\""]
        },

        {
            title: <>Remote Repository</>,
            lesson: <><p>You can interact with the <b>remote repo</b> (the shared repo) in two 
            ways: <code>git push</code> and <code>git pull</code> (no arguments). When you push, you are uploading your
            changes to the remote repo. When you pull, you sync your local repo up to date with the remote repo,
            downloading all the commits your teammates have pushed.</p>
            <p>What if you push an old version? It will mess up the code already in the remote repo. You should always make sure
                your <b>working copy</b> (local repo) is synced with the remote repo before committing (except the new changes you're
                trying to push!).</p>
                <p>After pushing, everyone in the club will see your updated version when they open the repo. You'll have made a 
                    lasting impact.</p></>,
            starterCode: `#You're working on a repo with your friend. He says he just pushed a file called list.txt that he wants you to edit.
#The commit message should be "added to the list"
#What do you do so that he's able to see your edits?
$ BLANK
# (edited the list)
$ BLANK
$ BLANK
$ BLANK
`,
            correctAnswers: ["git pull", "git add list.txt", "git commit -m 'added to the list'", "git push"]
        },

        {
            title:<>In Case of Emergency</>,
            lesson : <><p>Detached HEAD exception, deleting all the code on accident, lots of scary errors.
                Sometimes things just go really wrong. To go back to the last commit, use <code>git reset --hard</code>.</p></>,
            starterCode : "#Oh no! You accidentally messed up the codebase. What do you do? \nBLANK",
            correctAnswers : ["git reset --hard"]
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
                <li><code>apt install PACKAGE_NAME</code> - installs packages you're missing, like python</li>
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
                <li><code>mv SOURCE... DESTINATION</code> (move) - moves SOURCE file to DESTINATION directory</li>
                <li><code>cp SOURCE... DESTINATION</code> (copy) - make a copy of the SOURCE file and put it in DESTINATION</li>
                <li><code>nano FILENAME</code> - opens a text editor to edit the file</li>
                <li><code>cat FILENAME</code> - quickly see the contents of a file</li>
                <li><code>grep STRING FILE</code> - finds all instances of the STRING in the FILE. Very useful command,
                especially combined with redirection (next level). The STRING can actually be a regex pattern if
                you're familiar with those.</li>
                <p>Man pages:</p>
                <li><a target = "_blank" href = "https://man7.org/linux/man-pages/man1/mkdir.1.html"><u>mkdir</u></a></li>
                <li><a target = "_blank" href = "https://man7.org/linux/man-pages/man1/touch.1.html"><u>touch</u></a></li>
                <li><a target = "_blank" href = "https://man7.org/linux/man-pages/man1/rm.1.html"><u>rm</u></a></li>
                <li><a target = "_blank" href = "https://linux.die.net/man/1/mv"><u>mv</u></a></li>
                <li><a target = "_blank" href = "https://man7.org/linux/man-pages/man1/cp.1.html"><u>cp</u></a></li>
                <li><a target = "_blank" href="https://man7.org/linux/man-pages/man1/grep.1.html"><u>grep</u></a></li>
                </>),
            
            starterCode: 
`#Make a directory called code
$ BLANK
#Go into that directory and make a file called file1
$ BLANK
$ BLANK
#Gah! I don't wanna code! Exit that directory, make a new one called fun, and copy the file there.
$ BLANK
$ BLANK
$ BLANK
#Let's change the name of the file to something fun, like drawing.
$ BLANK
#And delete that old directory. I don't even wanna think about coding.
$ BLANK
`,
            correctAnswers: ['mkdir code', 'cd code', 'touch file1', 'cd ..', 
                'mkdir fun', 'cp code/file1 fun', 'mv fun/file1 fun/drawing', 'rm -r code']
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
        {
            title:<>Shell Scripting</>,
            lesson: <><p>Very often, we want to automate some processes on the machine. We had to do this last year when we found out
                the robot startup process was too long. To automate these processes, we write <b>shell scripts</b>, which are
                shell commands in a file, with a couple nuances.</p>
                <p>To make a shell script, we just make a file with a .bash or .sh extension. Then we change the permissions using
                <code>chmod +x FILENAME.bash</code> to make the file executable. After that we can run it
                as a program using <code>./FILENAME.bash</code> (The <code>./</code> just indicates we're referring to a file 
                in the current directory. We could replace it with the file path.)
                </p>
                <p>A shell script is a line-by-line sequence of commands, except there are a couple other things you can do.</p>
                <p>Variable assignment: We can assign a variable using <code>=</code>.</p>
                <p><code>x=5</code> sets a new variable called <code>x</code> to 5.</p>
                <p>Important: There is NO space before or after the = operator. If you add a space, you will get an error.
                    Remember, spaces are only for arguments and options.
                </p>
                <p>To reference <code>x</code> or any other variable, we use the dollar sign ($).</p>
                <p><code>echo $x</code> prints 5. This time, we use a space because the <code>$x</code> is an argument.</p>
                <p>We can even reference variables in strings: <code>echo "The value of x is $x"</code> correctly
                prints <code>The value of x is 5</code>.</p>
                <p>We can set a variable to the output of a command using backticks (``).</p>
                <p><code>filesInWorkingDir=`ls`</code> runs <code>ls</code> which lists the files in the working
                directory, takes that string and assigns a variable called <code>filesInWorkingDir</code> to it.</p>
                <p>Comments are done with hashtags (#), just like Python.</p>
                <p>If statements: they also exist, but the syntax looks different. 
                    Check <a target="_blank" href="https://www.geeksforgeeks.org/bash-scripting-introduction-to-bash-and-bash-scripting/#variables"
                    ><u>GeeksForGeeks</u></a> for more information.
                </p>
                </>,
            starterCode:`#In this shell script, we're going to run a ROS script and report the number of errors
#Errors are found in the log file navigation.log and they are labeled "Error"
#If there are no errors, print "No errors found"
#If there are N errors, print "N errors found"
rosrun navigation.py

N=BLANK
if [ $N -gt BLANK ];then
    BLANK
else
    BLANK`,
            correctAnswers:["`grep -c Error navigation.log`", "0",  "echo '$N errors found'", "echo 'No errors found'"]
        }
        
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