'use client'
import { ReactDOM, createElement, useEffect, useState } from 'react';
import React, { JSXElementConstructor } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';

import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism.css';
const pythonGrammar = {
	'comment': {
		pattern: /(^|[^\\])#.*/,
		lookbehind: true,
		greedy: true
	},
	'string-interpolation': {
		pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
		greedy: true,
		inside: {
			'interpolation': {
				// "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
				pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
				lookbehind: true,
				inside: {
					'format-spec': {
						pattern: /(:)[^:(){}]+(?=\}$)/,
						lookbehind: true
					},
					'conversion-option': {
						pattern: /![sra](?=[:}]$)/,
						alias: 'punctuation'
					},
					rest: null
				}
			},
			'string': /[\s\S]+/
		}
	},
	'triple-quoted-string': {
		pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
		greedy: true,
		alias: 'string'
	},
	'string': {
		pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
		greedy: true
	},
	'function': {
		pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
		lookbehind: true
	},
	'class-name': {
		pattern: /(\bclass\s+)\w+/i,
		lookbehind: true
	},
	'decorator': {
		pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
		lookbehind: true,
		alias: ['annotation', 'punctuation'],
		inside: {
			'punctuation': /\./
		}
	},
	'keyword': /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
	'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	'boolean': /\b(?:False|None|True)\b/,
	'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
	'operator': /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
	'punctuation': /[{}[\];(),.:]/
};

export default function Question({children, starterCode, language, correctAnswers} : {children : React.ReactNode, starterCode : string, language : string, correctAnswers: string[]}) {
  const [questionComplete, setQuestionComplete] = useState(false);
  useEffect(() => Prism.highlightAll(), []);
  // useEffect(()=> {
  //   async function a() {
  //     await new Promise(r => setTimeout(r, 5000));
  //     console.log("Highlighting")
  //     Prism.highlightAll();
  //   }
  //   console.log("started");
  //   a();
  // }
  // )
  function replaceBlanks(s : string, language : string) {
    // s = s.replaceAll('\n', '<br>');
    // console.log(`Replacing BLANK in ${s}`);
    const BLANK = "BLANK";
    const LEN_BLANK=BLANK.length;
    let openingTag = `<code class = "language-${language}" style = "text-shadow: none">`;
    let closingTag = `</code>`;
    let codeArr = s.split(BLANK);
    let output = "";
    let codeChunks=  [];
    console.log(`codeArr ${codeArr}`);
    for(let i = 0; i < codeArr.length; i++) {
      output+= openingTag;
      codeChunks = codeArr[i].split("\n");
      console.log(`Code chunks ${codeChunks}`);
      for (let j =0; j < codeChunks.length; j++) {
        if (codeChunks[j].trim() == "") {continue;}
        
        output += Prism.highlight(codeChunks[j], pythonGrammar, "python");
        if (j != codeArr[i].length-1 || codeArr[i].endsWith("\n")) {
          output += "<br>";
      }
      
      }
      output += closingTag;
      output += `<input autocomplete='off' id = 'blank${i}' placeholder = "enter code here" class = "font-mono shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] shadow-black shadow-lg p-2 hover:bg-zinc-800 hover:bg-opacity-80 focus:bg-zinc-800 focus:bg-opacity-80 caret-red-500 tracking-wide outline-none cursor-text text-red-500 font-normal rounded"></input>`;
      output += openingTag;
    }
    console.log(`Output ${output}`)
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
        box?.animate([{"color": "black"}, {"color": "red"}], 2000);
      }
      
    }
    if(allCorrect) {
      // fireworks({sounds:false});
      setQuestionComplete(true);
    }
  }
  const [rendered, setRendered] = useState(false);
  useEffect(()=>setRendered(true));
  let codeElement = <div dangerouslySetInnerHTML={{__html: replaceBlanks(starterCode, language)}}
  className = "bg-zinc-800 rounded p-5"></div>
    return (
      (<div>
        {rendered && codeElement}
        <br/>
        <button className ="bg-red-800 active:shadow-[0_0_5px_#666] opacity-80 cursor-pointer border-red-600 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:shadow-red-600 hover:bg-red-800 hover:opacity-80 text-white font-bold py-2 px-4 rounded" onClick = {onSubmit}>
          Submit
        </button>
      </div>)
    )
}