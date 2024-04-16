import { ReactDOM, createElement } from 'react';
import React, { JSXElementConstructor } from 'react';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { Container } from 'postcss';
export default function Question({children, starterCode, language, correctAnswers} : {children : React.ReactNode, starterCode : string, language : string, correctAnswers: string[]}) {
  function replaceBlanks(s : string) {
    let i = 0;
    let counter = 0;
    let output = "";
        while (i < s.length - 5) {
      if (s.substring(i, i+5) == "BLANK") {
        output += `<input id = 'blank${counter}'></input>`;
        counter += 1;
        i += 5;
      }
      else {
        output += s[i];
        i += 1;
      }
    }
    output += s.substring(i, s.length);
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
      (<div><code dangerouslySetInnerHTML={{__html: replaceBlanks(starterCode)}}></code>
      <br/>
      <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {onSubmit}>Submit</button></div>)
    )
}