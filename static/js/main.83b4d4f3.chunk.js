(this["webpackJsonpandroid-dist"]=this["webpackJsonpandroid-dist"]||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var s=n(0),c=n(1),i=n.n(c),a=n(4),r=n.n(a),d=(n(10),n(2)),l=(n(11),["#D3DED3","#7DC691","#92B2B7","#DEBA40","#E55D5F","#6EC0D2","#D88D63","#FF9229","#EABD2D"]);var o=function(){var e=Object(c.useState)(Date.now),t=Object(d.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)([]),o=Object(d.a)(r,2),j=o[0],u=o[1],b=Object(c.useState)(""),h=Object(d.a)(b,2),O=h[0],v=h[1],f=Object(c.useState)(null),x=Object(d.a)(f,2),m=x[0],g=x[1];Object(c.useEffect)((function(){fetch("https://us-central1-android-distro.cloudfunctions.net/distros").then((function(e){return e.json().then((function(t){return[t,e.headers.get("Last-Modified")]}))})).then((function(e){var t=Object(d.a)(e,2),n=t[0],s=t[1];u(n),v(s),g(null)})).catch((function(e){u([]),g(e.message)}))}),[n]);var D=1;return Object(s.jsxs)("div",{className:"App",children:[m&&Object(s.jsxs)("div",{children:["Couldn't load latest stats: ",m]}),j.length>0&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("div",{className:"List",children:[Object(s.jsx)("div",{className:"Header"}),Object(s.jsx)("div",{className:"Header",children:"Platform Version"}),Object(s.jsx)("div",{className:"Header",children:"API Level"}),Object(s.jsx)("div",{className:"Header",children:"% of Distribution"}),Object(s.jsx)("div",{className:"Header",children:"Cumulative Distribution"}),j.map((function(e,t){var n={backgroundColor:l[t%l.length]},c=Object(s.jsxs)(i.a.Fragment,{children:[Object(s.jsx)("div",{className:"Version",style:n,children:e.version}),Object(s.jsx)("a",{style:n,href:e.url,children:e.name}),Object(s.jsx)("div",{className:"ApiLevel",style:n,children:e.apiLevel}),Object(s.jsxs)("div",{style:n,children:[(100*e.distributionPercentage).toFixed(1),"%"]}),Object(s.jsxs)("div",{style:n,children:[(100*D).toFixed(1),"%"]})]},e.apiLevel);return D-=e.distributionPercentage,c}))]}),Object(s.jsxs)("div",{className:"Footer",onClick:function(){return a(Date.now)},children:[Object(s.jsx)("a",{href:"https://github.com/nbadal/android-dist",children:"Github"})," | Last Updated by Google: ",Object(s.jsx)("span",{children:O})]})]})]})},j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),s(e),c(e),i(e),a(e)}))};r.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(o,{})}),document.getElementById("root")),j()}},[[12,1,2]]]);
//# sourceMappingURL=main.83b4d4f3.chunk.js.map