(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[662],{4930:function(n,e,t){"use strict";t.d(e,{zx:function(){return l},h_:function(){return a},ZD:function(){return y}});var r=t(7294),o=t(3935),a=function(n){var e=n.children,t=(0,r.useRef)(document.createElement("div"));return(0,r.useLayoutEffect)((function(){var n=document.getElementById("modal-container"),e=t.current;if(n)return n.appendChild(e),function(){n.removeChild(e)}}),[]),o.createPortal(e,t.current)},i=t(7261),c=t(4524);function s(){var n=(0,i.Z)(["\n  box-sizing: content-box;\n  font-size: 2.5rem;\n  padding: 0.7rem 1.7rem;\n  border-radius: 3rem;\n  background: linear-gradient(45deg, rgba(83, 52, 245, 1), rgba(156, 111, 255, 1));\n  color: #fff;\n  font-weight: 600;\n  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15);\n  transition: 0.8s cubic-bezier(0.2, 1, 0.2, 1);\n  cursor: pointer;\n  border: solid 0.3rem rgba(83, 52, 245, 1);\n  outline: none;\n  font-family: sans-serif;\n  &:hover,\n  &:active {\n    border-color: #ffffff;\n    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25);\n  }\n\n&:disabled {\n  border-color: rgba(113, 103, 135, 0.5);\n    background: linear-gradient(45deg, rgba(83, 52, 245, 0.5), rgba(156, 111, 255, 0.5));\n    pointer-events: none;\n}\n"]);return s=function(){return n},n}var l=c.Z.button(s()),g=t(5893),d=t(6265),u=t(8347),p=t(888),b=t(3161);function f(){var n=(0,i.Z)(["\n  &.react-toggle {\n    touch-action: pan-x;\n    display: inline-block;\n    position: relative;\n    cursor: pointer;\n    background-color: transparent;\n    border: 0;\n    padding: 0;\n    user-select: none;\n    margin-right: 10px;\n  }\n\n  &.toggleText {\n    color: #f8f8f8;\n  }\n\n  &.toggle {\n    margin-top: 10px;\n    vertical-align: center;\n    display: flex;\n  }\n\n  .react-toggle-screenreader-only {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n  }\n\n  &.react-toggle--disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n    -webkit-transition: opacity 0.25s;\n    transition: opacity 0.25s;\n  }\n\n  .react-toggle-track {\n    width: 50px;\n    height: 24px;\n    padding: 0;\n    border-radius: 30px;\n    background-color: rgb(140, 140, 140);\n    -webkit-transition: all 0.2s ease;\n    -moz-transition: all 0.2s ease;\n    transition: all 0.2s ease;\n  }\n\n  .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {\n    background-color: rgb(180, 180, 180);\n  }\n\n  &.react-toggle--checked .react-toggle-track {\n    background-color: ",";\n  }\n\n  &.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {\n    background-color: ",";\n  }\n\n  .react-toggle-track-check {\n    position: absolute;\n    width: 14px;\n    height: 10px;\n    top: 0px;\n    bottom: 0px;\n    margin-top: auto;\n    margin-bottom: auto;\n    line-height: 0;\n    left: 8px;\n    opacity: 0;\n    -webkit-transition: opacity 0.25s ease;\n    -moz-transition: opacity 0.25s ease;\n    transition: opacity 0.25s ease;\n  }\n\n  &.react-toggle--checked .react-toggle-track-check {\n    opacity: 1;\n    -webkit-transition: opacity 0.25s ease;\n    -moz-transition: opacity 0.25s ease;\n    transition: opacity 0.25s ease;\n  }\n\n  .react-toggle-track-x {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    top: 0px;\n    bottom: 0px;\n    margin-top: auto;\n    margin-bottom: auto;\n    line-height: 0;\n    right: 10px;\n    opacity: 1;\n    -webkit-transition: opacity 0.25s ease;\n    -moz-transition: opacity 0.25s ease;\n    transition: opacity 0.25s ease;\n  }\n\n  .react-toggle--checked .react-toggle-track-x {\n    opacity: 0;\n  }\n\n  .react-toggle-thumb {\n    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n    position: absolute;\n    top: 1px;\n    left: 1px;\n    width: 22px;\n    height: 22px;\n    border: 1px solid #4d4d4d;\n    border-radius: 50%;\n    background-color: #fafafa;\n    box-sizing: border-box;\n    transition: all 0.25s ease;\n  }\n\n  &.react-toggle--checked .react-toggle-thumb {\n    left: 27px;\n    border-color: #19ab27;\n  }\n\n  &.react-toggle--focus .react-toggle-thumb {\n    box-shadow: 0px 0px 2px 3px #0099e0;\n  }\n\n  &.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {\n    box-shadow: 0px 0px 5px 5px #0099e0;\n  }\n"]);return f=function(){return n},n}function h(){var n=(0,i.Z)(["\n  color: ",";\n  font-size: 1.2rem;\n  position: absolute;\n  top: 50%;\n"]);return h=function(){return n},n}function x(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function m(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?x(Object(t),!0).forEach((function(e){(0,d.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):x(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var y=function(n){n.id;var e=n.handleToggle,t=(0,u.Z)(n,["id","handleToggle"]);return(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(w,m(m({},t),{},{onChange:function(n){return e(n.target.checked)},icons:{checked:(0,g.jsx)(k,{children:"on"}),unchecked:(0,g.jsx)(k,{children:"off"})}}))})},k=c.Z.div(h(),b.O.white),v="rgb(0, 204, 109)",w=(0,c.Z)(p.Z)(f(),v,v)},3161:function(n,e,t){"use strict";t.d(e,{O:function(){return r}});var r={blue:"#3498db",red:"#e74c3c",lightBlue:"#a8d3f0",lightRed:"#f1968e",darkRed:"#881d11",darkBlue:"#1b6698",mutedPurple:"#8d728b",purple:"hsl(261, 60%, 39%)",orange:"#ffa500",lightOrange:"#ffdb9a",white:"#FFF"}},6196:function(n,e,t){"use strict";t.d(e,{Z:function(){return r},r:function(){return s}});var r,o=t(6265),a=(t(212),t(629)),i=t(375),c=t(5050);!function(n){n.tabletop="tabletop"}(r||(r={}));var s=(0,a.C)({id:"SETTINGS",strict:!0,initial:"idle",context:(0,o.Z)({},r.tabletop,!1),states:{idle:{entry:(0,i.lW)("LOAD_SETTINGS"),on:{LOAD_SETTINGS:{target:"ready",actions:(0,c.f0)((function(n){n[r.tabletop]=function(n){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=localStorage.getItem(n);return t?"true"===t:e}(r.tabletop)}))}}},ready:{on:{SET_BOOLEAN_SETTING:{actions:function(n,e){n[e.key]=e.state,function(n,e){var t=e?"true":"false";localStorage.setItem(n,t)}(e.key,e.state)}}}}}})},8173:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return l}});var r=t(5893),o=t(4121),a=t(5e3),i=t(9008),c=(t(212),t(4930)),s=t(6196);function l(){var n=(0,a.eO)(s.r),e=(0,o.Z)(n,2),t=e[0],l=e[1];return t.matches("ready")?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(i.default,{children:[(0,r.jsx)("title",{children:"Gamify Education Settings"}),(0,r.jsx)("meta",{name:"Set the settings for the different games"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsx)("div",{className:"min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16",children:(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:["Tabletop mode:",(0,r.jsx)("div",{className:"text-gray-400",children:"For use on tablets when players are directly facing each other"})]}),(0,r.jsx)("div",{className:"flex justify-center items-center",children:(0,r.jsx)(c.ZD,{handleToggle:function(n){return l({type:"SET_BOOLEAN_SETTING",key:s.Z.tabletop,state:n})},checked:t.context.tabletop})})]})})]}):(0,r.jsx)("div",{children:"LOADING"})}},9471:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settings",function(){return t(8173)}])}},function(n){n.O(0,[774,432,145,888,179],(function(){return e=9471,n(n.s=e);var e}));var e=n.O();_N_E=e}]);