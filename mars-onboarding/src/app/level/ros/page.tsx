'use client'
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
export default function ROSLevel({children,} : { children: React.ReactNode}) {
    return (<div><h1>ROS Level</h1>
    <SyntaxHighlighter language="python">print("hello world")</SyntaxHighlighter><input></input>compoennt</div>);
}