'use client'
import React from 'react';
import Question from '../question';
import Link from 'next/link';
import Popup from '../../../../components/Popup';
import Level from '../../../../components/Level';

export default function ROSLevel({children} : {children: React.ReactNode}) {
    let lesson = (<><p>A node that publishes messages in a topic is called a <b className='font-extrabold'>publisher</b>.
    A node that listens to a topic and performs actions based on what messages it receives is called a <b className='font-extrabold'>subscriber</b>.</p>
    <p></p>
</>);
    let title = (<>Subscribers and Publishers</>);
    return (
    <Level lesson = {lesson} title = {title} starterCode='print("hello world") BLANK gwefhioe BLANK' language='python' correctAnswers={["bruh"]} levelName='ROS Level'></Level>
)};