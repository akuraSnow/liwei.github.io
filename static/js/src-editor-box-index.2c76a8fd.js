(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"./src/EditorBox/index.less":function(e,t,n){},"./src/EditorBox/index.mdx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return O}));var a=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=n("react"),r=n.n(o),i=n("./node_modules/@mdx-js/react/dist/esm.js"),s=n("./node_modules/docz/dist/index.esm.js"),c=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js"),l=n.n(c),d=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),b=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),u=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js"),p=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js"),m=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper.js"),j=n("./src/QuestionEditor/editor/richtext.tsx"),f=n("./src/QuestionEditor/utils/client.ts"),h=(n("./src/EditorBox/index.less"),function(e){Object(p.a)(a,e);var t,n=Object(m.a)(a);function a(e){var t;return Object(b.a)(this,a),(t=n.call(this,e)).changeValue=function(e){},t.postion=function(e){},t.positionInsertFormula=function(e){},Object(f.a)((function(){t.setState({depLoaded:!0})})),t.state={hasError:!1,orderSortVisible:!1,depLoaded:!1,modalPosition:{visible:!1,ActiveKey:"0",left:"calc(50% - 200px)",top:"calc(50vh - 207px)"},modalPositionInsertFormula:{visible:!1,ActiveKey:"0",left:"calc(50% - 500px)",top:"calc(50vh - 200px)"},color:"black",sortFormat:"1",isInBox:!1,initValue:[{type:"paragraph",children:[{text:"This is editable "},{text:"rich",bold:!0},{text:" text, "},{text:"much",italic:!0},{text:" better than a "},{text:"<textarea>",code:!0},{text:"!"}]},{type:"paragraph",children:[{text:"Since it's rich text, you can do things like turn a selection of text "},{text:"bold",bold:!0},{text:", or add a semantically rendered block quote in the middle of the page, like this:"}]},{type:"block-quote",children:[{text:"A wise quote."}]},{type:"paragraph",children:[{text:"Try it out for yourself!"}]}]},t}return Object(u.a)(a,[{key:"componentDidMount",value:(t=Object(d.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=f.b.js[0],n=document.querySelector("head"),Array.from(n.childNodes).filter((function(e){return"SCRIPT"===e.tagName})).map((function(e){return e.getAttribute("src")})).includes(t)&&this.setState({depLoaded:!0});case 4:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this,t=this.state,n=t.modalPosition,a=t.color,o=t.sortFormat,i=t.modalPositionInsertFormula,s=t.isInBox,c=t.initValue,l=t.depLoaded;return r.a.createElement("div",{className:"EditorBox"},l?r.a.createElement(j.a,{search:"",value:c,minHeight:63,changeValue:function(t){return e.changeValue(t)},postion:function(t){return e.postion(t)},positionInsertFormula:function(t){return e.positionInsertFormula(t)},modalPosition:n,modalPositionInsertFormula:i,changeColor:function(t){return e.setState({color:t})},color:a,sortFormat:o,setFormat:function(t){return e.setState({sortFormat:t})},isInBox:s,isFocuse:!0}):r.a.createElement("span",null,"\u52a0\u8f7d\u4e2d..."))}}]),a}(o.Component));"undefined"!==typeof h&&h&&h===Object(h)&&Object.isExtensible(h)&&Object.defineProperty(h,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"EditorBox",filename:"src\\EditorBox\\index.tsx"}}),"undefined"!==typeof h&&h&&h===Object(h)&&Object.isExtensible(h)&&Object.defineProperty(h,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"EditorBox",filename:"src\\EditorBox\\index.tsx"}});var x={};function O(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object.assign({},x,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"questioneditor"},"QuestionEditor"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"\u7ec4\u4ef6\u540d\u79f0\uff1a\u8bd5\u9898\u7f16\u8f91\u5668\uff08QuestionEditor\uff09\u81ea\u5b9a\u4e49\u7ec4\u4ef6 ")),Object(i.b)("h3",{id:"\u52a0\u8f7d\u6587\u4ef6"},"\u52a0\u8f7d\u6587\u4ef6"),Object(i.b)("h4",{id:"\u590d\u5236\u4fe1\u606f"},"\u590d\u5236\u4fe1\u606f"),Object(i.b)(s.c,{__position:0,__code:"<EditorBox></EditorBox>",__scope:{props:this?this.props:n,Playground:s.c,EditorBox:h},__codesandbox:"undefined",mdxType:"Playground"},Object(i.b)(h,{mdxType:"EditorBox"})),Object(i.b)("h2",{id:"api"},"API"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object.assign({parentName:"tr"},{align:"left"}),"\u53c2\u6570"),Object(i.b)("th",Object.assign({parentName:"tr"},{align:"left"}),"\u8bf4\u660e"),Object(i.b)("th",Object.assign({parentName:"tr"},{align:"left"}),"\u7c7b\u578b"),Object(i.b)("th",Object.assign({parentName:"tr"},{align:"left"}),"\u9ed8\u8ba4\u503c"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object.assign({parentName:"tr"},{align:"left"}),"question"),Object(i.b)("td",Object.assign({parentName:"tr"},{align:"left"}),"\u4f20\u5165\u7684\u8bd5\u9898json"),Object(i.b)("td",Object.assign({parentName:"tr"},{align:"left"}),"Object"),Object(i.b)("td",Object.assign({parentName:"tr"},{align:"left"}),"{}")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object.assign({parentName:"tr"},{align:"left"}),"changeValue"),Object(i.b)("td",Object.assign({parentName:"tr"},{align:"left"}),"\u4fee\u6539\u4e86\u8bd5\u9898\u5185\u5bb9\u540e\u4f20\u51fa\u6765\u7684\u503c"),Object(i.b)("td",Object.assign({parentName:"tr"},{align:"left"}),"Function"),Object(i.b)("td",Object.assign({parentName:"tr"},{align:"left"}),"args","[0]",":\u4f20\u51fa\u6765\u7684\u5f53\u524d\u6846\u7684json;args","[1]",":\u4f20\u51fa\u6765\u7684\u6570\u636e\u5728json\u91cc\u9762\u7684\u5b9a\u4f4d\uff1bargs","[3]",":\u7efc\u5408\u9898\u5c0f\u9898\u5b9a\u4f4d\uff1bargs","[4]",":\u8bd5\u9898\u7c7b\u578b")))))}O&&O===Object(O)&&Object.isExtensible(O)&&Object.defineProperty(O,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src\\EditorBox\\index.mdx"}}),O.isMDXComponent=!0}}]);