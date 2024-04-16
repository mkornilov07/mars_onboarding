'use client'
import React from 'react';
import Question from '../question';
export default function ROSLevel({children,} : { children: React.ReactNode}) {
    return (<div><h1>ROS Level</h1>
    <Question language="python" starterCode="Catto's rapper name is BLANK and his favorite food is BLANK bread" correctAnswers={["LBC", "garlic"]}><div></div></Question>
    compoennt</div>);
}