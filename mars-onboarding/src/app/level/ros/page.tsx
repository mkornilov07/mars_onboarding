'use client'
import React from 'react';
import Question from '../question';
import Link from 'next/link';
import Popup from '../../../../components/Popup';
import Level from '../../../../components/Level';

export default function ROSLevel({children} : {children: React.ReactNode}) {
    let lesson = (<p>A node that publishes messages in a topic is called a <b className='font-extrabold'>publisher</b>.</p>);
    let title = (<>Subscribers and Publishers</>);
    return (
    <Level lesson = {lesson} title = {title} starterCode='fehuiwe BLANK augef BLANK' language='python' correctAnswers={["dog", "cat"]} levelName='ROS Level'></Level>
)};