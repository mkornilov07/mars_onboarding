'use client'
import React from 'react';
import Question from '../question';
import Link from 'next/link';
import Popup from '../../../../components/Popup';
import Level from '../../../../components/Level';

export default function ROSLevel({children} : {children: React.ReactNode}) {
    let lesson = (<p>ROS is cool</p>);
    let title = (<>Subscribers and Publishers</>);
    return (
    <Level lesson = {lesson} title = {title} starterCode='' language='python' correctAnswers={[""]} levelName='ROS Level'></Level>
)};