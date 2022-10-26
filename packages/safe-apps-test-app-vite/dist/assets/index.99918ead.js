import{s as l,d as f,r as c,W as u,a as p,p as m,j as d,b as n,R as h,c as g,S as y,F as S}from"./vendor.5ad5d896.js";const b=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}};b();const v=l.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`,x=()=>{const{sdk:s,safe:r}=f.useSafeAppsSDK(),o=c.exports.useMemo(()=>new u(new p.SafeAppProvider(r,s)).getSigner(),[s,r]),i=c.exports.useCallback(async()=>{o.sendTransaction({to:"0x0000000000000000000000000000000000000000",value:m("0.1")})},[r,s,o]);return d(v,{children:[d("p",{children:["Safe: ",r.safeAddress]}),n("button",{onClick:i,children:"Click to send a test transaction"}),n("a",{href:"https://github.com/gnosis/safe-apps-sdk",target:"_blank",rel:"noreferrer",children:"Documentation"})]})};h.render(n(g.StrictMode,{children:n(y,{loader:n(S,{children:n("p",{children:"Waiting for Safe..."})}),children:n(x,{})})}),document.getElementById("root"));
