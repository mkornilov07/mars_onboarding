'use client'
import { ReactDOM, createElement, useEffect, useState } from 'react';
import React, { JSXElementConstructor } from 'react';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import { FireworksInstance, fireworks } from '@tsparticles/fireworks';
import Particles from '@tsparticles/react';
export default function Question({children, starterCode, language, correctAnswers} : {children : React.ReactNode, starterCode : string, language : string, correctAnswers: string[]}) {
  const [questionComplete, setQuestionComplete] = useState(false);
  function replaceBlanks(s : string, language : string) {
    s = s.replaceAll('\n', '<br>');
    // console.log(`Replacing BLANK in ${s}`);
    const BLANK = "BLANK";
    const LEN_BLANK=BLANK.length;
    let i = 0;
    let counter = 0;
    let openingTag = `<code class = "language-${language} font-mono">`;
    let closingTag = `</code>`;
    let output = openingTag;
    while (i < s.length - LEN_BLANK+1) {
      // console.log(`Output is ${output}`);
      if (s.substring(i, i+LEN_BLANK) == BLANK) {
        output += closingTag + 
        `<input autocomplete='off' id = 'blank${counter}' placeholder = "enter code here" class = "font-mono shadow-inner shadow-black shadow-md hover:shadow-lg p-2 hover:bg-zinc-800 hover:bg-opacity-80 focus:bg-zinc-800 focus:bg-opacity-80 caret-red-500 tracking-wide outline-none cursor-text text-red-500 font-normal rounded"></input>`;
        if (i != s.length - LEN_BLANK) output += openingTag;
        counter += 1;
        i += LEN_BLANK;
      }
      else {
        output += s[i];
        i += 1;
      }
    }
    output += s.substring(i+1, s.length);
    output += closingTag;
    return output;
  }
  function onSubmit() {
    let allCorrect = true;
    for (let i = 0; i < correctAnswers.length; i++) {
      let box = document.getElementById(`blank${i}`);
      let response = box?.value;
      // console.log(`You answered ${response}`);
      // console.log(`Correct answer is ${correctAnswers[i]}`)
      if (response == correctAnswers[i]) {
        console.log("Good");
        box?.animate([{"color": "lightgreen"}, {"color": "black"}], 2000);
      }
      else {
        console.log("Bad");
        allCorrect = false;
        box?.animate([{"color": "red"}, {"color": "black"}], 2000);
      }
      
    }
    if(allCorrect) {
      fireworks({sounds:false});
      setQuestionComplete(true);
    }
  }
    return (
      (<div>
        <div dangerouslySetInnerHTML={{__html: replaceBlanks(starterCode, language)}}
         className = "bg-zinc-800 rounded p-5"></div>
        <br/>
        <Particles></Particles>
        <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {onSubmit}>
          Submit
        </button>
      </div>)
    )
}