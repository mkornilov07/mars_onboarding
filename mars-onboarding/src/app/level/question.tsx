'use client'
import { ReactDOM, createElement, useEffect } from 'react';
import React, { JSXElementConstructor } from 'react';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';

export default function Question({children, starterCode, language, correctAnswers} : {children : React.ReactNode, starterCode : string, language : string, correctAnswers: string[]}) {
  function replaceBlanks(s : string, language : string) {
    const BLANK = "BLANK";
    const LEN_BLANK=BLANK.length;
    let i = 0;
    let counter = 0;
    let openingTag = `<code class = "language-${language} font-mono">`;
    let closingTag = `</code>`;
    let output = openingTag;
    while (i < s.length - LEN_BLANK) {
      if (s.substring(i, i+LEN_BLANK) == BLANK) {
        output += closingTag + 
        `<code><input autocomplete='false' id = 'blank${counter}' placeholder = "enter code here" class = "shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] shadow-black shadow-lg p-2 hover:bg-zinc-800 hover:bg-opacity-80 focus:bg-zinc-800 focus:bg-opacity-80 caret-red-500 tracking-wide outline-none cursor-text text-red-500 font-normal rounded"></input></code>` 
        + openingTag;
        counter += 1;
        i += LEN_BLANK;
      }
      else {
        output += s[i];
        i += 1;
      }
    }
    output += s.substring(i, s.length);
    output += closingTag;
    return output;
  }
  function onSubmit() {
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
        box?.animate([{"color": "red"}, {"color": "black"}], 2000);
      }
    }
  }
    return (
      (<div>
        <div dangerouslySetInnerHTML={{__html: replaceBlanks(starterCode, language)}}
         className = "bg-zinc-800 rounded p-5"></div>
        <br/>
        <button className ="bg-red-800 active:shadow-[0_0_5px_#666] opacity-80 cursor-pointer border-red-600 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:shadow-red-600 hover:bg-red-800 hover:opacity-80 text-white font-bold py-2 px-4 rounded" onClick = {onSubmit}>
          Submit
        </button>
      </div>)
    )
}