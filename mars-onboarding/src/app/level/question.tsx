'use client'
import { ReactDOM, createElement, useEffect } from 'react';
import React, { JSXElementConstructor } from 'react';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { Container } from 'postcss';
import Prism from 'prismjs';
export default function Question({children, starterCode, language, correctAnswers} : {children : React.ReactNode, starterCode : string, language : string, correctAnswers: string[]}) {
  function replaceBlanks(s : string, language : string) {
    const BLANK = "BLANK";
    const LEN_BLANK=BLANK.length;
    let i = 0;
    let counter = 0;
    let openingTag = `<code class = "language-${language} add-some-styling-later-idk-what-tailwind-looks-like">`;
    let closingTag = `</code>`;
    let output = openingTag;
    while (i < s.length - LEN_BLANK) {
      if (s.substring(i, i+LEN_BLANK) == BLANK) {
        output += closingTag + 
        `<code><input autocomplete='false' id = 'blank${counter}' class = "text-black bg-gray-600 focus:bg-gray-300 focus:border-red-600"></input></code>` 
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
        <div dangerouslySetInnerHTML={{__html: replaceBlanks(starterCode, language)}}></div>
        <br/>
        <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {onSubmit}>
          Submit
        </button>
      </div>)
    )
}