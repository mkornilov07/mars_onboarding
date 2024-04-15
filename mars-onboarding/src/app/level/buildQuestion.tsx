'use client'
import React from "react";
import { CodeBlock } from 'react-code-blocks';
export function buildQuestion({children, code, lang} : {children:React.ReactNode, code: string, lang : string}) {
    return <div color="blue"><h3>I'm blue</h3>{children}<CodeBlock language={lang} text={code}></CodeBlock></div>;
}