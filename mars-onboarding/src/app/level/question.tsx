
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
export default function Question({children, starterCode, language, validate} : {children : React.ReactNode, starterCode : string, language : string, validate: (code : string) => boolean}) {
  const [code, setCode] = React.useState(
    starterCode
  );
  function onSubmit() {
    let submittedCode = code;
    if (validate(submittedCode)) {
      console.log("Good");
    }
    else {
      console.log("Bad");
    }
  }
    return (<div>
      <code>
        print("hello world")<br></br>
        print("Hello <input></input>")<br/>
        print("dog")<br/>
      </code>
        <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.python)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}/>
        
    </div>)
}