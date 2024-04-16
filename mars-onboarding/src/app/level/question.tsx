import { ReactDOM, createElement } from 'react';
import React, { JSXElementConstructor } from 'react';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { Container } from 'postcss';
export default function Question({children, starterCode, language, correctAnswers} : {children : React.ReactNode, starterCode : string, language : string, correctAnswers: string[]}) {
  function handleBlanks(s : string) {
    var i = 0;
    var counter = 0;
    var output = document.createElement('code');
        while (i < s.length-5) {
      if (s.substring(i, i+5) == "BLANK") {
        output.innerHTML += `<input id = 'blank${counter}'></input>`
        i += 5;
      }
      else {
        output.innerHTML += s[i];
        i += 1;
      }
    }
    return output;
  }
  function onSubmit() {
    if (true) {
      console.log("Good");
    }
    else {
      console.log("Bad");
    }
  }
    return (
      <Container child = {handleBlanks(starterCode)}/>
        
    )
}