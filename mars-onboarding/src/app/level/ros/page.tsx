'use client'
import React from 'react';
import Question from '../question';
import Link from 'next/link';
import Popup from '../../../../components/Popup';
import Level from '../../../../components/Level';

export default function ROSLevel({children} : {children: React.ReactNode}) {
    let lesson = (<p>ROS is cool</p>);
    let title = (<>Subscribers and Publishers</>);
    let starterCode = "";
    let correctAnswers= [""];
    return (
        <Level language = "python" lesson = {lesson} title = {title} starterCode = {starterCode} correctAnswers={correctAnswers} levelName='ROS Level'/>
    );
};