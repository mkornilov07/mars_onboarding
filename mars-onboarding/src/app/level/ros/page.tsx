'use client'
import React from 'react';
import Question from '../question';
import Link from 'next/link';
import Popup from '../../../../components/Popup';

export default function ROSLevel({children} : {children: React.ReactNode}) {
    let lesson = (<p>ROS is cool</p>);
    let title = (<>Subscribers and Publishers</>);
    return (
    <div>
        <div className = "flex text-white bg-black sticky justify-between top w-full h-30">
            <Link href = "/level/" className = "text-white m-5 self-center content-start text-5xl hover:text-red-700">⬅</Link>
            <h1 className = "m-10 select-none font-bold text-4xl place-self-center">ROS Level</h1>
            <div className = "m-10 select-none cursor-help place-content-center">
                <Popup contents = {lesson} title = {title}></Popup>
            </div>
        </div>
        <div className = "z-0 flex-col min-h-screen w-full bg-zinc-900 text-white place-items-center">
            <p className = "text-zinc-900 bg-zinc-900">empty placeholder</p>
            <p className = "text-zinc-900 bg-zinc-900">empty placeholder</p>
            <Question language="python" starterCode="print('hello world') Catto's rapper name is BLANK and his favorite food is BLANK bread" correctAnswers={["LBC", "garlic"]}><div></div></Question>
        </div>
    </div>
)};