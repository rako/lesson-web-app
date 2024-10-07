function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t=globalThis,n={},r={},a=t.parcelRequire49ed;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequire49ed=a),(0,a.register)("brsYM",function(t,n){e(t.exports,"LoginContext",()=>l),e(t.exports,"Authenticate",()=>s);var r=a("c54Ow"),o=a("lbJE2");let l=(0,o.createContext)(),s=e=>{let t=e.usernameSaveKey?`${document.location.pathname}#Authenticate${e.usernameSaveKey}`:void 0,n=t?localStorage.getItem(t):null,[a,s]=(0,o.useState)(void 0!==e.username?e.username:n),i=(0,o.useRef)(""),[c,d]=(0,o.useState)(""),[u,h]=(0,o.useState)(null),p=async()=>{try{d("");let e=await fetch("/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,password:i.current.value})});if(!e.ok){if(403===e.status)throw Error("ログイン・エラー");throw Error(`${e.status} ${e.statusText}`)}let n=await e.json();h(n),void 0!==t&&localStorage.setItem(t,a)}catch(e){d(e.message),h(null),void 0!==t&&localStorage.removeItem(t)}};return(0,o.useEffect)(()=>{if(void 0!==e.username&&void 0!==e.password)i.current.value=e.password,p();else if(void 0!==t){let e=localStorage.getItem(t);null!==e&&(i.current.value=e,s(e))}},[]),u?(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"authenticate-logout",children:[(0,r.jsxs)("span",{children:["User: ",u?u.username:""]}),void 0!==e.username&&void 0!==e.password?null:(0,r.jsx)("button",{type:"button",onClick:()=>{h(null),void 0!==t&&localStorage.removeItem(t)},children:"ログアウト"})]}),(0,r.jsx)(l.Provider,{value:u,children:e.children})]}):(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"authenticate-login",children:[(0,r.jsxs)("label",{children:[(0,r.jsx)("span",{children:"ユーザ名:"}),(0,r.jsx)("span",{children:(0,r.jsx)("input",{type:"text",placeholder:"ユーザ名",onChange:e=>s(e.target.value),value:a})})]}),(0,r.jsxs)("label",{children:[(0,r.jsx)("span",{children:"パスワード:"}),(0,r.jsx)("span",{children:(0,r.jsx)("input",{type:"password",ref:i,placeholder:"パスワード",defaultValue:""})})]}),(0,r.jsx)("button",{type:"button",onClick:p,children:"ログイン"})]}),(0,r.jsx)("div",{children:""===c?null:(0,r.jsx)("div",{className:"error-message",onClick:()=>d(""),children:c})})]})}});var o=a("c54Ow"),l=a("dFw4U"),s=a("aFIWk"),i=a("brsYM"),c=a("lHCVX"),o=a("c54Ow"),d=a("lbJE2");const u=(0,d.forwardRef)(({width:e=300,height:t=200,lineCap:n="round",lineJoin:r="round",lineColor:a="#ff0000",lineWidth:l=1,drawLine:s,clearCanvas:i},c)=>{let u=(0,d.useRef)(null),h=(0,d.useRef)(null),[p,m]=(0,d.useState)(a),[v,x]=(0,d.useState)(l),g=e=>{let t=u.current,n=t.getBoundingClientRect(),r=getComputedStyle(t),a=parseFloat(r.borderLeftWidth),o=parseFloat(r.borderTopWidth),l=parseFloat(r.paddingLeft),s=parseFloat(r.paddingTop),i=n.left+a+l,c=n.top+o+s,d=e.clientX-i,h=e.clientY-c,p=parseFloat(r.borderRightWidth),m=parseFloat(r.borderBottomWidth),v=parseFloat(r.paddingRight),x=parseFloat(r.paddingBottom);return{x:d*t.width/(n.width-(a+p+l+v)),y:h*t.height/(n.height-(o+m+s+x))}},f=e=>{let t=g(e);s(h.current.x,h.current.y,t.x,t.y,p,v),h.current=t},j=()=>{document.removeEventListener("mousemove",f,!1),document.removeEventListener("mouseup",j,!1)},C=(e,t,a,o,l,s)=>{let i=u.current.getContext("2d");i.save(),i.lineCap=n,i.lineJoin=r,i.strokeStyle=l,i.lineWidth=s,i.beginPath(),i.moveTo(e,t),i.lineTo(a,o),i.stroke(),i.restore()};s||(s=C);let w=()=>{let e=u.current;e.getContext("2d").clearRect(0,0,e.width,e.height)};return i||(i=w),(0,d.useImperativeHandle)(c,()=>({drawLine:C,clearCanvas:w}),[]),(0,o.jsxs)("div",{className:"paint",children:[(0,o.jsx)("canvas",{ref:u,onMouseDown:e=>{document.addEventListener("mousemove",f,!1),document.addEventListener("mouseup",j,!1),e.preventDefault();let t=g(e);h.current=t},width:e,height:t}),(0,o.jsxs)("div",{className:"paint-control",children:[(0,o.jsxs)("label",{children:["色",(0,o.jsx)("input",{type:"color",value:p,onChange:e=>{m(e.target.value)}})]}),(0,o.jsxs)("label",{children:["ペンサイズ",(0,o.jsx)("input",{type:"number",min:1,max:9,onChange:e=>{x(e.target.value)},value:v})]}),(0,o.jsx)("button",{type:"button",onClick:i,children:"クリア"})]})]})});var o=a("c54Ow"),d=a("lbJE2"),i=a("brsYM"),c=a("lHCVX");const h=()=>{let e=(0,d.useContext)(i.LoginContext),t=e?e.username:"",n=(0,d.useContext)(c.SocketContext),r=n?n.current:null,a=(0,d.useRef)(null),l=e=>{"draw-line"===e.command?a.current.drawLine(e.x0,e.y0,e.x1,e.y1,e.penColor,e.penSize):"clear-canvas"===e.command?a.current.clearCanvas():console.log(`[PaintChat] ${e.command} is not supported.`)};return(0,d.useEffect)(()=>{if(r)return console.log("[PaintChat] adding listeners"),r.on("paint",l),r.emit("paint-history",{from:t}),()=>{console.log("[PaintChat] removing listeners"),r.off("paint",l)}},[]),(0,o.jsx)(u,{ref:a,drawLine:(e,n,a,o,l,s)=>{r&&r.emit("paint",{from:t,command:"draw-line",x0:e,y0:n,x1:a,y1:o,penColor:l,penSize:s})},clearCanvas:()=>{r&&r.emit("paint",{from:t,command:"clear-canvas"})}})};(0,l.createRoot)(document.getElementById("root")).render((0,o.jsxs)(s.ErrorBoundary,{children:[(0,o.jsx)("p",{children:"ペイントチャット"}),(0,o.jsxs)("div",{className:"cols-wrap two-cols",children:[(0,o.jsx)(i.Authenticate,{children:(0,o.jsx)(c.WithSocket,{nsp:"/chat",children:(0,o.jsx)(h,{})})}),(0,o.jsx)(i.Authenticate,{children:(0,o.jsx)(c.WithSocket,{nsp:"/chat",children:(0,o.jsx)(h,{})})})]})]}));
//# sourceMappingURL=week13.88c25c06.js.map
