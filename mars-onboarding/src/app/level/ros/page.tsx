'use client'
import React from 'react';
import Question from '../question';
import Link from 'next/link';

export default function ROSLevel({children,} : { children: React.ReactNode}) {
    return (
    <div>
        <div className = "flex text-white items-start content-start bg-black sticky top w-full h-30">
            <Link href = "/level/" className = "text-white m-5 text-5xl hover:text-red-700">⬅</Link>
            <h1>ROS Level</h1>
        </div>
        <div className = "flex-col min-h-screen w-full bg-black text-white">
            <Question language="python" starterCode="Catto's rapper name is BLANK and his favorite food is BLANK bread" correctAnswers={["LBC", "garlic"]}><div></div></Question>
        </div>
    compoennt
    </div>);
}