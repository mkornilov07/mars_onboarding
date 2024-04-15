'use client'
import React from 'react';
import Question from '../question';
export default function ROSLevel({children,} : { children: React.ReactNode}) {
    return (<div><h1>ROS Level</h1>
    <Question language="python" starterCode='dog' validate={(code) => true}><div></div></Question>
    compoennt</div>);
}