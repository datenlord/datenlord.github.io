var Xy=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Jj=Xy((qj,Za)=>{function Jy(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in e)){const o=Object.getOwnPropertyDescriptor(r,i);o&&Object.defineProperty(e,i,o.get?o:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function Zy(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var u={},qy={get exports(){return u},set exports(e){u=e}},Os={},j={},ev={get exports(){return j},set exports(e){j=e}},le={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wo=Symbol.for("react.element"),tv=Symbol.for("react.portal"),nv=Symbol.for("react.fragment"),rv=Symbol.for("react.strict_mode"),iv=Symbol.for("react.profiler"),ov=Symbol.for("react.provider"),av=Symbol.for("react.context"),sv=Symbol.for("react.forward_ref"),lv=Symbol.for("react.suspense"),uv=Symbol.for("react.memo"),cv=Symbol.for("react.lazy"),kf=Symbol.iterator;function dv(e){return e===null||typeof e!="object"?null:(e=kf&&e[kf]||e["@@iterator"],typeof e=="function"?e:null)}var Jp={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Zp=Object.assign,qp={};function Oi(e,t,n){this.props=e,this.context=t,this.refs=qp,this.updater=n||Jp}Oi.prototype.isReactComponent={};Oi.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Oi.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function em(){}em.prototype=Oi.prototype;function zc(e,t,n){this.props=e,this.context=t,this.refs=qp,this.updater=n||Jp}var Fc=zc.prototype=new em;Fc.constructor=zc;Zp(Fc,Oi.prototype);Fc.isPureReactComponent=!0;var Sf=Array.isArray,tm=Object.prototype.hasOwnProperty,$c={current:null},nm={key:!0,ref:!0,__self:!0,__source:!0};function rm(e,t,n){var r,i={},o=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(o=""+t.key),t)tm.call(t,r)&&!nm.hasOwnProperty(r)&&(i[r]=t[r]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];i.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:Wo,type:e,key:o,ref:a,props:i,_owner:$c.current}}function fv(e,t){return{$$typeof:Wo,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Uc(e){return typeof e=="object"&&e!==null&&e.$$typeof===Wo}function hv(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var _f=/\/+/g;function Ol(e,t){return typeof e=="object"&&e!==null&&e.key!=null?hv(""+e.key):t.toString(36)}function Oa(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Wo:case tv:a=!0}}if(a)return a=e,i=i(a),e=r===""?"."+Ol(a,0):r,Sf(i)?(n="",e!=null&&(n=e.replace(_f,"$&/")+"/"),Oa(i,t,n,"",function(c){return c})):i!=null&&(Uc(i)&&(i=fv(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(_f,"$&/")+"/")+e)),t.push(i)),1;if(a=0,r=r===""?".":r+":",Sf(e))for(var s=0;s<e.length;s++){o=e[s];var l=r+Ol(o,s);a+=Oa(o,t,n,l,i)}else if(l=dv(e),typeof l=="function")for(e=l.call(e),s=0;!(o=e.next()).done;)o=o.value,l=r+Ol(o,s++),a+=Oa(o,t,n,l,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function ta(e,t,n){if(e==null)return e;var r=[],i=0;return Oa(e,r,"","",function(o){return t.call(n,o,i++)}),r}function pv(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var wt={current:null},La={transition:null},mv={ReactCurrentDispatcher:wt,ReactCurrentBatchConfig:La,ReactCurrentOwner:$c};le.Children={map:ta,forEach:function(e,t,n){ta(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ta(e,function(){t++}),t},toArray:function(e){return ta(e,function(t){return t})||[]},only:function(e){if(!Uc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};le.Component=Oi;le.Fragment=nv;le.Profiler=iv;le.PureComponent=zc;le.StrictMode=rv;le.Suspense=lv;le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mv;le.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Zp({},e.props),i=e.key,o=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,a=$c.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)tm.call(t,l)&&!nm.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:Wo,type:e.type,key:i,ref:o,props:r,_owner:a}};le.createContext=function(e){return e={$$typeof:av,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ov,_context:e},e.Consumer=e};le.createElement=rm;le.createFactory=function(e){var t=rm.bind(null,e);return t.type=e,t};le.createRef=function(){return{current:null}};le.forwardRef=function(e){return{$$typeof:sv,render:e}};le.isValidElement=Uc;le.lazy=function(e){return{$$typeof:cv,_payload:{_status:-1,_result:e},_init:pv}};le.memo=function(e,t){return{$$typeof:uv,type:e,compare:t===void 0?null:t}};le.startTransition=function(e){var t=La.transition;La.transition={};try{e()}finally{La.transition=t}};le.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};le.useCallback=function(e,t){return wt.current.useCallback(e,t)};le.useContext=function(e){return wt.current.useContext(e)};le.useDebugValue=function(){};le.useDeferredValue=function(e){return wt.current.useDeferredValue(e)};le.useEffect=function(e,t){return wt.current.useEffect(e,t)};le.useId=function(){return wt.current.useId()};le.useImperativeHandle=function(e,t,n){return wt.current.useImperativeHandle(e,t,n)};le.useInsertionEffect=function(e,t){return wt.current.useInsertionEffect(e,t)};le.useLayoutEffect=function(e,t){return wt.current.useLayoutEffect(e,t)};le.useMemo=function(e,t){return wt.current.useMemo(e,t)};le.useReducer=function(e,t,n){return wt.current.useReducer(e,t,n)};le.useRef=function(e){return wt.current.useRef(e)};le.useState=function(e){return wt.current.useState(e)};le.useSyncExternalStore=function(e,t,n){return wt.current.useSyncExternalStore(e,t,n)};le.useTransition=function(){return wt.current.useTransition()};le.version="18.2.0";(function(e){e.exports=le})(ev);const $r=Zy(j),ku=Jy({__proto__:null,default:$r},[j]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gv=j,yv=Symbol.for("react.element"),vv=Symbol.for("react.fragment"),xv=Object.prototype.hasOwnProperty,wv=gv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,kv={key:!0,ref:!0,__self:!0,__source:!0};function im(e,t,n){var r,i={},o=null,a=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)xv.call(t,r)&&!kv.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:yv,type:e,key:o,ref:a,props:i,_owner:wv.current}}Os.Fragment=vv;Os.jsx=im;Os.jsxs=im;(function(e){e.exports=Os})(qy);var Su={},_u={},Sv={get exports(){return _u},set exports(e){_u=e}},At={},bu={},_v={get exports(){return bu},set exports(e){bu=e}},om={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(A,Y){var K=A.length;A.push(Y);e:for(;0<K;){var ye=K-1>>>1,L=A[ye];if(0<i(L,Y))A[ye]=Y,A[K]=L,K=ye;else break e}}function n(A){return A.length===0?null:A[0]}function r(A){if(A.length===0)return null;var Y=A[0],K=A.pop();if(K!==Y){A[0]=K;e:for(var ye=0,L=A.length,N=L>>>1;ye<N;){var F=2*(ye+1)-1,J=A[F],w=F+1,oe=A[w];if(0>i(J,K))w<L&&0>i(oe,J)?(A[ye]=oe,A[w]=K,ye=w):(A[ye]=J,A[F]=K,ye=F);else if(w<L&&0>i(oe,K))A[ye]=oe,A[w]=K,ye=w;else break e}}return Y}function i(A,Y){var K=A.sortIndex-Y.sortIndex;return K!==0?K:A.id-Y.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var a=Date,s=a.now();e.unstable_now=function(){return a.now()-s}}var l=[],c=[],d=1,f=null,y=3,_=!1,x=!1,p=!1,C=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(A){for(var Y=n(c);Y!==null;){if(Y.callback===null)r(c);else if(Y.startTime<=A)r(c),Y.sortIndex=Y.expirationTime,t(l,Y);else break;Y=n(c)}}function k(A){if(p=!1,v(A),!x)if(n(l)!==null)x=!0,Qt(D);else{var Y=n(c);Y!==null&&rt(k,Y.startTime-A)}}function D(A,Y){x=!1,p&&(p=!1,g(I),I=-1),_=!0;var K=y;try{for(v(Y),f=n(l);f!==null&&(!(f.expirationTime>Y)||A&&!Te());){var ye=f.callback;if(typeof ye=="function"){f.callback=null,y=f.priorityLevel;var L=ye(f.expirationTime<=Y);Y=e.unstable_now(),typeof L=="function"?f.callback=L:f===n(l)&&r(l),v(Y)}else r(l);f=n(l)}if(f!==null)var N=!0;else{var F=n(c);F!==null&&rt(k,F.startTime-Y),N=!1}return N}finally{f=null,y=K,_=!1}}var T=!1,E=null,I=-1,re=5,Q=-1;function Te(){return!(e.unstable_now()-Q<re)}function Se(){if(E!==null){var A=e.unstable_now();Q=A;var Y=!0;try{Y=E(!0,A)}finally{Y?be():(T=!1,E=null)}}else T=!1}var be;if(typeof h=="function")be=function(){h(Se)};else if(typeof MessageChannel<"u"){var ze=new MessageChannel,Ve=ze.port2;ze.port1.onmessage=Se,be=function(){Ve.postMessage(null)}}else be=function(){C(Se,0)};function Qt(A){E=A,T||(T=!0,be())}function rt(A,Y){I=C(function(){A(e.unstable_now())},Y)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(A){A.callback=null},e.unstable_continueExecution=function(){x||_||(x=!0,Qt(D))},e.unstable_forceFrameRate=function(A){0>A||125<A?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):re=0<A?Math.floor(1e3/A):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(A){switch(y){case 1:case 2:case 3:var Y=3;break;default:Y=y}var K=y;y=Y;try{return A()}finally{y=K}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(A,Y){switch(A){case 1:case 2:case 3:case 4:case 5:break;default:A=3}var K=y;y=A;try{return Y()}finally{y=K}},e.unstable_scheduleCallback=function(A,Y,K){var ye=e.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?ye+K:ye):K=ye,A){case 1:var L=-1;break;case 2:L=250;break;case 5:L=1073741823;break;case 4:L=1e4;break;default:L=5e3}return L=K+L,A={id:d++,callback:Y,priorityLevel:A,startTime:K,expirationTime:L,sortIndex:-1},K>ye?(A.sortIndex=K,t(c,A),n(l)===null&&A===n(c)&&(p?(g(I),I=-1):p=!0,rt(k,K-ye))):(A.sortIndex=L,t(l,A),x||_||(x=!0,Qt(D))),A},e.unstable_shouldYield=Te,e.unstable_wrapCallback=function(A){var Y=y;return function(){var K=y;y=Y;try{return A.apply(this,arguments)}finally{y=K}}}})(om);(function(e){e.exports=om})(_v);/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var am=j,Tt=bu;function P(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sm=new Set,wo={};function Ur(e,t){Ci(e,t),Ci(e+"Capture",t)}function Ci(e,t){for(wo[e]=t,e=0;e<t.length;e++)sm.add(t[e])}var Nn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Cu=Object.prototype.hasOwnProperty,bv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,bf={},Cf={};function Cv(e){return Cu.call(Cf,e)?!0:Cu.call(bf,e)?!1:bv.test(e)?Cf[e]=!0:(bf[e]=!0,!1)}function Dv(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function jv(e,t,n,r){if(t===null||typeof t>"u"||Dv(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function kt(e,t,n,r,i,o,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var at={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){at[e]=new kt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];at[t]=new kt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){at[e]=new kt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){at[e]=new kt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){at[e]=new kt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){at[e]=new kt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){at[e]=new kt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){at[e]=new kt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){at[e]=new kt(e,5,!1,e.toLowerCase(),null,!1,!1)});var Yc=/[\-:]([a-z])/g;function Wc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Yc,Wc);at[t]=new kt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Yc,Wc);at[t]=new kt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Yc,Wc);at[t]=new kt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){at[e]=new kt(e,1,!1,e.toLowerCase(),null,!1,!1)});at.xlinkHref=new kt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){at[e]=new kt(e,1,!1,e.toLowerCase(),null,!0,!0)});function Hc(e,t,n,r){var i=at.hasOwnProperty(t)?at[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(jv(t,n,i,r)&&(n=null),r||i===null?Cv(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Un=am.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,na=Symbol.for("react.element"),qr=Symbol.for("react.portal"),ei=Symbol.for("react.fragment"),Vc=Symbol.for("react.strict_mode"),Du=Symbol.for("react.profiler"),lm=Symbol.for("react.provider"),um=Symbol.for("react.context"),Bc=Symbol.for("react.forward_ref"),ju=Symbol.for("react.suspense"),Eu=Symbol.for("react.suspense_list"),Gc=Symbol.for("react.memo"),Qn=Symbol.for("react.lazy"),cm=Symbol.for("react.offscreen"),Df=Symbol.iterator;function Yi(e){return e===null||typeof e!="object"?null:(e=Df&&e[Df]||e["@@iterator"],typeof e=="function"?e:null)}var Ie=Object.assign,Ll;function eo(e){if(Ll===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ll=t&&t[1]||""}return`
`+Ll+e}var Nl=!1;function Il(e,t){if(!e||Nl)return"";Nl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),o=r.stack.split(`
`),a=i.length-1,s=o.length-1;1<=a&&0<=s&&i[a]!==o[s];)s--;for(;1<=a&&0<=s;a--,s--)if(i[a]!==o[s]){if(a!==1||s!==1)do if(a--,s--,0>s||i[a]!==o[s]){var l=`
`+i[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=a&&0<=s);break}}}finally{Nl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?eo(e):""}function Ev(e){switch(e.tag){case 5:return eo(e.type);case 16:return eo("Lazy");case 13:return eo("Suspense");case 19:return eo("SuspenseList");case 0:case 2:case 15:return e=Il(e.type,!1),e;case 11:return e=Il(e.type.render,!1),e;case 1:return e=Il(e.type,!0),e;default:return""}}function Mu(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ei:return"Fragment";case qr:return"Portal";case Du:return"Profiler";case Vc:return"StrictMode";case ju:return"Suspense";case Eu:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case um:return(e.displayName||"Context")+".Consumer";case lm:return(e._context.displayName||"Context")+".Provider";case Bc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Gc:return t=e.displayName||null,t!==null?t:Mu(e.type)||"Memo";case Qn:t=e._payload,e=e._init;try{return Mu(e(t))}catch{}}return null}function Mv(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Mu(t);case 8:return t===Vc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function hr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function dm(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Pv(e){var t=dm(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,o.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ra(e){e._valueTracker||(e._valueTracker=Pv(e))}function fm(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=dm(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function qa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Pu(e,t){var n=t.checked;return Ie({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function jf(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=hr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function hm(e,t){t=t.checked,t!=null&&Hc(e,"checked",t,!1)}function Ru(e,t){hm(e,t);var n=hr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Tu(e,t.type,n):t.hasOwnProperty("defaultValue")&&Tu(e,t.type,hr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ef(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Tu(e,t,n){(t!=="number"||qa(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var to=Array.isArray;function mi(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+hr(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Au(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(P(91));return Ie({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Mf(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(P(92));if(to(n)){if(1<n.length)throw Error(P(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:hr(n)}}function pm(e,t){var n=hr(t.value),r=hr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Pf(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function mm(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ou(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?mm(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ia,gm=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ia=ia||document.createElement("div"),ia.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ia.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ko(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var oo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Rv=["Webkit","ms","Moz","O"];Object.keys(oo).forEach(function(e){Rv.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),oo[t]=oo[e]})});function ym(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||oo.hasOwnProperty(e)&&oo[e]?(""+t).trim():t+"px"}function vm(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=ym(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Tv=Ie({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Lu(e,t){if(t){if(Tv[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(P(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(P(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(P(61))}if(t.style!=null&&typeof t.style!="object")throw Error(P(62))}}function Nu(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Iu=null;function Qc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var zu=null,gi=null,yi=null;function Rf(e){if(e=Bo(e)){if(typeof zu!="function")throw Error(P(280));var t=e.stateNode;t&&(t=Fs(t),zu(e.stateNode,e.type,t))}}function xm(e){gi?yi?yi.push(e):yi=[e]:gi=e}function wm(){if(gi){var e=gi,t=yi;if(yi=gi=null,Rf(e),t)for(e=0;e<t.length;e++)Rf(t[e])}}function km(e,t){return e(t)}function Sm(){}var zl=!1;function _m(e,t,n){if(zl)return e(t,n);zl=!0;try{return km(e,t,n)}finally{zl=!1,(gi!==null||yi!==null)&&(Sm(),wm())}}function So(e,t){var n=e.stateNode;if(n===null)return null;var r=Fs(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(P(231,t,typeof n));return n}var Fu=!1;if(Nn)try{var Wi={};Object.defineProperty(Wi,"passive",{get:function(){Fu=!0}}),window.addEventListener("test",Wi,Wi),window.removeEventListener("test",Wi,Wi)}catch{Fu=!1}function Av(e,t,n,r,i,o,a,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var ao=!1,es=null,ts=!1,$u=null,Ov={onError:function(e){ao=!0,es=e}};function Lv(e,t,n,r,i,o,a,s,l){ao=!1,es=null,Av.apply(Ov,arguments)}function Nv(e,t,n,r,i,o,a,s,l){if(Lv.apply(this,arguments),ao){if(ao){var c=es;ao=!1,es=null}else throw Error(P(198));ts||(ts=!0,$u=c)}}function Yr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function bm(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Tf(e){if(Yr(e)!==e)throw Error(P(188))}function Iv(e){var t=e.alternate;if(!t){if(t=Yr(e),t===null)throw Error(P(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Tf(i),e;if(o===r)return Tf(i),t;o=o.sibling}throw Error(P(188))}if(n.return!==r.return)n=i,r=o;else{for(var a=!1,s=i.child;s;){if(s===n){a=!0,n=i,r=o;break}if(s===r){a=!0,r=i,n=o;break}s=s.sibling}if(!a){for(s=o.child;s;){if(s===n){a=!0,n=o,r=i;break}if(s===r){a=!0,r=o,n=i;break}s=s.sibling}if(!a)throw Error(P(189))}}if(n.alternate!==r)throw Error(P(190))}if(n.tag!==3)throw Error(P(188));return n.stateNode.current===n?e:t}function Cm(e){return e=Iv(e),e!==null?Dm(e):null}function Dm(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Dm(e);if(t!==null)return t;e=e.sibling}return null}var jm=Tt.unstable_scheduleCallback,Af=Tt.unstable_cancelCallback,zv=Tt.unstable_shouldYield,Fv=Tt.unstable_requestPaint,He=Tt.unstable_now,$v=Tt.unstable_getCurrentPriorityLevel,Kc=Tt.unstable_ImmediatePriority,Em=Tt.unstable_UserBlockingPriority,ns=Tt.unstable_NormalPriority,Uv=Tt.unstable_LowPriority,Mm=Tt.unstable_IdlePriority,Ls=null,yn=null;function Yv(e){if(yn&&typeof yn.onCommitFiberRoot=="function")try{yn.onCommitFiberRoot(Ls,e,void 0,(e.current.flags&128)===128)}catch{}}var rn=Math.clz32?Math.clz32:Vv,Wv=Math.log,Hv=Math.LN2;function Vv(e){return e>>>=0,e===0?32:31-(Wv(e)/Hv|0)|0}var oa=64,aa=4194304;function no(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function rs(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,a=n&268435455;if(a!==0){var s=a&~i;s!==0?r=no(s):(o&=a,o!==0&&(r=no(o)))}else a=n&~i,a!==0?r=no(a):o!==0&&(r=no(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-rn(t),i=1<<n,r|=e[n],t&=~i;return r}function Bv(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Gv(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var a=31-rn(o),s=1<<a,l=i[a];l===-1?(!(s&n)||s&r)&&(i[a]=Bv(s,t)):l<=t&&(e.expiredLanes|=s),o&=~s}}function Uu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Pm(){var e=oa;return oa<<=1,!(oa&4194240)&&(oa=64),e}function Fl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ho(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-rn(t),e[t]=n}function Qv(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-rn(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function Xc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-rn(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var ve=0;function Rm(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Tm,Jc,Am,Om,Lm,Yu=!1,sa=[],nr=null,rr=null,ir=null,_o=new Map,bo=new Map,Xn=[],Kv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Of(e,t){switch(e){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":rr=null;break;case"mouseover":case"mouseout":ir=null;break;case"pointerover":case"pointerout":_o.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":bo.delete(t.pointerId)}}function Hi(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=Bo(t),t!==null&&Jc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Xv(e,t,n,r,i){switch(t){case"focusin":return nr=Hi(nr,e,t,n,r,i),!0;case"dragenter":return rr=Hi(rr,e,t,n,r,i),!0;case"mouseover":return ir=Hi(ir,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return _o.set(o,Hi(_o.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,bo.set(o,Hi(bo.get(o)||null,e,t,n,r,i)),!0}return!1}function Nm(e){var t=_r(e.target);if(t!==null){var n=Yr(t);if(n!==null){if(t=n.tag,t===13){if(t=bm(n),t!==null){e.blockedOn=t,Lm(e.priority,function(){Am(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Na(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Wu(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Iu=r,n.target.dispatchEvent(r),Iu=null}else return t=Bo(n),t!==null&&Jc(t),e.blockedOn=n,!1;t.shift()}return!0}function Lf(e,t,n){Na(e)&&n.delete(t)}function Jv(){Yu=!1,nr!==null&&Na(nr)&&(nr=null),rr!==null&&Na(rr)&&(rr=null),ir!==null&&Na(ir)&&(ir=null),_o.forEach(Lf),bo.forEach(Lf)}function Vi(e,t){e.blockedOn===t&&(e.blockedOn=null,Yu||(Yu=!0,Tt.unstable_scheduleCallback(Tt.unstable_NormalPriority,Jv)))}function Co(e){function t(i){return Vi(i,e)}if(0<sa.length){Vi(sa[0],e);for(var n=1;n<sa.length;n++){var r=sa[n];r.blockedOn===e&&(r.blockedOn=null)}}for(nr!==null&&Vi(nr,e),rr!==null&&Vi(rr,e),ir!==null&&Vi(ir,e),_o.forEach(t),bo.forEach(t),n=0;n<Xn.length;n++)r=Xn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Xn.length&&(n=Xn[0],n.blockedOn===null);)Nm(n),n.blockedOn===null&&Xn.shift()}var vi=Un.ReactCurrentBatchConfig,is=!0;function Zv(e,t,n,r){var i=ve,o=vi.transition;vi.transition=null;try{ve=1,Zc(e,t,n,r)}finally{ve=i,vi.transition=o}}function qv(e,t,n,r){var i=ve,o=vi.transition;vi.transition=null;try{ve=4,Zc(e,t,n,r)}finally{ve=i,vi.transition=o}}function Zc(e,t,n,r){if(is){var i=Wu(e,t,n,r);if(i===null)Kl(e,t,r,os,n),Of(e,r);else if(Xv(i,e,t,n,r))r.stopPropagation();else if(Of(e,r),t&4&&-1<Kv.indexOf(e)){for(;i!==null;){var o=Bo(i);if(o!==null&&Tm(o),o=Wu(e,t,n,r),o===null&&Kl(e,t,r,os,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else Kl(e,t,r,null,n)}}var os=null;function Wu(e,t,n,r){if(os=null,e=Qc(r),e=_r(e),e!==null)if(t=Yr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=bm(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return os=e,null}function Im(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch($v()){case Kc:return 1;case Em:return 4;case ns:case Uv:return 16;case Mm:return 536870912;default:return 16}default:return 16}}var Zn=null,qc=null,Ia=null;function zm(){if(Ia)return Ia;var e,t=qc,n=t.length,r,i="value"in Zn?Zn.value:Zn.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===i[o-r];r++);return Ia=i.slice(e,1<r?1-r:void 0)}function za(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function la(){return!0}function Nf(){return!1}function Ot(e){function t(n,r,i,o,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=a,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?la:Nf,this.isPropagationStopped=Nf,this}return Ie(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=la)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=la)},persist:function(){},isPersistent:la}),t}var Li={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ed=Ot(Li),Vo=Ie({},Li,{view:0,detail:0}),ex=Ot(Vo),$l,Ul,Bi,Ns=Ie({},Vo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:td,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Bi&&(Bi&&e.type==="mousemove"?($l=e.screenX-Bi.screenX,Ul=e.screenY-Bi.screenY):Ul=$l=0,Bi=e),$l)},movementY:function(e){return"movementY"in e?e.movementY:Ul}}),If=Ot(Ns),tx=Ie({},Ns,{dataTransfer:0}),nx=Ot(tx),rx=Ie({},Vo,{relatedTarget:0}),Yl=Ot(rx),ix=Ie({},Li,{animationName:0,elapsedTime:0,pseudoElement:0}),ox=Ot(ix),ax=Ie({},Li,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),sx=Ot(ax),lx=Ie({},Li,{data:0}),zf=Ot(lx),ux={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},dx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fx(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=dx[e])?!!t[e]:!1}function td(){return fx}var hx=Ie({},Vo,{key:function(e){if(e.key){var t=ux[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=za(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?cx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:td,charCode:function(e){return e.type==="keypress"?za(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?za(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),px=Ot(hx),mx=Ie({},Ns,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ff=Ot(mx),gx=Ie({},Vo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:td}),yx=Ot(gx),vx=Ie({},Li,{propertyName:0,elapsedTime:0,pseudoElement:0}),xx=Ot(vx),wx=Ie({},Ns,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),kx=Ot(wx),Sx=[9,13,27,32],nd=Nn&&"CompositionEvent"in window,so=null;Nn&&"documentMode"in document&&(so=document.documentMode);var _x=Nn&&"TextEvent"in window&&!so,Fm=Nn&&(!nd||so&&8<so&&11>=so),$f=String.fromCharCode(32),Uf=!1;function $m(e,t){switch(e){case"keyup":return Sx.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Um(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ti=!1;function bx(e,t){switch(e){case"compositionend":return Um(t);case"keypress":return t.which!==32?null:(Uf=!0,$f);case"textInput":return e=t.data,e===$f&&Uf?null:e;default:return null}}function Cx(e,t){if(ti)return e==="compositionend"||!nd&&$m(e,t)?(e=zm(),Ia=qc=Zn=null,ti=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Fm&&t.locale!=="ko"?null:t.data;default:return null}}var Dx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Dx[e.type]:t==="textarea"}function Ym(e,t,n,r){xm(r),t=as(t,"onChange"),0<t.length&&(n=new ed("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var lo=null,Do=null;function jx(e){qm(e,0)}function Is(e){var t=ii(e);if(fm(t))return e}function Ex(e,t){if(e==="change")return t}var Wm=!1;if(Nn){var Wl;if(Nn){var Hl="oninput"in document;if(!Hl){var Wf=document.createElement("div");Wf.setAttribute("oninput","return;"),Hl=typeof Wf.oninput=="function"}Wl=Hl}else Wl=!1;Wm=Wl&&(!document.documentMode||9<document.documentMode)}function Hf(){lo&&(lo.detachEvent("onpropertychange",Hm),Do=lo=null)}function Hm(e){if(e.propertyName==="value"&&Is(Do)){var t=[];Ym(t,Do,e,Qc(e)),_m(jx,t)}}function Mx(e,t,n){e==="focusin"?(Hf(),lo=t,Do=n,lo.attachEvent("onpropertychange",Hm)):e==="focusout"&&Hf()}function Px(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Is(Do)}function Rx(e,t){if(e==="click")return Is(t)}function Tx(e,t){if(e==="input"||e==="change")return Is(t)}function Ax(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var an=typeof Object.is=="function"?Object.is:Ax;function jo(e,t){if(an(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Cu.call(t,i)||!an(e[i],t[i]))return!1}return!0}function Vf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Bf(e,t){var n=Vf(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Vf(n)}}function Vm(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Vm(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Bm(){for(var e=window,t=qa();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=qa(e.document)}return t}function rd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ox(e){var t=Bm(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Vm(n.ownerDocument.documentElement,n)){if(r!==null&&rd(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Bf(n,o);var a=Bf(n,r);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Lx=Nn&&"documentMode"in document&&11>=document.documentMode,ni=null,Hu=null,uo=null,Vu=!1;function Gf(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Vu||ni==null||ni!==qa(r)||(r=ni,"selectionStart"in r&&rd(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),uo&&jo(uo,r)||(uo=r,r=as(Hu,"onSelect"),0<r.length&&(t=new ed("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=ni)))}function ua(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ri={animationend:ua("Animation","AnimationEnd"),animationiteration:ua("Animation","AnimationIteration"),animationstart:ua("Animation","AnimationStart"),transitionend:ua("Transition","TransitionEnd")},Vl={},Gm={};Nn&&(Gm=document.createElement("div").style,"AnimationEvent"in window||(delete ri.animationend.animation,delete ri.animationiteration.animation,delete ri.animationstart.animation),"TransitionEvent"in window||delete ri.transitionend.transition);function zs(e){if(Vl[e])return Vl[e];if(!ri[e])return e;var t=ri[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gm)return Vl[e]=t[n];return e}var Qm=zs("animationend"),Km=zs("animationiteration"),Xm=zs("animationstart"),Jm=zs("transitionend"),Zm=new Map,Qf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function mr(e,t){Zm.set(e,t),Ur(t,[e])}for(var Bl=0;Bl<Qf.length;Bl++){var Gl=Qf[Bl],Nx=Gl.toLowerCase(),Ix=Gl[0].toUpperCase()+Gl.slice(1);mr(Nx,"on"+Ix)}mr(Qm,"onAnimationEnd");mr(Km,"onAnimationIteration");mr(Xm,"onAnimationStart");mr("dblclick","onDoubleClick");mr("focusin","onFocus");mr("focusout","onBlur");mr(Jm,"onTransitionEnd");Ci("onMouseEnter",["mouseout","mouseover"]);Ci("onMouseLeave",["mouseout","mouseover"]);Ci("onPointerEnter",["pointerout","pointerover"]);Ci("onPointerLeave",["pointerout","pointerover"]);Ur("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ur("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ur("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ur("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ur("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ur("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ro="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),zx=new Set("cancel close invalid load scroll toggle".split(" ").concat(ro));function Kf(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Nv(r,t,void 0,e),e.currentTarget=null}function qm(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==o&&i.isPropagationStopped())break e;Kf(i,s,c),o=l}else for(a=0;a<r.length;a++){if(s=r[a],l=s.instance,c=s.currentTarget,s=s.listener,l!==o&&i.isPropagationStopped())break e;Kf(i,s,c),o=l}}}if(ts)throw e=$u,ts=!1,$u=null,e}function Ce(e,t){var n=t[Xu];n===void 0&&(n=t[Xu]=new Set);var r=e+"__bubble";n.has(r)||(eg(t,e,2,!1),n.add(r))}function Ql(e,t,n){var r=0;t&&(r|=4),eg(n,e,r,t)}var ca="_reactListening"+Math.random().toString(36).slice(2);function Eo(e){if(!e[ca]){e[ca]=!0,sm.forEach(function(n){n!=="selectionchange"&&(zx.has(n)||Ql(n,!1,e),Ql(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ca]||(t[ca]=!0,Ql("selectionchange",!1,t))}}function eg(e,t,n,r){switch(Im(t)){case 1:var i=Zv;break;case 4:i=qv;break;default:i=Zc}n=i.bind(null,t,n,e),i=void 0,!Fu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Kl(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;a=a.return}for(;s!==null;){if(a=_r(s),a===null)return;if(l=a.tag,l===5||l===6){r=o=a;continue e}s=s.parentNode}}r=r.return}_m(function(){var c=o,d=Qc(n),f=[];e:{var y=Zm.get(e);if(y!==void 0){var _=ed,x=e;switch(e){case"keypress":if(za(n)===0)break e;case"keydown":case"keyup":_=px;break;case"focusin":x="focus",_=Yl;break;case"focusout":x="blur",_=Yl;break;case"beforeblur":case"afterblur":_=Yl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=If;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=nx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=yx;break;case Qm:case Km:case Xm:_=ox;break;case Jm:_=xx;break;case"scroll":_=ex;break;case"wheel":_=kx;break;case"copy":case"cut":case"paste":_=sx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=Ff}var p=(t&4)!==0,C=!p&&e==="scroll",g=p?y!==null?y+"Capture":null:y;p=[];for(var h=c,v;h!==null;){v=h;var k=v.stateNode;if(v.tag===5&&k!==null&&(v=k,g!==null&&(k=So(h,g),k!=null&&p.push(Mo(h,k,v)))),C)break;h=h.return}0<p.length&&(y=new _(y,x,null,n,d),f.push({event:y,listeners:p}))}}if(!(t&7)){e:{if(y=e==="mouseover"||e==="pointerover",_=e==="mouseout"||e==="pointerout",y&&n!==Iu&&(x=n.relatedTarget||n.fromElement)&&(_r(x)||x[In]))break e;if((_||y)&&(y=d.window===d?d:(y=d.ownerDocument)?y.defaultView||y.parentWindow:window,_?(x=n.relatedTarget||n.toElement,_=c,x=x?_r(x):null,x!==null&&(C=Yr(x),x!==C||x.tag!==5&&x.tag!==6)&&(x=null)):(_=null,x=c),_!==x)){if(p=If,k="onMouseLeave",g="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(p=Ff,k="onPointerLeave",g="onPointerEnter",h="pointer"),C=_==null?y:ii(_),v=x==null?y:ii(x),y=new p(k,h+"leave",_,n,d),y.target=C,y.relatedTarget=v,k=null,_r(d)===c&&(p=new p(g,h+"enter",x,n,d),p.target=v,p.relatedTarget=C,k=p),C=k,_&&x)t:{for(p=_,g=x,h=0,v=p;v;v=Br(v))h++;for(v=0,k=g;k;k=Br(k))v++;for(;0<h-v;)p=Br(p),h--;for(;0<v-h;)g=Br(g),v--;for(;h--;){if(p===g||g!==null&&p===g.alternate)break t;p=Br(p),g=Br(g)}p=null}else p=null;_!==null&&Xf(f,y,_,p,!1),x!==null&&C!==null&&Xf(f,C,x,p,!0)}}e:{if(y=c?ii(c):window,_=y.nodeName&&y.nodeName.toLowerCase(),_==="select"||_==="input"&&y.type==="file")var D=Ex;else if(Yf(y))if(Wm)D=Tx;else{D=Px;var T=Mx}else(_=y.nodeName)&&_.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(D=Rx);if(D&&(D=D(e,c))){Ym(f,D,n,d);break e}T&&T(e,y,c),e==="focusout"&&(T=y._wrapperState)&&T.controlled&&y.type==="number"&&Tu(y,"number",y.value)}switch(T=c?ii(c):window,e){case"focusin":(Yf(T)||T.contentEditable==="true")&&(ni=T,Hu=c,uo=null);break;case"focusout":uo=Hu=ni=null;break;case"mousedown":Vu=!0;break;case"contextmenu":case"mouseup":case"dragend":Vu=!1,Gf(f,n,d);break;case"selectionchange":if(Lx)break;case"keydown":case"keyup":Gf(f,n,d)}var E;if(nd)e:{switch(e){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else ti?$m(e,n)&&(I="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(I="onCompositionStart");I&&(Fm&&n.locale!=="ko"&&(ti||I!=="onCompositionStart"?I==="onCompositionEnd"&&ti&&(E=zm()):(Zn=d,qc="value"in Zn?Zn.value:Zn.textContent,ti=!0)),T=as(c,I),0<T.length&&(I=new zf(I,e,null,n,d),f.push({event:I,listeners:T}),E?I.data=E:(E=Um(n),E!==null&&(I.data=E)))),(E=_x?bx(e,n):Cx(e,n))&&(c=as(c,"onBeforeInput"),0<c.length&&(d=new zf("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=E))}qm(f,t)})}function Mo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function as(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=So(e,n),o!=null&&r.unshift(Mo(e,o,i)),o=So(e,t),o!=null&&r.push(Mo(e,o,i))),e=e.return}return r}function Br(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Xf(e,t,n,r,i){for(var o=t._reactName,a=[];n!==null&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&c!==null&&(s=c,i?(l=So(n,o),l!=null&&a.unshift(Mo(n,l,s))):i||(l=So(n,o),l!=null&&a.push(Mo(n,l,s)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Fx=/\r\n?/g,$x=/\u0000|\uFFFD/g;function Jf(e){return(typeof e=="string"?e:""+e).replace(Fx,`
`).replace($x,"")}function da(e,t,n){if(t=Jf(t),Jf(e)!==t&&n)throw Error(P(425))}function ss(){}var Bu=null,Gu=null;function Qu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ku=typeof setTimeout=="function"?setTimeout:void 0,Ux=typeof clearTimeout=="function"?clearTimeout:void 0,Zf=typeof Promise=="function"?Promise:void 0,Yx=typeof queueMicrotask=="function"?queueMicrotask:typeof Zf<"u"?function(e){return Zf.resolve(null).then(e).catch(Wx)}:Ku;function Wx(e){setTimeout(function(){throw e})}function Xl(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Co(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Co(t)}function or(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function qf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Ni=Math.random().toString(36).slice(2),mn="__reactFiber$"+Ni,Po="__reactProps$"+Ni,In="__reactContainer$"+Ni,Xu="__reactEvents$"+Ni,Hx="__reactListeners$"+Ni,Vx="__reactHandles$"+Ni;function _r(e){var t=e[mn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[In]||n[mn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=qf(e);e!==null;){if(n=e[mn])return n;e=qf(e)}return t}e=n,n=e.parentNode}return null}function Bo(e){return e=e[mn]||e[In],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ii(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(P(33))}function Fs(e){return e[Po]||null}var Ju=[],oi=-1;function gr(e){return{current:e}}function De(e){0>oi||(e.current=Ju[oi],Ju[oi]=null,oi--)}function _e(e,t){oi++,Ju[oi]=e.current,e.current=t}var pr={},ht=gr(pr),Ct=gr(!1),Rr=pr;function Di(e,t){var n=e.type.contextTypes;if(!n)return pr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Dt(e){return e=e.childContextTypes,e!=null}function ls(){De(Ct),De(ht)}function eh(e,t,n){if(ht.current!==pr)throw Error(P(168));_e(ht,t),_e(Ct,n)}function tg(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(P(108,Mv(e)||"Unknown",i));return Ie({},n,r)}function us(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||pr,Rr=ht.current,_e(ht,e),_e(Ct,Ct.current),!0}function th(e,t,n){var r=e.stateNode;if(!r)throw Error(P(169));n?(e=tg(e,t,Rr),r.__reactInternalMemoizedMergedChildContext=e,De(Ct),De(ht),_e(ht,e)):De(Ct),_e(Ct,n)}var Mn=null,$s=!1,Jl=!1;function ng(e){Mn===null?Mn=[e]:Mn.push(e)}function Bx(e){$s=!0,ng(e)}function yr(){if(!Jl&&Mn!==null){Jl=!0;var e=0,t=ve;try{var n=Mn;for(ve=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Mn=null,$s=!1}catch(i){throw Mn!==null&&(Mn=Mn.slice(e+1)),jm(Kc,yr),i}finally{ve=t,Jl=!1}}return null}var ai=[],si=0,cs=null,ds=0,It=[],zt=0,Tr=null,Pn=1,Rn="";function kr(e,t){ai[si++]=ds,ai[si++]=cs,cs=e,ds=t}function rg(e,t,n){It[zt++]=Pn,It[zt++]=Rn,It[zt++]=Tr,Tr=e;var r=Pn;e=Rn;var i=32-rn(r)-1;r&=~(1<<i),n+=1;var o=32-rn(t)+i;if(30<o){var a=i-i%5;o=(r&(1<<a)-1).toString(32),r>>=a,i-=a,Pn=1<<32-rn(t)+i|n<<i|r,Rn=o+e}else Pn=1<<o|n<<i|r,Rn=e}function id(e){e.return!==null&&(kr(e,1),rg(e,1,0))}function od(e){for(;e===cs;)cs=ai[--si],ai[si]=null,ds=ai[--si],ai[si]=null;for(;e===Tr;)Tr=It[--zt],It[zt]=null,Rn=It[--zt],It[zt]=null,Pn=It[--zt],It[zt]=null}var Rt=null,Pt=null,Re=!1,en=null;function ig(e,t){var n=$t(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function nh(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Rt=e,Pt=or(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Rt=e,Pt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Tr!==null?{id:Pn,overflow:Rn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=$t(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Rt=e,Pt=null,!0):!1;default:return!1}}function Zu(e){return(e.mode&1)!==0&&(e.flags&128)===0}function qu(e){if(Re){var t=Pt;if(t){var n=t;if(!nh(e,t)){if(Zu(e))throw Error(P(418));t=or(n.nextSibling);var r=Rt;t&&nh(e,t)?ig(r,n):(e.flags=e.flags&-4097|2,Re=!1,Rt=e)}}else{if(Zu(e))throw Error(P(418));e.flags=e.flags&-4097|2,Re=!1,Rt=e}}}function rh(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Rt=e}function fa(e){if(e!==Rt)return!1;if(!Re)return rh(e),Re=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Qu(e.type,e.memoizedProps)),t&&(t=Pt)){if(Zu(e))throw og(),Error(P(418));for(;t;)ig(e,t),t=or(t.nextSibling)}if(rh(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(P(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Pt=or(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Pt=null}}else Pt=Rt?or(e.stateNode.nextSibling):null;return!0}function og(){for(var e=Pt;e;)e=or(e.nextSibling)}function ji(){Pt=Rt=null,Re=!1}function ad(e){en===null?en=[e]:en.push(e)}var Gx=Un.ReactCurrentBatchConfig;function Zt(e,t){if(e&&e.defaultProps){t=Ie({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}var fs=gr(null),hs=null,li=null,sd=null;function ld(){sd=li=hs=null}function ud(e){var t=fs.current;De(fs),e._currentValue=t}function ec(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function xi(e,t){hs=e,sd=li=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(bt=!0),e.firstContext=null)}function Yt(e){var t=e._currentValue;if(sd!==e)if(e={context:e,memoizedValue:t,next:null},li===null){if(hs===null)throw Error(P(308));li=e,hs.dependencies={lanes:0,firstContext:e}}else li=li.next=e;return t}var br=null;function cd(e){br===null?br=[e]:br.push(e)}function ag(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,cd(t)):(n.next=i.next,i.next=n),t.interleaved=n,zn(e,r)}function zn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Kn=!1;function dd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function sg(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function On(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ar(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,de&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,zn(e,n)}return i=r.interleaved,i===null?(t.next=t,cd(r)):(t.next=i.next,i.next=t),r.interleaved=t,zn(e,n)}function Fa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Xc(e,n)}}function ih(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=a:o=o.next=a,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ps(e,t,n,r){var i=e.updateQueue;Kn=!1;var o=i.firstBaseUpdate,a=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var l=s,c=l.next;l.next=null,a===null?o=c:a.next=c,a=l;var d=e.alternate;d!==null&&(d=d.updateQueue,s=d.lastBaseUpdate,s!==a&&(s===null?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=l))}if(o!==null){var f=i.baseState;a=0,d=c=l=null,s=o;do{var y=s.lane,_=s.eventTime;if((r&y)===y){d!==null&&(d=d.next={eventTime:_,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var x=e,p=s;switch(y=t,_=n,p.tag){case 1:if(x=p.payload,typeof x=="function"){f=x.call(_,f,y);break e}f=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=p.payload,y=typeof x=="function"?x.call(_,f,y):x,y==null)break e;f=Ie({},f,y);break e;case 2:Kn=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,y=i.effects,y===null?i.effects=[s]:y.push(s))}else _={eventTime:_,lane:y,tag:s.tag,payload:s.payload,callback:s.callback,next:null},d===null?(c=d=_,l=f):d=d.next=_,a|=y;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;y=s,s=y.next,y.next=null,i.lastBaseUpdate=y,i.shared.pending=null}}while(1);if(d===null&&(l=f),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);Or|=a,e.lanes=a,e.memoizedState=f}}function oh(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(P(191,i));i.call(r)}}}var lg=new am.Component().refs;function tc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Ie({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Us={isMounted:function(e){return(e=e._reactInternals)?Yr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=xt(),i=lr(e),o=On(r,i);o.payload=t,n!=null&&(o.callback=n),t=ar(e,o,i),t!==null&&(on(t,e,i,r),Fa(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=xt(),i=lr(e),o=On(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=ar(e,o,i),t!==null&&(on(t,e,i,r),Fa(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=xt(),r=lr(e),i=On(n,r);i.tag=2,t!=null&&(i.callback=t),t=ar(e,i,r),t!==null&&(on(t,e,r,n),Fa(t,e,r))}};function ah(e,t,n,r,i,o,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,a):t.prototype&&t.prototype.isPureReactComponent?!jo(n,r)||!jo(i,o):!0}function ug(e,t,n){var r=!1,i=pr,o=t.contextType;return typeof o=="object"&&o!==null?o=Yt(o):(i=Dt(t)?Rr:ht.current,r=t.contextTypes,o=(r=r!=null)?Di(e,i):pr),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Us,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function sh(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Us.enqueueReplaceState(t,t.state,null)}function nc(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs=lg,dd(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=Yt(o):(o=Dt(t)?Rr:ht.current,i.context=Di(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(tc(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Us.enqueueReplaceState(i,i.state,null),ps(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Gi(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(P(309));var r=n.stateNode}if(!r)throw Error(P(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(a){var s=i.refs;s===lg&&(s=i.refs={}),a===null?delete s[o]:s[o]=a},t._stringRef=o,t)}if(typeof e!="string")throw Error(P(284));if(!n._owner)throw Error(P(290,e))}return e}function ha(e,t){throw e=Object.prototype.toString.call(t),Error(P(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function lh(e){var t=e._init;return t(e._payload)}function cg(e){function t(g,h){if(e){var v=g.deletions;v===null?(g.deletions=[h],g.flags|=16):v.push(h)}}function n(g,h){if(!e)return null;for(;h!==null;)t(g,h),h=h.sibling;return null}function r(g,h){for(g=new Map;h!==null;)h.key!==null?g.set(h.key,h):g.set(h.index,h),h=h.sibling;return g}function i(g,h){return g=ur(g,h),g.index=0,g.sibling=null,g}function o(g,h,v){return g.index=v,e?(v=g.alternate,v!==null?(v=v.index,v<h?(g.flags|=2,h):v):(g.flags|=2,h)):(g.flags|=1048576,h)}function a(g){return e&&g.alternate===null&&(g.flags|=2),g}function s(g,h,v,k){return h===null||h.tag!==6?(h=iu(v,g.mode,k),h.return=g,h):(h=i(h,v),h.return=g,h)}function l(g,h,v,k){var D=v.type;return D===ei?d(g,h,v.props.children,k,v.key):h!==null&&(h.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===Qn&&lh(D)===h.type)?(k=i(h,v.props),k.ref=Gi(g,h,v),k.return=g,k):(k=Va(v.type,v.key,v.props,null,g.mode,k),k.ref=Gi(g,h,v),k.return=g,k)}function c(g,h,v,k){return h===null||h.tag!==4||h.stateNode.containerInfo!==v.containerInfo||h.stateNode.implementation!==v.implementation?(h=ou(v,g.mode,k),h.return=g,h):(h=i(h,v.children||[]),h.return=g,h)}function d(g,h,v,k,D){return h===null||h.tag!==7?(h=Mr(v,g.mode,k,D),h.return=g,h):(h=i(h,v),h.return=g,h)}function f(g,h,v){if(typeof h=="string"&&h!==""||typeof h=="number")return h=iu(""+h,g.mode,v),h.return=g,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case na:return v=Va(h.type,h.key,h.props,null,g.mode,v),v.ref=Gi(g,null,h),v.return=g,v;case qr:return h=ou(h,g.mode,v),h.return=g,h;case Qn:var k=h._init;return f(g,k(h._payload),v)}if(to(h)||Yi(h))return h=Mr(h,g.mode,v,null),h.return=g,h;ha(g,h)}return null}function y(g,h,v,k){var D=h!==null?h.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return D!==null?null:s(g,h,""+v,k);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case na:return v.key===D?l(g,h,v,k):null;case qr:return v.key===D?c(g,h,v,k):null;case Qn:return D=v._init,y(g,h,D(v._payload),k)}if(to(v)||Yi(v))return D!==null?null:d(g,h,v,k,null);ha(g,v)}return null}function _(g,h,v,k,D){if(typeof k=="string"&&k!==""||typeof k=="number")return g=g.get(v)||null,s(h,g,""+k,D);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case na:return g=g.get(k.key===null?v:k.key)||null,l(h,g,k,D);case qr:return g=g.get(k.key===null?v:k.key)||null,c(h,g,k,D);case Qn:var T=k._init;return _(g,h,v,T(k._payload),D)}if(to(k)||Yi(k))return g=g.get(v)||null,d(h,g,k,D,null);ha(h,k)}return null}function x(g,h,v,k){for(var D=null,T=null,E=h,I=h=0,re=null;E!==null&&I<v.length;I++){E.index>I?(re=E,E=null):re=E.sibling;var Q=y(g,E,v[I],k);if(Q===null){E===null&&(E=re);break}e&&E&&Q.alternate===null&&t(g,E),h=o(Q,h,I),T===null?D=Q:T.sibling=Q,T=Q,E=re}if(I===v.length)return n(g,E),Re&&kr(g,I),D;if(E===null){for(;I<v.length;I++)E=f(g,v[I],k),E!==null&&(h=o(E,h,I),T===null?D=E:T.sibling=E,T=E);return Re&&kr(g,I),D}for(E=r(g,E);I<v.length;I++)re=_(E,g,I,v[I],k),re!==null&&(e&&re.alternate!==null&&E.delete(re.key===null?I:re.key),h=o(re,h,I),T===null?D=re:T.sibling=re,T=re);return e&&E.forEach(function(Te){return t(g,Te)}),Re&&kr(g,I),D}function p(g,h,v,k){var D=Yi(v);if(typeof D!="function")throw Error(P(150));if(v=D.call(v),v==null)throw Error(P(151));for(var T=D=null,E=h,I=h=0,re=null,Q=v.next();E!==null&&!Q.done;I++,Q=v.next()){E.index>I?(re=E,E=null):re=E.sibling;var Te=y(g,E,Q.value,k);if(Te===null){E===null&&(E=re);break}e&&E&&Te.alternate===null&&t(g,E),h=o(Te,h,I),T===null?D=Te:T.sibling=Te,T=Te,E=re}if(Q.done)return n(g,E),Re&&kr(g,I),D;if(E===null){for(;!Q.done;I++,Q=v.next())Q=f(g,Q.value,k),Q!==null&&(h=o(Q,h,I),T===null?D=Q:T.sibling=Q,T=Q);return Re&&kr(g,I),D}for(E=r(g,E);!Q.done;I++,Q=v.next())Q=_(E,g,I,Q.value,k),Q!==null&&(e&&Q.alternate!==null&&E.delete(Q.key===null?I:Q.key),h=o(Q,h,I),T===null?D=Q:T.sibling=Q,T=Q);return e&&E.forEach(function(Se){return t(g,Se)}),Re&&kr(g,I),D}function C(g,h,v,k){if(typeof v=="object"&&v!==null&&v.type===ei&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case na:e:{for(var D=v.key,T=h;T!==null;){if(T.key===D){if(D=v.type,D===ei){if(T.tag===7){n(g,T.sibling),h=i(T,v.props.children),h.return=g,g=h;break e}}else if(T.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===Qn&&lh(D)===T.type){n(g,T.sibling),h=i(T,v.props),h.ref=Gi(g,T,v),h.return=g,g=h;break e}n(g,T);break}else t(g,T);T=T.sibling}v.type===ei?(h=Mr(v.props.children,g.mode,k,v.key),h.return=g,g=h):(k=Va(v.type,v.key,v.props,null,g.mode,k),k.ref=Gi(g,h,v),k.return=g,g=k)}return a(g);case qr:e:{for(T=v.key;h!==null;){if(h.key===T)if(h.tag===4&&h.stateNode.containerInfo===v.containerInfo&&h.stateNode.implementation===v.implementation){n(g,h.sibling),h=i(h,v.children||[]),h.return=g,g=h;break e}else{n(g,h);break}else t(g,h);h=h.sibling}h=ou(v,g.mode,k),h.return=g,g=h}return a(g);case Qn:return T=v._init,C(g,h,T(v._payload),k)}if(to(v))return x(g,h,v,k);if(Yi(v))return p(g,h,v,k);ha(g,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,h!==null&&h.tag===6?(n(g,h.sibling),h=i(h,v),h.return=g,g=h):(n(g,h),h=iu(v,g.mode,k),h.return=g,g=h),a(g)):n(g,h)}return C}var Ei=cg(!0),dg=cg(!1),Go={},vn=gr(Go),Ro=gr(Go),To=gr(Go);function Cr(e){if(e===Go)throw Error(P(174));return e}function fd(e,t){switch(_e(To,t),_e(Ro,e),_e(vn,Go),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ou(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ou(t,e)}De(vn),_e(vn,t)}function Mi(){De(vn),De(Ro),De(To)}function fg(e){Cr(To.current);var t=Cr(vn.current),n=Ou(t,e.type);t!==n&&(_e(Ro,e),_e(vn,n))}function hd(e){Ro.current===e&&(De(vn),De(Ro))}var Le=gr(0);function ms(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Zl=[];function pd(){for(var e=0;e<Zl.length;e++)Zl[e]._workInProgressVersionPrimary=null;Zl.length=0}var $a=Un.ReactCurrentDispatcher,ql=Un.ReactCurrentBatchConfig,Ar=0,Ne=null,Xe=null,et=null,gs=!1,co=!1,Ao=0,Qx=0;function ut(){throw Error(P(321))}function md(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!an(e[n],t[n]))return!1;return!0}function gd(e,t,n,r,i,o){if(Ar=o,Ne=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,$a.current=e===null||e.memoizedState===null?Zx:qx,e=n(r,i),co){o=0;do{if(co=!1,Ao=0,25<=o)throw Error(P(301));o+=1,et=Xe=null,t.updateQueue=null,$a.current=e1,e=n(r,i)}while(co)}if($a.current=ys,t=Xe!==null&&Xe.next!==null,Ar=0,et=Xe=Ne=null,gs=!1,t)throw Error(P(300));return e}function yd(){var e=Ao!==0;return Ao=0,e}function hn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return et===null?Ne.memoizedState=et=e:et=et.next=e,et}function Wt(){if(Xe===null){var e=Ne.alternate;e=e!==null?e.memoizedState:null}else e=Xe.next;var t=et===null?Ne.memoizedState:et.next;if(t!==null)et=t,Xe=e;else{if(e===null)throw Error(P(310));Xe=e,e={memoizedState:Xe.memoizedState,baseState:Xe.baseState,baseQueue:Xe.baseQueue,queue:Xe.queue,next:null},et===null?Ne.memoizedState=et=e:et=et.next=e}return et}function Oo(e,t){return typeof t=="function"?t(e):t}function eu(e){var t=Wt(),n=t.queue;if(n===null)throw Error(P(311));n.lastRenderedReducer=e;var r=Xe,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var a=i.next;i.next=o.next,o.next=a}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var s=a=null,l=null,c=o;do{var d=c.lane;if((Ar&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=f,a=r):l=l.next=f,Ne.lanes|=d,Or|=d}c=c.next}while(c!==null&&c!==o);l===null?a=r:l.next=s,an(r,t.memoizedState)||(bt=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,Ne.lanes|=o,Or|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function tu(e){var t=Wt(),n=t.queue;if(n===null)throw Error(P(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do o=e(o,a.action),a=a.next;while(a!==i);an(o,t.memoizedState)||(bt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function hg(){}function pg(e,t){var n=Ne,r=Wt(),i=t(),o=!an(r.memoizedState,i);if(o&&(r.memoizedState=i,bt=!0),r=r.queue,vd(yg.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||et!==null&&et.memoizedState.tag&1){if(n.flags|=2048,Lo(9,gg.bind(null,n,r,i,t),void 0,null),tt===null)throw Error(P(349));Ar&30||mg(n,t,i)}return i}function mg(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ne.updateQueue,t===null?(t={lastEffect:null,stores:null},Ne.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gg(e,t,n,r){t.value=n,t.getSnapshot=r,vg(t)&&xg(e)}function yg(e,t,n){return n(function(){vg(t)&&xg(e)})}function vg(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!an(e,n)}catch{return!0}}function xg(e){var t=zn(e,1);t!==null&&on(t,e,1,-1)}function uh(e){var t=hn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Oo,lastRenderedState:e},t.queue=e,e=e.dispatch=Jx.bind(null,Ne,e),[t.memoizedState,e]}function Lo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ne.updateQueue,t===null?(t={lastEffect:null,stores:null},Ne.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function wg(){return Wt().memoizedState}function Ua(e,t,n,r){var i=hn();Ne.flags|=e,i.memoizedState=Lo(1|t,n,void 0,r===void 0?null:r)}function Ys(e,t,n,r){var i=Wt();r=r===void 0?null:r;var o=void 0;if(Xe!==null){var a=Xe.memoizedState;if(o=a.destroy,r!==null&&md(r,a.deps)){i.memoizedState=Lo(t,n,o,r);return}}Ne.flags|=e,i.memoizedState=Lo(1|t,n,o,r)}function ch(e,t){return Ua(8390656,8,e,t)}function vd(e,t){return Ys(2048,8,e,t)}function kg(e,t){return Ys(4,2,e,t)}function Sg(e,t){return Ys(4,4,e,t)}function _g(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function bg(e,t,n){return n=n!=null?n.concat([e]):null,Ys(4,4,_g.bind(null,t,e),n)}function xd(){}function Cg(e,t){var n=Wt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&md(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Dg(e,t){var n=Wt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&md(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function jg(e,t,n){return Ar&21?(an(n,t)||(n=Pm(),Ne.lanes|=n,Or|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,bt=!0),e.memoizedState=n)}function Kx(e,t){var n=ve;ve=n!==0&&4>n?n:4,e(!0);var r=ql.transition;ql.transition={};try{e(!1),t()}finally{ve=n,ql.transition=r}}function Eg(){return Wt().memoizedState}function Xx(e,t,n){var r=lr(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Mg(e))Pg(t,n);else if(n=ag(e,t,n,r),n!==null){var i=xt();on(n,e,r,i),Rg(n,t,r)}}function Jx(e,t,n){var r=lr(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Mg(e))Pg(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var a=t.lastRenderedState,s=o(a,n);if(i.hasEagerState=!0,i.eagerState=s,an(s,a)){var l=t.interleaved;l===null?(i.next=i,cd(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}n=ag(e,t,i,r),n!==null&&(i=xt(),on(n,e,r,i),Rg(n,t,r))}}function Mg(e){var t=e.alternate;return e===Ne||t!==null&&t===Ne}function Pg(e,t){co=gs=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Rg(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Xc(e,n)}}var ys={readContext:Yt,useCallback:ut,useContext:ut,useEffect:ut,useImperativeHandle:ut,useInsertionEffect:ut,useLayoutEffect:ut,useMemo:ut,useReducer:ut,useRef:ut,useState:ut,useDebugValue:ut,useDeferredValue:ut,useTransition:ut,useMutableSource:ut,useSyncExternalStore:ut,useId:ut,unstable_isNewReconciler:!1},Zx={readContext:Yt,useCallback:function(e,t){return hn().memoizedState=[e,t===void 0?null:t],e},useContext:Yt,useEffect:ch,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ua(4194308,4,_g.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ua(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ua(4,2,e,t)},useMemo:function(e,t){var n=hn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=hn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Xx.bind(null,Ne,e),[r.memoizedState,e]},useRef:function(e){var t=hn();return e={current:e},t.memoizedState=e},useState:uh,useDebugValue:xd,useDeferredValue:function(e){return hn().memoizedState=e},useTransition:function(){var e=uh(!1),t=e[0];return e=Kx.bind(null,e[1]),hn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Ne,i=hn();if(Re){if(n===void 0)throw Error(P(407));n=n()}else{if(n=t(),tt===null)throw Error(P(349));Ar&30||mg(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,ch(yg.bind(null,r,o,e),[e]),r.flags|=2048,Lo(9,gg.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=hn(),t=tt.identifierPrefix;if(Re){var n=Rn,r=Pn;n=(r&~(1<<32-rn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Ao++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Qx++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},qx={readContext:Yt,useCallback:Cg,useContext:Yt,useEffect:vd,useImperativeHandle:bg,useInsertionEffect:kg,useLayoutEffect:Sg,useMemo:Dg,useReducer:eu,useRef:wg,useState:function(){return eu(Oo)},useDebugValue:xd,useDeferredValue:function(e){var t=Wt();return jg(t,Xe.memoizedState,e)},useTransition:function(){var e=eu(Oo)[0],t=Wt().memoizedState;return[e,t]},useMutableSource:hg,useSyncExternalStore:pg,useId:Eg,unstable_isNewReconciler:!1},e1={readContext:Yt,useCallback:Cg,useContext:Yt,useEffect:vd,useImperativeHandle:bg,useInsertionEffect:kg,useLayoutEffect:Sg,useMemo:Dg,useReducer:tu,useRef:wg,useState:function(){return tu(Oo)},useDebugValue:xd,useDeferredValue:function(e){var t=Wt();return Xe===null?t.memoizedState=e:jg(t,Xe.memoizedState,e)},useTransition:function(){var e=tu(Oo)[0],t=Wt().memoizedState;return[e,t]},useMutableSource:hg,useSyncExternalStore:pg,useId:Eg,unstable_isNewReconciler:!1};function Pi(e,t){try{var n="",r=t;do n+=Ev(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function nu(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function rc(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var t1=typeof WeakMap=="function"?WeakMap:Map;function Tg(e,t,n){n=On(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){xs||(xs=!0,hc=r),rc(e,t)},n}function Ag(e,t,n){n=On(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){rc(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){rc(e,t),typeof r!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function dh(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new t1;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=m1.bind(null,e,t,n),t.then(e,e))}function fh(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function hh(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=On(-1,1),t.tag=2,ar(n,t,1))),n.lanes|=1),e)}var n1=Un.ReactCurrentOwner,bt=!1;function vt(e,t,n,r){t.child=e===null?dg(t,null,n,r):Ei(t,e.child,n,r)}function ph(e,t,n,r,i){n=n.render;var o=t.ref;return xi(t,i),r=gd(e,t,n,r,o,i),n=yd(),e!==null&&!bt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Fn(e,t,i)):(Re&&n&&id(t),t.flags|=1,vt(e,t,r,i),t.child)}function mh(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!jd(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Og(e,t,o,r,i)):(e=Va(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var a=o.memoizedProps;if(n=n.compare,n=n!==null?n:jo,n(a,r)&&e.ref===t.ref)return Fn(e,t,i)}return t.flags|=1,e=ur(o,r),e.ref=t.ref,e.return=t,t.child=e}function Og(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(jo(o,r)&&e.ref===t.ref)if(bt=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(bt=!0);else return t.lanes=e.lanes,Fn(e,t,i)}return ic(e,t,n,r,i)}function Lg(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},_e(ci,Et),Et|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,_e(ci,Et),Et|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,_e(ci,Et),Et|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,_e(ci,Et),Et|=r;return vt(e,t,i,n),t.child}function Ng(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ic(e,t,n,r,i){var o=Dt(n)?Rr:ht.current;return o=Di(t,o),xi(t,i),n=gd(e,t,n,r,o,i),r=yd(),e!==null&&!bt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Fn(e,t,i)):(Re&&r&&id(t),t.flags|=1,vt(e,t,n,i),t.child)}function gh(e,t,n,r,i){if(Dt(n)){var o=!0;us(t)}else o=!1;if(xi(t,i),t.stateNode===null)Ya(e,t),ug(t,n,r),nc(t,n,r,i),r=!0;else if(e===null){var a=t.stateNode,s=t.memoizedProps;a.props=s;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Yt(c):(c=Dt(n)?Rr:ht.current,c=Di(t,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==r||l!==c)&&sh(t,a,r,c),Kn=!1;var y=t.memoizedState;a.state=y,ps(t,r,a,i),l=t.memoizedState,s!==r||y!==l||Ct.current||Kn?(typeof d=="function"&&(tc(t,n,d,r),l=t.memoizedState),(s=Kn||ah(t,n,s,r,y,l,c))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=c,r=s):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,sg(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:Zt(t.type,s),a.props=c,f=t.pendingProps,y=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Yt(l):(l=Dt(n)?Rr:ht.current,l=Di(t,l));var _=n.getDerivedStateFromProps;(d=typeof _=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==f||y!==l)&&sh(t,a,r,l),Kn=!1,y=t.memoizedState,a.state=y,ps(t,r,a,i);var x=t.memoizedState;s!==f||y!==x||Ct.current||Kn?(typeof _=="function"&&(tc(t,n,_,r),x=t.memoizedState),(c=Kn||ah(t,n,c,r,y,x,l)||!1)?(d||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,x,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,x,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),a.props=r,a.state=x,a.context=l,r=c):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),r=!1)}return oc(e,t,n,r,o,i)}function oc(e,t,n,r,i,o){Ng(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return i&&th(t,n,!1),Fn(e,t,o);r=t.stateNode,n1.current=t;var s=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=Ei(t,e.child,null,o),t.child=Ei(t,null,s,o)):vt(e,t,s,o),t.memoizedState=r.state,i&&th(t,n,!0),t.child}function Ig(e){var t=e.stateNode;t.pendingContext?eh(e,t.pendingContext,t.pendingContext!==t.context):t.context&&eh(e,t.context,!1),fd(e,t.containerInfo)}function yh(e,t,n,r,i){return ji(),ad(i),t.flags|=256,vt(e,t,n,r),t.child}var ac={dehydrated:null,treeContext:null,retryLane:0};function sc(e){return{baseLanes:e,cachePool:null,transitions:null}}function zg(e,t,n){var r=t.pendingProps,i=Le.current,o=!1,a=(t.flags&128)!==0,s;if((s=a)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!==0),s?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),_e(Le,i&1),e===null)return qu(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,o?(r=t.mode,o=t.child,a={mode:"hidden",children:a},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=a):o=Vs(a,r,0,null),e=Mr(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=sc(n),t.memoizedState=ac,e):wd(t,a));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return r1(e,t,a,r,s,i,n);if(o){o=r.fallback,a=t.mode,i=e.child,s=i.sibling;var l={mode:"hidden",children:r.children};return!(a&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=ur(i,l),r.subtreeFlags=i.subtreeFlags&14680064),s!==null?o=ur(s,o):(o=Mr(o,a,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,a=e.child.memoizedState,a=a===null?sc(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},o.memoizedState=a,o.childLanes=e.childLanes&~n,t.memoizedState=ac,r}return o=e.child,e=o.sibling,r=ur(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function wd(e,t){return t=Vs({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function pa(e,t,n,r){return r!==null&&ad(r),Ei(t,e.child,null,n),e=wd(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function r1(e,t,n,r,i,o,a){if(n)return t.flags&256?(t.flags&=-257,r=nu(Error(P(422))),pa(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=Vs({mode:"visible",children:r.children},i,0,null),o=Mr(o,i,a,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Ei(t,e.child,null,a),t.child.memoizedState=sc(a),t.memoizedState=ac,o);if(!(t.mode&1))return pa(e,t,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var s=r.dgst;return r=s,o=Error(P(419)),r=nu(o,r,void 0),pa(e,t,a,r)}if(s=(a&e.childLanes)!==0,bt||s){if(r=tt,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,zn(e,i),on(r,e,i,-1))}return Dd(),r=nu(Error(P(421))),pa(e,t,a,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=g1.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,Pt=or(i.nextSibling),Rt=t,Re=!0,en=null,e!==null&&(It[zt++]=Pn,It[zt++]=Rn,It[zt++]=Tr,Pn=e.id,Rn=e.overflow,Tr=t),t=wd(t,r.children),t.flags|=4096,t)}function vh(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ec(e.return,t,n)}function ru(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Fg(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(vt(e,t,r.children,n),r=Le.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&vh(e,n,t);else if(e.tag===19)vh(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(_e(Le,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ms(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),ru(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ms(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}ru(t,!0,n,null,o);break;case"together":ru(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ya(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Fn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Or|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(P(153));if(t.child!==null){for(e=t.child,n=ur(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ur(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function i1(e,t,n){switch(t.tag){case 3:Ig(t),ji();break;case 5:fg(t);break;case 1:Dt(t.type)&&us(t);break;case 4:fd(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;_e(fs,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(_e(Le,Le.current&1),t.flags|=128,null):n&t.child.childLanes?zg(e,t,n):(_e(Le,Le.current&1),e=Fn(e,t,n),e!==null?e.sibling:null);_e(Le,Le.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Fg(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),_e(Le,Le.current),r)break;return null;case 22:case 23:return t.lanes=0,Lg(e,t,n)}return Fn(e,t,n)}var $g,lc,Ug,Yg;$g=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};lc=function(){};Ug=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Cr(vn.current);var o=null;switch(n){case"input":i=Pu(e,i),r=Pu(e,r),o=[];break;case"select":i=Ie({},i,{value:void 0}),r=Ie({},r,{value:void 0}),o=[];break;case"textarea":i=Au(e,i),r=Au(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ss)}Lu(n,r);var a;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var s=i[c];for(a in s)s.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(wo.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var l=r[c];if(s=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(a in s)!s.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&s[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(o||(o=[]),o.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(o=o||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(wo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Ce("scroll",e),o||s===l||(o=[])):(o=o||[]).push(c,l))}n&&(o=o||[]).push("style",n);var c=o;(t.updateQueue=c)&&(t.flags|=4)}};Yg=function(e,t,n,r){n!==r&&(t.flags|=4)};function Qi(e,t){if(!Re)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ct(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function o1(e,t,n){var r=t.pendingProps;switch(od(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ct(t),null;case 1:return Dt(t.type)&&ls(),ct(t),null;case 3:return r=t.stateNode,Mi(),De(Ct),De(ht),pd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(fa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,en!==null&&(gc(en),en=null))),lc(e,t),ct(t),null;case 5:hd(t);var i=Cr(To.current);if(n=t.type,e!==null&&t.stateNode!=null)Ug(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(P(166));return ct(t),null}if(e=Cr(vn.current),fa(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[mn]=t,r[Po]=o,e=(t.mode&1)!==0,n){case"dialog":Ce("cancel",r),Ce("close",r);break;case"iframe":case"object":case"embed":Ce("load",r);break;case"video":case"audio":for(i=0;i<ro.length;i++)Ce(ro[i],r);break;case"source":Ce("error",r);break;case"img":case"image":case"link":Ce("error",r),Ce("load",r);break;case"details":Ce("toggle",r);break;case"input":jf(r,o),Ce("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Ce("invalid",r);break;case"textarea":Mf(r,o),Ce("invalid",r)}Lu(n,o),i=null;for(var a in o)if(o.hasOwnProperty(a)){var s=o[a];a==="children"?typeof s=="string"?r.textContent!==s&&(o.suppressHydrationWarning!==!0&&da(r.textContent,s,e),i=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(o.suppressHydrationWarning!==!0&&da(r.textContent,s,e),i=["children",""+s]):wo.hasOwnProperty(a)&&s!=null&&a==="onScroll"&&Ce("scroll",r)}switch(n){case"input":ra(r),Ef(r,o,!0);break;case"textarea":ra(r),Pf(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=ss)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=mm(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[mn]=t,e[Po]=r,$g(e,t,!1,!1),t.stateNode=e;e:{switch(a=Nu(n,r),n){case"dialog":Ce("cancel",e),Ce("close",e),i=r;break;case"iframe":case"object":case"embed":Ce("load",e),i=r;break;case"video":case"audio":for(i=0;i<ro.length;i++)Ce(ro[i],e);i=r;break;case"source":Ce("error",e),i=r;break;case"img":case"image":case"link":Ce("error",e),Ce("load",e),i=r;break;case"details":Ce("toggle",e),i=r;break;case"input":jf(e,r),i=Pu(e,r),Ce("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=Ie({},r,{value:void 0}),Ce("invalid",e);break;case"textarea":Mf(e,r),i=Au(e,r),Ce("invalid",e);break;default:i=r}Lu(n,i),s=i;for(o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="style"?vm(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&gm(e,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&ko(e,l):typeof l=="number"&&ko(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(wo.hasOwnProperty(o)?l!=null&&o==="onScroll"&&Ce("scroll",e):l!=null&&Hc(e,o,l,a))}switch(n){case"input":ra(e),Ef(e,r,!1);break;case"textarea":ra(e),Pf(e);break;case"option":r.value!=null&&e.setAttribute("value",""+hr(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?mi(e,!!r.multiple,o,!1):r.defaultValue!=null&&mi(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=ss)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ct(t),null;case 6:if(e&&t.stateNode!=null)Yg(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(P(166));if(n=Cr(To.current),Cr(vn.current),fa(t)){if(r=t.stateNode,n=t.memoizedProps,r[mn]=t,(o=r.nodeValue!==n)&&(e=Rt,e!==null))switch(e.tag){case 3:da(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&da(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[mn]=t,t.stateNode=r}return ct(t),null;case 13:if(De(Le),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Re&&Pt!==null&&t.mode&1&&!(t.flags&128))og(),ji(),t.flags|=98560,o=!1;else if(o=fa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(P(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(P(317));o[mn]=t}else ji(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ct(t),o=!1}else en!==null&&(gc(en),en=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Le.current&1?Je===0&&(Je=3):Dd())),t.updateQueue!==null&&(t.flags|=4),ct(t),null);case 4:return Mi(),lc(e,t),e===null&&Eo(t.stateNode.containerInfo),ct(t),null;case 10:return ud(t.type._context),ct(t),null;case 17:return Dt(t.type)&&ls(),ct(t),null;case 19:if(De(Le),o=t.memoizedState,o===null)return ct(t),null;if(r=(t.flags&128)!==0,a=o.rendering,a===null)if(r)Qi(o,!1);else{if(Je!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=ms(e),a!==null){for(t.flags|=128,Qi(o,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,a=o.alternate,a===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=a.childLanes,o.lanes=a.lanes,o.child=a.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=a.memoizedProps,o.memoizedState=a.memoizedState,o.updateQueue=a.updateQueue,o.type=a.type,e=a.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return _e(Le,Le.current&1|2),t.child}e=e.sibling}o.tail!==null&&He()>Ri&&(t.flags|=128,r=!0,Qi(o,!1),t.lanes=4194304)}else{if(!r)if(e=ms(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Qi(o,!0),o.tail===null&&o.tailMode==="hidden"&&!a.alternate&&!Re)return ct(t),null}else 2*He()-o.renderingStartTime>Ri&&n!==1073741824&&(t.flags|=128,r=!0,Qi(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(n=o.last,n!==null?n.sibling=a:t.child=a,o.last=a)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=He(),t.sibling=null,n=Le.current,_e(Le,r?n&1|2:n&1),t):(ct(t),null);case 22:case 23:return Cd(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Et&1073741824&&(ct(t),t.subtreeFlags&6&&(t.flags|=8192)):ct(t),null;case 24:return null;case 25:return null}throw Error(P(156,t.tag))}function a1(e,t){switch(od(t),t.tag){case 1:return Dt(t.type)&&ls(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Mi(),De(Ct),De(ht),pd(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return hd(t),null;case 13:if(De(Le),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(P(340));ji()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return De(Le),null;case 4:return Mi(),null;case 10:return ud(t.type._context),null;case 22:case 23:return Cd(),null;case 24:return null;default:return null}}var ma=!1,dt=!1,s1=typeof WeakSet=="function"?WeakSet:Set,U=null;function ui(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Fe(e,t,r)}else n.current=null}function uc(e,t,n){try{n()}catch(r){Fe(e,t,r)}}var xh=!1;function l1(e,t){if(Bu=is,e=Bm(),rd(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var a=0,s=-1,l=-1,c=0,d=0,f=e,y=null;t:for(;;){for(var _;f!==n||i!==0&&f.nodeType!==3||(s=a+i),f!==o||r!==0&&f.nodeType!==3||(l=a+r),f.nodeType===3&&(a+=f.nodeValue.length),(_=f.firstChild)!==null;)y=f,f=_;for(;;){if(f===e)break t;if(y===n&&++c===i&&(s=a),y===o&&++d===r&&(l=a),(_=f.nextSibling)!==null)break;f=y,y=f.parentNode}f=_}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Gu={focusedElem:e,selectionRange:n},is=!1,U=t;U!==null;)if(t=U,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,U=e;else for(;U!==null;){t=U;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var p=x.memoizedProps,C=x.memoizedState,g=t.stateNode,h=g.getSnapshotBeforeUpdate(t.elementType===t.type?p:Zt(t.type,p),C);g.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var v=t.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(P(163))}}catch(k){Fe(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,U=e;break}U=t.return}return x=xh,xh=!1,x}function fo(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&uc(t,n,o)}i=i.next}while(i!==r)}}function Ws(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function cc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Wg(e){var t=e.alternate;t!==null&&(e.alternate=null,Wg(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[mn],delete t[Po],delete t[Xu],delete t[Hx],delete t[Vx])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Hg(e){return e.tag===5||e.tag===3||e.tag===4}function wh(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Hg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function dc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ss));else if(r!==4&&(e=e.child,e!==null))for(dc(e,t,n),e=e.sibling;e!==null;)dc(e,t,n),e=e.sibling}function fc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(fc(e,t,n),e=e.sibling;e!==null;)fc(e,t,n),e=e.sibling}var it=null,qt=!1;function Bn(e,t,n){for(n=n.child;n!==null;)Vg(e,t,n),n=n.sibling}function Vg(e,t,n){if(yn&&typeof yn.onCommitFiberUnmount=="function")try{yn.onCommitFiberUnmount(Ls,n)}catch{}switch(n.tag){case 5:dt||ui(n,t);case 6:var r=it,i=qt;it=null,Bn(e,t,n),it=r,qt=i,it!==null&&(qt?(e=it,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):it.removeChild(n.stateNode));break;case 18:it!==null&&(qt?(e=it,n=n.stateNode,e.nodeType===8?Xl(e.parentNode,n):e.nodeType===1&&Xl(e,n),Co(e)):Xl(it,n.stateNode));break;case 4:r=it,i=qt,it=n.stateNode.containerInfo,qt=!0,Bn(e,t,n),it=r,qt=i;break;case 0:case 11:case 14:case 15:if(!dt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,a=o.destroy;o=o.tag,a!==void 0&&(o&2||o&4)&&uc(n,t,a),i=i.next}while(i!==r)}Bn(e,t,n);break;case 1:if(!dt&&(ui(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){Fe(n,t,s)}Bn(e,t,n);break;case 21:Bn(e,t,n);break;case 22:n.mode&1?(dt=(r=dt)||n.memoizedState!==null,Bn(e,t,n),dt=r):Bn(e,t,n);break;default:Bn(e,t,n)}}function kh(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new s1),t.forEach(function(r){var i=y1.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Xt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,a=t,s=a;e:for(;s!==null;){switch(s.tag){case 5:it=s.stateNode,qt=!1;break e;case 3:it=s.stateNode.containerInfo,qt=!0;break e;case 4:it=s.stateNode.containerInfo,qt=!0;break e}s=s.return}if(it===null)throw Error(P(160));Vg(o,a,i),it=null,qt=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){Fe(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Bg(t,e),t=t.sibling}function Bg(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Xt(t,e),fn(e),r&4){try{fo(3,e,e.return),Ws(3,e)}catch(p){Fe(e,e.return,p)}try{fo(5,e,e.return)}catch(p){Fe(e,e.return,p)}}break;case 1:Xt(t,e),fn(e),r&512&&n!==null&&ui(n,n.return);break;case 5:if(Xt(t,e),fn(e),r&512&&n!==null&&ui(n,n.return),e.flags&32){var i=e.stateNode;try{ko(i,"")}catch(p){Fe(e,e.return,p)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,a=n!==null?n.memoizedProps:o,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&o.type==="radio"&&o.name!=null&&hm(i,o),Nu(s,a);var c=Nu(s,o);for(a=0;a<l.length;a+=2){var d=l[a],f=l[a+1];d==="style"?vm(i,f):d==="dangerouslySetInnerHTML"?gm(i,f):d==="children"?ko(i,f):Hc(i,d,f,c)}switch(s){case"input":Ru(i,o);break;case"textarea":pm(i,o);break;case"select":var y=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var _=o.value;_!=null?mi(i,!!o.multiple,_,!1):y!==!!o.multiple&&(o.defaultValue!=null?mi(i,!!o.multiple,o.defaultValue,!0):mi(i,!!o.multiple,o.multiple?[]:"",!1))}i[Po]=o}catch(p){Fe(e,e.return,p)}}break;case 6:if(Xt(t,e),fn(e),r&4){if(e.stateNode===null)throw Error(P(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(p){Fe(e,e.return,p)}}break;case 3:if(Xt(t,e),fn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Co(t.containerInfo)}catch(p){Fe(e,e.return,p)}break;case 4:Xt(t,e),fn(e);break;case 13:Xt(t,e),fn(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(_d=He())),r&4&&kh(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(dt=(c=dt)||d,Xt(t,e),dt=c):Xt(t,e),fn(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!d&&e.mode&1)for(U=e,d=e.child;d!==null;){for(f=U=d;U!==null;){switch(y=U,_=y.child,y.tag){case 0:case 11:case 14:case 15:fo(4,y,y.return);break;case 1:ui(y,y.return);var x=y.stateNode;if(typeof x.componentWillUnmount=="function"){r=y,n=y.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(p){Fe(r,n,p)}}break;case 5:ui(y,y.return);break;case 22:if(y.memoizedState!==null){_h(f);continue}}_!==null?(_.return=y,U=_):_h(f)}d=d.sibling}e:for(d=null,f=e;;){if(f.tag===5){if(d===null){d=f;try{i=f.stateNode,c?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(s=f.stateNode,l=f.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=ym("display",a))}catch(p){Fe(e,e.return,p)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(p){Fe(e,e.return,p)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Xt(t,e),fn(e),r&4&&kh(e);break;case 21:break;default:Xt(t,e),fn(e)}}function fn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Hg(n)){var r=n;break e}n=n.return}throw Error(P(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(ko(i,""),r.flags&=-33);var o=wh(e);fc(e,o,i);break;case 3:case 4:var a=r.stateNode.containerInfo,s=wh(e);dc(e,s,a);break;default:throw Error(P(161))}}catch(l){Fe(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function u1(e,t,n){U=e,Gg(e)}function Gg(e,t,n){for(var r=(e.mode&1)!==0;U!==null;){var i=U,o=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||ma;if(!a){var s=i.alternate,l=s!==null&&s.memoizedState!==null||dt;s=ma;var c=dt;if(ma=a,(dt=l)&&!c)for(U=i;U!==null;)a=U,l=a.child,a.tag===22&&a.memoizedState!==null?bh(i):l!==null?(l.return=a,U=l):bh(i);for(;o!==null;)U=o,Gg(o),o=o.sibling;U=i,ma=s,dt=c}Sh(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,U=o):Sh(e)}}function Sh(e){for(;U!==null;){var t=U;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:dt||Ws(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!dt)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Zt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&oh(t,o,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}oh(t,a,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&Co(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(P(163))}dt||t.flags&512&&cc(t)}catch(y){Fe(t,t.return,y)}}if(t===e){U=null;break}if(n=t.sibling,n!==null){n.return=t.return,U=n;break}U=t.return}}function _h(e){for(;U!==null;){var t=U;if(t===e){U=null;break}var n=t.sibling;if(n!==null){n.return=t.return,U=n;break}U=t.return}}function bh(e){for(;U!==null;){var t=U;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ws(4,t)}catch(l){Fe(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(l){Fe(t,i,l)}}var o=t.return;try{cc(t)}catch(l){Fe(t,o,l)}break;case 5:var a=t.return;try{cc(t)}catch(l){Fe(t,a,l)}}}catch(l){Fe(t,t.return,l)}if(t===e){U=null;break}var s=t.sibling;if(s!==null){s.return=t.return,U=s;break}U=t.return}}var c1=Math.ceil,vs=Un.ReactCurrentDispatcher,kd=Un.ReactCurrentOwner,Ut=Un.ReactCurrentBatchConfig,de=0,tt=null,Ge=null,ot=0,Et=0,ci=gr(0),Je=0,No=null,Or=0,Hs=0,Sd=0,ho=null,_t=null,_d=0,Ri=1/0,Dn=null,xs=!1,hc=null,sr=null,ga=!1,qn=null,ws=0,po=0,pc=null,Wa=-1,Ha=0;function xt(){return de&6?He():Wa!==-1?Wa:Wa=He()}function lr(e){return e.mode&1?de&2&&ot!==0?ot&-ot:Gx.transition!==null?(Ha===0&&(Ha=Pm()),Ha):(e=ve,e!==0||(e=window.event,e=e===void 0?16:Im(e.type)),e):1}function on(e,t,n,r){if(50<po)throw po=0,pc=null,Error(P(185));Ho(e,n,r),(!(de&2)||e!==tt)&&(e===tt&&(!(de&2)&&(Hs|=n),Je===4&&Jn(e,ot)),jt(e,r),n===1&&de===0&&!(t.mode&1)&&(Ri=He()+500,$s&&yr()))}function jt(e,t){var n=e.callbackNode;Gv(e,t);var r=rs(e,e===tt?ot:0);if(r===0)n!==null&&Af(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Af(n),t===1)e.tag===0?Bx(Ch.bind(null,e)):ng(Ch.bind(null,e)),Yx(function(){!(de&6)&&yr()}),n=null;else{switch(Rm(r)){case 1:n=Kc;break;case 4:n=Em;break;case 16:n=ns;break;case 536870912:n=Mm;break;default:n=ns}n=t0(n,Qg.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Qg(e,t){if(Wa=-1,Ha=0,de&6)throw Error(P(327));var n=e.callbackNode;if(wi()&&e.callbackNode!==n)return null;var r=rs(e,e===tt?ot:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ks(e,r);else{t=r;var i=de;de|=2;var o=Xg();(tt!==e||ot!==t)&&(Dn=null,Ri=He()+500,Er(e,t));do try{h1();break}catch(s){Kg(e,s)}while(1);ld(),vs.current=o,de=i,Ge!==null?t=0:(tt=null,ot=0,t=Je)}if(t!==0){if(t===2&&(i=Uu(e),i!==0&&(r=i,t=mc(e,i))),t===1)throw n=No,Er(e,0),Jn(e,r),jt(e,He()),n;if(t===6)Jn(e,r);else{if(i=e.current.alternate,!(r&30)&&!d1(i)&&(t=ks(e,r),t===2&&(o=Uu(e),o!==0&&(r=o,t=mc(e,o))),t===1))throw n=No,Er(e,0),Jn(e,r),jt(e,He()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(P(345));case 2:Sr(e,_t,Dn);break;case 3:if(Jn(e,r),(r&130023424)===r&&(t=_d+500-He(),10<t)){if(rs(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){xt(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ku(Sr.bind(null,e,_t,Dn),t);break}Sr(e,_t,Dn);break;case 4:if(Jn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var a=31-rn(r);o=1<<a,a=t[a],a>i&&(i=a),r&=~o}if(r=i,r=He()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*c1(r/1960))-r,10<r){e.timeoutHandle=Ku(Sr.bind(null,e,_t,Dn),r);break}Sr(e,_t,Dn);break;case 5:Sr(e,_t,Dn);break;default:throw Error(P(329))}}}return jt(e,He()),e.callbackNode===n?Qg.bind(null,e):null}function mc(e,t){var n=ho;return e.current.memoizedState.isDehydrated&&(Er(e,t).flags|=256),e=ks(e,t),e!==2&&(t=_t,_t=n,t!==null&&gc(t)),e}function gc(e){_t===null?_t=e:_t.push.apply(_t,e)}function d1(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!an(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Jn(e,t){for(t&=~Sd,t&=~Hs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-rn(t),r=1<<n;e[n]=-1,t&=~r}}function Ch(e){if(de&6)throw Error(P(327));wi();var t=rs(e,0);if(!(t&1))return jt(e,He()),null;var n=ks(e,t);if(e.tag!==0&&n===2){var r=Uu(e);r!==0&&(t=r,n=mc(e,r))}if(n===1)throw n=No,Er(e,0),Jn(e,t),jt(e,He()),n;if(n===6)throw Error(P(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Sr(e,_t,Dn),jt(e,He()),null}function bd(e,t){var n=de;de|=1;try{return e(t)}finally{de=n,de===0&&(Ri=He()+500,$s&&yr())}}function Lr(e){qn!==null&&qn.tag===0&&!(de&6)&&wi();var t=de;de|=1;var n=Ut.transition,r=ve;try{if(Ut.transition=null,ve=1,e)return e()}finally{ve=r,Ut.transition=n,de=t,!(de&6)&&yr()}}function Cd(){Et=ci.current,De(ci)}function Er(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Ux(n)),Ge!==null)for(n=Ge.return;n!==null;){var r=n;switch(od(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ls();break;case 3:Mi(),De(Ct),De(ht),pd();break;case 5:hd(r);break;case 4:Mi();break;case 13:De(Le);break;case 19:De(Le);break;case 10:ud(r.type._context);break;case 22:case 23:Cd()}n=n.return}if(tt=e,Ge=e=ur(e.current,null),ot=Et=t,Je=0,No=null,Sd=Hs=Or=0,_t=ho=null,br!==null){for(t=0;t<br.length;t++)if(n=br[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var a=o.next;o.next=i,r.next=a}n.pending=r}br=null}return e}function Kg(e,t){do{var n=Ge;try{if(ld(),$a.current=ys,gs){for(var r=Ne.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}gs=!1}if(Ar=0,et=Xe=Ne=null,co=!1,Ao=0,kd.current=null,n===null||n.return===null){Je=1,No=t,Ge=null;break}e:{var o=e,a=n.return,s=n,l=t;if(t=ot,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=s,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var y=d.alternate;y?(d.updateQueue=y.updateQueue,d.memoizedState=y.memoizedState,d.lanes=y.lanes):(d.updateQueue=null,d.memoizedState=null)}var _=fh(a);if(_!==null){_.flags&=-257,hh(_,a,s,o,t),_.mode&1&&dh(o,c,t),t=_,l=c;var x=t.updateQueue;if(x===null){var p=new Set;p.add(l),t.updateQueue=p}else x.add(l);break e}else{if(!(t&1)){dh(o,c,t),Dd();break e}l=Error(P(426))}}else if(Re&&s.mode&1){var C=fh(a);if(C!==null){!(C.flags&65536)&&(C.flags|=256),hh(C,a,s,o,t),ad(Pi(l,s));break e}}o=l=Pi(l,s),Je!==4&&(Je=2),ho===null?ho=[o]:ho.push(o),o=a;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var g=Tg(o,l,t);ih(o,g);break e;case 1:s=l;var h=o.type,v=o.stateNode;if(!(o.flags&128)&&(typeof h.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(sr===null||!sr.has(v)))){o.flags|=65536,t&=-t,o.lanes|=t;var k=Ag(o,s,t);ih(o,k);break e}}o=o.return}while(o!==null)}Zg(n)}catch(D){t=D,Ge===n&&n!==null&&(Ge=n=n.return);continue}break}while(1)}function Xg(){var e=vs.current;return vs.current=ys,e===null?ys:e}function Dd(){(Je===0||Je===3||Je===2)&&(Je=4),tt===null||!(Or&268435455)&&!(Hs&268435455)||Jn(tt,ot)}function ks(e,t){var n=de;de|=2;var r=Xg();(tt!==e||ot!==t)&&(Dn=null,Er(e,t));do try{f1();break}catch(i){Kg(e,i)}while(1);if(ld(),de=n,vs.current=r,Ge!==null)throw Error(P(261));return tt=null,ot=0,Je}function f1(){for(;Ge!==null;)Jg(Ge)}function h1(){for(;Ge!==null&&!zv();)Jg(Ge)}function Jg(e){var t=e0(e.alternate,e,Et);e.memoizedProps=e.pendingProps,t===null?Zg(e):Ge=t,kd.current=null}function Zg(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=a1(n,t),n!==null){n.flags&=32767,Ge=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Je=6,Ge=null;return}}else if(n=o1(n,t,Et),n!==null){Ge=n;return}if(t=t.sibling,t!==null){Ge=t;return}Ge=t=e}while(t!==null);Je===0&&(Je=5)}function Sr(e,t,n){var r=ve,i=Ut.transition;try{Ut.transition=null,ve=1,p1(e,t,n,r)}finally{Ut.transition=i,ve=r}return null}function p1(e,t,n,r){do wi();while(qn!==null);if(de&6)throw Error(P(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(P(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Qv(e,o),e===tt&&(Ge=tt=null,ot=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ga||(ga=!0,t0(ns,function(){return wi(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ut.transition,Ut.transition=null;var a=ve;ve=1;var s=de;de|=4,kd.current=null,l1(e,n),Bg(n,e),Ox(Gu),is=!!Bu,Gu=Bu=null,e.current=n,u1(n),Fv(),de=s,ve=a,Ut.transition=o}else e.current=n;if(ga&&(ga=!1,qn=e,ws=i),o=e.pendingLanes,o===0&&(sr=null),Yv(n.stateNode),jt(e,He()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(xs)throw xs=!1,e=hc,hc=null,e;return ws&1&&e.tag!==0&&wi(),o=e.pendingLanes,o&1?e===pc?po++:(po=0,pc=e):po=0,yr(),null}function wi(){if(qn!==null){var e=Rm(ws),t=Ut.transition,n=ve;try{if(Ut.transition=null,ve=16>e?16:e,qn===null)var r=!1;else{if(e=qn,qn=null,ws=0,de&6)throw Error(P(331));var i=de;for(de|=4,U=e.current;U!==null;){var o=U,a=o.child;if(U.flags&16){var s=o.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(U=c;U!==null;){var d=U;switch(d.tag){case 0:case 11:case 15:fo(8,d,o)}var f=d.child;if(f!==null)f.return=d,U=f;else for(;U!==null;){d=U;var y=d.sibling,_=d.return;if(Wg(d),d===c){U=null;break}if(y!==null){y.return=_,U=y;break}U=_}}}var x=o.alternate;if(x!==null){var p=x.child;if(p!==null){x.child=null;do{var C=p.sibling;p.sibling=null,p=C}while(p!==null)}}U=o}}if(o.subtreeFlags&2064&&a!==null)a.return=o,U=a;else e:for(;U!==null;){if(o=U,o.flags&2048)switch(o.tag){case 0:case 11:case 15:fo(9,o,o.return)}var g=o.sibling;if(g!==null){g.return=o.return,U=g;break e}U=o.return}}var h=e.current;for(U=h;U!==null;){a=U;var v=a.child;if(a.subtreeFlags&2064&&v!==null)v.return=a,U=v;else e:for(a=h;U!==null;){if(s=U,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ws(9,s)}}catch(D){Fe(s,s.return,D)}if(s===a){U=null;break e}var k=s.sibling;if(k!==null){k.return=s.return,U=k;break e}U=s.return}}if(de=i,yr(),yn&&typeof yn.onPostCommitFiberRoot=="function")try{yn.onPostCommitFiberRoot(Ls,e)}catch{}r=!0}return r}finally{ve=n,Ut.transition=t}}return!1}function Dh(e,t,n){t=Pi(n,t),t=Tg(e,t,1),e=ar(e,t,1),t=xt(),e!==null&&(Ho(e,1,t),jt(e,t))}function Fe(e,t,n){if(e.tag===3)Dh(e,e,n);else for(;t!==null;){if(t.tag===3){Dh(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(sr===null||!sr.has(r))){e=Pi(n,e),e=Ag(t,e,1),t=ar(t,e,1),e=xt(),t!==null&&(Ho(t,1,e),jt(t,e));break}}t=t.return}}function m1(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=xt(),e.pingedLanes|=e.suspendedLanes&n,tt===e&&(ot&n)===n&&(Je===4||Je===3&&(ot&130023424)===ot&&500>He()-_d?Er(e,0):Sd|=n),jt(e,t)}function qg(e,t){t===0&&(e.mode&1?(t=aa,aa<<=1,!(aa&130023424)&&(aa=4194304)):t=1);var n=xt();e=zn(e,t),e!==null&&(Ho(e,t,n),jt(e,n))}function g1(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qg(e,n)}function y1(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(P(314))}r!==null&&r.delete(t),qg(e,n)}var e0;e0=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ct.current)bt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return bt=!1,i1(e,t,n);bt=!!(e.flags&131072)}else bt=!1,Re&&t.flags&1048576&&rg(t,ds,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ya(e,t),e=t.pendingProps;var i=Di(t,ht.current);xi(t,n),i=gd(null,t,r,e,i,n);var o=yd();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Dt(r)?(o=!0,us(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,dd(t),i.updater=Us,t.stateNode=i,i._reactInternals=t,nc(t,r,e,n),t=oc(null,t,r,!0,o,n)):(t.tag=0,Re&&o&&id(t),vt(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ya(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=x1(r),e=Zt(r,e),i){case 0:t=ic(null,t,r,e,n);break e;case 1:t=gh(null,t,r,e,n);break e;case 11:t=ph(null,t,r,e,n);break e;case 14:t=mh(null,t,r,Zt(r.type,e),n);break e}throw Error(P(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Zt(r,i),ic(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Zt(r,i),gh(e,t,r,i,n);case 3:e:{if(Ig(t),e===null)throw Error(P(387));r=t.pendingProps,o=t.memoizedState,i=o.element,sg(e,t),ps(t,r,null,n);var a=t.memoizedState;if(r=a.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=Pi(Error(P(423)),t),t=yh(e,t,r,n,i);break e}else if(r!==i){i=Pi(Error(P(424)),t),t=yh(e,t,r,n,i);break e}else for(Pt=or(t.stateNode.containerInfo.firstChild),Rt=t,Re=!0,en=null,n=dg(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ji(),r===i){t=Fn(e,t,n);break e}vt(e,t,r,n)}t=t.child}return t;case 5:return fg(t),e===null&&qu(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,Qu(r,i)?a=null:o!==null&&Qu(r,o)&&(t.flags|=32),Ng(e,t),vt(e,t,a,n),t.child;case 6:return e===null&&qu(t),null;case 13:return zg(e,t,n);case 4:return fd(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ei(t,null,r,n):vt(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Zt(r,i),ph(e,t,r,i,n);case 7:return vt(e,t,t.pendingProps,n),t.child;case 8:return vt(e,t,t.pendingProps.children,n),t.child;case 12:return vt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,a=i.value,_e(fs,r._currentValue),r._currentValue=a,o!==null)if(an(o.value,a)){if(o.children===i.children&&!Ct.current){t=Fn(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var s=o.dependencies;if(s!==null){a=o.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(o.tag===1){l=On(-1,n&-n),l.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),ec(o.return,n,t),s.lanes|=n;break}l=l.next}}else if(o.tag===10)a=o.type===t.type?null:o.child;else if(o.tag===18){if(a=o.return,a===null)throw Error(P(341));a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),ec(a,n,t),a=o.sibling}else a=o.child;if(a!==null)a.return=o;else for(a=o;a!==null;){if(a===t){a=null;break}if(o=a.sibling,o!==null){o.return=a.return,a=o;break}a=a.return}o=a}vt(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,xi(t,n),i=Yt(i),r=r(i),t.flags|=1,vt(e,t,r,n),t.child;case 14:return r=t.type,i=Zt(r,t.pendingProps),i=Zt(r.type,i),mh(e,t,r,i,n);case 15:return Og(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Zt(r,i),Ya(e,t),t.tag=1,Dt(r)?(e=!0,us(t)):e=!1,xi(t,n),ug(t,r,i),nc(t,r,i,n),oc(null,t,r,!0,e,n);case 19:return Fg(e,t,n);case 22:return Lg(e,t,n)}throw Error(P(156,t.tag))};function t0(e,t){return jm(e,t)}function v1(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $t(e,t,n,r){return new v1(e,t,n,r)}function jd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function x1(e){if(typeof e=="function")return jd(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Bc)return 11;if(e===Gc)return 14}return 2}function ur(e,t){var n=e.alternate;return n===null?(n=$t(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Va(e,t,n,r,i,o){var a=2;if(r=e,typeof e=="function")jd(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case ei:return Mr(n.children,i,o,t);case Vc:a=8,i|=8;break;case Du:return e=$t(12,n,t,i|2),e.elementType=Du,e.lanes=o,e;case ju:return e=$t(13,n,t,i),e.elementType=ju,e.lanes=o,e;case Eu:return e=$t(19,n,t,i),e.elementType=Eu,e.lanes=o,e;case cm:return Vs(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case lm:a=10;break e;case um:a=9;break e;case Bc:a=11;break e;case Gc:a=14;break e;case Qn:a=16,r=null;break e}throw Error(P(130,e==null?e:typeof e,""))}return t=$t(a,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function Mr(e,t,n,r){return e=$t(7,e,r,t),e.lanes=n,e}function Vs(e,t,n,r){return e=$t(22,e,r,t),e.elementType=cm,e.lanes=n,e.stateNode={isHidden:!1},e}function iu(e,t,n){return e=$t(6,e,null,t),e.lanes=n,e}function ou(e,t,n){return t=$t(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function w1(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fl(0),this.expirationTimes=Fl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fl(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Ed(e,t,n,r,i,o,a,s,l){return e=new w1(e,t,n,s,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=$t(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},dd(o),e}function k1(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:qr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function n0(e){if(!e)return pr;e=e._reactInternals;e:{if(Yr(e)!==e||e.tag!==1)throw Error(P(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Dt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(P(171))}if(e.tag===1){var n=e.type;if(Dt(n))return tg(e,n,t)}return t}function r0(e,t,n,r,i,o,a,s,l){return e=Ed(n,r,!0,e,i,o,a,s,l),e.context=n0(null),n=e.current,r=xt(),i=lr(n),o=On(r,i),o.callback=t??null,ar(n,o,i),e.current.lanes=i,Ho(e,i,r),jt(e,r),e}function Bs(e,t,n,r){var i=t.current,o=xt(),a=lr(i);return n=n0(n),t.context===null?t.context=n:t.pendingContext=n,t=On(o,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ar(i,t,a),e!==null&&(on(e,i,a,o),Fa(e,i,a)),a}function Ss(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function jh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Md(e,t){jh(e,t),(e=e.alternate)&&jh(e,t)}function S1(){return null}var i0=typeof reportError=="function"?reportError:function(e){console.error(e)};function Pd(e){this._internalRoot=e}Gs.prototype.render=Pd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(P(409));Bs(e,t,null,null)};Gs.prototype.unmount=Pd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Lr(function(){Bs(null,e,null,null)}),t[In]=null}};function Gs(e){this._internalRoot=e}Gs.prototype.unstable_scheduleHydration=function(e){if(e){var t=Om();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Xn.length&&t!==0&&t<Xn[n].priority;n++);Xn.splice(n,0,e),n===0&&Nm(e)}};function Rd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Qs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Eh(){}function _1(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var c=Ss(a);o.call(c)}}var a=r0(t,r,e,0,null,!1,!1,"",Eh);return e._reactRootContainer=a,e[In]=a.current,Eo(e.nodeType===8?e.parentNode:e),Lr(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var s=r;r=function(){var c=Ss(l);s.call(c)}}var l=Ed(e,0,!1,null,null,!1,!1,"",Eh);return e._reactRootContainer=l,e[In]=l.current,Eo(e.nodeType===8?e.parentNode:e),Lr(function(){Bs(t,l,n,r)}),l}function Ks(e,t,n,r,i){var o=n._reactRootContainer;if(o){var a=o;if(typeof i=="function"){var s=i;i=function(){var l=Ss(a);s.call(l)}}Bs(t,a,e,i)}else a=_1(n,t,e,i,r);return Ss(a)}Tm=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=no(t.pendingLanes);n!==0&&(Xc(t,n|1),jt(t,He()),!(de&6)&&(Ri=He()+500,yr()))}break;case 13:Lr(function(){var r=zn(e,1);if(r!==null){var i=xt();on(r,e,1,i)}}),Md(e,1)}};Jc=function(e){if(e.tag===13){var t=zn(e,134217728);if(t!==null){var n=xt();on(t,e,134217728,n)}Md(e,134217728)}};Am=function(e){if(e.tag===13){var t=lr(e),n=zn(e,t);if(n!==null){var r=xt();on(n,e,t,r)}Md(e,t)}};Om=function(){return ve};Lm=function(e,t){var n=ve;try{return ve=e,t()}finally{ve=n}};zu=function(e,t,n){switch(t){case"input":if(Ru(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Fs(r);if(!i)throw Error(P(90));fm(r),Ru(r,i)}}}break;case"textarea":pm(e,n);break;case"select":t=n.value,t!=null&&mi(e,!!n.multiple,t,!1)}};km=bd;Sm=Lr;var b1={usingClientEntryPoint:!1,Events:[Bo,ii,Fs,xm,wm,bd]},Ki={findFiberByHostInstance:_r,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},C1={bundleType:Ki.bundleType,version:Ki.version,rendererPackageName:Ki.rendererPackageName,rendererConfig:Ki.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Un.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Cm(e),e===null?null:e.stateNode},findFiberByHostInstance:Ki.findFiberByHostInstance||S1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ya=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ya.isDisabled&&ya.supportsFiber)try{Ls=ya.inject(C1),yn=ya}catch{}}At.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=b1;At.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Rd(t))throw Error(P(200));return k1(e,t,null,n)};At.createRoot=function(e,t){if(!Rd(e))throw Error(P(299));var n=!1,r="",i=i0;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Ed(e,1,!1,null,null,n,!1,r,i),e[In]=t.current,Eo(e.nodeType===8?e.parentNode:e),new Pd(t)};At.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(P(188)):(e=Object.keys(e).join(","),Error(P(268,e)));return e=Cm(t),e=e===null?null:e.stateNode,e};At.flushSync=function(e){return Lr(e)};At.hydrate=function(e,t,n){if(!Qs(t))throw Error(P(200));return Ks(null,e,t,!0,n)};At.hydrateRoot=function(e,t,n){if(!Rd(e))throw Error(P(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",a=i0;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=r0(t,null,e,1,n??null,i,!1,o,a),e[In]=t.current,Eo(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Gs(t)};At.render=function(e,t,n){if(!Qs(t))throw Error(P(200));return Ks(null,e,t,!1,n)};At.unmountComponentAtNode=function(e){if(!Qs(e))throw Error(P(40));return e._reactRootContainer?(Lr(function(){Ks(null,null,e,!1,function(){e._reactRootContainer=null,e[In]=null})}),!0):!1};At.unstable_batchedUpdates=bd;At.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Qs(n))throw Error(P(200));if(e==null||e._reactInternals===void 0)throw Error(P(38));return Ks(e,t,n,!1,r)};At.version="18.2.0-next-9e3b772b8-20220608";(function(e){function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(n){console.error(n)}}t(),e.exports=At})(Sv);var Mh=_u;Su.createRoot=Mh.createRoot,Su.hydrateRoot=Mh.hydrateRoot;/**
 * @remix-run/router v1.4.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ce(){return ce=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ce.apply(this,arguments)}var Ye;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Ye||(Ye={}));const Ph="popstate";function D1(e){e===void 0&&(e={});function t(i,o){let{pathname:a="/",search:s="",hash:l=""}=wn(i.location.hash.substr(1));return Io("",{pathname:a,search:s,hash:l},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(i,o){let a=i.document.querySelector("base"),s="";if(a&&a.getAttribute("href")){let l=i.location.href,c=l.indexOf("#");s=c===-1?l:l.slice(0,c)}return s+"#"+(typeof o=="string"?o:Ir(o))}function r(i,o){Nr(i.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(o)+")")}return E1(t,n,r,e)}function ne(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Nr(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function j1(){return Math.random().toString(36).substr(2,8)}function Rh(e,t){return{usr:e.state,key:e.key,idx:t}}function Io(e,t,n,r){return n===void 0&&(n=null),ce({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?wn(t):t,{state:n,key:t&&t.key||r||j1()})}function Ir(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function wn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function E1(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:o=!1}=r,a=i.history,s=Ye.Pop,l=null,c=d();c==null&&(c=0,a.replaceState(ce({},a.state,{idx:c}),""));function d(){return(a.state||{idx:null}).idx}function f(){s=Ye.Pop;let C=d(),g=C==null?null:C-c;c=C,l&&l({action:s,location:p.location,delta:g})}function y(C,g){s=Ye.Push;let h=Io(p.location,C,g);n&&n(h,C),c=d()+1;let v=Rh(h,c),k=p.createHref(h);try{a.pushState(v,"",k)}catch{i.location.assign(k)}o&&l&&l({action:s,location:p.location,delta:1})}function _(C,g){s=Ye.Replace;let h=Io(p.location,C,g);n&&n(h,C),c=d();let v=Rh(h,c),k=p.createHref(h);a.replaceState(v,"",k),o&&l&&l({action:s,location:p.location,delta:0})}function x(C){let g=i.location.origin!=="null"?i.location.origin:i.location.href,h=typeof C=="string"?C:Ir(C);return ne(g,"No window.location.(origin|href) available to create URL for href: "+h),new URL(h,g)}let p={get action(){return s},get location(){return e(i,a)},listen(C){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(Ph,f),l=C,()=>{i.removeEventListener(Ph,f),l=null}},createHref(C){return t(i,C)},createURL:x,encodeLocation(C){let g=x(C);return{pathname:g.pathname,search:g.search,hash:g.hash}},push:y,replace:_,go(C){return a.go(C)}};return p}var Ke;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Ke||(Ke={}));const M1=new Set(["lazy","caseSensitive","path","id","index","children"]);function P1(e){return e.index===!0}function o0(e,t,n,r){return n===void 0&&(n=[]),r===void 0&&(r={}),e.map((i,o)=>{let a=[...n,o],s=typeof i.id=="string"?i.id:a.join("-");if(ne(i.index!==!0||!i.children,"Cannot specify children on an index route"),ne(!r[s],'Found a route id collision on id "'+s+`".  Route id's must be globally unique within Data Router usages`),P1(i)){let l=ce({},i,{hasErrorBoundary:t(i),id:s});return r[s]=l,l}else{let l=ce({},i,{id:s,hasErrorBoundary:t(i),children:void 0});return r[s]=l,i.children&&(l.children=o0(i.children,t,a,r)),l}})}function di(e,t,n){n===void 0&&(n="/");let r=typeof t=="string"?wn(t):t,i=Xs(r.pathname||"/",n);if(i==null)return null;let o=a0(e);R1(o);let a=null;for(let s=0;a==null&&s<o.length;++s)a=$1(o[s],W1(i));return a}function a0(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(o,a,s)=>{let l={relativePath:s===void 0?o.path||"":s,caseSensitive:o.caseSensitive===!0,childrenIndex:a,route:o};l.relativePath.startsWith("/")&&(ne(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let c=cr([r,l.relativePath]),d=n.concat(l);o.children&&o.children.length>0&&(ne(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),a0(o.children,t,d,c)),!(o.path==null&&!o.index)&&t.push({path:c,score:z1(c,o.index),routesMeta:d})};return e.forEach((o,a)=>{var s;if(o.path===""||!((s=o.path)!=null&&s.includes("?")))i(o,a);else for(let l of s0(o.path))i(o,a,l)}),t}function s0(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,i=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return i?[o,""]:[o];let a=s0(r.join("/")),s=[];return s.push(...a.map(l=>l===""?o:[o,l].join("/"))),i&&s.push(...a),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function R1(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:F1(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const T1=/^:\w+$/,A1=3,O1=2,L1=1,N1=10,I1=-2,Th=e=>e==="*";function z1(e,t){let n=e.split("/"),r=n.length;return n.some(Th)&&(r+=I1),t&&(r+=O1),n.filter(i=>!Th(i)).reduce((i,o)=>i+(T1.test(o)?A1:o===""?L1:N1),r)}function F1(e,t){return e.length===t.length&&e.slice(0,-1).every((r,i)=>r===t[i])?e[e.length-1]-t[t.length-1]:0}function $1(e,t){let{routesMeta:n}=e,r={},i="/",o=[];for(let a=0;a<n.length;++a){let s=n[a],l=a===n.length-1,c=i==="/"?t:t.slice(i.length)||"/",d=U1({path:s.relativePath,caseSensitive:s.caseSensitive,end:l},c);if(!d)return null;Object.assign(r,d.params);let f=s.route;o.push({params:r,pathname:cr([i,d.pathname]),pathnameBase:G1(cr([i,d.pathnameBase])),route:f}),d.pathnameBase!=="/"&&(i=cr([i,d.pathnameBase]))}return o}function U1(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Y1(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let o=i[0],a=o.replace(/(.)\/+$/,"$1"),s=i.slice(1);return{params:r.reduce((c,d,f)=>{if(d==="*"){let y=s[f]||"";a=o.slice(0,o.length-y.length).replace(/(.)\/+$/,"$1")}return c[d]=H1(s[f]||"",d),c},{}),pathname:o,pathnameBase:a,pattern:e}}function Y1(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Nr(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/\/:(\w+)/g,(a,s)=>(r.push(s),"/([^\\/]+)"));return e.endsWith("*")?(r.push("*"),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),r]}function W1(e){try{return decodeURI(e)}catch(t){return Nr(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function H1(e,t){try{return decodeURIComponent(e)}catch(n){return Nr(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+n+").")),e}}function Xs(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function V1(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:i=""}=typeof e=="string"?wn(e):e;return{pathname:n?n.startsWith("/")?n:B1(n,t):t,search:Q1(r),hash:K1(i)}}function B1(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function au(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Td(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function l0(e,t,n,r){r===void 0&&(r=!1);let i;typeof e=="string"?i=wn(e):(i=ce({},e),ne(!i.pathname||!i.pathname.includes("?"),au("?","pathname","search",i)),ne(!i.pathname||!i.pathname.includes("#"),au("#","pathname","hash",i)),ne(!i.search||!i.search.includes("#"),au("#","search","hash",i)));let o=e===""||i.pathname==="",a=o?"/":i.pathname,s;if(r||a==null)s=n;else{let f=t.length-1;if(a.startsWith("..")){let y=a.split("/");for(;y[0]==="..";)y.shift(),f-=1;i.pathname=y.join("/")}s=f>=0?t[f]:"/"}let l=V1(i,s),c=a&&a!=="/"&&a.endsWith("/"),d=(o||a===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}const cr=e=>e.join("/").replace(/\/\/+/g,"/"),G1=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Q1=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,K1=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;class Ah extends Error{}class X1{constructor(t,n){this.pendingKeysSet=new Set,this.subscribers=new Set,this.deferredKeys=[],ne(t&&typeof t=="object"&&!Array.isArray(t),"defer() only accepts plain objects");let r;this.abortPromise=new Promise((o,a)=>r=a),this.controller=new AbortController;let i=()=>r(new Ah("Deferred data aborted"));this.unlistenAbortSignal=()=>this.controller.signal.removeEventListener("abort",i),this.controller.signal.addEventListener("abort",i),this.data=Object.entries(t).reduce((o,a)=>{let[s,l]=a;return Object.assign(o,{[s]:this.trackPromise(s,l)})},{}),this.done&&this.unlistenAbortSignal(),this.init=n}trackPromise(t,n){if(!(n instanceof Promise))return n;this.deferredKeys.push(t),this.pendingKeysSet.add(t);let r=Promise.race([n,this.abortPromise]).then(i=>this.onSettle(r,t,null,i),i=>this.onSettle(r,t,i));return r.catch(()=>{}),Object.defineProperty(r,"_tracked",{get:()=>!0}),r}onSettle(t,n,r,i){return this.controller.signal.aborted&&r instanceof Ah?(this.unlistenAbortSignal(),Object.defineProperty(t,"_error",{get:()=>r}),Promise.reject(r)):(this.pendingKeysSet.delete(n),this.done&&this.unlistenAbortSignal(),r?(Object.defineProperty(t,"_error",{get:()=>r}),this.emit(!1,n),Promise.reject(r)):(Object.defineProperty(t,"_data",{get:()=>i}),this.emit(!1,n),i))}emit(t,n){this.subscribers.forEach(r=>r(t,n))}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}cancel(){this.controller.abort(),this.pendingKeysSet.forEach((t,n)=>this.pendingKeysSet.delete(n)),this.emit(!0)}async resolveData(t){let n=!1;if(!this.done){let r=()=>this.cancel();t.addEventListener("abort",r),n=await new Promise(i=>{this.subscribe(o=>{t.removeEventListener("abort",r),(o||this.done)&&i(o)})})}return n}get done(){return this.pendingKeysSet.size===0}get unwrappedData(){return ne(this.data!==null&&this.done,"Can only unwrap data on initialized and settled deferreds"),Object.entries(this.data).reduce((t,n)=>{let[r,i]=n;return Object.assign(t,{[r]:Z1(i)})},{})}get pendingKeys(){return Array.from(this.pendingKeysSet)}}function J1(e){return e instanceof Promise&&e._tracked===!0}function Z1(e){if(!J1(e))return e;if(e._error)throw e._error;return e._data}class Ad{constructor(t,n,r,i){i===void 0&&(i=!1),this.status=t,this.statusText=n||"",this.internal=i,r instanceof Error?(this.data=r.toString(),this.error=r):this.data=r}}function u0(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const c0=["post","put","patch","delete"],q1=new Set(c0),ew=["get",...c0],tw=new Set(ew),nw=new Set([301,302,303,307,308]),rw=new Set([307,308]),su={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0},iw={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0},Oh={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},d0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,f0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ow=!f0,aw=e=>!!e.hasErrorBoundary;function sw(e){ne(e.routes.length>0,"You must provide a non-empty routes array to createRouter");let t=e.detectErrorBoundary||aw,n={},r=o0(e.routes,t,void 0,n),i,o=null,a=new Set,s=null,l=null,c=null,d=e.hydrationData!=null,f=di(r,e.history.location,e.basename),y=null;if(f==null){let S=pn(404,{pathname:e.history.location.pathname}),{matches:b,route:M}=$h(r);f=b,y={[M.id]:S}}let _=!f.some(S=>S.route.lazy)&&(!f.some(S=>S.route.loader)||e.hydrationData!=null),x,p={historyAction:e.history.action,location:e.history.location,matches:f,initialized:_,navigation:su,restoreScrollPosition:e.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:e.hydrationData&&e.hydrationData.loaderData||{},actionData:e.hydrationData&&e.hydrationData.actionData||null,errors:e.hydrationData&&e.hydrationData.errors||y,fetchers:new Map,blockers:new Map},C=Ye.Pop,g=!1,h,v=!1,k=!1,D=[],T=[],E=new Map,I=0,re=-1,Q=new Map,Te=new Set,Se=new Map,be=new Map,ze=new Map,Ve=!1;function Qt(){if(o=e.history.listen(M=>{let{action:W,location:H,delta:X}=M;if(Ve){Ve=!1;return}Nr(ze.size===0||X!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let G=Vn({currentLocation:p.location,nextLocation:H,historyAction:W});if(G&&X!=null){Ve=!0,e.history.go(X*-1),_n(G,{state:"blocked",location:H,proceed(){_n(G,{state:"proceeding",proceed:void 0,reset:void 0,location:H}),e.history.go(X)},reset(){Ae(G),Y({blockers:new Map(x.state.blockers)})}});return}return N(W,H)}),p.initialized)return x;let S=p.matches.filter(M=>M.route.lazy);if(S.length===0)return N(Ye.Pop,p.location),x;let b=S.map(M=>yc(M.route,t,n));return Promise.all(b).then(()=>{!p.matches.some(W=>W.route.loader)||e.hydrationData!=null?Y({initialized:!0}):N(Ye.Pop,p.location)}),x}function rt(){o&&o(),a.clear(),h&&h.abort(),p.fetchers.forEach((S,b)=>qe(b)),p.blockers.forEach((S,b)=>Ae(b))}function A(S){return a.add(S),()=>a.delete(S)}function Y(S){p=ce({},p,S),a.forEach(b=>b(p))}function K(S,b){var M,W;let H=p.actionData!=null&&p.navigation.formMethod!=null&&jn(p.navigation.formMethod)&&p.navigation.state==="loading"&&((M=S.state)==null?void 0:M._isRedirect)!==!0,X;b.actionData?Object.keys(b.actionData).length>0?X=b.actionData:X=null:H?X=p.actionData:X=null;let G=b.loaderData?Fh(p.loaderData,b.loaderData,b.matches||[],b.errors):p.loaderData;for(let[V]of ze)Ae(V);let te=g===!0||p.navigation.formMethod!=null&&jn(p.navigation.formMethod)&&((W=S.state)==null?void 0:W._isRedirect)!==!0;i&&(r=i,i=void 0),Y(ce({},b,{actionData:X,loaderData:G,historyAction:C,location:S,initialized:!0,navigation:su,revalidation:"idle",restoreScrollPosition:Hr(S,b.matches||p.matches),preventScrollReset:te,blockers:new Map(p.blockers)})),v||C===Ye.Pop||(C===Ye.Push?e.history.push(S,S.state):C===Ye.Replace&&e.history.replace(S,S.state)),C=Ye.Pop,g=!1,v=!1,k=!1,D=[],T=[]}async function ye(S,b){if(typeof S=="number"){e.history.go(S);return}let{path:M,submission:W,error:H}=Lh(S,b),X=p.location,G=Io(p.location,M,b&&b.state);G=ce({},G,e.history.encodeLocation(G));let te=b&&b.replace!=null?b.replace:void 0,V=Ye.Push;te===!0?V=Ye.Replace:te===!1||W!=null&&jn(W.formMethod)&&W.formAction===p.location.pathname+p.location.search&&(V=Ye.Replace);let st=b&&"preventScrollReset"in b?b.preventScrollReset===!0:void 0,ge=Vn({currentLocation:X,nextLocation:G,historyAction:V});if(ge){_n(ge,{state:"blocked",location:G,proceed(){_n(ge,{state:"proceeding",proceed:void 0,reset:void 0,location:G}),ye(S,b)},reset(){Ae(ge),Y({blockers:new Map(p.blockers)})}});return}return await N(V,G,{submission:W,pendingError:H,preventScrollReset:st,replace:b&&b.replace})}function L(){if(q(),Y({revalidation:"loading"}),p.navigation.state!=="submitting"){if(p.navigation.state==="idle"){N(p.historyAction,p.location,{startUninterruptedRevalidation:!0});return}N(C||p.historyAction,p.navigation.location,{overrideNavigation:p.navigation})}}async function N(S,b,M){h&&h.abort(),h=null,C=S,v=(M&&M.startUninterruptedRevalidation)===!0,Oe(p.location,p.matches),g=(M&&M.preventScrollReset)===!0;let W=i||r,H=M&&M.overrideNavigation,X=di(W,b,e.basename);if(!X){let Ue=pn(404,{pathname:b.pathname}),{matches:cn,route:Kt}=$h(W);gt(),K(b,{matches:cn,loaderData:{},errors:{[Kt.id]:Ue}});return}if(fw(p.location,b)&&!(M&&M.submission&&jn(M.submission.formMethod))){K(b,{matches:X});return}h=new AbortController;let G=Ji(e.history,b,h.signal,M&&M.submission),te,V;if(M&&M.pendingError)V={[fi(X).route.id]:M.pendingError};else if(M&&M.submission&&jn(M.submission.formMethod)){let Ue=await F(G,b,M.submission,X,{replace:M.replace});if(Ue.shortCircuited)return;te=Ue.pendingActionData,V=Ue.pendingActionError,H=ce({state:"loading",location:b},M.submission),G=new Request(G.url,{signal:G.signal})}let{shortCircuited:st,loaderData:ge,errors:yt}=await J(G,b,X,H,M&&M.submission,M&&M.replace,te,V);st||(h=null,K(b,ce({matches:X},te?{actionData:te}:{},{loaderData:ge,errors:yt})))}async function F(S,b,M,W,H){q();let X=ce({state:"submitting",location:b},M);Y({navigation:X});let G,te=vc(W,b);if(!te.route.action&&!te.route.lazy)G={type:Ke.error,error:pn(405,{method:S.method,pathname:b.pathname,routeId:te.route.id})};else if(G=await Xi("action",S,te,W,n,t,x.basename),S.signal.aborted)return{shortCircuited:!0};if(ki(G)){let V;return H&&H.replace!=null?V=H.replace:V=G.location===p.location.pathname+p.location.search,await se(p,G,{submission:M,replace:V}),{shortCircuited:!0}}if(mo(G)){let V=fi(W,te.route.id);return(H&&H.replace)!==!0&&(C=Ye.Push),{pendingActionData:{},pendingActionError:{[V.route.id]:G.error}}}if(Dr(G))throw pn(400,{type:"defer-action"});return{pendingActionData:{[te.route.id]:G.data}}}async function J(S,b,M,W,H,X,G,te){let V=W;V||(V=ce({state:"loading",location:b,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0},H));let st=H||(V.formMethod&&V.formAction&&V.formData&&V.formEncType?{formMethod:V.formMethod,formAction:V.formAction,formData:V.formData,formEncType:V.formEncType}:void 0),ge=i||r,[yt,Ue]=Nh(e.history,p,M,st,b,k,D,T,Se,ge,e.basename,G,te);if(gt(lt=>!(M&&M.some(dn=>dn.route.id===lt))||yt&&yt.some(dn=>dn.route.id===lt)),yt.length===0&&Ue.length===0)return K(b,ce({matches:M,loaderData:{},errors:te||null},G?{actionData:G}:{})),{shortCircuited:!0};if(!v){Ue.forEach(dn=>{let xr=p.fetchers.get(dn.key),ea={state:"loading",data:xr&&xr.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0," _hasFetcherDoneAnything ":!0};p.fetchers.set(dn.key,ea)});let lt=G||p.actionData;Y(ce({navigation:V},lt?Object.keys(lt).length===0?{actionData:null}:{actionData:lt}:{},Ue.length>0?{fetchers:new Map(p.fetchers)}:{}))}re=++I,Ue.forEach(lt=>E.set(lt.key,h));let{results:cn,loaderResults:Kt,fetcherResults:Ui}=await fe(p.matches,M,yt,Ue,S);if(S.signal.aborted)return{shortCircuited:!0};Ue.forEach(lt=>E.delete(lt.key));let Zo=Uh(cn);if(Zo)return await se(p,Zo,{replace:X}),{shortCircuited:!0};let{loaderData:qo,errors:Vr}=zh(p,M,yt,Kt,te,Ue,Ui,be);be.forEach((lt,dn)=>{lt.subscribe(xr=>{(xr||lt.done)&&be.delete(dn)})}),he();let Rl=Be(re);return ce({loaderData:qo,errors:Vr},Rl||Ue.length>0?{fetchers:new Map(p.fetchers)}:{})}function w(S){return p.fetchers.get(S)||iw}function oe(S,b,M,W){if(ow)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");E.has(S)&&ae(S);let X=di(i||r,M,e.basename);if(!X){$e(S,b,pn(404,{pathname:M}));return}let{path:G,submission:te}=Lh(M,W,!0),V=vc(X,G);if(g=(W&&W.preventScrollReset)===!0,te&&jn(te.formMethod)){O(S,b,G,V,X,te);return}Se.set(S,{routeId:b,path:G}),Me(S,b,G,V,X,te)}async function O(S,b,M,W,H,X){if(q(),Se.delete(S),!W.route.action&&!W.route.lazy){let bn=pn(405,{method:X.formMethod,pathname:M,routeId:b});$e(S,b,bn);return}let G=p.fetchers.get(S),te=ce({state:"submitting"},X,{data:G&&G.data," _hasFetcherDoneAnything ":!0});p.fetchers.set(S,te),Y({fetchers:new Map(p.fetchers)});let V=new AbortController,st=Ji(e.history,M,V.signal,X);E.set(S,V);let ge=await Xi("action",st,W,H,n,t,x.basename);if(st.signal.aborted){E.get(S)===V&&E.delete(S);return}if(ki(ge)){E.delete(S),Te.add(S);let bn=ce({state:"loading"},X,{data:void 0," _hasFetcherDoneAnything ":!0});return p.fetchers.set(S,bn),Y({fetchers:new Map(p.fetchers)}),se(p,ge,{isFetchActionRedirect:!0})}if(mo(ge)){$e(S,b,ge.error);return}if(Dr(ge))throw pn(400,{type:"defer-action"});let yt=p.navigation.location||p.location,Ue=Ji(e.history,yt,V.signal),cn=i||r,Kt=p.navigation.state!=="idle"?di(cn,p.navigation.location,e.basename):p.matches;ne(Kt,"Didn't find any matches after fetcher action");let Ui=++I;Q.set(S,Ui);let Zo=ce({state:"loading",data:ge.data},X,{" _hasFetcherDoneAnything ":!0});p.fetchers.set(S,Zo);let[qo,Vr]=Nh(e.history,p,Kt,X,yt,k,D,T,Se,cn,e.basename,{[W.route.id]:ge.data},void 0);Vr.filter(bn=>bn.key!==S).forEach(bn=>{let Al=bn.key,wf=p.fetchers.get(Al),Ky={state:"loading",data:wf&&wf.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0," _hasFetcherDoneAnything ":!0};p.fetchers.set(Al,Ky),E.set(Al,V)}),Y({fetchers:new Map(p.fetchers)});let{results:Rl,loaderResults:lt,fetcherResults:dn}=await fe(p.matches,Kt,qo,Vr,Ue);if(V.signal.aborted)return;Q.delete(S),E.delete(S),Vr.forEach(bn=>E.delete(bn.key));let xr=Uh(Rl);if(xr)return se(p,xr);let{loaderData:ea,errors:Tl}=zh(p,p.matches,qo,lt,void 0,Vr,dn,be),Gy={state:"idle",data:ge.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0," _hasFetcherDoneAnything ":!0};p.fetchers.set(S,Gy);let Qy=Be(Ui);p.navigation.state==="loading"&&Ui>re?(ne(C,"Expected pending action"),h&&h.abort(),K(p.navigation.location,{matches:Kt,loaderData:ea,errors:Tl,fetchers:new Map(p.fetchers)})):(Y(ce({errors:Tl,loaderData:Fh(p.loaderData,ea,Kt,Tl)},Qy?{fetchers:new Map(p.fetchers)}:{})),k=!1)}async function Me(S,b,M,W,H,X){let G=p.fetchers.get(S),te=ce({state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0},X,{data:G&&G.data," _hasFetcherDoneAnything ":!0});p.fetchers.set(S,te),Y({fetchers:new Map(p.fetchers)});let V=new AbortController,st=Ji(e.history,M,V.signal);E.set(S,V);let ge=await Xi("loader",st,W,H,n,t,x.basename);if(Dr(ge)&&(ge=await g0(ge,st.signal,!0)||ge),E.get(S)===V&&E.delete(S),st.signal.aborted)return;if(ki(ge)){await se(p,ge);return}if(mo(ge)){let Ue=fi(p.matches,b);p.fetchers.delete(S),Y({fetchers:new Map(p.fetchers),errors:{[Ue.route.id]:ge.error}});return}ne(!Dr(ge),"Unhandled fetcher deferred data");let yt={state:"idle",data:ge.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0," _hasFetcherDoneAnything ":!0};p.fetchers.set(S,yt),Y({fetchers:new Map(p.fetchers)})}async function se(S,b,M){var W;let{submission:H,replace:X,isFetchActionRedirect:G}=M===void 0?{}:M;b.revalidate&&(k=!0);let te=Io(S.location,b.location,ce({_isRedirect:!0},G?{_isFetchActionRedirect:!0}:{}));if(ne(te,"Expected a location on the redirect navigation"),d0.test(b.location)&&f0&&typeof((W=window)==null?void 0:W.location)<"u"){let cn=e.history.createURL(b.location),Kt=Xs(cn.pathname,e.basename||"/")==null;if(window.location.origin!==cn.origin||Kt){X?window.location.replace(b.location):window.location.assign(b.location);return}}h=null;let V=X===!0?Ye.Replace:Ye.Push,{formMethod:st,formAction:ge,formEncType:yt,formData:Ue}=S.navigation;!H&&st&&ge&&Ue&&yt&&(H={formMethod:st,formAction:ge,formEncType:yt,formData:Ue}),rw.has(b.status)&&H&&jn(H.formMethod)?await N(V,te,{submission:ce({},H,{formAction:b.location}),preventScrollReset:g}):await N(V,te,{overrideNavigation:{state:"loading",location:te,formMethod:H?H.formMethod:void 0,formAction:H?H.formAction:void 0,formEncType:H?H.formEncType:void 0,formData:H?H.formData:void 0},preventScrollReset:g})}async function fe(S,b,M,W,H){let X=await Promise.all([...M.map(V=>Xi("loader",H,V,b,n,t,x.basename)),...W.map(V=>V.matches&&V.match?Xi("loader",Ji(e.history,V.path,H.signal),V.match,V.matches,n,t,x.basename):{type:Ke.error,error:pn(404,{pathname:V.path})})]),G=X.slice(0,M.length),te=X.slice(M.length);return await Promise.all([Yh(S,M,G,H.signal,!1,p.loaderData),Yh(S,W.map(V=>V.match),te,H.signal,!0)]),{results:X,loaderResults:G,fetcherResults:te}}function q(){k=!0,D.push(...gt()),Se.forEach((S,b)=>{E.has(b)&&(T.push(b),ae(b))})}function $e(S,b,M){let W=fi(p.matches,b);qe(S),Y({errors:{[W.route.id]:M},fetchers:new Map(p.fetchers)})}function qe(S){E.has(S)&&ae(S),Se.delete(S),Q.delete(S),Te.delete(S),p.fetchers.delete(S)}function ae(S){let b=E.get(S);ne(b,"Expected fetch controller: "+S),b.abort(),E.delete(S)}function Qe(S){for(let b of S){let W={state:"idle",data:w(b).data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0," _hasFetcherDoneAnything ":!0};p.fetchers.set(b,W)}}function he(){let S=[];for(let b of Te){let M=p.fetchers.get(b);ne(M,"Expected fetcher: "+b),M.state==="loading"&&(Te.delete(b),S.push(b))}Qe(S)}function Be(S){let b=[];for(let[M,W]of Q)if(W<S){let H=p.fetchers.get(M);ne(H,"Expected fetcher: "+M),H.state==="loading"&&(ae(M),Q.delete(M),b.push(M))}return Qe(b),b.length>0}function vr(S,b){let M=p.blockers.get(S)||Oh;return ze.get(S)!==b&&ze.set(S,b),M}function Ae(S){p.blockers.delete(S),ze.delete(S)}function _n(S,b){let M=p.blockers.get(S)||Oh;ne(M.state==="unblocked"&&b.state==="blocked"||M.state==="blocked"&&b.state==="blocked"||M.state==="blocked"&&b.state==="proceeding"||M.state==="blocked"&&b.state==="unblocked"||M.state==="proceeding"&&b.state==="unblocked","Invalid blocker state transition: "+M.state+" -> "+b.state),p.blockers.set(S,b),Y({blockers:new Map(p.blockers)})}function Vn(S){let{currentLocation:b,nextLocation:M,historyAction:W}=S;if(ze.size===0)return;ze.size>1&&Nr(!1,"A router only supports one blocker at a time");let H=Array.from(ze.entries()),[X,G]=H[H.length-1],te=p.blockers.get(X);if(!(te&&te.state==="proceeding")&&G({currentLocation:b,nextLocation:M,historyAction:W}))return X}function gt(S){let b=[];return be.forEach((M,W)=>{(!S||S(W))&&(M.cancel(),b.push(W),be.delete(W))}),b}function Z(S,b,M){if(s=S,c=b,l=M||(W=>W.key),!d&&p.navigation===su){d=!0;let W=Hr(p.location,p.matches);W!=null&&Y({restoreScrollPosition:W})}return()=>{s=null,c=null,l=null}}function Oe(S,b){if(s&&l&&c){let M=b.map(H=>Wh(H,p.loaderData)),W=l(S,M)||S.key;s[W]=c()}}function Hr(S,b){if(s&&l&&c){let M=b.map(X=>Wh(X,p.loaderData)),W=l(S,M)||S.key,H=s[W];if(typeof H=="number")return H}return null}function $i(S){i=S}return x={get basename(){return e.basename},get state(){return p},get routes(){return r},initialize:Qt,subscribe:A,enableScrollRestoration:Z,navigate:ye,fetch:oe,revalidate:L,createHref:S=>e.history.createHref(S),encodeLocation:S=>e.history.encodeLocation(S),getFetcher:w,deleteFetcher:qe,dispose:rt,getBlocker:vr,deleteBlocker:Ae,_internalFetchControllers:E,_internalActiveDeferreds:be,_internalSetRoutes:$i},x}function lw(e){return e!=null&&"formData"in e}function Lh(e,t,n){n===void 0&&(n=!1);let r=typeof e=="string"?e:Ir(e);if(!t||!lw(t))return{path:r};if(t.formMethod&&!pw(t.formMethod))return{path:r,error:pn(405,{method:t.formMethod})};let i;if(t.formData&&(i={formMethod:t.formMethod||"get",formAction:m0(r),formEncType:t&&t.formEncType||"application/x-www-form-urlencoded",formData:t.formData},jn(i.formMethod)))return{path:r,submission:i};let o=wn(r),a=p0(t.formData);return n&&o.search&&y0(o.search)&&a.append("index",""),o.search="?"+a,{path:Ir(o),submission:i}}function uw(e,t){let n=e;if(t){let r=e.findIndex(i=>i.route.id===t);r>=0&&(n=e.slice(0,r))}return n}function Nh(e,t,n,r,i,o,a,s,l,c,d,f,y){let _=y?Object.values(y)[0]:f?Object.values(f)[0]:void 0,x=e.createURL(t.location),p=e.createURL(i),C=o||x.toString()===p.toString()||x.search!==p.search,g=y?Object.keys(y)[0]:void 0,v=uw(n,g).filter((D,T)=>{if(D.route.lazy)return!0;if(D.route.loader==null)return!1;if(cw(t.loaderData,t.matches[T],D)||a.some(re=>re===D.route.id))return!0;let E=t.matches[T],I=D;return Ih(D,ce({currentUrl:x,currentParams:E.params,nextUrl:p,nextParams:I.params},r,{actionResult:_,defaultShouldRevalidate:C||h0(E,I)}))}),k=[];return l.forEach((D,T)=>{if(!n.some(Q=>Q.route.id===D.routeId))return;let E=di(c,D.path,d);if(!E){k.push(ce({key:T},D,{matches:null,match:null}));return}let I=vc(E,D.path);if(s.includes(T)){k.push(ce({key:T,matches:E,match:I},D));return}Ih(I,ce({currentUrl:x,currentParams:t.matches[t.matches.length-1].params,nextUrl:p,nextParams:n[n.length-1].params},r,{actionResult:_,defaultShouldRevalidate:C}))&&k.push(ce({key:T,matches:E,match:I},D))}),[v,k]}function cw(e,t,n){let r=!t||n.route.id!==t.route.id,i=e[n.route.id]===void 0;return r||i}function h0(e,t){let n=e.route.path;return e.pathname!==t.pathname||n!=null&&n.endsWith("*")&&e.params["*"]!==t.params["*"]}function Ih(e,t){if(e.route.shouldRevalidate){let n=e.route.shouldRevalidate(t);if(typeof n=="boolean")return n}return t.defaultShouldRevalidate}async function yc(e,t,n){if(!e.lazy)return;let r=await e.lazy();if(!e.lazy)return;let i=n[e.id];ne(i,"No route found in manifest");let o={};for(let a in r){let l=i[a]!==void 0&&a!=="hasErrorBoundary";Nr(!l,'Route "'+i.id+'" has a static property "'+a+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+a+'" will be ignored.')),!l&&!M1.has(a)&&(o[a]=r[a])}Object.assign(i,o),Object.assign(i,{hasErrorBoundary:t(ce({},i)),lazy:void 0})}async function Xi(e,t,n,r,i,o,a,s,l,c){a===void 0&&(a="/"),s===void 0&&(s=!1),l===void 0&&(l=!1);let d,f,y,_=C=>{let g,h=new Promise((v,k)=>g=k);return y=()=>g(),t.signal.addEventListener("abort",y),Promise.race([C({request:t,params:n.params,context:c}),h])};try{let C=n.route[e];if(n.route.lazy)if(C)f=(await Promise.all([_(C),yc(n.route,o,i)]))[0];else if(await yc(n.route,o,i),C=n.route[e],C)f=await _(C);else{if(e==="action")throw pn(405,{method:t.method,pathname:new URL(t.url).pathname,routeId:n.route.id});return{type:Ke.data,data:void 0}}else ne(C,"Could not find the "+e+' to run on the "'+n.route.id+'" route'),f=await _(C);ne(f!==void 0,"You defined "+(e==="action"?"an action":"a loader")+" for route "+('"'+n.route.id+"\" but didn't return anything from your `"+e+"` ")+"function. Please return a value or `null`.")}catch(C){d=Ke.error,f=C}finally{y&&t.signal.removeEventListener("abort",y)}if(hw(f)){let C=f.status;if(nw.has(C)){let v=f.headers.get("Location");if(ne(v,"Redirects returned/thrown from loaders/actions must have a Location header"),d0.test(v)){if(!s){let k=new URL(t.url),D=v.startsWith("//")?new URL(k.protocol+v):new URL(v),T=Xs(D.pathname,a)!=null;D.origin===k.origin&&T&&(v=D.pathname+D.search+D.hash)}}else{let k=r.slice(0,r.indexOf(n)+1),D=Td(k).map(E=>E.pathnameBase),T=l0(v,D,new URL(t.url).pathname);if(ne(Ir(T),"Unable to resolve redirect location: "+v),a){let E=T.pathname;T.pathname=E==="/"?a:cr([a,E])}v=Ir(T)}if(s)throw f.headers.set("Location",v),f;return{type:Ke.redirect,status:C,location:v,revalidate:f.headers.get("X-Remix-Revalidate")!==null}}if(l)throw{type:d||Ke.data,response:f};let g,h=f.headers.get("Content-Type");return h&&/\bapplication\/json\b/.test(h)?g=await f.json():g=await f.text(),d===Ke.error?{type:d,error:new Ad(C,f.statusText,g),headers:f.headers}:{type:Ke.data,data:g,statusCode:f.status,headers:f.headers}}if(d===Ke.error)return{type:d,error:f};if(f instanceof X1){var x,p;return{type:Ke.deferred,deferredData:f,statusCode:(x=f.init)==null?void 0:x.status,headers:((p=f.init)==null?void 0:p.headers)&&new Headers(f.init.headers)}}return{type:Ke.data,data:f}}function Ji(e,t,n,r){let i=e.createURL(m0(t)).toString(),o={signal:n};if(r&&jn(r.formMethod)){let{formMethod:a,formEncType:s,formData:l}=r;o.method=a.toUpperCase(),o.body=s==="application/x-www-form-urlencoded"?p0(l):l}return new Request(i,o)}function p0(e){let t=new URLSearchParams;for(let[n,r]of e.entries())t.append(n,r instanceof File?r.name:r);return t}function dw(e,t,n,r,i){let o={},a=null,s,l=!1,c={};return n.forEach((d,f)=>{let y=t[f].route.id;if(ne(!ki(d),"Cannot handle redirect results in processLoaderData"),mo(d)){let _=fi(e,y),x=d.error;r&&(x=Object.values(r)[0],r=void 0),a=a||{},a[_.route.id]==null&&(a[_.route.id]=x),o[y]=void 0,l||(l=!0,s=u0(d.error)?d.error.status:500),d.headers&&(c[y]=d.headers)}else Dr(d)?(i.set(y,d.deferredData),o[y]=d.deferredData.data):o[y]=d.data,d.statusCode!=null&&d.statusCode!==200&&!l&&(s=d.statusCode),d.headers&&(c[y]=d.headers)}),r&&(a=r,o[Object.keys(r)[0]]=void 0),{loaderData:o,errors:a,statusCode:s||200,loaderHeaders:c}}function zh(e,t,n,r,i,o,a,s){let{loaderData:l,errors:c}=dw(t,n,r,i,s);for(let d=0;d<o.length;d++){let{key:f,match:y}=o[d];ne(a!==void 0&&a[d]!==void 0,"Did not find corresponding fetcher result");let _=a[d];if(mo(_)){let x=fi(e.matches,y==null?void 0:y.route.id);c&&c[x.route.id]||(c=ce({},c,{[x.route.id]:_.error})),e.fetchers.delete(f)}else if(ki(_))ne(!1,"Unhandled fetcher revalidation redirect");else if(Dr(_))ne(!1,"Unhandled fetcher deferred data");else{let x={state:"idle",data:_.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0," _hasFetcherDoneAnything ":!0};e.fetchers.set(f,x)}}return{loaderData:l,errors:c}}function Fh(e,t,n,r){let i=ce({},t);for(let o of n){let a=o.route.id;if(t.hasOwnProperty(a)?t[a]!==void 0&&(i[a]=t[a]):e[a]!==void 0&&o.route.loader&&(i[a]=e[a]),r&&r.hasOwnProperty(a))break}return i}function fi(e,t){return(t?e.slice(0,e.findIndex(r=>r.route.id===t)+1):[...e]).reverse().find(r=>r.route.hasErrorBoundary===!0)||e[0]}function $h(e){let t=e.find(n=>n.index||!n.path||n.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:t}],route:t}}function pn(e,t){let{pathname:n,routeId:r,method:i,type:o}=t===void 0?{}:t,a="Unknown Server Error",s="Unknown @remix-run/router error";return e===400?(a="Bad Request",i&&n&&r?s="You made a "+i+' request to "'+n+'" but '+('did not provide a `loader` for route "'+r+'", ')+"so there is no way to handle the request.":o==="defer-action"&&(s="defer() is not supported in actions")):e===403?(a="Forbidden",s='Route "'+r+'" does not match URL "'+n+'"'):e===404?(a="Not Found",s='No route matches URL "'+n+'"'):e===405&&(a="Method Not Allowed",i&&n&&r?s="You made a "+i.toUpperCase()+' request to "'+n+'" but '+('did not provide an `action` for route "'+r+'", ')+"so there is no way to handle the request.":i&&(s='Invalid request method "'+i.toUpperCase()+'"')),new Ad(e||500,a,new Error(s),!0)}function Uh(e){for(let t=e.length-1;t>=0;t--){let n=e[t];if(ki(n))return n}}function m0(e){let t=typeof e=="string"?wn(e):e;return Ir(ce({},t,{hash:""}))}function fw(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash!==t.hash}function Dr(e){return e.type===Ke.deferred}function mo(e){return e.type===Ke.error}function ki(e){return(e&&e.type)===Ke.redirect}function hw(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.headers=="object"&&typeof e.body<"u"}function pw(e){return tw.has(e)}function jn(e){return q1.has(e)}async function Yh(e,t,n,r,i,o){for(let a=0;a<n.length;a++){let s=n[a],l=t[a];if(!l)continue;let c=e.find(f=>f.route.id===l.route.id),d=c!=null&&!h0(c,l)&&(o&&o[l.route.id])!==void 0;Dr(s)&&(i||d)&&await g0(s,r,i).then(f=>{f&&(n[a]=f||n[a])})}}async function g0(e,t,n){if(n===void 0&&(n=!1),!await e.deferredData.resolveData(t)){if(n)try{return{type:Ke.data,data:e.deferredData.unwrappedData}}catch(i){return{type:Ke.error,error:i}}return{type:Ke.data,data:e.deferredData.data}}}function y0(e){return new URLSearchParams(e).getAll("index").some(t=>t==="")}function Wh(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],handle:n.handle}}function vc(e,t){let n=typeof t=="string"?wn(t).search:t.search;if(e[e.length-1].route.index&&y0(n||""))return e[e.length-1];let r=Td(e);return r[r.length-1]}/**
 * React Router v6.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function mw(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}const gw=typeof Object.is=="function"?Object.is:mw,{useState:yw,useEffect:vw,useLayoutEffect:xw,useDebugValue:ww}=ku;function kw(e,t,n){const r=t(),[{inst:i},o]=yw({inst:{value:r,getSnapshot:t}});return xw(()=>{i.value=r,i.getSnapshot=t,lu(i)&&o({inst:i})},[e,r,t]),vw(()=>(lu(i)&&o({inst:i}),e(()=>{lu(i)&&o({inst:i})})),[e]),ww(r),r}function lu(e){const t=e.getSnapshot,n=e.value;try{const r=t();return!gw(n,r)}catch{return!0}}function Sw(e,t,n){return t()}const _w=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",bw=!_w,Cw=bw?Sw:kw,Dw="useSyncExternalStore"in ku?(e=>e.useSyncExternalStore)(ku):Cw,Od=j.createContext(null),Ld=j.createContext(null),Nd=j.createContext(null),Js=j.createContext(null),Ii=j.createContext({outlet:null,matches:[]}),v0=j.createContext(null);function xc(){return xc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},xc.apply(this,arguments)}function Zs(){return j.useContext(Js)!=null}function x0(){return Zs()||ne(!1),j.useContext(Js).location}function Yn(){Zs()||ne(!1);let{basename:e,navigator:t}=j.useContext(Nd),{matches:n}=j.useContext(Ii),{pathname:r}=x0(),i=JSON.stringify(Td(n).map(s=>s.pathnameBase)),o=j.useRef(!1);return j.useEffect(()=>{o.current=!0}),j.useCallback(function(s,l){if(l===void 0&&(l={}),!o.current)return;if(typeof s=="number"){t.go(s);return}let c=l0(s,JSON.parse(i),r,l.relative==="path");e!=="/"&&(c.pathname=c.pathname==="/"?e:cr([e,c.pathname])),(l.replace?t.replace:t.push)(c,l.state,l)},[e,t,i,r])}function w0(){let{matches:e}=j.useContext(Ii),t=e[e.length-1];return t?t.params:{}}function jw(e,t){Zs()||ne(!1);let{navigator:n}=j.useContext(Nd),r=j.useContext(Ld),{matches:i}=j.useContext(Ii),o=i[i.length-1],a=o?o.params:{};o&&o.pathname;let s=o?o.pathnameBase:"/";o&&o.route;let l=x0(),c;if(t){var d;let p=typeof t=="string"?wn(t):t;s==="/"||(d=p.pathname)!=null&&d.startsWith(s)||ne(!1),c=p}else c=l;let f=c.pathname||"/",y=s==="/"?f:f.slice(s.length)||"/",_=di(e,{pathname:y}),x=Rw(_&&_.map(p=>Object.assign({},p,{params:Object.assign({},a,p.params),pathname:cr([s,n.encodeLocation?n.encodeLocation(p.pathname).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?s:cr([s,n.encodeLocation?n.encodeLocation(p.pathnameBase).pathname:p.pathnameBase])})),i,r||void 0);return t&&x?j.createElement(Js.Provider,{value:{location:xc({pathname:"/",search:"",hash:"",state:null,key:"default"},c),navigationType:Ye.Pop}},x):x}function Ew(){let e=Lw(),t=u0(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},o=null;return j.createElement(j.Fragment,null,j.createElement("h2",null,"Unexpected Application Error!"),j.createElement("h3",{style:{fontStyle:"italic"}},t),n?j.createElement("pre",{style:i},n):null,o)}class Mw extends j.Component{constructor(t){super(t),this.state={location:t.location,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location?{error:t.error,location:t.location}:{error:t.error||n.error,location:n.location}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error?j.createElement(Ii.Provider,{value:this.props.routeContext},j.createElement(v0.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Pw(e){let{routeContext:t,match:n,children:r}=e,i=j.useContext(Od);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),j.createElement(Ii.Provider,{value:t},r)}function Rw(e,t,n){if(t===void 0&&(t=[]),e==null)if(n!=null&&n.errors)e=n.matches;else return null;let r=e,i=n==null?void 0:n.errors;if(i!=null){let o=r.findIndex(a=>a.route.id&&(i==null?void 0:i[a.route.id]));o>=0||ne(!1),r=r.slice(0,Math.min(r.length,o+1))}return r.reduceRight((o,a,s)=>{let l=a.route.id?i==null?void 0:i[a.route.id]:null,c=null;n&&(a.route.ErrorBoundary?c=j.createElement(a.route.ErrorBoundary,null):a.route.errorElement?c=a.route.errorElement:c=j.createElement(Ew,null));let d=t.concat(r.slice(0,s+1)),f=()=>{let y=o;return l?y=c:a.route.Component?y=j.createElement(a.route.Component,null):a.route.element&&(y=a.route.element),j.createElement(Pw,{match:a,routeContext:{outlet:o,matches:d},children:y})};return n&&(a.route.ErrorBoundary||a.route.errorElement||s===0)?j.createElement(Mw,{location:n.location,component:c,error:l,children:f(),routeContext:{outlet:null,matches:d}}):f()},null)}var Hh;(function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator"})(Hh||(Hh={}));var _s;(function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator"})(_s||(_s={}));function Tw(e){let t=j.useContext(Ld);return t||ne(!1),t}function Aw(e){let t=j.useContext(Ii);return t||ne(!1),t}function Ow(e){let t=Aw(),n=t.matches[t.matches.length-1];return n.route.id||ne(!1),n.route.id}function Lw(){var e;let t=j.useContext(v0),n=Tw(_s.UseRouteError),r=Ow(_s.UseRouteError);return t||((e=n.errors)==null?void 0:e[r])}function Nw(e){let{fallbackElement:t,router:n}=e,r=j.useCallback(()=>n.state,[n]),i=Dw(n.subscribe,r,r),o=j.useMemo(()=>({createHref:n.createHref,encodeLocation:n.encodeLocation,go:l=>n.navigate(l),push:(l,c,d)=>n.navigate(l,{state:c,preventScrollReset:d==null?void 0:d.preventScrollReset}),replace:(l,c,d)=>n.navigate(l,{replace:!0,state:c,preventScrollReset:d==null?void 0:d.preventScrollReset})}),[n]),a=n.basename||"/",s=j.useMemo(()=>({router:n,navigator:o,static:!1,basename:a}),[n,o,a]);return j.createElement(j.Fragment,null,j.createElement(Od.Provider,{value:s},j.createElement(Ld.Provider,{value:i},j.createElement(zw,{basename:n.basename,location:n.state.location,navigationType:n.state.historyAction,navigator:o},n.state.initialized?j.createElement(Fw,null):t))),null)}function Iw(e){ne(!1)}function zw(e){let{basename:t="/",children:n=null,location:r,navigationType:i=Ye.Pop,navigator:o,static:a=!1}=e;Zs()&&ne(!1);let s=t.replace(/^\/*/,"/"),l=j.useMemo(()=>({basename:s,navigator:o,static:a}),[s,o,a]);typeof r=="string"&&(r=wn(r));let{pathname:c="/",search:d="",hash:f="",state:y=null,key:_="default"}=r,x=j.useMemo(()=>{let p=Xs(c,s);return p==null?null:{location:{pathname:p,search:d,hash:f,state:y,key:_},navigationType:i}},[s,c,d,f,y,_,i]);return x==null?null:j.createElement(Nd.Provider,{value:l},j.createElement(Js.Provider,{children:n,value:x}))}function Fw(e){let{children:t,location:n}=e,r=j.useContext(Od),i=r&&!t?r.router.routes:wc(t);return jw(i,n)}var Vh;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(Vh||(Vh={}));new Promise(()=>{});function wc(e,t){t===void 0&&(t=[]);let n=[];return j.Children.forEach(e,(r,i)=>{if(!j.isValidElement(r))return;if(r.type===j.Fragment){n.push.apply(n,wc(r.props.children,t));return}r.type!==Iw&&ne(!1),!r.props.index||!r.props.children||ne(!1);let o=[...t,i],a={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=wc(r.props.children,o)),n.push(a)}),n}function $w(e){return!!e.ErrorBoundary||!!e.errorElement}/**
 * React Router DOM v6.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function kc(){return kc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},kc.apply(this,arguments)}function Uw(e,t){return sw({basename:t==null?void 0:t.basename,history:D1({window:t==null?void 0:t.window}),hydrationData:(t==null?void 0:t.hydrationData)||Yw(),routes:e,detectErrorBoundary:$w}).initialize()}function Yw(){var e;let t=(e=window)==null?void 0:e.__staticRouterHydrationData;return t&&t.errors&&(t=kc({},t,{errors:Ww(t.errors)})),t}function Ww(e){if(!e)return null;let t=Object.entries(e),n={};for(let[r,i]of t)if(i&&i.__type==="RouteErrorResponse")n[r]=new Ad(i.status,i.statusText,i.data,i.internal===!0);else if(i&&i.__type==="Error"){let o=new Error(i.message);o.stack="",n[r]=o}else n[r]=i;return n}var Bh;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(Bh||(Bh={}));var Gh;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Gh||(Gh={}));var bs={},Hw={get exports(){return bs},set exports(e){bs=e}},xe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Id=Symbol.for("react.element"),zd=Symbol.for("react.portal"),qs=Symbol.for("react.fragment"),el=Symbol.for("react.strict_mode"),tl=Symbol.for("react.profiler"),nl=Symbol.for("react.provider"),rl=Symbol.for("react.context"),Vw=Symbol.for("react.server_context"),il=Symbol.for("react.forward_ref"),ol=Symbol.for("react.suspense"),al=Symbol.for("react.suspense_list"),sl=Symbol.for("react.memo"),ll=Symbol.for("react.lazy"),Bw=Symbol.for("react.offscreen"),k0;k0=Symbol.for("react.module.reference");function Ht(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case Id:switch(e=e.type,e){case qs:case tl:case el:case ol:case al:return e;default:switch(e=e&&e.$$typeof,e){case Vw:case rl:case il:case ll:case sl:case nl:return e;default:return t}}case zd:return t}}}xe.ContextConsumer=rl;xe.ContextProvider=nl;xe.Element=Id;xe.ForwardRef=il;xe.Fragment=qs;xe.Lazy=ll;xe.Memo=sl;xe.Portal=zd;xe.Profiler=tl;xe.StrictMode=el;xe.Suspense=ol;xe.SuspenseList=al;xe.isAsyncMode=function(){return!1};xe.isConcurrentMode=function(){return!1};xe.isContextConsumer=function(e){return Ht(e)===rl};xe.isContextProvider=function(e){return Ht(e)===nl};xe.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Id};xe.isForwardRef=function(e){return Ht(e)===il};xe.isFragment=function(e){return Ht(e)===qs};xe.isLazy=function(e){return Ht(e)===ll};xe.isMemo=function(e){return Ht(e)===sl};xe.isPortal=function(e){return Ht(e)===zd};xe.isProfiler=function(e){return Ht(e)===tl};xe.isStrictMode=function(e){return Ht(e)===el};xe.isSuspense=function(e){return Ht(e)===ol};xe.isSuspenseList=function(e){return Ht(e)===al};xe.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===qs||e===tl||e===el||e===ol||e===al||e===Bw||typeof e=="object"&&e!==null&&(e.$$typeof===ll||e.$$typeof===sl||e.$$typeof===nl||e.$$typeof===rl||e.$$typeof===il||e.$$typeof===k0||e.getModuleId!==void 0)};xe.typeOf=Ht;(function(e){e.exports=xe})(Hw);function Gw(e){function t(L,N,F,J,w){for(var oe=0,O=0,Me=0,se=0,fe,q,$e=0,qe=0,ae,Qe=ae=fe=0,he=0,Be=0,vr=0,Ae=0,_n=F.length,Vn=_n-1,gt,Z="",Oe="",Hr="",$i="",S;he<_n;){if(q=F.charCodeAt(he),he===Vn&&O+se+Me+oe!==0&&(O!==0&&(q=O===47?10:47),se=Me=oe=0,_n++,Vn++),O+se+Me+oe===0){if(he===Vn&&(0<Be&&(Z=Z.replace(y,"")),0<Z.trim().length)){switch(q){case 32:case 9:case 59:case 13:case 10:break;default:Z+=F.charAt(he)}q=59}switch(q){case 123:for(Z=Z.trim(),fe=Z.charCodeAt(0),ae=1,Ae=++he;he<_n;){switch(q=F.charCodeAt(he)){case 123:ae++;break;case 125:ae--;break;case 47:switch(q=F.charCodeAt(he+1)){case 42:case 47:e:{for(Qe=he+1;Qe<Vn;++Qe)switch(F.charCodeAt(Qe)){case 47:if(q===42&&F.charCodeAt(Qe-1)===42&&he+2!==Qe){he=Qe+1;break e}break;case 10:if(q===47){he=Qe+1;break e}}he=Qe}}break;case 91:q++;case 40:q++;case 34:case 39:for(;he++<Vn&&F.charCodeAt(he)!==q;);}if(ae===0)break;he++}switch(ae=F.substring(Ae,he),fe===0&&(fe=(Z=Z.replace(f,"").trim()).charCodeAt(0)),fe){case 64:switch(0<Be&&(Z=Z.replace(y,"")),q=Z.charCodeAt(1),q){case 100:case 109:case 115:case 45:Be=N;break;default:Be=Qt}if(ae=t(N,Be,ae,q,w+1),Ae=ae.length,0<A&&(Be=n(Qt,Z,vr),S=s(3,ae,Be,N,be,Se,Ae,q,w,J),Z=Be.join(""),S!==void 0&&(Ae=(ae=S.trim()).length)===0&&(q=0,ae="")),0<Ae)switch(q){case 115:Z=Z.replace(T,a);case 100:case 109:case 45:ae=Z+"{"+ae+"}";break;case 107:Z=Z.replace(h,"$1 $2"),ae=Z+"{"+ae+"}",ae=Ve===1||Ve===2&&o("@"+ae,3)?"@-webkit-"+ae+"@"+ae:"@"+ae;break;default:ae=Z+ae,J===112&&(ae=(Oe+=ae,""))}else ae="";break;default:ae=t(N,n(N,Z,vr),ae,J,w+1)}Hr+=ae,ae=vr=Be=Qe=fe=0,Z="",q=F.charCodeAt(++he);break;case 125:case 59:if(Z=(0<Be?Z.replace(y,""):Z).trim(),1<(Ae=Z.length))switch(Qe===0&&(fe=Z.charCodeAt(0),fe===45||96<fe&&123>fe)&&(Ae=(Z=Z.replace(" ",":")).length),0<A&&(S=s(1,Z,N,L,be,Se,Oe.length,J,w,J))!==void 0&&(Ae=(Z=S.trim()).length)===0&&(Z="\0\0"),fe=Z.charCodeAt(0),q=Z.charCodeAt(1),fe){case 0:break;case 64:if(q===105||q===99){$i+=Z+F.charAt(he);break}default:Z.charCodeAt(Ae-1)!==58&&(Oe+=i(Z,fe,q,Z.charCodeAt(2)))}vr=Be=Qe=fe=0,Z="",q=F.charCodeAt(++he)}}switch(q){case 13:case 10:O===47?O=0:1+fe===0&&J!==107&&0<Z.length&&(Be=1,Z+="\0"),0<A*K&&s(0,Z,N,L,be,Se,Oe.length,J,w,J),Se=1,be++;break;case 59:case 125:if(O+se+Me+oe===0){Se++;break}default:switch(Se++,gt=F.charAt(he),q){case 9:case 32:if(se+oe+O===0)switch($e){case 44:case 58:case 9:case 32:gt="";break;default:q!==32&&(gt=" ")}break;case 0:gt="\\0";break;case 12:gt="\\f";break;case 11:gt="\\v";break;case 38:se+O+oe===0&&(Be=vr=1,gt="\f"+gt);break;case 108:if(se+O+oe+ze===0&&0<Qe)switch(he-Qe){case 2:$e===112&&F.charCodeAt(he-3)===58&&(ze=$e);case 8:qe===111&&(ze=qe)}break;case 58:se+O+oe===0&&(Qe=he);break;case 44:O+Me+se+oe===0&&(Be=1,gt+="\r");break;case 34:case 39:O===0&&(se=se===q?0:se===0?q:se);break;case 91:se+O+Me===0&&oe++;break;case 93:se+O+Me===0&&oe--;break;case 41:se+O+oe===0&&Me--;break;case 40:if(se+O+oe===0){if(fe===0)switch(2*$e+3*qe){case 533:break;default:fe=1}Me++}break;case 64:O+Me+se+oe+Qe+ae===0&&(ae=1);break;case 42:case 47:if(!(0<se+oe+Me))switch(O){case 0:switch(2*q+3*F.charCodeAt(he+1)){case 235:O=47;break;case 220:Ae=he,O=42}break;case 42:q===47&&$e===42&&Ae+2!==he&&(F.charCodeAt(Ae+2)===33&&(Oe+=F.substring(Ae,he+1)),gt="",O=0)}}O===0&&(Z+=gt)}qe=$e,$e=q,he++}if(Ae=Oe.length,0<Ae){if(Be=N,0<A&&(S=s(2,Oe,Be,L,be,Se,Ae,J,w,J),S!==void 0&&(Oe=S).length===0))return $i+Oe+Hr;if(Oe=Be.join(",")+"{"+Oe+"}",Ve*ze!==0){switch(Ve!==2||o(Oe,2)||(ze=0),ze){case 111:Oe=Oe.replace(k,":-moz-$1")+Oe;break;case 112:Oe=Oe.replace(v,"::-webkit-input-$1")+Oe.replace(v,"::-moz-$1")+Oe.replace(v,":-ms-input-$1")+Oe}ze=0}}return $i+Oe+Hr}function n(L,N,F){var J=N.trim().split(C);N=J;var w=J.length,oe=L.length;switch(oe){case 0:case 1:var O=0;for(L=oe===0?"":L[0]+" ";O<w;++O)N[O]=r(L,N[O],F).trim();break;default:var Me=O=0;for(N=[];O<w;++O)for(var se=0;se<oe;++se)N[Me++]=r(L[se]+" ",J[O],F).trim()}return N}function r(L,N,F){var J=N.charCodeAt(0);switch(33>J&&(J=(N=N.trim()).charCodeAt(0)),J){case 38:return N.replace(g,"$1"+L.trim());case 58:return L.trim()+N.replace(g,"$1"+L.trim());default:if(0<1*F&&0<N.indexOf("\f"))return N.replace(g,(L.charCodeAt(0)===58?"":"$1")+L.trim())}return L+N}function i(L,N,F,J){var w=L+";",oe=2*N+3*F+4*J;if(oe===944){L=w.indexOf(":",9)+1;var O=w.substring(L,w.length-1).trim();return O=w.substring(0,L).trim()+O+";",Ve===1||Ve===2&&o(O,1)?"-webkit-"+O+O:O}if(Ve===0||Ve===2&&!o(w,1))return w;switch(oe){case 1015:return w.charCodeAt(10)===97?"-webkit-"+w+w:w;case 951:return w.charCodeAt(3)===116?"-webkit-"+w+w:w;case 963:return w.charCodeAt(5)===110?"-webkit-"+w+w:w;case 1009:if(w.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+w+w;case 978:return"-webkit-"+w+"-moz-"+w+w;case 1019:case 983:return"-webkit-"+w+"-moz-"+w+"-ms-"+w+w;case 883:if(w.charCodeAt(8)===45)return"-webkit-"+w+w;if(0<w.indexOf("image-set(",11))return w.replace(Te,"$1-webkit-$2")+w;break;case 932:if(w.charCodeAt(4)===45)switch(w.charCodeAt(5)){case 103:return"-webkit-box-"+w.replace("-grow","")+"-webkit-"+w+"-ms-"+w.replace("grow","positive")+w;case 115:return"-webkit-"+w+"-ms-"+w.replace("shrink","negative")+w;case 98:return"-webkit-"+w+"-ms-"+w.replace("basis","preferred-size")+w}return"-webkit-"+w+"-ms-"+w+w;case 964:return"-webkit-"+w+"-ms-flex-"+w+w;case 1023:if(w.charCodeAt(8)!==99)break;return O=w.substring(w.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+O+"-webkit-"+w+"-ms-flex-pack"+O+w;case 1005:return x.test(w)?w.replace(_,":-webkit-")+w.replace(_,":-moz-")+w:w;case 1e3:switch(O=w.substring(13).trim(),N=O.indexOf("-")+1,O.charCodeAt(0)+O.charCodeAt(N)){case 226:O=w.replace(D,"tb");break;case 232:O=w.replace(D,"tb-rl");break;case 220:O=w.replace(D,"lr");break;default:return w}return"-webkit-"+w+"-ms-"+O+w;case 1017:if(w.indexOf("sticky",9)===-1)break;case 975:switch(N=(w=L).length-10,O=(w.charCodeAt(N)===33?w.substring(0,N):w).substring(L.indexOf(":",7)+1).trim(),oe=O.charCodeAt(0)+(O.charCodeAt(7)|0)){case 203:if(111>O.charCodeAt(8))break;case 115:w=w.replace(O,"-webkit-"+O)+";"+w;break;case 207:case 102:w=w.replace(O,"-webkit-"+(102<oe?"inline-":"")+"box")+";"+w.replace(O,"-webkit-"+O)+";"+w.replace(O,"-ms-"+O+"box")+";"+w}return w+";";case 938:if(w.charCodeAt(5)===45)switch(w.charCodeAt(6)){case 105:return O=w.replace("-items",""),"-webkit-"+w+"-webkit-box-"+O+"-ms-flex-"+O+w;case 115:return"-webkit-"+w+"-ms-flex-item-"+w.replace(I,"")+w;default:return"-webkit-"+w+"-ms-flex-line-pack"+w.replace("align-content","").replace(I,"")+w}break;case 973:case 989:if(w.charCodeAt(3)!==45||w.charCodeAt(4)===122)break;case 931:case 953:if(Q.test(L)===!0)return(O=L.substring(L.indexOf(":")+1)).charCodeAt(0)===115?i(L.replace("stretch","fill-available"),N,F,J).replace(":fill-available",":stretch"):w.replace(O,"-webkit-"+O)+w.replace(O,"-moz-"+O.replace("fill-",""))+w;break;case 962:if(w="-webkit-"+w+(w.charCodeAt(5)===102?"-ms-"+w:"")+w,F+J===211&&w.charCodeAt(13)===105&&0<w.indexOf("transform",10))return w.substring(0,w.indexOf(";",27)+1).replace(p,"$1-webkit-$2")+w}return w}function o(L,N){var F=L.indexOf(N===1?":":"{"),J=L.substring(0,N!==3?F:10);return F=L.substring(F+1,L.length-1),Y(N!==2?J:J.replace(re,"$1"),F,N)}function a(L,N){var F=i(N,N.charCodeAt(0),N.charCodeAt(1),N.charCodeAt(2));return F!==N+";"?F.replace(E," or ($1)").substring(4):"("+N+")"}function s(L,N,F,J,w,oe,O,Me,se,fe){for(var q=0,$e=N,qe;q<A;++q)switch(qe=rt[q].call(d,L,$e,F,J,w,oe,O,Me,se,fe)){case void 0:case!1:case!0:case null:break;default:$e=qe}if($e!==N)return $e}function l(L){switch(L){case void 0:case null:A=rt.length=0;break;default:if(typeof L=="function")rt[A++]=L;else if(typeof L=="object")for(var N=0,F=L.length;N<F;++N)l(L[N]);else K=!!L|0}return l}function c(L){return L=L.prefix,L!==void 0&&(Y=null,L?typeof L!="function"?Ve=1:(Ve=2,Y=L):Ve=0),c}function d(L,N){var F=L;if(33>F.charCodeAt(0)&&(F=F.trim()),ye=F,F=[ye],0<A){var J=s(-1,N,F,F,be,Se,0,0,0,0);J!==void 0&&typeof J=="string"&&(N=J)}var w=t(Qt,F,N,0,0);return 0<A&&(J=s(-2,w,F,F,be,Se,w.length,0,0,0),J!==void 0&&(w=J)),ye="",ze=0,Se=be=1,w}var f=/^\0+/g,y=/[\0\r\f]/g,_=/: */g,x=/zoo|gra/,p=/([,: ])(transform)/g,C=/,\r+?/g,g=/([\t\r\n ])*\f?&/g,h=/@(k\w+)\s*(\S*)\s*/,v=/::(place)/g,k=/:(read-only)/g,D=/[svh]\w+-[tblr]{2}/,T=/\(\s*(.*)\s*\)/g,E=/([\s\S]*?);/g,I=/-self|flex-/g,re=/[^]*?(:[rp][el]a[\w-]+)[^]*/,Q=/stretch|:\s*\w+\-(?:conte|avail)/,Te=/([^-])(image-set\()/,Se=1,be=1,ze=0,Ve=1,Qt=[],rt=[],A=0,Y=null,K=0,ye="";return d.use=l,d.set=c,e!==void 0&&c(e),d}var Qw={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Kw(e){var t=Object.create(null);return function(n){return t[n]===void 0&&(t[n]=e(n)),t[n]}}var Xw=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Qh=Kw(function(e){return Xw.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91}),Sc={},Jw={get exports(){return Sc},set exports(e){Sc=e}},we={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nt=typeof Symbol=="function"&&Symbol.for,Fd=nt?Symbol.for("react.element"):60103,$d=nt?Symbol.for("react.portal"):60106,ul=nt?Symbol.for("react.fragment"):60107,cl=nt?Symbol.for("react.strict_mode"):60108,dl=nt?Symbol.for("react.profiler"):60114,fl=nt?Symbol.for("react.provider"):60109,hl=nt?Symbol.for("react.context"):60110,Ud=nt?Symbol.for("react.async_mode"):60111,pl=nt?Symbol.for("react.concurrent_mode"):60111,ml=nt?Symbol.for("react.forward_ref"):60112,gl=nt?Symbol.for("react.suspense"):60113,Zw=nt?Symbol.for("react.suspense_list"):60120,yl=nt?Symbol.for("react.memo"):60115,vl=nt?Symbol.for("react.lazy"):60116,qw=nt?Symbol.for("react.block"):60121,ek=nt?Symbol.for("react.fundamental"):60117,tk=nt?Symbol.for("react.responder"):60118,nk=nt?Symbol.for("react.scope"):60119;function Lt(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case Fd:switch(e=e.type,e){case Ud:case pl:case ul:case dl:case cl:case gl:return e;default:switch(e=e&&e.$$typeof,e){case hl:case ml:case vl:case yl:case fl:return e;default:return t}}case $d:return t}}}function S0(e){return Lt(e)===pl}we.AsyncMode=Ud;we.ConcurrentMode=pl;we.ContextConsumer=hl;we.ContextProvider=fl;we.Element=Fd;we.ForwardRef=ml;we.Fragment=ul;we.Lazy=vl;we.Memo=yl;we.Portal=$d;we.Profiler=dl;we.StrictMode=cl;we.Suspense=gl;we.isAsyncMode=function(e){return S0(e)||Lt(e)===Ud};we.isConcurrentMode=S0;we.isContextConsumer=function(e){return Lt(e)===hl};we.isContextProvider=function(e){return Lt(e)===fl};we.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Fd};we.isForwardRef=function(e){return Lt(e)===ml};we.isFragment=function(e){return Lt(e)===ul};we.isLazy=function(e){return Lt(e)===vl};we.isMemo=function(e){return Lt(e)===yl};we.isPortal=function(e){return Lt(e)===$d};we.isProfiler=function(e){return Lt(e)===dl};we.isStrictMode=function(e){return Lt(e)===cl};we.isSuspense=function(e){return Lt(e)===gl};we.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===ul||e===pl||e===dl||e===cl||e===gl||e===Zw||typeof e=="object"&&e!==null&&(e.$$typeof===vl||e.$$typeof===yl||e.$$typeof===fl||e.$$typeof===hl||e.$$typeof===ml||e.$$typeof===ek||e.$$typeof===tk||e.$$typeof===nk||e.$$typeof===qw)};we.typeOf=Lt;(function(e){e.exports=we})(Jw);var Yd=Sc,rk={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ik={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},ok={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},_0={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Wd={};Wd[Yd.ForwardRef]=ok;Wd[Yd.Memo]=_0;function Kh(e){return Yd.isMemo(e)?_0:Wd[e.$$typeof]||rk}var ak=Object.defineProperty,sk=Object.getOwnPropertyNames,Xh=Object.getOwnPropertySymbols,lk=Object.getOwnPropertyDescriptor,uk=Object.getPrototypeOf,Jh=Object.prototype;function b0(e,t,n){if(typeof t!="string"){if(Jh){var r=uk(t);r&&r!==Jh&&b0(e,r,n)}var i=sk(t);Xh&&(i=i.concat(Xh(t)));for(var o=Kh(e),a=Kh(t),s=0;s<i.length;++s){var l=i[s];if(!ik[l]&&!(n&&n[l])&&!(a&&a[l])&&!(o&&o[l])){var c=lk(t,l);try{ak(e,l,c)}catch{}}}}return e}var ck=b0;function tn(){return(tn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var Zh=function(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n},_c=function(e){return e!==null&&typeof e=="object"&&(e.toString?e.toString():Object.prototype.toString.call(e))==="[object Object]"&&!bs.typeOf(e)},Cs=Object.freeze([]),dr=Object.freeze({});function Ti(e){return typeof e=="function"}function qh(e){return e.displayName||e.name||"Component"}function Hd(e){return e&&typeof e.styledComponentId=="string"}var Ai=typeof process<"u"&&process.env!==void 0&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",Vd=typeof window<"u"&&"HTMLElement"in window,dk=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&process.env!==void 0&&({}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY)),fk={};function zr(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):""))}var hk=function(){function e(n){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=n}var t=e.prototype;return t.indexOfGroup=function(n){for(var r=0,i=0;i<n;i++)r+=this.groupSizes[i];return r},t.insertRules=function(n,r){if(n>=this.groupSizes.length){for(var i=this.groupSizes,o=i.length,a=o;n>=a;)(a<<=1)<0&&zr(16,""+n);this.groupSizes=new Uint32Array(a),this.groupSizes.set(i),this.length=a;for(var s=o;s<a;s++)this.groupSizes[s]=0}for(var l=this.indexOfGroup(n+1),c=0,d=r.length;c<d;c++)this.tag.insertRule(l,r[c])&&(this.groupSizes[n]++,l++)},t.clearGroup=function(n){if(n<this.length){var r=this.groupSizes[n],i=this.indexOfGroup(n),o=i+r;this.groupSizes[n]=0;for(var a=i;a<o;a++)this.tag.deleteRule(i)}},t.getGroup=function(n){var r="";if(n>=this.length||this.groupSizes[n]===0)return r;for(var i=this.groupSizes[n],o=this.indexOfGroup(n),a=o+i,s=o;s<a;s++)r+=this.tag.getRule(s)+`/*!sc*/
`;return r},e}(),Ba=new Map,Ds=new Map,go=1,va=function(e){if(Ba.has(e))return Ba.get(e);for(;Ds.has(go);)go++;var t=go++;return Ba.set(e,t),Ds.set(t,e),t},pk=function(e){return Ds.get(e)},mk=function(e,t){t>=go&&(go=t+1),Ba.set(e,t),Ds.set(t,e)},gk="style["+Ai+'][data-styled-version="5.3.9"]',yk=new RegExp("^"+Ai+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),vk=function(e,t,n){for(var r,i=n.split(","),o=0,a=i.length;o<a;o++)(r=i[o])&&e.registerName(t,r)},xk=function(e,t){for(var n=(t.textContent||"").split(`/*!sc*/
`),r=[],i=0,o=n.length;i<o;i++){var a=n[i].trim();if(a){var s=a.match(yk);if(s){var l=0|parseInt(s[1],10),c=s[2];l!==0&&(mk(c,l),vk(e,c,s[3]),e.getTag().insertRules(l,r)),r.length=0}else r.push(a)}}},wk=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},C0=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(s){for(var l=s.childNodes,c=l.length;c>=0;c--){var d=l[c];if(d&&d.nodeType===1&&d.hasAttribute(Ai))return d}}(n),o=i!==void 0?i.nextSibling:null;r.setAttribute(Ai,"active"),r.setAttribute("data-styled-version","5.3.9");var a=wk();return a&&r.setAttribute("nonce",a),n.insertBefore(r,o),r},kk=function(){function e(n){var r=this.element=C0(n);r.appendChild(document.createTextNode("")),this.sheet=function(i){if(i.sheet)return i.sheet;for(var o=document.styleSheets,a=0,s=o.length;a<s;a++){var l=o[a];if(l.ownerNode===i)return l}zr(17)}(r),this.length=0}var t=e.prototype;return t.insertRule=function(n,r){try{return this.sheet.insertRule(r,n),this.length++,!0}catch{return!1}},t.deleteRule=function(n){this.sheet.deleteRule(n),this.length--},t.getRule=function(n){var r=this.sheet.cssRules[n];return r!==void 0&&typeof r.cssText=="string"?r.cssText:""},e}(),Sk=function(){function e(n){var r=this.element=C0(n);this.nodes=r.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(n,r){if(n<=this.length&&n>=0){var i=document.createTextNode(r),o=this.nodes[n];return this.element.insertBefore(i,o||null),this.length++,!0}return!1},t.deleteRule=function(n){this.element.removeChild(this.nodes[n]),this.length--},t.getRule=function(n){return n<this.length?this.nodes[n].textContent:""},e}(),_k=function(){function e(n){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(n,r){return n<=this.length&&(this.rules.splice(n,0,r),this.length++,!0)},t.deleteRule=function(n){this.rules.splice(n,1),this.length--},t.getRule=function(n){return n<this.length?this.rules[n]:""},e}(),ep=Vd,bk={isServer:!Vd,useCSSOMInjection:!dk},js=function(){function e(n,r,i){n===void 0&&(n=dr),r===void 0&&(r={}),this.options=tn({},bk,{},n),this.gs=r,this.names=new Map(i),this.server=!!n.isServer,!this.server&&Vd&&ep&&(ep=!1,function(o){for(var a=document.querySelectorAll(gk),s=0,l=a.length;s<l;s++){var c=a[s];c&&c.getAttribute(Ai)!=="active"&&(xk(o,c),c.parentNode&&c.parentNode.removeChild(c))}}(this))}e.registerId=function(n){return va(n)};var t=e.prototype;return t.reconstructWithOptions=function(n,r){return r===void 0&&(r=!0),new e(tn({},this.options,{},n),this.gs,r&&this.names||void 0)},t.allocateGSInstance=function(n){return this.gs[n]=(this.gs[n]||0)+1},t.getTag=function(){return this.tag||(this.tag=(i=(r=this.options).isServer,o=r.useCSSOMInjection,a=r.target,n=i?new _k(a):o?new kk(a):new Sk(a),new hk(n)));var n,r,i,o,a},t.hasNameForId=function(n,r){return this.names.has(n)&&this.names.get(n).has(r)},t.registerName=function(n,r){if(va(n),this.names.has(n))this.names.get(n).add(r);else{var i=new Set;i.add(r),this.names.set(n,i)}},t.insertRules=function(n,r,i){this.registerName(n,r),this.getTag().insertRules(va(n),i)},t.clearNames=function(n){this.names.has(n)&&this.names.get(n).clear()},t.clearRules=function(n){this.getTag().clearGroup(va(n)),this.clearNames(n)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(n){for(var r=n.getTag(),i=r.length,o="",a=0;a<i;a++){var s=pk(a);if(s!==void 0){var l=n.names.get(s),c=r.getGroup(a);if(l&&c&&l.size){var d=Ai+".g"+a+'[id="'+s+'"]',f="";l!==void 0&&l.forEach(function(y){y.length>0&&(f+=y+",")}),o+=""+c+d+'{content:"'+f+`"}/*!sc*/
`}}}return o}(this)},e}(),Ck=/(a)(d)/gi,tp=function(e){return String.fromCharCode(e+(e>25?39:97))};function bc(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=tp(t%52)+n;return(tp(t%52)+n).replace(Ck,"$1-$2")}var hi=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},D0=function(e){return hi(5381,e)};function j0(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ti(n)&&!Hd(n))return!1}return!0}var Dk=D0("5.3.9"),jk=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&j0(t),this.componentId=n,this.baseHash=hi(Dk,n),this.baseStyle=r,js.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var i=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(t,n,r)),this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(i,this.staticRulesId))o.push(this.staticRulesId);else{var a=Fr(this.rules,t,n,r).join(""),s=bc(hi(this.baseHash,a)>>>0);if(!n.hasNameForId(i,s)){var l=r(a,"."+s,void 0,i);n.insertRules(i,s,l)}o.push(s),this.staticRulesId=s}else{for(var c=this.rules.length,d=hi(this.baseHash,r.hash),f="",y=0;y<c;y++){var _=this.rules[y];if(typeof _=="string")f+=_;else if(_){var x=Fr(_,t,n,r),p=Array.isArray(x)?x.join(""):x;d=hi(d,p+y),f+=p}}if(f){var C=bc(d>>>0);if(!n.hasNameForId(i,C)){var g=r(f,"."+C,void 0,i);n.insertRules(i,C,g)}o.push(C)}}return o.join(" ")},e}(),Ek=/^\s*\/\/.*$/gm,Mk=[":","[",".","#"];function Pk(e){var t,n,r,i,o=e===void 0?dr:e,a=o.options,s=a===void 0?dr:a,l=o.plugins,c=l===void 0?Cs:l,d=new Gw(s),f=[],y=function(p){function C(g){if(g)try{p(g+"}")}catch{}}return function(g,h,v,k,D,T,E,I,re,Q){switch(g){case 1:if(re===0&&h.charCodeAt(0)===64)return p(h+";"),"";break;case 2:if(I===0)return h+"/*|*/";break;case 3:switch(I){case 102:case 112:return p(v[0]+h),"";default:return h+(Q===0?"/*|*/":"")}case-2:h.split("/*|*/}").forEach(C)}}}(function(p){f.push(p)}),_=function(p,C,g){return C===0&&Mk.indexOf(g[n.length])!==-1||g.match(i)?p:"."+t};function x(p,C,g,h){h===void 0&&(h="&");var v=p.replace(Ek,""),k=C&&g?g+" "+C+" { "+v+" }":v;return t=h,n=C,r=new RegExp("\\"+n+"\\b","g"),i=new RegExp("(\\"+n+"\\b){2,}"),d(g||!C?"":C,k)}return d.use([].concat(c,[function(p,C,g){p===2&&g.length&&g[0].lastIndexOf(n)>0&&(g[0]=g[0].replace(r,_))},y,function(p){if(p===-2){var C=f;return f=[],C}}])),x.hash=c.length?c.reduce(function(p,C){return C.name||zr(15),hi(p,C.name)},5381).toString():"",x}var E0=$r.createContext();E0.Consumer;var M0=$r.createContext(),Rk=(M0.Consumer,new js),Cc=Pk();function P0(){return j.useContext(E0)||Rk}function R0(){return j.useContext(M0)||Cc}var Tk=function(){function e(t,n){var r=this;this.inject=function(i,o){o===void 0&&(o=Cc);var a=r.name+o.hash;i.hasNameForId(r.id,a)||i.insertRules(r.id,a,o(r.rules,a,"@keyframes"))},this.toString=function(){return zr(12,String(r.name))},this.name=t,this.id="sc-keyframes-"+t,this.rules=n}return e.prototype.getName=function(t){return t===void 0&&(t=Cc),this.name+t.hash},e}(),Ak=/([A-Z])/,Ok=/([A-Z])/g,Lk=/^ms-/,Nk=function(e){return"-"+e.toLowerCase()};function np(e){return Ak.test(e)?e.replace(Ok,Nk).replace(Lk,"-ms-"):e}var rp=function(e){return e==null||e===!1||e===""};function Fr(e,t,n,r){if(Array.isArray(e)){for(var i,o=[],a=0,s=e.length;a<s;a+=1)(i=Fr(e[a],t,n,r))!==""&&(Array.isArray(i)?o.push.apply(o,i):o.push(i));return o}if(rp(e))return"";if(Hd(e))return"."+e.styledComponentId;if(Ti(e)){if(typeof(c=e)!="function"||c.prototype&&c.prototype.isReactComponent||!t)return e;var l=e(t);return Fr(l,t,n,r)}var c;return e instanceof Tk?n?(e.inject(n,r),e.getName(r)):e:_c(e)?function d(f,y){var _,x,p=[];for(var C in f)f.hasOwnProperty(C)&&!rp(f[C])&&(Array.isArray(f[C])&&f[C].isCss||Ti(f[C])?p.push(np(C)+":",f[C],";"):_c(f[C])?p.push.apply(p,d(f[C],C)):p.push(np(C)+": "+(_=C,(x=f[C])==null||typeof x=="boolean"||x===""?"":typeof x!="number"||x===0||_ in Qw?String(x).trim():x+"px")+";"));return y?[y+" {"].concat(p,["}"]):p}(e):e.toString()}var ip=function(e){return Array.isArray(e)&&(e.isCss=!0),e};function T0(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return Ti(e)||_c(e)?ip(Fr(Zh(Cs,[e].concat(n)))):n.length===0&&e.length===1&&typeof e[0]=="string"?e:ip(Fr(Zh(e,n)))}var A0=function(e,t,n){return n===void 0&&(n=dr),e.theme!==n.theme&&e.theme||t||n.theme},Ik=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,zk=/(^-|-$)/g;function uu(e){return e.replace(Ik,"-").replace(zk,"")}var O0=function(e){return bc(D0(e)>>>0)};function xa(e){return typeof e=="string"&&!0}var Dc=function(e){return typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)},Fk=function(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"};function $k(e,t,n){var r=e[n];Dc(t)&&Dc(r)?L0(r,t):e[n]=t}function L0(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var i=0,o=n;i<o.length;i++){var a=o[i];if(Dc(a))for(var s in a)Fk(s)&&$k(e,a[s],s)}return e}var zo=$r.createContext();zo.Consumer;function Uk(e){var t=j.useContext(zo),n=j.useMemo(function(){return function(r,i){if(!r)return zr(14);if(Ti(r)){var o=r(i);return o}return Array.isArray(r)||typeof r!="object"?zr(8):i?tn({},i,{},r):r}(e.theme,t)},[e.theme,t]);return e.children?$r.createElement(zo.Provider,{value:n},e.children):null}var cu={};function N0(e,t,n){var r=Hd(e),i=!xa(e),o=t.attrs,a=o===void 0?Cs:o,s=t.componentId,l=s===void 0?function(h,v){var k=typeof h!="string"?"sc":uu(h);cu[k]=(cu[k]||0)+1;var D=k+"-"+O0("5.3.9"+k+cu[k]);return v?v+"-"+D:D}(t.displayName,t.parentComponentId):s,c=t.displayName,d=c===void 0?function(h){return xa(h)?"styled."+h:"Styled("+qh(h)+")"}(e):c,f=t.displayName&&t.componentId?uu(t.displayName)+"-"+t.componentId:t.componentId||l,y=r&&e.attrs?Array.prototype.concat(e.attrs,a).filter(Boolean):a,_=t.shouldForwardProp;r&&e.shouldForwardProp&&(_=t.shouldForwardProp?function(h,v,k){return e.shouldForwardProp(h,v,k)&&t.shouldForwardProp(h,v,k)}:e.shouldForwardProp);var x,p=new jk(n,f,r?e.componentStyle:void 0),C=p.isStatic&&a.length===0,g=function(h,v){return function(k,D,T,E){var I=k.attrs,re=k.componentStyle,Q=k.defaultProps,Te=k.foldedComponentIds,Se=k.shouldForwardProp,be=k.styledComponentId,ze=k.target,Ve=function(J,w,oe){J===void 0&&(J=dr);var O=tn({},w,{theme:J}),Me={};return oe.forEach(function(se){var fe,q,$e,qe=se;for(fe in Ti(qe)&&(qe=qe(O)),qe)O[fe]=Me[fe]=fe==="className"?(q=Me[fe],$e=qe[fe],q&&$e?q+" "+$e:q||$e):qe[fe]}),[O,Me]}(A0(D,j.useContext(zo),Q)||dr,D,I),Qt=Ve[0],rt=Ve[1],A=function(J,w,oe,O){var Me=P0(),se=R0(),fe=w?J.generateAndInjectStyles(dr,Me,se):J.generateAndInjectStyles(oe,Me,se);return fe}(re,E,Qt),Y=T,K=rt.$as||D.$as||rt.as||D.as||ze,ye=xa(K),L=rt!==D?tn({},D,{},rt):D,N={};for(var F in L)F[0]!=="$"&&F!=="as"&&(F==="forwardedAs"?N.as=L[F]:(Se?Se(F,Qh,K):!ye||Qh(F))&&(N[F]=L[F]));return D.style&&rt.style!==D.style&&(N.style=tn({},D.style,{},rt.style)),N.className=Array.prototype.concat(Te,be,A!==be?A:null,D.className,rt.className).filter(Boolean).join(" "),N.ref=Y,j.createElement(K,N)}(x,h,v,C)};return g.displayName=d,(x=$r.forwardRef(g)).attrs=y,x.componentStyle=p,x.displayName=d,x.shouldForwardProp=_,x.foldedComponentIds=r?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):Cs,x.styledComponentId=f,x.target=r?e.target:e,x.withComponent=function(h){var v=t.componentId,k=function(T,E){if(T==null)return{};var I,re,Q={},Te=Object.keys(T);for(re=0;re<Te.length;re++)I=Te[re],E.indexOf(I)>=0||(Q[I]=T[I]);return Q}(t,["componentId"]),D=v&&v+"-"+(xa(h)?h:uu(qh(h)));return N0(h,tn({},k,{attrs:y,componentId:D}),n)},Object.defineProperty(x,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(h){this._foldedDefaultProps=r?L0({},e.defaultProps,h):h}}),Object.defineProperty(x,"toString",{value:function(){return"."+x.styledComponentId}}),i&&ck(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),x}var jc=function(e){return function t(n,r,i){if(i===void 0&&(i=dr),!bs.isValidElementType(r))return zr(1,String(r));var o=function(){return n(r,i,T0.apply(void 0,arguments))};return o.withConfig=function(a){return t(n,r,tn({},i,{},a))},o.attrs=function(a){return t(n,r,tn({},i,{attrs:Array.prototype.concat(i.attrs,a).filter(Boolean)}))},o}(N0,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach(function(e){jc[e]=jc(e)});var Yk=function(){function e(n,r){this.rules=n,this.componentId=r,this.isStatic=j0(n),js.registerId(this.componentId+1)}var t=e.prototype;return t.createStyles=function(n,r,i,o){var a=o(Fr(this.rules,r,i,o).join(""),""),s=this.componentId+n;i.insertRules(s,s,a)},t.removeStyles=function(n,r){r.clearRules(this.componentId+n)},t.renderStyles=function(n,r,i,o){n>2&&js.registerId(this.componentId+n),this.removeStyles(n,i),this.createStyles(n,r,i,o)},e}();function Wk(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var i=T0.apply(void 0,[e].concat(n)),o="sc-global-"+O0(JSON.stringify(i)),a=new Yk(i,o);function s(c){var d=P0(),f=R0(),y=j.useContext(zo),_=j.useRef(d.allocateGSInstance(o)).current;return d.server&&l(_,c,d,y,f),j.useLayoutEffect(function(){if(!d.server)return l(_,c,d,y,f),function(){return a.removeStyles(_,d)}},[_,c,d,y,f]),null}function l(c,d,f,y,_){if(a.isStatic)a.renderStyles(c,fk,f,_);else{var x=tn({},d,{theme:A0(d,y,s.defaultProps)});a.renderStyles(c,x,f,_)}}return $r.memo(s)}const m=jc,Hk=m.ul`
  display: flex;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`,Vk=m.li`
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  /* color: #ffffff; */
  color: ${({isActive:e})=>e?"#7680DD":"inherit"};
  font-size: 16px;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
  border-bottom: ${e=>e.isDropdown?"4px solid hsla(234, 60%, 66%, 1)":"none"};
  transition: all 0.05s;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
    font-weight: 300;
    padding-inline: 16px;
  }
`,Bk=m.ul`
  z-index: 100;
  position: absolute;
  top: 86px;
  right: 0;
  display: ${e=>e.isDropdown?"block":"none"};
  padding: 16px 20px;
  background: ${({MyTheme:e})=>e==="dark"?"#fff":"rgb(36,31,56)"};
  border: 1px solid hsl(0, 0%, 50%);
  color: ${({MyTheme:e})=>e==="dark"?"#42424A":"#fff"};
  border-radius: 8px;
  transition: all 0s ease 0.1s;
  min-width: 150px;
`,Gk=m.li`
  display: block;
  padding-block: 8px;
  /* color: hsl(0, 0%, 88%); */
  font-weight: 400;
  font-size: 14px;
  text-transform: none;
  &:hover {
    color: hsl(234, 60%, 66%);
  }
`,I0=(e,t)=>{t&&(t.startsWith("http")||t.startsWith("https")?window.location.href=t:e(t))},Qk=({label:e,url:t})=>{const n=Yn();return u.jsx(Gk,{onClick:()=>I0(n,t),children:e})},Kk=({subNavItems:e,isDropdown:t,theme:n})=>u.jsx(Bk,{isDropdown:t,MyTheme:n,children:e==null?void 0:e.map(({key:r,label:i,url:o})=>u.jsx(Qk,{label:i,url:o},r))}),Xk=({label:e,subNavItems:t,url:n,theme:r,id:i,activeId:o})=>{const a=Yn(),[s,l]=j.useState(!1);return u.jsxs(Vk,{isDropdown:s,isActive:i===o,onMouseOver:()=>l(!0),onMouseOut:()=>l(!1),onClick:()=>I0(a,n),children:[e,t&&u.jsx(Kk,{subNavItems:t,isDropdown:s,theme:r})]})},Jk=({items:e,theme:t,activeId:n})=>u.jsx(Hk,{children:e.map(({key:r,label:i,url:o,children:a})=>u.jsx(Xk,{id:r,label:i,url:o,subNavItems:a,theme:t,activeId:n},r))}),Zk="/assets/menu-459d13f5.svg",qk="/assets/dropIcon-525fd0e1.svg",eS="/assets/dropIconActive-9bdef1aa.svg",tS=m.img`
  display: none;
  margin-left: 12px;
  @media screen and (max-width: 768px) {
    display: block;
  }
`,nS=m.ul`
  display: ${e=>e.isDropDown?"flex":"none"};
  flex-direction: column;
  position: absolute;
  top: 53px;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #111429;
  @media screen and (min-width: 768px) {
    display: none;
  }
`,rS=m.li`
  display: flex;
  align-items: center;
  height: 42px;
  padding-inline: 20px;
`,iS=m(rS)`
  /* background: #111429; */
  color: ${e=>e.isDropdown?"#7680DD":"#E0E0E0"};
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  text-transform: uppercase;
`,oS=m.p`
  /* min-width: 100px; */
`,aS=m.ul`
  display: ${e=>e.isDropdown?"block":"none"};
  height: ${e=>e.isDropdown?"min-content":"0px"};
  transition: all 1s;
`,sS=m.li`
  display: flex;
  align-items: center;
  height: 42px;
  padding-inline: 20px;
`,lS=m(sS)`
  background: #242840;
  color: #e0e0e0;
  font-size: 16px;
  line-height: 1;
`,op=m.img`
  margin-left: 12px;
  height: 12px;
  width: 12px;
`,z0=(e,t,n,r)=>{t?t.startsWith("http")||t.startsWith("https")?window.location.href=t:e(t):r&&r(!n)},uS=({label:e,url:t})=>{const n=Yn();return u.jsx(lS,{onClick:()=>z0(n,t),children:e})},cS=({isDropdown:e,subNavItems:t})=>u.jsx(aS,{isDropdown:e,children:t==null?void 0:t.map(({key:n,label:r,url:i})=>u.jsx(uS,{label:r,url:i},n))}),dS=({label:e,url:t,subNavItems:n})=>{const r=Yn(),[i,o]=j.useState(!1);return u.jsxs(u.Fragment,{children:[u.jsxs(iS,{isDropdown:i,onClick:()=>z0(r,t,i,o),children:[u.jsx(oS,{children:e}),n&&u.jsx(u.Fragment,{children:i?u.jsx(op,{src:eS}):u.jsx(op,{src:qk})})]}),u.jsx(cS,{isDropdown:i,subNavItems:n})]})},fS=({items:e})=>{const[t,n]=j.useState(!1);return u.jsxs(u.Fragment,{children:[u.jsx(tS,{src:Zk,onClick:()=>n(!t)}),u.jsx(nS,{isDropDown:t,children:(e||[]).map(({key:r,label:i,url:o,children:a})=>u.jsx(dS,{label:i,url:o,subNavItems:a},r))})]})},F0="/assets/logo-46733c53.svg",hS="/assets/logo-text-dark-f3978d3a.svg",pS="/assets/logo-text-light-40cbbdf3.svg",ap=[{key:"products",label:"products",children:[{key:"DatenLord",label:"DatenLord",url:"https://github.com/datenlord/datenlord"},{key:"Xline",label:"Xline",url:"https://github.com/datenlord/Xline"},{key:"RDMA",label:"RDMA",url:"/products/RDMA"}]},{key:"solution",label:"solution",children:[{key:"Unified and High Performance Data Access Across Clouds",label:"Unified and High Performance Data Access Across Clouds",url:"/solution/Unified-and-High-Performance-Data-Access-Across-Clouds"},{key:"Geo-Distributed Metadata management",label:"Geo-Distributed Metadata management",url:"/solution/Geo-Distributed-Metadata-management"},{key:"Hardware Acceleration For Storage Network",label:"Hardware Acceleration For Storage Network",url:"/solution/Hardware-Acceleration-For-Storage-Network"}]},{key:"resources",label:"resources",children:[{key:"Contributing is Thinking and Learning",label:"Community",url:"/resources/contribute"},{key:"Tech Talk",label:"Tech Talk",url:"/resources/tech-talk"},{key:"Blog",label:"Blog",url:"/resources/blog"},{key:"Events",label:"Events",url:"https://www.youtube.com/@datenlord"}]},{key:"customers",label:"customers",url:"/customers"},{key:"company",label:"company",children:[{key:"Why build DatenLord",label:"Why build DatenLord ?",url:"/company/why-build"},{key:"Why Join DatenLord",label:"Why Join DatenLord ?",url:"/company/why-join"},{key:"Contact Us",label:"Contact Us",url:"/company/contact-us"},{key:"Join Us",label:"Join Us",url:"/company/join-us"}]}],mS=m.header`
  position: absolute;
  top: 0;
  left: 0;
  height: 86px;
  width: 100%;
  background-color: ${e=>e.bg};
  color: ${e=>e.headerTheme==="dark"?"#000":"#fff"};
  @media screen and (max-width: 1024px) {
    height: 69px;
  }
  @media screen and (max-width: 768px) {
    height: 53px;
  }
`,gS=m.div`
  position: relative;
  display: flex;
  align-items: center;
  height: inherit;
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 72px;
  @media screen and (max-width: 1024px) {
    padding-inline: 64px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 20px;
    background: #111429;
  }
`,yS=m.img`
  height: 50%;
  margin-right: 16px;
  @media screen and (max-width: 1024px) {
    margin-right: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 8px;
  }
`,sp=m.img`
  height: 16px;
  @media screen and (max-width: 1024px) {
    height: 12px;
  }
  @media screen and (max-width: 768px) {
    height: 8px;
  }
`,vS=m.div`
  flex: 1;
  min-width: 32px;
  @media screen and (max-width: 1024px) {
    min-width: 16px;
  }
`,Vt=({theme:e,bg:t="#fff",activeId:n})=>{const r=Yn();return u.jsx(mS,{headerTheme:e,bg:t,children:u.jsxs(gS,{children:[u.jsx(yS,{src:F0,alt:"DatenLord",onClick:()=>r("/")}),e!=="dark"||window.innerWidth<768?u.jsx(sp,{src:pS}):u.jsx(sp,{src:hS}),u.jsx(vS,{}),u.jsx(Jk,{items:ap,theme:e,activeId:n}),u.jsx(fS,{items:ap,theme:e})]})})},xS="/assets/cover1-55f5a95a.svg",Fo="/assets/cover2-24b4960c.svg",Ga="/assets/cover3-b5719c26.svg",wS="/assets/cover4-23df30ba.svg",yo="/assets/cover5-9f87f1dd.svg",kS=[{id:"first-page",layout:"row",theme:"dark",cover:xS,title:"High Performance Geo-Distributed Storage",description:"DatenLord aims to break cloud barrier by deeply integrating hardware and software to build a unified storage-access mechanism to provide high-performance and secure storage support for applications across clouds.",bgcolor:"hsl(250, 68%, 7%)"},{id:"second-page",layout:"col",theme:"light",cover:Fo,title:"Unified and High Performance Data Access Across Clouds",description:"A unified data access service across clouds assisted by high performance cache and effective network technology",bgcolor:"hsl(235, 41%, 89%)",url:"/solution/Unified-and-High-Performance-Data-Access-Across-Clouds"},{id:"third-page",layout:"row-reverse",theme:"light",cover:Ga,title:"Geo-Distributed Metadata Management",description:"The first industrial geo-distributed metadata management guarantees high-speed and strong consistency in WAN scenarios",bgcolor:"hsl(0, 0%, 100%)",url:"/solution/Geo-Distributed-Metadata-management"},{id:"forth-page",layout:"row",theme:"light",cover:wS,title:"Hardware Acceleration For Storage Network",description:"Adoption of RDMA and DPDK to build high performance network",bgcolor:"hsl(235, 41%, 89%)",url:"/solution/Hardware-Acceleration-For-Storage-Network"},{id:"fifth-page",layout:"row-reverse",theme:"light",cover:yo,title:"Believe in the Power of Open Source",description:"Attract global talents from open source communities related to distributed system, Linux kernel, open source hardware and more",bgcolor:"hsl(0, 0%, 100%)",url:"/resources/contribute"}],SS=m.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
`,_S=m.div`
  height: 100vh;
  padding-top: 84px;
  color: ${({myTheme:e})=>e==="dark"?"white":"black"};
  background: ${({backgroundColor:e})=>e};
  scroll-snap-align: center;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`,lp=m.div`
  display: flex;
  flex-direction: ${({layout:e})=>{switch(e){case"row":return"row";case"row-reverse":return"row-reverse";case"col":return"column";default:return"row"}}};
  justify-content: ${({layout:e})=>"center"};
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  padding-inline: 0.64rem;
  padding-bottom: 0.64rem;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    padding-inline: 2.45rem;
    padding-bottom: 20%;
  }
`,up=m.img`
  height: 5rem;
  width: 5rem;
  margin-left: ${({layout:e})=>e==="row-reverse"?"0.64rem":0};
  margin-right: ${({layout:e})=>e==="row"?"0.64rem":0};
  margin-bottom: ${({layout:e})=>e==="col"?"0.32rem":0};
  @media screen and (max-width: 425px) {
    margin-bottom: 0.48rem;
  }
`,bS=m.div`
  display: flex;
  flex-direction: column;
  text-align: ${({layout:e})=>e==="row"?"left":"right"};
`,cp=m.div`
  margin-bottom: 0.32rem;
  font-weight: 700;
  font-size: 0.4rem;
  line-height: 1.5;
  text-align: ${({layout:e})=>e==="col"?"center":"inherit"};
`,dp=m.div`
  min-width: 7.5rem;
  margin-bottom: 0.24rem;
  font-weight: 400;
  font-size: 0.26rem;
  line-height: 1.3;
  text-align: ${({layout:e})=>e==="col"?"center":"inherit"};
  max-width: ${({layout:e})=>e==="col"?"896px":"100%"};
`,fp=m.div`
  width: fit-content;
  margin-left: ${({layout:e})=>e==="row-reverse"?"auto":"0"};
  padding: 0.12rem 0.48rem;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  color: white;
  font-weight: 400;
  font-size: 0.26rem;
  line-height: 0.4rem;
  border-radius: 0.32rem;
  cursor: pointer;
`,CS=({id:e,layout:t,theme:n,bgcolor:r,cover:i,title:o,description:a,url:s})=>{const l=Yn();return u.jsx(_S,{myTheme:n,backgroundColor:r,children:t==="row"||t==="row-reverse"?u.jsxs(lp,{id:`${e}-${n}`,className:"view",layout:t,children:[u.jsx(up,{src:i,alt:"cover",layout:t}),u.jsxs(bS,{layout:t,children:[u.jsx(cp,{layout:t,children:o}),u.jsx(dp,{layout:t,children:a}),s&&u.jsxs(fp,{layout:t,onClick:()=>{l(s)},children:["Learn more ",">"]})]})]}):u.jsxs(lp,{id:`${e}-${n}`,className:"view",layout:t,children:[u.jsx(cp,{layout:t,children:o}),u.jsx(dp,{layout:t,children:a}),u.jsx(up,{src:i,alt:"cover",layout:t}),s&&u.jsxs(fp,{layout:t,onClick:()=>l(s),children:["Learn more ",">"]})]})})},DS=()=>{const[e,t]=j.useState("dark"),n=j.useRef({});j.useEffect(()=>{const i=l=>{n.current=l.reduce((d,f)=>(d[f.target.id]=f,d),n.current);const c=[];Object.keys(n.current).forEach(d=>{var y;const f=n.current[d];f.isIntersecting&&c.push(f),r((y=c[0])==null?void 0:y.target.id)})},o={rootMargin:"-40% 0px -40% 0px"},a=new IntersectionObserver(i,o);Array.from(document.querySelectorAll(".view")).forEach(l=>a.observe(l))},[]);const r=i=>{const o=(i||"").split("-");switch(o[o.length-1]){case"dark":t("light");break;case"light":t("dark");break;default:t("dark");break}};return u.jsxs(SS,{children:[u.jsx(Vt,{theme:e,bg:"transparent"}),kS.map(i=>u.jsx(CS,{...i},i.id))]})},jS=m.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgb(179, 177, 177);
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(136, 136, 136);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(100, 100, 100);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgb(68, 68, 68);
    border-radius: 4px;
  }
`,Bd=m.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  font-size: 48px;
  font-weight: bold;
  scroll-snap-align: center;
`,ES=m(Bd)`
  background: blue;
`,MS=m(Bd)`
  background: purple;
`,PS=m(Bd)`
  background: pink;
`,RS=()=>u.jsxs(jS,{children:[u.jsx(ES,{children:"First Page"}),u.jsx(MS,{children:"Second Page"}),u.jsx(PS,{children:"Third Page"})]}),TS="/assets/background1-b200d52a.svg",AS="/assets/icon1-6158bbcd.svg",OS="/assets/icon2-ab236486.svg",LS="/assets/icon3-c8715b97.svg",NS="/assets/icon4-75ca0b2f.svg",IS=m.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
`,Gd=m.div`
  height: 100vh;
  padding-top: 84px;
  scroll-snap-align: center;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`,zS=m(Gd)`
  color: white;
  background-image: url(${TS});
  background-size: cover;
`,FS=m(Gd)`
  color: black;
  background: #d9dbef;
`,$S=m(Gd)`
  color: black;
  background: #fff;
`,du=m.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  padding-bottom: 0.64rem;
  padding-inline: 0.96rem;
  /* overflow: hidden; */
`,$0=m.div`
  font-weight: 700;
  font-size: 0.3rem;
  line-height: 1.5;
`,US=m($0)`
  margin-bottom: 0.24rem;
`,hp=m($0)`
  margin-bottom: 0.24rem;
`,U0=m.div`
  text-align: center;
  font-weight: 600;
  font-size: 0.22rem;
  line-height: 1.3;
`,YS=m(U0)`
  margin-bottom: 0.32rem;
  padding-bottom: 0.48rem;
  border-bottom: 0.02rem solid;
  border-image: linear-gradient(to right, #8f41e9, #578aef) 1;
`,pp=m(U0)`
  margin-bottom: 0.32rem;
`,Y0=m.div`
  font-weight: 400px;
  font-size: 0.2rem;
  line-height: 1.5;
`,WS=m(Y0)`
  margin-bottom: 0.32rem;
`,Gr=m(Y0)`
  margin-bottom: 0.24rem;
`,HS=m.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  /* height: 3rem; */
  @media screen and (max-width: 768px) {
    /* flex-direction: column; */
    flex-wrap: wrap;
  }
`,wa=m.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 3rem;
  /* height: 100%; */
  margin-inline: 0.32rem;
  padding: 0.32rem;
  background: #ffffff14;
  border: 0.01rem solid white;
  border-radius: 0.12rem;
  @media screen and (max-width: 768px) {
    width: 48%;
    margin-bottom: 0.56rem;
    margin-inline: 0;
  }
`,ka=m.img`
  width: 0.9rem;
  height: 0.9rem;
  margin-bottom: 0.32rem;
`,Sa=m.div`
  font-weight: 400;
  font-size: 0.18rem;
  line-height: 1.2;
  text-align: center;
  overflow: hidden;
`,mp=m.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 540px) {
    flex-direction: column;
  }
`,gp=m.div`
  display: flex;
  flex-direction: column;
`,W0=m.img`
  width: 4.5rem;
  height: 4.5rem;
`,VS=m(W0)`
  margin-left: 0.64rem;
`,BS=m(W0)`
  margin-right: 0.64rem;
`,GS=()=>{const[e,t]=j.useState("dark"),n=j.useRef({});j.useEffect(()=>{const i=l=>{n.current=l.reduce((d,f)=>(d[f.target.id]=f,d),n.current);const c=[];Object.keys(n.current).forEach(d=>{var y;const f=n.current[d];f.isIntersecting&&c.push(f),r((y=c[0])==null?void 0:y.target.id)})},o={rootMargin:"-40% 0px -40% 0px"},a=new IntersectionObserver(i,o);Array.from(document.querySelectorAll(".view")).forEach(l=>a.observe(l))},[]);const r=i=>{const o=(i||"").split("-");switch(o[o.length-1]){case"dark":t("light");break;case"light":t("dark");break;default:t("dark");break}};return u.jsxs(IS,{children:[u.jsx(Vt,{theme:e,bg:"transparent",activeId:"products"}),u.jsx(zS,{children:u.jsxs(du,{id:"first-page-dark",className:"view",children:[u.jsx(US,{children:"Async-RDMA"}),u.jsx(YS,{children:"Async-RDMA is a framework that provides high-level abstractions and Asynchronous APIs for writing Remote Direct Memory Access (RDMA) applications."}),u.jsx(WS,{children:"RDMA enables direct access to memory from one machine to another. This can boost the performance of applications that require low latency and high throughput. RDMA supports kernel bypass and zero-copy, without involving the CPU. However, writing RDMA applications with low-level C libraries is often difficult and error-prone. To make things easier, we developed Async-RDMA, which provides easy-to-use APIs that hide the complexity of underlying RDMA operations. With Async-RDMA, most RDMA operations can be completed with just one line of code. It provides the following main features:"}),u.jsxs(HS,{children:[u.jsxs(wa,{children:[u.jsx(ka,{src:AS}),u.jsx(Sa,{children:"Tools for establishing connections with RDMA endpoints."})]}),u.jsxs(wa,{children:[u.jsx(ka,{src:OS}),u.jsx(Sa,{children:"High-level Asynchronous APIs for transmitting data between endpoints."})]}),u.jsxs(wa,{children:[u.jsx(ka,{src:LS}),u.jsx(Sa,{children:"High-level APIs for managing RDMA memory regions."})]}),u.jsxs(wa,{children:[u.jsx(ka,{src:NS}),u.jsx(Sa,{children:"A framework that works behind the scenes to manage memory regions and execute RDMA requests Asynchronously."})]})]})]})}),u.jsx(FS,{children:u.jsxs(du,{id:"second-page-light",className:"view",children:[u.jsx(hp,{children:"RoCE-Sim"}),u.jsx(pp,{children:"RoCE-Sim is an RoCE v2 simulator, a software written in Python that simulates the behavior of the RoCE v2 protocol."}),u.jsxs(mp,{children:[u.jsxs(gp,{children:[u.jsx(Gr,{children:"RoCE v2 (RDMA over Converged Ethernet version 2) is a networking protocol that enables Remote Direct Memory Access (RDMA) over Ethernet networks. It is an improvement over the original RoCE standard and provides a more efficient and scalable way of performing RDMA over Ethernet."}),u.jsx(Gr,{children:"RoCE-Sim simulates the data processing flow of the RoCE v2 protocol, which can be used for end-to-end verification of devices supporting the RoCE v2 protocol. The simulator can flexibly simulate various correct and incorrect RDMA request and response packets, and analyze the response data of the device to determine whether it meets the protocol requirements."}),u.jsx(Gr,{children:"The simulator integrates a test framework, and developers only need to write configuration files to control the simulator to generate, send, receive, and check packets, thereby efficiently completing end-to-end verification work."})]}),u.jsx(VS,{src:Fo})]})]})}),u.jsx($S,{children:u.jsxs(du,{id:"third-page-light",className:"view",children:[u.jsx(hp,{children:"Open-RDMA"}),u.jsx(pp,{children:"Open-RDMA is an RoCE v2 hardware implementation using Spinal HDL."}),u.jsxs(mp,{children:[u.jsx(BS,{src:Fo}),u.jsxs(gp,{children:[u.jsx(Gr,{children:"RoCE v2 (RDMA over Converged Ethernet version 2) is a networking protocol that enables Remote Direct Memory Access (RDMA) over Ethernet networks. It is an improvement over the original RoCE standard and provides a more efficient and scalable way of performing RDMA over Ethernet."}),u.jsx(Gr,{children:"Open-RDMA is an open-source implementation of RoCEv2 that utilizes agile development and validation methods, as well as a hardware and software co-design approach. We use Spinal HDL and Bluespec SystemVerilog to implement RoCEv2, taking advantage of their high-level abstractions to improve development efficiency and reduce bug rates. We also use Cocotb (a Python verification framework) for efficient verification."}),u.jsx(Gr,{children:"Currently, we have implemented the basic framework of the protocol and plan to implement enhancements such as priority flow control, congestion control, and support for multicast traffic, making it more suitable for large-scale data center environments. Additionally, we are exploring the use of formal methods to verify our implementation."})]})]})]})})]})},QS="/assets/image1-c47afa69.svg",KS="/assets/image2-67118959.svg",XS="/assets/image3-8c31cadb.svg",JS="/assets/image4-42fe4b07.png",ZS="/assets/bg1-15a76281.png",qS=m.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
`,Qd=m.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
  scroll-snap-align: center;
`,e2=m(Qd)`
  background: #d9dbef;
`,yp=m(Qd)`
  background: #ffffff;
`,t2=m(Qd)`
  background-image: url(${ZS});
  background-size: cover;
`,Qa=m.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  padding-bottom: 0.64rem;
  padding-inline: 0.96rem;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`,n2=m(Qa)`
  flex-direction: column;
  text-align: center;
`,io=m.div`
  font-weight: 500;
  font-size: 0.28rem;
  line-height: 1.5;
`;m(io)`
  padding-inline: 1.48rem;
`;const Kd=m.img`
  width: 5.5rem;
  /* height: 5.5rem; */

`,r2=m(Kd)`
  margin-left: 0.96rem;
  margin-top: 0.64rem;
`,vp=m(Kd)`
  margin-right: 0.96rem;
  margin-bottom: 0.64rem;
`,i2=()=>{const[e,t]=j.useState("dark"),n=j.useRef({});j.useEffect(()=>{const i=l=>{n.current=l.reduce((d,f)=>(d[f.target.id]=f,d),n.current);const c=[];Object.keys(n.current).forEach(d=>{var y;const f=n.current[d];f.isIntersecting&&c.push(f),r((y=c[0])==null?void 0:y.target.id)})},o={rootMargin:"-40% 0px -40% 0px"},a=new IntersectionObserver(i,o);Array.from(document.querySelectorAll(".view")).forEach(l=>a.observe(l))},[]);const r=i=>{switch(i){case"dark":t("light");break;case"light":t("dark");break;default:t("dark");break}};return u.jsxs(qS,{children:[u.jsx(Vt,{theme:e,bg:"transparent",activeId:"customers"}),u.jsx(t2,{children:u.jsxs(n2,{id:"dark",className:"view",children:[u.jsx(Kd,{src:JS}),u.jsx(io,{style:{color:"#D9DBEF"},children:"By achieving high-speed access to data across clouds and data centers, DatenLord will greatly enhance the scalability of storage systems, simplify enterprise level IT business systems in terms of achieving high availability and dual-active complexity. With multi-clouds and multi-data centers becoming the main infrastructure, geo-distributed storage will be widely used in diversified industries, such as the Internet, finance, telecommunications, and energy."})]})}),u.jsx(yp,{children:u.jsxs(Qa,{className:"view",children:[u.jsx(vp,{src:QS}),u.jsx(io,{children:"Cross-cloud data backup in real time, especially for key business applications, e.g.databases."})]})}),u.jsx(e2,{children:u.jsxs(Qa,{className:"view",children:[u.jsx(io,{children:"Cross-cloud data loading, tailored for artificial intelligence, and big data training scenarios."}),u.jsx(r2,{src:KS})]})}),u.jsx(yp,{children:u.jsxs(Qa,{className:"view",children:[u.jsx(vp,{src:XS}),u.jsx(io,{children:"Cross-cloud application migration, especially for scenarios with high concurrency and business elasticity requirements, such as Double Eleven promotions in China."})]})})]})},o2="/assets/icon1-300e839c.svg",a2="/assets/icon2-a173a4de.svg",s2="/assets/icon3-abaac30d.svg",l2="/assets/icon4-67cf762f.svg",u2="/assets/icon5-61693803.svg",c2="/assets/icon6-704e5e74.svg",d2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAwKSURBVHgB7VcJcFXlFf7uf9e35uXlZU9ICIQlELAmKIosA1gXQKVTRXEZra0LVYc6aqvTdqjj0modtUgXFTutUlvRYAVbq9YFFSqURUAwISSByUIW8pK85b53157/RmxViohjp+1wZl7y5t7//f93zvnOd84PnLATdsL+P0042kvXhbD9/vBoJqHOtOTRhqmXu042yn8mycqgX5V7AlKm7WAqZ1dfRtx+3rKuNP5TIHc/6C+2HeNG0/UvZqJS4YDBsTOwbAGuY8FxHDiqH0bFKMjkibZ/H2RV1CXBfsenai8YqYFna76T7sKXBXLj3flXMiQeNh0hbNsOAqEgAfDBdkQCmCGAgGUZWHVyMVrLBYyJlmCUU4XSxg6U7G2EL5MEY6IpCpmXFWb/suqV+J+F1bDxBexjIN+6M3azrBg/tWwmuFYSAuVZoBWBoAaIAbgQIUoSdD2JF2wTq0/XMDIUwaj8GN5oa4YkaFicjeHMxm6oBEsSAZmhEU7yvrg78sn6a7eYOA5jh7+s+eaIOsYyP3FsU5AkBYIchmta5IYMPWMTP3VYZhZmVoeqqNBsF32JFDr6h2C5Nkb78yCkCLjTg3V1JYBjwjBtmFDGZp3Ayjw1vqvjiZLzcRz2EUh/lD3gimHJtFV0ieV4ePxK3HfGu9heeBWlWYJpSfBRQHl0XeKhHlRgE4hEJoOugQTKYhFUR2Mo9ofRFHSRYgoUVfOOUBUfDFsak0bw+dYnqhpaVwSK8DnMA/mz+ZHJMhucYWR0UIDQY5VjV/AM7HU0PFyyBHfVvIwm3yxYDh2syVTZIqZlfQjoQMo00dTVi/iQjsJoEGXFIeQe1CEZVGSQiB4yAaS8S5zXEtKmutBSRmxveaz6zGMFKfI/i08OXV1Ybs2xrAyYIyDP7cSbyiIgR4MQDmBA82N9+CyKaA5q7Z10sIKg6GL2QQ2ppI3dkSyyzOaMRcByMWdTAoVECdOwqIiI1JEAKmeXIlQZguA6RBkhaBru4qULfInl64b+9lkgvcL5w+XFaypr0hcw5sK2BBiWhmWT/oi+UBmszCDsvjg0w4Y/Px+j1Xbc2n0HREunSjdgEm+70jZ0U4QqK4iS2wEfSZbjQlUlooRBkXRRPVWEUjaWpCELIesg2x9H7x4DyAzdP+qa1u8KPPBHS7esKFW2E4Ao+6D4FBhKGIP2COTSWyGjQgkUIptTDFmOoTU6FXdUrYQph0g7LchUwhU5KiYUyqgISwgHRfJcBDGCHExThYvQiJNb1lNhJ/roMAeu5EApKELpZAlSMHxr6+PjHsJncVJSAwxMJj4GKD1+5AVszGp8CBUZAVNyfAgRl2zBhx5KYT8JepteiKfNRWAiFYYrDEuTqFIkXW9LRRFIukgh6JlDvOQrckJEnUQcsFOASse6QxB8AeSWAiYL3bRv5UnLjgrSn1vQKroiHJfBgsphY1FgLYLbVkMlztWEbIx3KTXtgzBa+hFpa8H+DhEW5xxFXxAYpZ3g0HefRg7RXgJjHlBGzjMCy0wZbXss6C0dEJK9BJLkLTsAnXRVlMgBNeeHe39dfzn+HSffvnv+PbLQebviT8JwqHqJm7LMAUtY3zcRL9mz0aYUoSjiQ5IcKR1oxVXSCkpzloAJJDFEEYMUUWbDflN0Tap6xx1uBqpKPDccOowhRXyEpMOfA885yyhGUJGGC8xxM4R8WuXFr239FMhN935trq53v5JXlCY9tL0UEZXIQ2IB6R0X5c3dUbx46CtoUaqxILgB83LeRNDHE0mypDD4KYJZi28nk45aVICu1+O9Jx+C4EAZ6Sw/VibFkIg+Ljkk0DuHVIX6HL0Sm5LdA3UTv/1G8mMgX182S6Kf7Q0G4pVqkAJBj21KO/OmHcETb4GJMKkVZtIZcsBFwC96hcPf8UqWaZ0/GEY2a1NnMum5Q+uo3wukjRkFH7SkoIgGasbmIRBQPVWQCeRwX3Y8XrsYzgQTnEcqv/78jR8D6QG985wbrMGO5SU1eV4EXJIN/kNJJs+5hx50XhA0AdEkRL7DJtAC39cdnh+YKFFVuxR5vjNlgxFQNYKnG9r29sb1ls79/VOyiUz08ivG4ZT6Mm89bx5MpN1oC9dhJPjUAiTJti1jSvUlL2z7qHC45TvBR1051DTQecgrAFkLUVtTPWi8cr2PNBwZJqnD/ylSPK1gGqXOT2uUYR56MaGU8xQqwf6Llj5Wt/yvbWfXlkVLd8Sd2295YIe5dWc7gXKgbTKQ/3oa0YMhSK5CAGXqbARfVu/6VCS5/eV7s2enk92vjq7NF7RQ2OMLXO6d7U3APM1dH4xCd/MUiDn9lP408qveQXFxnAD7vOhRUcM20rSx6fV5XyBkMp8ysWzemqbD5xQAly6Ymf/UbVfXwt6qYfQBmpVr6WluCMmKQgy67cRfi1zUJ465eM0e9q8gz/rxa68hUv1I085ez0tRJFbSR6IIMqpgHtVU31w48Wp07C5A6sDJaNl8Pd7fMRbpBMlTOk7VyjnLi0H1pMe2bNnN2g27nzu34vA5PcCq/MLIbi5fdp2MDt6d99PTne8juKsZBaVnk7T5mcMil8ITxE/YgBS5zRVyTtuzbX997SnVnMRcK6BQBZp0cMqMI5kMQiQNDNAhetpB57YLsf+9aThpxnPIL+iF6Fc5rzyFcIY1dEJQFHa0PXPur+KJ5HuuY5aLTClVZNJQWueWh4Be4rk/F86mdijWehSeOgFdeuMCgvT9I14fViz5armbOrChslgum1A/BkbWIK1TvV69vuEmSAlqZ0QFn+bDUFzHoUMGMhmL5hEFNQtXIVbe5vVtxad62eAaynnA68+yuAwxWxAoR/Lw+74WHVXPAr4Zo+D2vg8MZSDMmI5DI1SrOapFxSOB/NPmfUNzx8RebW9uvFiju0NReR49pSGCNPTt30xFTPZTj/bDJrkx0gZFVINsS1BdDUamArGqtyhCxGGKvsS1VlY9IefVzL+TAjD+3/E4TMhpIOmllpq3vR9sRAxQ6JmZIIcGWbh80nNHBOkV0e6+ntmjtDf3N7cv0lRNzS0M8tqhEcfEUPt4pPqzsBK8smUkCWhcTyFB+mhSxGQS29yiD7x3KWqH7Z0J0lFA06jlkmwxTz/5ncnllexx3oxY6CbAg7vj6B+keTQpoq8oCCea//hRr7TcfjAzNB1W8sUpZ0wKTTqllLwT8O7bBdj60nkIuSoNsUlkhSwyAlcAEeGcAPWcEC5bej+/5Gz7eUPqlsGB/ok9nZ3XjS1Wx196US0K6XBFpHGNxjvL9a7HcChL2TRdUUiGaCok5SB5UgJOMhWMfSZIbktP953G7MyLtZPG5845p4I46qCrz8XWLYVobpqI/LIsykr3UEVnYFNnKopJqB2VRMYUHh17ydpr+R6zZs2S7L1bb9CM1D2LLhjnm3P2eOoBFl2TqXGQvopEBYe4m6XWadqi161sV9p48pWrTj8mkNyuPzUwiS5j64pjJeWLLvsKRCfh3XEMXff6skLXXl4cnHf8EibwyYax/p6Eb/LUbzW0H95n3vjciSyVWF0zMm/c4qvq4aPi4h3LojuUpMgUUYOA8kYpuSlDnjftmlUviccK8u8dZnfNiOgzg8n+qW+90VZeUFyK0pKAJ0+yLHvtUxBl3uPAb5s8Qo4g+oKaO7O+snLVmg37vOvs3r5MzwUzq3+770BPxcb17bXBsIoRI/JoeKbW6PJxT0VGzyJp+B+cfu2qFT/Ch3ecY7X32vVEdWTcUyYbkjdu2Te1uUVnVdVlyIt6UfMKgn8cPgjzps5nABclRYWSs6Kh6fXD+7zTeMjY02c1TBoZadyxs++0DZs7wxbjLVXFQEpCfzr8dHSXdsOjW7Y4fP0xp/uTtmBC3hTL0Zen0+apdXUjMX92FUYXUaq56FPM+KDAN7do2hk0I09Ovfr3Vxxpn2vm1/kH450Lc3JyppcWlLDC0tja6+5+Zh3wzzvPcYP80NiZk4vPd2x7qZPNTo/l+oX62nxUUgeJBEkb6XqRsvyI9ytLvnHv736B47QvCvIjmzO5akxQSiykaXuuwthJ4YCcV1JaaMSisbWWGLzi5gdX6/gvM2HJrJrgsgtrFJywL88+l6L8z9g/AMPJDsRZoFKJAAAAAElFTkSuQmCC",f2="/assets/icon8-e0a1ab32.svg",h2="/assets/icon9-1fb62a09.svg",p2="/assets/bg1-4d69b52a.png",m2="/assets/bg2-f27b4c8e.png",g2="/assets/bg3-ea618722.png",y2=m.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
`,H0=m.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
  scroll-snap-align: center;
`,xp=m(H0)`
  background: #ffffff;
`,v2=m(H0)`
  background: #d9dbef;
`,fu=m.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  padding-bottom: 0.64rem;
  padding-inline: 0.96rem;
  /* overflow: hidden; */
`,Ec=m.div`
  margin-bottom: 0.48rem;
  font-weight: 700;
  font-size: 0.3rem;
  line-height: 1.3;
`,x2=m(Ec)`
  width: 100%;
  padding-left: 0.36rem;
  border-left: 0.24rem solid #7680dd;
  text-align: left;
`,w2=m.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  font-weight: 400;
  font-size: 0.2rem;
  line-height: 1.2;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`,Xd=m.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 33%;
  height: 100%;
  margin-inline: 0.28rem;
  padding-block: 0.85rem;
  padding-inline: 0.35rem;
  border-radius: 0.2rem;
  font-size: 0.15rem;
  line-height: 1.48;
  font-weight: 400;
  box-shadow: 0px 9px 30px rgba(0, 0, 0, 0.13);
  @media screen and (max-width: 768px) {
    width: 80%;
    margin-bottom: 0.48rem;
  }
`,k2=m(Xd)`
  background-image: url(${p2});
`,S2=m(Xd)`
  background-image: url(${m2});
`,_2=m(Xd)`
  background-image: url(${g2});
`,b2=m.div``,Qr=m.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
`,Kr=m.img`
  width: 0.32rem;
  height: 0.32rem;
  margin-right: 0.32rem;
`,hu=m.img`
  width: 0.48rem;
  height: 0.48rem;
`,Xr=m.div`
  font-size: 0.24rem;
  line-height: 0.6rem;
`,C2=m.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: center;
  }
`,D2=m.div`
  width: 49%;
  min-height: 100px;
  margin-bottom: 0.32rem;
  padding-block: 0.22rem;
  padding-inline: 0.3375rem;
  background: #fff;
  border-radius: 0.14rem;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.13);
  @media screen and (max-width: 425px) {
    width: 80%;
  }
`,_a=m.div`
  margin-bottom: 0.2rem;
  font-size: 0.2rem;
  line-height: 1.48;
  font-weight: 600;
`,j2=m.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 0.1rem;
`,E2=m.div`
  margin-right: 0.2rem;
  padding-block: 0.02rem;
  padding-inline: 0.25rem;
  color: ${({type:e})=>{switch(e){case"full-time":return"#9254de";case"internship":return"#597ef7";default:return"#434343"}}};
  font-size: 0.16rem;
  line-height: 1.5;
  font-weight: 400;
  text-transform: capitalize;
  background: ${({type:e})=>{switch(e){case"full-time":return"#f9f0ff";case"internship":return"#f0f5ff";default:return"#fafafa"}}};
  border: 0.01rem solid
    ${({type:e})=>{switch(e){case"full-time":return"#9254de";case"internship":return"#597ef7";default:return"#434343"}}};
  border-radius: 0.08rem;
`,M2=m.button`
  margin-top: 0.24rem;
  padding: 0.16rem 0.64rem;
  color: #fff;
  font-size: 0.32rem;
  font-weight: 600;
  line-height: 1;
  background: #7680dd;
  border: none;
  border-radius: 0.12rem;
  box-shadow: 3px 3px 10px hsla(0, 0%, 0%, 0.5);
`,P2=[{name:"Distributed storage software development senior engineer",type:["full-time","urgent recruitment"]},{name:"Rust distributed storage development",type:["internship","soon to be filled"]},{name:"FPGA development",type:["internship"]},{name:"The joint hardware and software research and development internship",type:["internship"]}],R2=()=>{const e=Yn();return u.jsxs(y2,{children:[u.jsx(Vt,{theme:"dark",bg:"transparent",activeId:"company"}),u.jsx(xp,{children:u.jsxs(fu,{children:[u.jsx(Ec,{children:"Why Join DatenLord?"}),u.jsxs(w2,{children:[u.jsxs(k2,{children:[u.jsx(hu,{src:d2}),u.jsx(_a,{children:"Creative Working"}),"At DatenLord, you find yourself working with talented and motivated people in highly creative and productive ways."]}),u.jsxs(S2,{children:[u.jsx(hu,{src:f2}),u.jsx(_a,{children:"Sense of Belonging"}),"DatenLord values COMMUNITY, which is not confined in referring open source community. We want our employees to have a sense of inclusion and belonging in our company."]}),u.jsxs(_2,{children:[u.jsx(hu,{src:h2}),u.jsx(_a,{children:"Remote Working"}),"DatenLord is focused on researching and developing geo-distributed storage system by a distributed team with most members working remotely."]})]})]})}),u.jsx(v2,{children:u.jsxs(fu,{children:[u.jsx(Ec,{children:"Who Are We Looking For?"}),u.jsxs(b2,{children:[u.jsxs(Qr,{children:[u.jsx(Kr,{src:o2}),u.jsx(Xr,{children:"Keep an acumen on latest technical development in the industry"})]}),u.jsxs(Qr,{children:[u.jsx(Kr,{src:a2}),u.jsx(Xr,{children:"Passionate to do something meaningful in creative ways"})]}),u.jsxs(Qr,{children:[u.jsx(Kr,{src:s2}),u.jsx(Xr,{children:"Be curious and cultivated sound learning habits and methods"})]}),u.jsxs(Qr,{children:[u.jsx(Kr,{src:l2}),u.jsx(Xr,{children:"Love to share knowledge openly and deliberately"})]}),u.jsxs(Qr,{children:[u.jsx(Kr,{src:u2}),u.jsx(Xr,{children:"Communicate candidly and directly"})]}),u.jsxs(Qr,{children:[u.jsx(Kr,{src:c2}),u.jsx(Xr,{children:"Always start from the end"})]})]})]})}),u.jsx(xp,{children:u.jsxs(fu,{children:[u.jsx(x2,{children:"Open Position"}),u.jsx(C2,{children:P2.map(({name:t,type:n})=>u.jsxs(D2,{children:[u.jsx(_a,{children:t}),u.jsx(j2,{children:n.map(r=>u.jsx(E2,{type:r,children:r},r))})]},t))}),u.jsx(M2,{onClick:()=>e("/company/join-us"),children:"Learn more"})]})})]})},T2="/assets/wechat-QR-e5b29373.svg",A2="/assets/icon1-03a0bd52.svg",O2=m.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
`,L2=m.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  padding-bottom: 0.64rem;
  padding-inline: 0.96rem;
  overflow: hidden;
`,N2=m.div`
  margin-bottom: 0.84rem;
  font-weight: 700;
  font-size: 0.4rem;
  line-height: 1.5;
`,I2=m.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-inline: 0.64rem;
  font-weight: 400;
  font-size: 0.2rem;
  line-height: 1.2;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`,wp=m.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  margin-inline: 0.28rem;
  padding-block: 0.85rem;
  padding-inline: 0.35rem;
  border-radius: 0.2rem;
  box-shadow: 0px 9px 30px rgba(0, 0, 0, 0.13);
  @media screen and (max-width: 768px) {
    width: 80%;
    margin-bottom: 0.64rem;
  }
`,kp=m.img`
  width: 1.24rem;
  height: 1.24rem;
  margin-right: 0.32rem;
`,Sp=m.div`
  font-weight: 500;
  font-size: 0.24rem;
  line-height: 0.35rem;
`,z2=()=>u.jsxs(O2,{children:[u.jsx(Vt,{theme:"dark",activeId:"company"}),u.jsxs(L2,{children:[u.jsx(N2,{children:"Contact Us"}),u.jsxs(I2,{children:[u.jsxs(wp,{children:[u.jsx(kp,{src:T2}),u.jsx(Sp,{children:"Please follow our WeChat official account for more information"})]}),u.jsxs(wp,{children:[u.jsx(kp,{src:A2}),u.jsx(Sp,{children:"Please contact us through our email: info@datenlord.com"})]})]})]})]}),F2="/assets/logo-39129319.svg",$2="/assets/icon1-e7aad4ce.svg",U2="/assets/icon2-9148985c.svg",Y2="/assets/icon3-f5c4b514.svg",W2="/assets/icon4-dff162e6.svg",H2=m.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`,V2=m.div`
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-inline: 128px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    padding-block: 48px;
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 32px;
    padding-inline: 64px;
  }
  @media screen and (max-width: 425px) {
    padding-block: 16px;
    padding-inline: 32px;
  }
`,Jd=m.div`
  display: flex;
  align-items: center;
  margin-bottom: 64px;
  @media screen and (max-width: 1024px) {
    padding-top: 48px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 32px;
  }
`,B2=m(Jd)`
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`,G2=m(Jd)`
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`,Q2=m(Jd)`
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`,K2=m.div``,X2=m.div`
  width: 100%;
`,J2=m.img`
  width: 300px;
  margin: 64px;
  margin-bottom: 0;

  @media screen and (max-width: 1200px) {
    width: 80%;
    margin: 48px;
    margin-bottom: 0;
  }
  @media screen and (max-width: 768px) {
    margin: 32px;
    margin-bottom: 0;
  }
`,V0=m.div`
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.1;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    font-size: 22.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 15px;
  }
`,Z2=m(V0)`
  padding-left: 24px;
  border-left: 24px solid #7680dd;
  margin-bottom: 48px;
  @media screen and (max-width: 1024px) {
    padding-left: 18px;
    border-width: 18px;
    margin-bottom: 36px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 12px;
    border-width: 12px;
    margin-bottom: 24px;
  }
`,B0=m.div`
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 22.5px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    margin-bottom: 18px;
    font-size: 16.875px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 12px;
    font-size: 11.25px;
  }
`,ba=m(B0)`
  margin-bottom: 16px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`,_p=m(B0)`
  padding-left: 16px;
  border-left: 20px solid #7680dd;
  @media screen and (max-width: 1024px) {
    padding-left: 12px;
    border-width: 15px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 8px;
    border-width: 10px;
  }
`,pu=m.div`
  font-weight: 400;
  font-size: 19.5px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`,Ca=m.div`
  font-weight: 400%;
  font-size: 13.5px;
  line-height: 1.6;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
`,bp=m.div`
  width: 48%;
  align-self: stretch;
  padding: 32px;
  background: #d9dbef;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 32px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 24px;
    border-radius: 18px;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    padding-top: 16px;
  }
`,Da=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48%;
  margin-bottom: 32px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
  }
`,ja=m.img`
  margin-right: 24px;
  width: 96px;
  height: 96px;
  @media screen and (max-width: 1024px) {
    margin-right: 18px;
    width: 72px;
    height: 72px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 12px;
    width: 48px;
    height: 48px;
  }
`,Ea=m.div``,q2=()=>u.jsxs(H2,{children:[u.jsx(Vt,{theme:"dark",activeId:"company"}),u.jsxs(V2,{children:[u.jsxs(B2,{children:[u.jsxs(X2,{children:[u.jsx(V0,{children:"Why build DatenLord ?"}),u.jsx(pu,{children:"Datenlord started in 2021 with four seasoned infrastructure engineers who were not satisfied to see the way cloud computing and storage are isolated, and data are fragmented and cannot be used effectively and efficiently, and thus decided to improve the performance of storage devices and data transmission across clouds by leveraging non-blocking/asynchronous IO, asynchronized programming, NVMe, non-volatile memory and hardware acceleration in an open source way."})]}),u.jsx(J2,{src:F2})]}),u.jsxs(G2,{children:[u.jsxs(bp,{children:[u.jsx(_p,{children:"Vision"}),u.jsx(pu,{children:"Empower enterprises to read, write and retrieve data across multiple clouds world-wide with high performance and security."})]}),u.jsxs(bp,{children:[u.jsx(_p,{children:"Mission"}),u.jsx(pu,{children:"Breaking barriers across clouds by using Datenlord Geo-distributed storage system."})]})]}),u.jsxs(K2,{children:[u.jsx(Z2,{children:"Value"}),u.jsxs(Q2,{children:[u.jsxs(Da,{children:[u.jsx(ja,{src:$2}),u.jsxs(Ea,{children:[u.jsx(ba,{children:"Be Open and Transparent"}),u.jsx(Ca,{children:"We endeavor to keep information and decision process transparent, so as to create an inclusive community that every member feels safe and confident to contribute different opinions and diversified perspectives. We believe constructive conflicts lead to reflections and improvements."})]})]}),u.jsxs(Da,{children:[u.jsx(ja,{src:U2}),u.jsxs(Ea,{children:[u.jsx(ba,{children:"Dare to be Vanguards"}),u.jsx(Ca,{children:"We are a group of people who have growth mindset. We take no shortcuts and believe slow is fast. We aim to be pioneer and dare to be different and set out own pattern, thus we tolerate mistakes, and are confident that we can make adjustment and refinement quickly and continuously."})]})]}),u.jsxs(Da,{children:[u.jsx(ja,{src:Y2}),u.jsxs(Ea,{children:[u.jsx(ba,{children:"Keep Delivering with Excellence"}),u.jsx(Ca,{children:"We believe results are as important as process. We are goal oriented, setting high bars, and working hard and smart to attain them. We stive to get results by focusing on the actions and changes that influence results."})]})]}),u.jsxs(Da,{children:[u.jsx(ja,{src:W2}),u.jsxs(Ea,{children:[u.jsx(ba,{children:"Concentrate on Small and Manageable Steps"}),u.jsx(Ca,{children:"A big milestone worth celebrating, while small steps matter as well. We believe small steps taken in the right direction can cross unimaginable distances. It is to our own detriment that we underestimate the might of daily minor progress."})]})]})]})]})]})]});//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var G0;function z(){return G0.apply(null,arguments)}function e_(e){G0=e}function sn(e){return e instanceof Array||Object.prototype.toString.call(e)==="[object Array]"}function Pr(e){return e!=null&&Object.prototype.toString.call(e)==="[object Object]"}function pe(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function Zd(e){if(Object.getOwnPropertyNames)return Object.getOwnPropertyNames(e).length===0;var t;for(t in e)if(pe(e,t))return!1;return!0}function St(e){return e===void 0}function $n(e){return typeof e=="number"||Object.prototype.toString.call(e)==="[object Number]"}function Qo(e){return e instanceof Date||Object.prototype.toString.call(e)==="[object Date]"}function Q0(e,t){var n=[],r,i=e.length;for(r=0;r<i;++r)n.push(t(e[r],r));return n}function er(e,t){for(var n in t)pe(t,n)&&(e[n]=t[n]);return pe(t,"toString")&&(e.toString=t.toString),pe(t,"valueOf")&&(e.valueOf=t.valueOf),e}function kn(e,t,n,r){return vy(e,t,n,r,!0).utc()}function t_(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidEra:null,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],era:null,meridiem:null,rfc2822:!1,weekdayMismatch:!1}}function ee(e){return e._pf==null&&(e._pf=t_()),e._pf}var Mc;Array.prototype.some?Mc=Array.prototype.some:Mc=function(e){var t=Object(this),n=t.length>>>0,r;for(r=0;r<n;r++)if(r in t&&e.call(this,t[r],r,t))return!0;return!1};function qd(e){if(e._isValid==null){var t=ee(e),n=Mc.call(t.parsedDateParts,function(i){return i!=null}),r=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidEra&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(r=r&&t.charsLeftOver===0&&t.unusedTokens.length===0&&t.bigHour===void 0),Object.isFrozen==null||!Object.isFrozen(e))e._isValid=r;else return r}return e._isValid}function xl(e){var t=kn(NaN);return e!=null?er(ee(t),e):ee(t).userInvalidated=!0,t}var Cp=z.momentProperties=[],mu=!1;function ef(e,t){var n,r,i,o=Cp.length;if(St(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),St(t._i)||(e._i=t._i),St(t._f)||(e._f=t._f),St(t._l)||(e._l=t._l),St(t._strict)||(e._strict=t._strict),St(t._tzm)||(e._tzm=t._tzm),St(t._isUTC)||(e._isUTC=t._isUTC),St(t._offset)||(e._offset=t._offset),St(t._pf)||(e._pf=ee(t)),St(t._locale)||(e._locale=t._locale),o>0)for(n=0;n<o;n++)r=Cp[n],i=t[r],St(i)||(e[r]=i);return e}function Ko(e){ef(this,e),this._d=new Date(e._d!=null?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),mu===!1&&(mu=!0,z.updateOffset(this),mu=!1)}function ln(e){return e instanceof Ko||e!=null&&e._isAMomentObject!=null}function K0(e){z.suppressDeprecationWarnings===!1&&typeof console<"u"&&console.warn&&console.warn("Deprecation warning: "+e)}function Bt(e,t){var n=!0;return er(function(){if(z.deprecationHandler!=null&&z.deprecationHandler(null,e),n){var r=[],i,o,a,s=arguments.length;for(o=0;o<s;o++){if(i="",typeof arguments[o]=="object"){i+=`
[`+o+"] ";for(a in arguments[0])pe(arguments[0],a)&&(i+=a+": "+arguments[0][a]+", ");i=i.slice(0,-2)}else i=arguments[o];r.push(i)}K0(e+`
Arguments: `+Array.prototype.slice.call(r).join("")+`
`+new Error().stack),n=!1}return t.apply(this,arguments)},t)}var Dp={};function X0(e,t){z.deprecationHandler!=null&&z.deprecationHandler(e,t),Dp[e]||(K0(t),Dp[e]=!0)}z.suppressDeprecationWarnings=!1;z.deprecationHandler=null;function Sn(e){return typeof Function<"u"&&e instanceof Function||Object.prototype.toString.call(e)==="[object Function]"}function n_(e){var t,n;for(n in e)pe(e,n)&&(t=e[n],Sn(t)?this[n]=t:this["_"+n]=t);this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)}function Pc(e,t){var n=er({},e),r;for(r in t)pe(t,r)&&(Pr(e[r])&&Pr(t[r])?(n[r]={},er(n[r],e[r]),er(n[r],t[r])):t[r]!=null?n[r]=t[r]:delete n[r]);for(r in e)pe(e,r)&&!pe(t,r)&&Pr(e[r])&&(n[r]=er({},n[r]));return n}function tf(e){e!=null&&this.set(e)}var Rc;Object.keys?Rc=Object.keys:Rc=function(e){var t,n=[];for(t in e)pe(e,t)&&n.push(t);return n};var r_={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"};function i_(e,t,n){var r=this._calendar[e]||this._calendar.sameElse;return Sn(r)?r.call(t,n):r}function xn(e,t,n){var r=""+Math.abs(e),i=t-r.length,o=e>=0;return(o?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+r}var nf=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Ma=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,gu={},Si={};function B(e,t,n,r){var i=r;typeof r=="string"&&(i=function(){return this[r]()}),e&&(Si[e]=i),t&&(Si[t[0]]=function(){return xn(i.apply(this,arguments),t[1],t[2])}),n&&(Si[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function o_(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function a_(e){var t=e.match(nf),n,r;for(n=0,r=t.length;n<r;n++)Si[t[n]]?t[n]=Si[t[n]]:t[n]=o_(t[n]);return function(i){var o="",a;for(a=0;a<r;a++)o+=Sn(t[a])?t[a].call(i,e):t[a];return o}}function Ka(e,t){return e.isValid()?(t=J0(t,e.localeData()),gu[t]=gu[t]||a_(t),gu[t](e)):e.localeData().invalidDate()}function J0(e,t){var n=5;function r(i){return t.longDateFormat(i)||i}for(Ma.lastIndex=0;n>=0&&Ma.test(e);)e=e.replace(Ma,r),Ma.lastIndex=0,n-=1;return e}var s_={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};function l_(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.match(nf).map(function(r){return r==="MMMM"||r==="MM"||r==="DD"||r==="dddd"?r.slice(1):r}).join(""),this._longDateFormat[e])}var u_="Invalid date";function c_(){return this._invalidDate}var d_="%d",f_=/\d{1,2}/;function h_(e){return this._ordinal.replace("%d",e)}var p_={future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",w:"a week",ww:"%d weeks",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function m_(e,t,n,r){var i=this._relativeTime[n];return Sn(i)?i(e,t,n,r):i.replace(/%d/i,e)}function g_(e,t){var n=this._relativeTime[e>0?"future":"past"];return Sn(n)?n(t):n.replace(/%s/i,t)}var vo={};function pt(e,t){var n=e.toLowerCase();vo[n]=vo[n+"s"]=vo[t]=e}function Gt(e){return typeof e=="string"?vo[e]||vo[e.toLowerCase()]:void 0}function rf(e){var t={},n,r;for(r in e)pe(e,r)&&(n=Gt(r),n&&(t[n]=e[r]));return t}var Z0={};function mt(e,t){Z0[e]=t}function y_(e){var t=[],n;for(n in e)pe(e,n)&&t.push({unit:n,priority:Z0[n]});return t.sort(function(r,i){return r.priority-i.priority}),t}function wl(e){return e%4===0&&e%100!==0||e%400===0}function Ft(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function ie(e){var t=+e,n=0;return t!==0&&isFinite(t)&&(n=Ft(t)),n}function zi(e,t){return function(n){return n!=null?(q0(this,e,n),z.updateOffset(this,t),this):Es(this,e)}}function Es(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function q0(e,t,n){e.isValid()&&!isNaN(n)&&(t==="FullYear"&&wl(e.year())&&e.month()===1&&e.date()===29?(n=ie(n),e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),Dl(n,e.month()))):e._d["set"+(e._isUTC?"UTC":"")+t](n))}function v_(e){return e=Gt(e),Sn(this[e])?this[e]():this}function x_(e,t){if(typeof e=="object"){e=rf(e);var n=y_(e),r,i=n.length;for(r=0;r<i;r++)this[n[r].unit](e[n[r].unit])}else if(e=Gt(e),Sn(this[e]))return this[e](t);return this}var ey=/\d/,Nt=/\d\d/,ty=/\d{3}/,of=/\d{4}/,kl=/[+-]?\d{6}/,Ee=/\d\d?/,ny=/\d\d\d\d?/,ry=/\d\d\d\d\d\d?/,Sl=/\d{1,3}/,af=/\d{1,4}/,_l=/[+-]?\d{1,6}/,Fi=/\d+/,bl=/[+-]?\d+/,w_=/Z|[+-]\d\d:?\d\d/gi,Cl=/Z|[+-]\d\d(?::?\d\d)?/gi,k_=/[+-]?\d+(\.\d{1,3})?/,Xo=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,Ms;Ms={};function $(e,t,n){Ms[e]=Sn(t)?t:function(r,i){return r&&n?n:t}}function S_(e,t){return pe(Ms,e)?Ms[e](t._strict,t._locale):new RegExp(__(e))}function __(e){return Mt(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(t,n,r,i,o){return n||r||i||o}))}function Mt(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var Tc={};function ke(e,t){var n,r=t,i;for(typeof e=="string"&&(e=[e]),$n(t)&&(r=function(o,a){a[t]=ie(o)}),i=e.length,n=0;n<i;n++)Tc[e[n]]=r}function Jo(e,t){ke(e,function(n,r,i,o){i._w=i._w||{},t(n,i._w,i,o)})}function b_(e,t,n){t!=null&&pe(Tc,e)&&Tc[e](t,n._a,n,e)}var ft=0,Tn=1,gn=2,Ze=3,nn=4,An=5,jr=6,C_=7,D_=8;function j_(e,t){return(e%t+t)%t}var We;Array.prototype.indexOf?We=Array.prototype.indexOf:We=function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1};function Dl(e,t){if(isNaN(e)||isNaN(t))return NaN;var n=j_(t,12);return e+=(t-n)/12,n===1?wl(e)?29:28:31-n%7%2}B("M",["MM",2],"Mo",function(){return this.month()+1});B("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)});B("MMMM",0,0,function(e){return this.localeData().months(this,e)});pt("month","M");mt("month",8);$("M",Ee);$("MM",Ee,Nt);$("MMM",function(e,t){return t.monthsShortRegex(e)});$("MMMM",function(e,t){return t.monthsRegex(e)});ke(["M","MM"],function(e,t){t[Tn]=ie(e)-1});ke(["MMM","MMMM"],function(e,t,n,r){var i=n._locale.monthsParse(e,r,n._strict);i!=null?t[Tn]=i:ee(n).invalidMonth=e});var E_="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),iy="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),oy=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,M_=Xo,P_=Xo;function R_(e,t){return e?sn(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||oy).test(t)?"format":"standalone"][e.month()]:sn(this._months)?this._months:this._months.standalone}function T_(e,t){return e?sn(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[oy.test(t)?"format":"standalone"][e.month()]:sn(this._monthsShort)?this._monthsShort:this._monthsShort.standalone}function A_(e,t,n){var r,i,o,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],r=0;r<12;++r)o=kn([2e3,r]),this._shortMonthsParse[r]=this.monthsShort(o,"").toLocaleLowerCase(),this._longMonthsParse[r]=this.months(o,"").toLocaleLowerCase();return n?t==="MMM"?(i=We.call(this._shortMonthsParse,a),i!==-1?i:null):(i=We.call(this._longMonthsParse,a),i!==-1?i:null):t==="MMM"?(i=We.call(this._shortMonthsParse,a),i!==-1?i:(i=We.call(this._longMonthsParse,a),i!==-1?i:null)):(i=We.call(this._longMonthsParse,a),i!==-1?i:(i=We.call(this._shortMonthsParse,a),i!==-1?i:null))}function O_(e,t,n){var r,i,o;if(this._monthsParseExact)return A_.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),r=0;r<12;r++){if(i=kn([2e3,r]),n&&!this._longMonthsParse[r]&&(this._longMonthsParse[r]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[r]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),!n&&!this._monthsParse[r]&&(o="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[r]=new RegExp(o.replace(".",""),"i")),n&&t==="MMMM"&&this._longMonthsParse[r].test(e))return r;if(n&&t==="MMM"&&this._shortMonthsParse[r].test(e))return r;if(!n&&this._monthsParse[r].test(e))return r}}function ay(e,t){var n;if(!e.isValid())return e;if(typeof t=="string"){if(/^\d+$/.test(t))t=ie(t);else if(t=e.localeData().monthsParse(t),!$n(t))return e}return n=Math.min(e.date(),Dl(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function sy(e){return e!=null?(ay(this,e),z.updateOffset(this,!0),this):Es(this,"Month")}function L_(){return Dl(this.year(),this.month())}function N_(e){return this._monthsParseExact?(pe(this,"_monthsRegex")||ly.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(pe(this,"_monthsShortRegex")||(this._monthsShortRegex=M_),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)}function I_(e){return this._monthsParseExact?(pe(this,"_monthsRegex")||ly.call(this),e?this._monthsStrictRegex:this._monthsRegex):(pe(this,"_monthsRegex")||(this._monthsRegex=P_),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)}function ly(){function e(a,s){return s.length-a.length}var t=[],n=[],r=[],i,o;for(i=0;i<12;i++)o=kn([2e3,i]),t.push(this.monthsShort(o,"")),n.push(this.months(o,"")),r.push(this.months(o,"")),r.push(this.monthsShort(o,""));for(t.sort(e),n.sort(e),r.sort(e),i=0;i<12;i++)t[i]=Mt(t[i]),n[i]=Mt(n[i]);for(i=0;i<24;i++)r[i]=Mt(r[i]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+n.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+t.join("|")+")","i")}B("Y",0,0,function(){var e=this.year();return e<=9999?xn(e,4):"+"+e});B(0,["YY",2],0,function(){return this.year()%100});B(0,["YYYY",4],0,"year");B(0,["YYYYY",5],0,"year");B(0,["YYYYYY",6,!0],0,"year");pt("year","y");mt("year",1);$("Y",bl);$("YY",Ee,Nt);$("YYYY",af,of);$("YYYYY",_l,kl);$("YYYYYY",_l,kl);ke(["YYYYY","YYYYYY"],ft);ke("YYYY",function(e,t){t[ft]=e.length===2?z.parseTwoDigitYear(e):ie(e)});ke("YY",function(e,t){t[ft]=z.parseTwoDigitYear(e)});ke("Y",function(e,t){t[ft]=parseInt(e,10)});function xo(e){return wl(e)?366:365}z.parseTwoDigitYear=function(e){return ie(e)+(ie(e)>68?1900:2e3)};var uy=zi("FullYear",!0);function z_(){return wl(this.year())}function F_(e,t,n,r,i,o,a){var s;return e<100&&e>=0?(s=new Date(e+400,t,n,r,i,o,a),isFinite(s.getFullYear())&&s.setFullYear(e)):s=new Date(e,t,n,r,i,o,a),s}function $o(e){var t,n;return e<100&&e>=0?(n=Array.prototype.slice.call(arguments),n[0]=e+400,t=new Date(Date.UTC.apply(null,n)),isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e)):t=new Date(Date.UTC.apply(null,arguments)),t}function Ps(e,t,n){var r=7+t-n,i=(7+$o(e,0,r).getUTCDay()-t)%7;return-i+r-1}function cy(e,t,n,r,i){var o=(7+n-r)%7,a=Ps(e,r,i),s=1+7*(t-1)+o+a,l,c;return s<=0?(l=e-1,c=xo(l)+s):s>xo(e)?(l=e+1,c=s-xo(e)):(l=e,c=s),{year:l,dayOfYear:c}}function Uo(e,t,n){var r=Ps(e.year(),t,n),i=Math.floor((e.dayOfYear()-r-1)/7)+1,o,a;return i<1?(a=e.year()-1,o=i+Ln(a,t,n)):i>Ln(e.year(),t,n)?(o=i-Ln(e.year(),t,n),a=e.year()+1):(a=e.year(),o=i),{week:o,year:a}}function Ln(e,t,n){var r=Ps(e,t,n),i=Ps(e+1,t,n);return(xo(e)-r+i)/7}B("w",["ww",2],"wo","week");B("W",["WW",2],"Wo","isoWeek");pt("week","w");pt("isoWeek","W");mt("week",5);mt("isoWeek",5);$("w",Ee);$("ww",Ee,Nt);$("W",Ee);$("WW",Ee,Nt);Jo(["w","ww","W","WW"],function(e,t,n,r){t[r.substr(0,1)]=ie(e)});function $_(e){return Uo(e,this._week.dow,this._week.doy).week}var U_={dow:0,doy:6};function Y_(){return this._week.dow}function W_(){return this._week.doy}function H_(e){var t=this.localeData().week(this);return e==null?t:this.add((e-t)*7,"d")}function V_(e){var t=Uo(this,1,4).week;return e==null?t:this.add((e-t)*7,"d")}B("d",0,"do","day");B("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)});B("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)});B("dddd",0,0,function(e){return this.localeData().weekdays(this,e)});B("e",0,0,"weekday");B("E",0,0,"isoWeekday");pt("day","d");pt("weekday","e");pt("isoWeekday","E");mt("day",11);mt("weekday",11);mt("isoWeekday",11);$("d",Ee);$("e",Ee);$("E",Ee);$("dd",function(e,t){return t.weekdaysMinRegex(e)});$("ddd",function(e,t){return t.weekdaysShortRegex(e)});$("dddd",function(e,t){return t.weekdaysRegex(e)});Jo(["dd","ddd","dddd"],function(e,t,n,r){var i=n._locale.weekdaysParse(e,r,n._strict);i!=null?t.d=i:ee(n).invalidWeekday=e});Jo(["d","e","E"],function(e,t,n,r){t[r]=ie(e)});function B_(e,t){return typeof e!="string"?e:isNaN(e)?(e=t.weekdaysParse(e),typeof e=="number"?e:null):parseInt(e,10)}function G_(e,t){return typeof e=="string"?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}function sf(e,t){return e.slice(t,7).concat(e.slice(0,t))}var Q_="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),dy="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),K_="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),X_=Xo,J_=Xo,Z_=Xo;function q_(e,t){var n=sn(this._weekdays)?this._weekdays:this._weekdays[e&&e!==!0&&this._weekdays.isFormat.test(t)?"format":"standalone"];return e===!0?sf(n,this._week.dow):e?n[e.day()]:n}function e4(e){return e===!0?sf(this._weekdaysShort,this._week.dow):e?this._weekdaysShort[e.day()]:this._weekdaysShort}function t4(e){return e===!0?sf(this._weekdaysMin,this._week.dow):e?this._weekdaysMin[e.day()]:this._weekdaysMin}function n4(e,t,n){var r,i,o,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],r=0;r<7;++r)o=kn([2e3,1]).day(r),this._minWeekdaysParse[r]=this.weekdaysMin(o,"").toLocaleLowerCase(),this._shortWeekdaysParse[r]=this.weekdaysShort(o,"").toLocaleLowerCase(),this._weekdaysParse[r]=this.weekdays(o,"").toLocaleLowerCase();return n?t==="dddd"?(i=We.call(this._weekdaysParse,a),i!==-1?i:null):t==="ddd"?(i=We.call(this._shortWeekdaysParse,a),i!==-1?i:null):(i=We.call(this._minWeekdaysParse,a),i!==-1?i:null):t==="dddd"?(i=We.call(this._weekdaysParse,a),i!==-1||(i=We.call(this._shortWeekdaysParse,a),i!==-1)?i:(i=We.call(this._minWeekdaysParse,a),i!==-1?i:null)):t==="ddd"?(i=We.call(this._shortWeekdaysParse,a),i!==-1||(i=We.call(this._weekdaysParse,a),i!==-1)?i:(i=We.call(this._minWeekdaysParse,a),i!==-1?i:null)):(i=We.call(this._minWeekdaysParse,a),i!==-1||(i=We.call(this._weekdaysParse,a),i!==-1)?i:(i=We.call(this._shortWeekdaysParse,a),i!==-1?i:null))}function r4(e,t,n){var r,i,o;if(this._weekdaysParseExact)return n4.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),r=0;r<7;r++){if(i=kn([2e3,1]).day(r),n&&!this._fullWeekdaysParse[r]&&(this._fullWeekdaysParse[r]=new RegExp("^"+this.weekdays(i,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[r]=new RegExp("^"+this.weekdaysShort(i,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[r]=new RegExp("^"+this.weekdaysMin(i,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[r]||(o="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[r]=new RegExp(o.replace(".",""),"i")),n&&t==="dddd"&&this._fullWeekdaysParse[r].test(e))return r;if(n&&t==="ddd"&&this._shortWeekdaysParse[r].test(e))return r;if(n&&t==="dd"&&this._minWeekdaysParse[r].test(e))return r;if(!n&&this._weekdaysParse[r].test(e))return r}}function i4(e){if(!this.isValid())return e!=null?this:NaN;var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return e!=null?(e=B_(e,this.localeData()),this.add(e-t,"d")):t}function o4(e){if(!this.isValid())return e!=null?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return e==null?t:this.add(e-t,"d")}function a4(e){if(!this.isValid())return e!=null?this:NaN;if(e!=null){var t=G_(e,this.localeData());return this.day(this.day()%7?t:t-7)}else return this.day()||7}function s4(e){return this._weekdaysParseExact?(pe(this,"_weekdaysRegex")||lf.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(pe(this,"_weekdaysRegex")||(this._weekdaysRegex=X_),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)}function l4(e){return this._weekdaysParseExact?(pe(this,"_weekdaysRegex")||lf.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(pe(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=J_),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function u4(e){return this._weekdaysParseExact?(pe(this,"_weekdaysRegex")||lf.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(pe(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Z_),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function lf(){function e(d,f){return f.length-d.length}var t=[],n=[],r=[],i=[],o,a,s,l,c;for(o=0;o<7;o++)a=kn([2e3,1]).day(o),s=Mt(this.weekdaysMin(a,"")),l=Mt(this.weekdaysShort(a,"")),c=Mt(this.weekdays(a,"")),t.push(s),n.push(l),r.push(c),i.push(s),i.push(l),i.push(c);t.sort(e),n.sort(e),r.sort(e),i.sort(e),this._weekdaysRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+r.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+n.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+t.join("|")+")","i")}function uf(){return this.hours()%12||12}function c4(){return this.hours()||24}B("H",["HH",2],0,"hour");B("h",["hh",2],0,uf);B("k",["kk",2],0,c4);B("hmm",0,0,function(){return""+uf.apply(this)+xn(this.minutes(),2)});B("hmmss",0,0,function(){return""+uf.apply(this)+xn(this.minutes(),2)+xn(this.seconds(),2)});B("Hmm",0,0,function(){return""+this.hours()+xn(this.minutes(),2)});B("Hmmss",0,0,function(){return""+this.hours()+xn(this.minutes(),2)+xn(this.seconds(),2)});function fy(e,t){B(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}fy("a",!0);fy("A",!1);pt("hour","h");mt("hour",13);function hy(e,t){return t._meridiemParse}$("a",hy);$("A",hy);$("H",Ee);$("h",Ee);$("k",Ee);$("HH",Ee,Nt);$("hh",Ee,Nt);$("kk",Ee,Nt);$("hmm",ny);$("hmmss",ry);$("Hmm",ny);$("Hmmss",ry);ke(["H","HH"],Ze);ke(["k","kk"],function(e,t,n){var r=ie(e);t[Ze]=r===24?0:r});ke(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e});ke(["h","hh"],function(e,t,n){t[Ze]=ie(e),ee(n).bigHour=!0});ke("hmm",function(e,t,n){var r=e.length-2;t[Ze]=ie(e.substr(0,r)),t[nn]=ie(e.substr(r)),ee(n).bigHour=!0});ke("hmmss",function(e,t,n){var r=e.length-4,i=e.length-2;t[Ze]=ie(e.substr(0,r)),t[nn]=ie(e.substr(r,2)),t[An]=ie(e.substr(i)),ee(n).bigHour=!0});ke("Hmm",function(e,t,n){var r=e.length-2;t[Ze]=ie(e.substr(0,r)),t[nn]=ie(e.substr(r))});ke("Hmmss",function(e,t,n){var r=e.length-4,i=e.length-2;t[Ze]=ie(e.substr(0,r)),t[nn]=ie(e.substr(r,2)),t[An]=ie(e.substr(i))});function d4(e){return(e+"").toLowerCase().charAt(0)==="p"}var f4=/[ap]\.?m?\.?/i,h4=zi("Hours",!0);function p4(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"}var py={calendar:r_,longDateFormat:s_,invalidDate:u_,ordinal:d_,dayOfMonthOrdinalParse:f_,relativeTime:p_,months:E_,monthsShort:iy,week:U_,weekdays:Q_,weekdaysMin:K_,weekdaysShort:dy,meridiemParse:f4},Pe={},Zi={},Yo;function m4(e,t){var n,r=Math.min(e.length,t.length);for(n=0;n<r;n+=1)if(e[n]!==t[n])return n;return r}function jp(e){return e&&e.toLowerCase().replace("_","-")}function g4(e){for(var t=0,n,r,i,o;t<e.length;){for(o=jp(e[t]).split("-"),n=o.length,r=jp(e[t+1]),r=r?r.split("-"):null;n>0;){if(i=jl(o.slice(0,n).join("-")),i)return i;if(r&&r.length>=n&&m4(o,r)>=n-1)break;n--}t++}return Yo}function y4(e){return e.match("^[^/\\\\]*$")!=null}function jl(e){var t=null,n;if(Pe[e]===void 0&&typeof Za<"u"&&Za&&Za.exports&&y4(e))try{t=Yo._abbr,n=require,n("./locale/"+e),fr(t)}catch{Pe[e]=null}return Pe[e]}function fr(e,t){var n;return e&&(St(t)?n=Wn(e):n=cf(e,t),n?Yo=n:typeof console<"u"&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),Yo._abbr}function cf(e,t){if(t!==null){var n,r=py;if(t.abbr=e,Pe[e]!=null)X0("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),r=Pe[e]._config;else if(t.parentLocale!=null)if(Pe[t.parentLocale]!=null)r=Pe[t.parentLocale]._config;else if(n=jl(t.parentLocale),n!=null)r=n._config;else return Zi[t.parentLocale]||(Zi[t.parentLocale]=[]),Zi[t.parentLocale].push({name:e,config:t}),null;return Pe[e]=new tf(Pc(r,t)),Zi[e]&&Zi[e].forEach(function(i){cf(i.name,i.config)}),fr(e),Pe[e]}else return delete Pe[e],null}function v4(e,t){if(t!=null){var n,r,i=py;Pe[e]!=null&&Pe[e].parentLocale!=null?Pe[e].set(Pc(Pe[e]._config,t)):(r=jl(e),r!=null&&(i=r._config),t=Pc(i,t),r==null&&(t.abbr=e),n=new tf(t),n.parentLocale=Pe[e],Pe[e]=n),fr(e)}else Pe[e]!=null&&(Pe[e].parentLocale!=null?(Pe[e]=Pe[e].parentLocale,e===fr()&&fr(e)):Pe[e]!=null&&delete Pe[e]);return Pe[e]}function Wn(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return Yo;if(!sn(e)){if(t=jl(e),t)return t;e=[e]}return g4(e)}function x4(){return Rc(Pe)}function df(e){var t,n=e._a;return n&&ee(e).overflow===-2&&(t=n[Tn]<0||n[Tn]>11?Tn:n[gn]<1||n[gn]>Dl(n[ft],n[Tn])?gn:n[Ze]<0||n[Ze]>24||n[Ze]===24&&(n[nn]!==0||n[An]!==0||n[jr]!==0)?Ze:n[nn]<0||n[nn]>59?nn:n[An]<0||n[An]>59?An:n[jr]<0||n[jr]>999?jr:-1,ee(e)._overflowDayOfYear&&(t<ft||t>gn)&&(t=gn),ee(e)._overflowWeeks&&t===-1&&(t=C_),ee(e)._overflowWeekday&&t===-1&&(t=D_),ee(e).overflow=t),e}var w4=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,k4=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,S4=/Z|[+-]\d\d(?::?\d\d)?/,Pa=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/],["YYYYMM",/\d{6}/,!1],["YYYY",/\d{4}/,!1]],yu=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],_4=/^\/?Date\((-?\d+)/i,b4=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,C4={UT:0,GMT:0,EDT:-4*60,EST:-5*60,CDT:-5*60,CST:-6*60,MDT:-6*60,MST:-7*60,PDT:-7*60,PST:-8*60};function my(e){var t,n,r=e._i,i=w4.exec(r)||k4.exec(r),o,a,s,l,c=Pa.length,d=yu.length;if(i){for(ee(e).iso=!0,t=0,n=c;t<n;t++)if(Pa[t][1].exec(i[1])){a=Pa[t][0],o=Pa[t][2]!==!1;break}if(a==null){e._isValid=!1;return}if(i[3]){for(t=0,n=d;t<n;t++)if(yu[t][1].exec(i[3])){s=(i[2]||" ")+yu[t][0];break}if(s==null){e._isValid=!1;return}}if(!o&&s!=null){e._isValid=!1;return}if(i[4])if(S4.exec(i[4]))l="Z";else{e._isValid=!1;return}e._f=a+(s||"")+(l||""),hf(e)}else e._isValid=!1}function D4(e,t,n,r,i,o){var a=[j4(e),iy.indexOf(t),parseInt(n,10),parseInt(r,10),parseInt(i,10)];return o&&a.push(parseInt(o,10)),a}function j4(e){var t=parseInt(e,10);return t<=49?2e3+t:t<=999?1900+t:t}function E4(e){return e.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function M4(e,t,n){if(e){var r=dy.indexOf(e),i=new Date(t[0],t[1],t[2]).getDay();if(r!==i)return ee(n).weekdayMismatch=!0,n._isValid=!1,!1}return!0}function P4(e,t,n){if(e)return C4[e];if(t)return 0;var r=parseInt(n,10),i=r%100,o=(r-i)/100;return o*60+i}function gy(e){var t=b4.exec(E4(e._i)),n;if(t){if(n=D4(t[4],t[3],t[2],t[5],t[6],t[7]),!M4(t[1],n,e))return;e._a=n,e._tzm=P4(t[8],t[9],t[10]),e._d=$o.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),ee(e).rfc2822=!0}else e._isValid=!1}function R4(e){var t=_4.exec(e._i);if(t!==null){e._d=new Date(+t[1]);return}if(my(e),e._isValid===!1)delete e._isValid;else return;if(gy(e),e._isValid===!1)delete e._isValid;else return;e._strict?e._isValid=!1:z.createFromInputFallback(e)}z.createFromInputFallback=Bt("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))});function Zr(e,t,n){return e??t??n}function T4(e){var t=new Date(z.now());return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function ff(e){var t,n,r=[],i,o,a;if(!e._d){for(i=T4(e),e._w&&e._a[gn]==null&&e._a[Tn]==null&&A4(e),e._dayOfYear!=null&&(a=Zr(e._a[ft],i[ft]),(e._dayOfYear>xo(a)||e._dayOfYear===0)&&(ee(e)._overflowDayOfYear=!0),n=$o(a,0,e._dayOfYear),e._a[Tn]=n.getUTCMonth(),e._a[gn]=n.getUTCDate()),t=0;t<3&&e._a[t]==null;++t)e._a[t]=r[t]=i[t];for(;t<7;t++)e._a[t]=r[t]=e._a[t]==null?t===2?1:0:e._a[t];e._a[Ze]===24&&e._a[nn]===0&&e._a[An]===0&&e._a[jr]===0&&(e._nextDay=!0,e._a[Ze]=0),e._d=(e._useUTC?$o:F_).apply(null,r),o=e._useUTC?e._d.getUTCDay():e._d.getDay(),e._tzm!=null&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[Ze]=24),e._w&&typeof e._w.d<"u"&&e._w.d!==o&&(ee(e).weekdayMismatch=!0)}}function A4(e){var t,n,r,i,o,a,s,l,c;t=e._w,t.GG!=null||t.W!=null||t.E!=null?(o=1,a=4,n=Zr(t.GG,e._a[ft],Uo(je(),1,4).year),r=Zr(t.W,1),i=Zr(t.E,1),(i<1||i>7)&&(l=!0)):(o=e._locale._week.dow,a=e._locale._week.doy,c=Uo(je(),o,a),n=Zr(t.gg,e._a[ft],c.year),r=Zr(t.w,c.week),t.d!=null?(i=t.d,(i<0||i>6)&&(l=!0)):t.e!=null?(i=t.e+o,(t.e<0||t.e>6)&&(l=!0)):i=o),r<1||r>Ln(n,o,a)?ee(e)._overflowWeeks=!0:l!=null?ee(e)._overflowWeekday=!0:(s=cy(n,r,i,o,a),e._a[ft]=s.year,e._dayOfYear=s.dayOfYear)}z.ISO_8601=function(){};z.RFC_2822=function(){};function hf(e){if(e._f===z.ISO_8601){my(e);return}if(e._f===z.RFC_2822){gy(e);return}e._a=[],ee(e).empty=!0;var t=""+e._i,n,r,i,o,a,s=t.length,l=0,c,d;for(i=J0(e._f,e._locale).match(nf)||[],d=i.length,n=0;n<d;n++)o=i[n],r=(t.match(S_(o,e))||[])[0],r&&(a=t.substr(0,t.indexOf(r)),a.length>0&&ee(e).unusedInput.push(a),t=t.slice(t.indexOf(r)+r.length),l+=r.length),Si[o]?(r?ee(e).empty=!1:ee(e).unusedTokens.push(o),b_(o,r,e)):e._strict&&!r&&ee(e).unusedTokens.push(o);ee(e).charsLeftOver=s-l,t.length>0&&ee(e).unusedInput.push(t),e._a[Ze]<=12&&ee(e).bigHour===!0&&e._a[Ze]>0&&(ee(e).bigHour=void 0),ee(e).parsedDateParts=e._a.slice(0),ee(e).meridiem=e._meridiem,e._a[Ze]=O4(e._locale,e._a[Ze],e._meridiem),c=ee(e).era,c!==null&&(e._a[ft]=e._locale.erasConvertYear(c,e._a[ft])),ff(e),df(e)}function O4(e,t,n){var r;return n==null?t:e.meridiemHour!=null?e.meridiemHour(t,n):(e.isPM!=null&&(r=e.isPM(n),r&&t<12&&(t+=12),!r&&t===12&&(t=0)),t)}function L4(e){var t,n,r,i,o,a,s=!1,l=e._f.length;if(l===0){ee(e).invalidFormat=!0,e._d=new Date(NaN);return}for(i=0;i<l;i++)o=0,a=!1,t=ef({},e),e._useUTC!=null&&(t._useUTC=e._useUTC),t._f=e._f[i],hf(t),qd(t)&&(a=!0),o+=ee(t).charsLeftOver,o+=ee(t).unusedTokens.length*10,ee(t).score=o,s?o<r&&(r=o,n=t):(r==null||o<r||a)&&(r=o,n=t,a&&(s=!0));er(e,n||t)}function N4(e){if(!e._d){var t=rf(e._i),n=t.day===void 0?t.date:t.day;e._a=Q0([t.year,t.month,n,t.hour,t.minute,t.second,t.millisecond],function(r){return r&&parseInt(r,10)}),ff(e)}}function I4(e){var t=new Ko(df(yy(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}function yy(e){var t=e._i,n=e._f;return e._locale=e._locale||Wn(e._l),t===null||n===void 0&&t===""?xl({nullInput:!0}):(typeof t=="string"&&(e._i=t=e._locale.preparse(t)),ln(t)?new Ko(df(t)):(Qo(t)?e._d=t:sn(n)?L4(e):n?hf(e):z4(e),qd(e)||(e._d=null),e))}function z4(e){var t=e._i;St(t)?e._d=new Date(z.now()):Qo(t)?e._d=new Date(t.valueOf()):typeof t=="string"?R4(e):sn(t)?(e._a=Q0(t.slice(0),function(n){return parseInt(n,10)}),ff(e)):Pr(t)?N4(e):$n(t)?e._d=new Date(t):z.createFromInputFallback(e)}function vy(e,t,n,r,i){var o={};return(t===!0||t===!1)&&(r=t,t=void 0),(n===!0||n===!1)&&(r=n,n=void 0),(Pr(e)&&Zd(e)||sn(e)&&e.length===0)&&(e=void 0),o._isAMomentObject=!0,o._useUTC=o._isUTC=i,o._l=n,o._i=e,o._f=t,o._strict=r,I4(o)}function je(e,t,n,r){return vy(e,t,n,r,!1)}var F4=Bt("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=je.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:xl()}),$4=Bt("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=je.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:xl()});function xy(e,t){var n,r;if(t.length===1&&sn(t[0])&&(t=t[0]),!t.length)return je();for(n=t[0],r=1;r<t.length;++r)(!t[r].isValid()||t[r][e](n))&&(n=t[r]);return n}function U4(){var e=[].slice.call(arguments,0);return xy("isBefore",e)}function Y4(){var e=[].slice.call(arguments,0);return xy("isAfter",e)}var W4=function(){return Date.now?Date.now():+new Date},qi=["year","quarter","month","week","day","hour","minute","second","millisecond"];function H4(e){var t,n=!1,r,i=qi.length;for(t in e)if(pe(e,t)&&!(We.call(qi,t)!==-1&&(e[t]==null||!isNaN(e[t]))))return!1;for(r=0;r<i;++r)if(e[qi[r]]){if(n)return!1;parseFloat(e[qi[r]])!==ie(e[qi[r]])&&(n=!0)}return!0}function V4(){return this._isValid}function B4(){return un(NaN)}function El(e){var t=rf(e),n=t.year||0,r=t.quarter||0,i=t.month||0,o=t.week||t.isoWeek||0,a=t.day||0,s=t.hour||0,l=t.minute||0,c=t.second||0,d=t.millisecond||0;this._isValid=H4(t),this._milliseconds=+d+c*1e3+l*6e4+s*1e3*60*60,this._days=+a+o*7,this._months=+i+r*3+n*12,this._data={},this._locale=Wn(),this._bubble()}function Xa(e){return e instanceof El}function Ac(e){return e<0?Math.round(-1*e)*-1:Math.round(e)}function G4(e,t,n){var r=Math.min(e.length,t.length),i=Math.abs(e.length-t.length),o=0,a;for(a=0;a<r;a++)(n&&e[a]!==t[a]||!n&&ie(e[a])!==ie(t[a]))&&o++;return o+i}function wy(e,t){B(e,0,0,function(){var n=this.utcOffset(),r="+";return n<0&&(n=-n,r="-"),r+xn(~~(n/60),2)+t+xn(~~n%60,2)})}wy("Z",":");wy("ZZ","");$("Z",Cl);$("ZZ",Cl);ke(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=pf(Cl,e)});var Q4=/([\+\-]|\d\d)/gi;function pf(e,t){var n=(t||"").match(e),r,i,o;return n===null?null:(r=n[n.length-1]||[],i=(r+"").match(Q4)||["-",0,0],o=+(i[1]*60)+ie(i[2]),o===0?0:i[0]==="+"?o:-o)}function mf(e,t){var n,r;return t._isUTC?(n=t.clone(),r=(ln(e)||Qo(e)?e.valueOf():je(e).valueOf())-n.valueOf(),n._d.setTime(n._d.valueOf()+r),z.updateOffset(n,!1),n):je(e).local()}function Oc(e){return-Math.round(e._d.getTimezoneOffset())}z.updateOffset=function(){};function K4(e,t,n){var r=this._offset||0,i;if(!this.isValid())return e!=null?this:NaN;if(e!=null){if(typeof e=="string"){if(e=pf(Cl,e),e===null)return this}else Math.abs(e)<16&&!n&&(e=e*60);return!this._isUTC&&t&&(i=Oc(this)),this._offset=e,this._isUTC=!0,i!=null&&this.add(i,"m"),r!==e&&(!t||this._changeInProgress?_y(this,un(e-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,z.updateOffset(this,!0),this._changeInProgress=null)),this}else return this._isUTC?r:Oc(this)}function X4(e,t){return e!=null?(typeof e!="string"&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}function J4(e){return this.utcOffset(0,e)}function Z4(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Oc(this),"m")),this}function q4(){if(this._tzm!=null)this.utcOffset(this._tzm,!1,!0);else if(typeof this._i=="string"){var e=pf(w_,this._i);e!=null?this.utcOffset(e):this.utcOffset(0,!0)}return this}function eb(e){return this.isValid()?(e=e?je(e).utcOffset():0,(this.utcOffset()-e)%60===0):!1}function tb(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function nb(){if(!St(this._isDSTShifted))return this._isDSTShifted;var e={},t;return ef(e,this),e=yy(e),e._a?(t=e._isUTC?kn(e._a):je(e._a),this._isDSTShifted=this.isValid()&&G4(e._a,t.toArray())>0):this._isDSTShifted=!1,this._isDSTShifted}function rb(){return this.isValid()?!this._isUTC:!1}function ib(){return this.isValid()?this._isUTC:!1}function ky(){return this.isValid()?this._isUTC&&this._offset===0:!1}var ob=/^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,ab=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function un(e,t){var n=e,r=null,i,o,a;return Xa(e)?n={ms:e._milliseconds,d:e._days,M:e._months}:$n(e)||!isNaN(+e)?(n={},t?n[t]=+e:n.milliseconds=+e):(r=ob.exec(e))?(i=r[1]==="-"?-1:1,n={y:0,d:ie(r[gn])*i,h:ie(r[Ze])*i,m:ie(r[nn])*i,s:ie(r[An])*i,ms:ie(Ac(r[jr]*1e3))*i}):(r=ab.exec(e))?(i=r[1]==="-"?-1:1,n={y:wr(r[2],i),M:wr(r[3],i),w:wr(r[4],i),d:wr(r[5],i),h:wr(r[6],i),m:wr(r[7],i),s:wr(r[8],i)}):n==null?n={}:typeof n=="object"&&("from"in n||"to"in n)&&(a=sb(je(n.from),je(n.to)),n={},n.ms=a.milliseconds,n.M=a.months),o=new El(n),Xa(e)&&pe(e,"_locale")&&(o._locale=e._locale),Xa(e)&&pe(e,"_isValid")&&(o._isValid=e._isValid),o}un.fn=El.prototype;un.invalid=B4;function wr(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function Ep(e,t){var n={};return n.months=t.month()-e.month()+(t.year()-e.year())*12,e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function sb(e,t){var n;return e.isValid()&&t.isValid()?(t=mf(t,e),e.isBefore(t)?n=Ep(e,t):(n=Ep(t,e),n.milliseconds=-n.milliseconds,n.months=-n.months),n):{milliseconds:0,months:0}}function Sy(e,t){return function(n,r){var i,o;return r!==null&&!isNaN(+r)&&(X0(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),o=n,n=r,r=o),i=un(n,r),_y(this,i,e),this}}function _y(e,t,n,r){var i=t._milliseconds,o=Ac(t._days),a=Ac(t._months);e.isValid()&&(r=r??!0,a&&ay(e,Es(e,"Month")+a*n),o&&q0(e,"Date",Es(e,"Date")+o*n),i&&e._d.setTime(e._d.valueOf()+i*n),r&&z.updateOffset(e,o||a))}var lb=Sy(1,"add"),ub=Sy(-1,"subtract");function by(e){return typeof e=="string"||e instanceof String}function cb(e){return ln(e)||Qo(e)||by(e)||$n(e)||fb(e)||db(e)||e===null||e===void 0}function db(e){var t=Pr(e)&&!Zd(e),n=!1,r=["years","year","y","months","month","M","days","day","d","dates","date","D","hours","hour","h","minutes","minute","m","seconds","second","s","milliseconds","millisecond","ms"],i,o,a=r.length;for(i=0;i<a;i+=1)o=r[i],n=n||pe(e,o);return t&&n}function fb(e){var t=sn(e),n=!1;return t&&(n=e.filter(function(r){return!$n(r)&&by(e)}).length===0),t&&n}function hb(e){var t=Pr(e)&&!Zd(e),n=!1,r=["sameDay","nextDay","lastDay","nextWeek","lastWeek","sameElse"],i,o;for(i=0;i<r.length;i+=1)o=r[i],n=n||pe(e,o);return t&&n}function pb(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"}function mb(e,t){arguments.length===1&&(arguments[0]?cb(arguments[0])?(e=arguments[0],t=void 0):hb(arguments[0])&&(t=arguments[0],e=void 0):(e=void 0,t=void 0));var n=e||je(),r=mf(n,this).startOf("day"),i=z.calendarFormat(this,r)||"sameElse",o=t&&(Sn(t[i])?t[i].call(this,n):t[i]);return this.format(o||this.localeData().calendar(i,this,je(n)))}function gb(){return new Ko(this)}function yb(e,t){var n=ln(e)?e:je(e);return this.isValid()&&n.isValid()?(t=Gt(t)||"millisecond",t==="millisecond"?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf()):!1}function vb(e,t){var n=ln(e)?e:je(e);return this.isValid()&&n.isValid()?(t=Gt(t)||"millisecond",t==="millisecond"?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf()):!1}function xb(e,t,n,r){var i=ln(e)?e:je(e),o=ln(t)?t:je(t);return this.isValid()&&i.isValid()&&o.isValid()?(r=r||"()",(r[0]==="("?this.isAfter(i,n):!this.isBefore(i,n))&&(r[1]===")"?this.isBefore(o,n):!this.isAfter(o,n))):!1}function wb(e,t){var n=ln(e)?e:je(e),r;return this.isValid()&&n.isValid()?(t=Gt(t)||"millisecond",t==="millisecond"?this.valueOf()===n.valueOf():(r=n.valueOf(),this.clone().startOf(t).valueOf()<=r&&r<=this.clone().endOf(t).valueOf())):!1}function kb(e,t){return this.isSame(e,t)||this.isAfter(e,t)}function Sb(e,t){return this.isSame(e,t)||this.isBefore(e,t)}function _b(e,t,n){var r,i,o;if(!this.isValid())return NaN;if(r=mf(e,this),!r.isValid())return NaN;switch(i=(r.utcOffset()-this.utcOffset())*6e4,t=Gt(t),t){case"year":o=Ja(this,r)/12;break;case"month":o=Ja(this,r);break;case"quarter":o=Ja(this,r)/3;break;case"second":o=(this-r)/1e3;break;case"minute":o=(this-r)/6e4;break;case"hour":o=(this-r)/36e5;break;case"day":o=(this-r-i)/864e5;break;case"week":o=(this-r-i)/6048e5;break;default:o=this-r}return n?o:Ft(o)}function Ja(e,t){if(e.date()<t.date())return-Ja(t,e);var n=(t.year()-e.year())*12+(t.month()-e.month()),r=e.clone().add(n,"months"),i,o;return t-r<0?(i=e.clone().add(n-1,"months"),o=(t-r)/(r-i)):(i=e.clone().add(n+1,"months"),o=(t-r)/(i-r)),-(n+o)||0}z.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";z.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";function bb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function Cb(e){if(!this.isValid())return null;var t=e!==!0,n=t?this.clone().utc():this;return n.year()<0||n.year()>9999?Ka(n,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):Sn(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+this.utcOffset()*60*1e3).toISOString().replace("Z",Ka(n,"Z")):Ka(n,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")}function Db(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="",n,r,i,o;return this.isLocal()||(e=this.utcOffset()===0?"moment.utc":"moment.parseZone",t="Z"),n="["+e+'("]',r=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i="-MM-DD[T]HH:mm:ss.SSS",o=t+'[")]',this.format(n+r+i+o)}function jb(e){e||(e=this.isUtc()?z.defaultFormatUtc:z.defaultFormat);var t=Ka(this,e);return this.localeData().postformat(t)}function Eb(e,t){return this.isValid()&&(ln(e)&&e.isValid()||je(e).isValid())?un({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function Mb(e){return this.from(je(),e)}function Pb(e,t){return this.isValid()&&(ln(e)&&e.isValid()||je(e).isValid())?un({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function Rb(e){return this.to(je(),e)}function Cy(e){var t;return e===void 0?this._locale._abbr:(t=Wn(e),t!=null&&(this._locale=t),this)}var Dy=Bt("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return e===void 0?this.localeData():this.locale(e)});function jy(){return this._locale}var Rs=1e3,_i=60*Rs,Ts=60*_i,Ey=(365*400+97)*24*Ts;function bi(e,t){return(e%t+t)%t}function My(e,t,n){return e<100&&e>=0?new Date(e+400,t,n)-Ey:new Date(e,t,n).valueOf()}function Py(e,t,n){return e<100&&e>=0?Date.UTC(e+400,t,n)-Ey:Date.UTC(e,t,n)}function Tb(e){var t,n;if(e=Gt(e),e===void 0||e==="millisecond"||!this.isValid())return this;switch(n=this._isUTC?Py:My,e){case"year":t=n(this.year(),0,1);break;case"quarter":t=n(this.year(),this.month()-this.month()%3,1);break;case"month":t=n(this.year(),this.month(),1);break;case"week":t=n(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":t=n(this.year(),this.month(),this.date());break;case"hour":t=this._d.valueOf(),t-=bi(t+(this._isUTC?0:this.utcOffset()*_i),Ts);break;case"minute":t=this._d.valueOf(),t-=bi(t,_i);break;case"second":t=this._d.valueOf(),t-=bi(t,Rs);break}return this._d.setTime(t),z.updateOffset(this,!0),this}function Ab(e){var t,n;if(e=Gt(e),e===void 0||e==="millisecond"||!this.isValid())return this;switch(n=this._isUTC?Py:My,e){case"year":t=n(this.year()+1,0,1)-1;break;case"quarter":t=n(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":t=n(this.year(),this.month()+1,1)-1;break;case"week":t=n(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":t=n(this.year(),this.month(),this.date()+1)-1;break;case"hour":t=this._d.valueOf(),t+=Ts-bi(t+(this._isUTC?0:this.utcOffset()*_i),Ts)-1;break;case"minute":t=this._d.valueOf(),t+=_i-bi(t,_i)-1;break;case"second":t=this._d.valueOf(),t+=Rs-bi(t,Rs)-1;break}return this._d.setTime(t),z.updateOffset(this,!0),this}function Ob(){return this._d.valueOf()-(this._offset||0)*6e4}function Lb(){return Math.floor(this.valueOf()/1e3)}function Nb(){return new Date(this.valueOf())}function Ib(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]}function zb(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}}function Fb(){return this.isValid()?this.toISOString():null}function $b(){return qd(this)}function Ub(){return er({},ee(this))}function Yb(){return ee(this).overflow}function Wb(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}B("N",0,0,"eraAbbr");B("NN",0,0,"eraAbbr");B("NNN",0,0,"eraAbbr");B("NNNN",0,0,"eraName");B("NNNNN",0,0,"eraNarrow");B("y",["y",1],"yo","eraYear");B("y",["yy",2],0,"eraYear");B("y",["yyy",3],0,"eraYear");B("y",["yyyy",4],0,"eraYear");$("N",gf);$("NN",gf);$("NNN",gf);$("NNNN",eC);$("NNNNN",tC);ke(["N","NN","NNN","NNNN","NNNNN"],function(e,t,n,r){var i=n._locale.erasParse(e,r,n._strict);i?ee(n).era=i:ee(n).invalidEra=e});$("y",Fi);$("yy",Fi);$("yyy",Fi);$("yyyy",Fi);$("yo",nC);ke(["y","yy","yyy","yyyy"],ft);ke(["yo"],function(e,t,n,r){var i;n._locale._eraYearOrdinalRegex&&(i=e.match(n._locale._eraYearOrdinalRegex)),n._locale.eraYearOrdinalParse?t[ft]=n._locale.eraYearOrdinalParse(e,i):t[ft]=parseInt(e,10)});function Hb(e,t){var n,r,i,o=this._eras||Wn("en")._eras;for(n=0,r=o.length;n<r;++n){switch(typeof o[n].since){case"string":i=z(o[n].since).startOf("day"),o[n].since=i.valueOf();break}switch(typeof o[n].until){case"undefined":o[n].until=1/0;break;case"string":i=z(o[n].until).startOf("day").valueOf(),o[n].until=i.valueOf();break}}return o}function Vb(e,t,n){var r,i,o=this.eras(),a,s,l;for(e=e.toUpperCase(),r=0,i=o.length;r<i;++r)if(a=o[r].name.toUpperCase(),s=o[r].abbr.toUpperCase(),l=o[r].narrow.toUpperCase(),n)switch(t){case"N":case"NN":case"NNN":if(s===e)return o[r];break;case"NNNN":if(a===e)return o[r];break;case"NNNNN":if(l===e)return o[r];break}else if([a,s,l].indexOf(e)>=0)return o[r]}function Bb(e,t){var n=e.since<=e.until?1:-1;return t===void 0?z(e.since).year():z(e.since).year()+(t-e.offset)*n}function Gb(){var e,t,n,r=this.localeData().eras();for(e=0,t=r.length;e<t;++e)if(n=this.clone().startOf("day").valueOf(),r[e].since<=n&&n<=r[e].until||r[e].until<=n&&n<=r[e].since)return r[e].name;return""}function Qb(){var e,t,n,r=this.localeData().eras();for(e=0,t=r.length;e<t;++e)if(n=this.clone().startOf("day").valueOf(),r[e].since<=n&&n<=r[e].until||r[e].until<=n&&n<=r[e].since)return r[e].narrow;return""}function Kb(){var e,t,n,r=this.localeData().eras();for(e=0,t=r.length;e<t;++e)if(n=this.clone().startOf("day").valueOf(),r[e].since<=n&&n<=r[e].until||r[e].until<=n&&n<=r[e].since)return r[e].abbr;return""}function Xb(){var e,t,n,r,i=this.localeData().eras();for(e=0,t=i.length;e<t;++e)if(n=i[e].since<=i[e].until?1:-1,r=this.clone().startOf("day").valueOf(),i[e].since<=r&&r<=i[e].until||i[e].until<=r&&r<=i[e].since)return(this.year()-z(i[e].since).year())*n+i[e].offset;return this.year()}function Jb(e){return pe(this,"_erasNameRegex")||yf.call(this),e?this._erasNameRegex:this._erasRegex}function Zb(e){return pe(this,"_erasAbbrRegex")||yf.call(this),e?this._erasAbbrRegex:this._erasRegex}function qb(e){return pe(this,"_erasNarrowRegex")||yf.call(this),e?this._erasNarrowRegex:this._erasRegex}function gf(e,t){return t.erasAbbrRegex(e)}function eC(e,t){return t.erasNameRegex(e)}function tC(e,t){return t.erasNarrowRegex(e)}function nC(e,t){return t._eraYearOrdinalRegex||Fi}function yf(){var e=[],t=[],n=[],r=[],i,o,a=this.eras();for(i=0,o=a.length;i<o;++i)t.push(Mt(a[i].name)),e.push(Mt(a[i].abbr)),n.push(Mt(a[i].narrow)),r.push(Mt(a[i].name)),r.push(Mt(a[i].abbr)),r.push(Mt(a[i].narrow));this._erasRegex=new RegExp("^("+r.join("|")+")","i"),this._erasNameRegex=new RegExp("^("+t.join("|")+")","i"),this._erasAbbrRegex=new RegExp("^("+e.join("|")+")","i"),this._erasNarrowRegex=new RegExp("^("+n.join("|")+")","i")}B(0,["gg",2],0,function(){return this.weekYear()%100});B(0,["GG",2],0,function(){return this.isoWeekYear()%100});function Ml(e,t){B(0,[e,e.length],0,t)}Ml("gggg","weekYear");Ml("ggggg","weekYear");Ml("GGGG","isoWeekYear");Ml("GGGGG","isoWeekYear");pt("weekYear","gg");pt("isoWeekYear","GG");mt("weekYear",1);mt("isoWeekYear",1);$("G",bl);$("g",bl);$("GG",Ee,Nt);$("gg",Ee,Nt);$("GGGG",af,of);$("gggg",af,of);$("GGGGG",_l,kl);$("ggggg",_l,kl);Jo(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,r){t[r.substr(0,2)]=ie(e)});Jo(["gg","GG"],function(e,t,n,r){t[r]=z.parseTwoDigitYear(e)});function rC(e){return Ry.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function iC(e){return Ry.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)}function oC(){return Ln(this.year(),1,4)}function aC(){return Ln(this.isoWeekYear(),1,4)}function sC(){var e=this.localeData()._week;return Ln(this.year(),e.dow,e.doy)}function lC(){var e=this.localeData()._week;return Ln(this.weekYear(),e.dow,e.doy)}function Ry(e,t,n,r,i){var o;return e==null?Uo(this,r,i).year:(o=Ln(e,r,i),t>o&&(t=o),uC.call(this,e,t,n,r,i))}function uC(e,t,n,r,i){var o=cy(e,t,n,r,i),a=$o(o.year,0,o.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}B("Q",0,"Qo","quarter");pt("quarter","Q");mt("quarter",7);$("Q",ey);ke("Q",function(e,t){t[Tn]=(ie(e)-1)*3});function cC(e){return e==null?Math.ceil((this.month()+1)/3):this.month((e-1)*3+this.month()%3)}B("D",["DD",2],"Do","date");pt("date","D");mt("date",9);$("D",Ee);$("DD",Ee,Nt);$("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient});ke(["D","DD"],gn);ke("Do",function(e,t){t[gn]=ie(e.match(Ee)[0])});var Ty=zi("Date",!0);B("DDD",["DDDD",3],"DDDo","dayOfYear");pt("dayOfYear","DDD");mt("dayOfYear",4);$("DDD",Sl);$("DDDD",ty);ke(["DDD","DDDD"],function(e,t,n){n._dayOfYear=ie(e)});function dC(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return e==null?t:this.add(e-t,"d")}B("m",["mm",2],0,"minute");pt("minute","m");mt("minute",14);$("m",Ee);$("mm",Ee,Nt);ke(["m","mm"],nn);var fC=zi("Minutes",!1);B("s",["ss",2],0,"second");pt("second","s");mt("second",15);$("s",Ee);$("ss",Ee,Nt);ke(["s","ss"],An);var hC=zi("Seconds",!1);B("S",0,0,function(){return~~(this.millisecond()/100)});B(0,["SS",2],0,function(){return~~(this.millisecond()/10)});B(0,["SSS",3],0,"millisecond");B(0,["SSSS",4],0,function(){return this.millisecond()*10});B(0,["SSSSS",5],0,function(){return this.millisecond()*100});B(0,["SSSSSS",6],0,function(){return this.millisecond()*1e3});B(0,["SSSSSSS",7],0,function(){return this.millisecond()*1e4});B(0,["SSSSSSSS",8],0,function(){return this.millisecond()*1e5});B(0,["SSSSSSSSS",9],0,function(){return this.millisecond()*1e6});pt("millisecond","ms");mt("millisecond",16);$("S",Sl,ey);$("SS",Sl,Nt);$("SSS",Sl,ty);var tr,Ay;for(tr="SSSS";tr.length<=9;tr+="S")$(tr,Fi);function pC(e,t){t[jr]=ie(("0."+e)*1e3)}for(tr="S";tr.length<=9;tr+="S")ke(tr,pC);Ay=zi("Milliseconds",!1);B("z",0,0,"zoneAbbr");B("zz",0,0,"zoneName");function mC(){return this._isUTC?"UTC":""}function gC(){return this._isUTC?"Coordinated Universal Time":""}var R=Ko.prototype;R.add=lb;R.calendar=mb;R.clone=gb;R.diff=_b;R.endOf=Ab;R.format=jb;R.from=Eb;R.fromNow=Mb;R.to=Pb;R.toNow=Rb;R.get=v_;R.invalidAt=Yb;R.isAfter=yb;R.isBefore=vb;R.isBetween=xb;R.isSame=wb;R.isSameOrAfter=kb;R.isSameOrBefore=Sb;R.isValid=$b;R.lang=Dy;R.locale=Cy;R.localeData=jy;R.max=$4;R.min=F4;R.parsingFlags=Ub;R.set=x_;R.startOf=Tb;R.subtract=ub;R.toArray=Ib;R.toObject=zb;R.toDate=Nb;R.toISOString=Cb;R.inspect=Db;typeof Symbol<"u"&&Symbol.for!=null&&(R[Symbol.for("nodejs.util.inspect.custom")]=function(){return"Moment<"+this.format()+">"});R.toJSON=Fb;R.toString=bb;R.unix=Lb;R.valueOf=Ob;R.creationData=Wb;R.eraName=Gb;R.eraNarrow=Qb;R.eraAbbr=Kb;R.eraYear=Xb;R.year=uy;R.isLeapYear=z_;R.weekYear=rC;R.isoWeekYear=iC;R.quarter=R.quarters=cC;R.month=sy;R.daysInMonth=L_;R.week=R.weeks=H_;R.isoWeek=R.isoWeeks=V_;R.weeksInYear=sC;R.weeksInWeekYear=lC;R.isoWeeksInYear=oC;R.isoWeeksInISOWeekYear=aC;R.date=Ty;R.day=R.days=i4;R.weekday=o4;R.isoWeekday=a4;R.dayOfYear=dC;R.hour=R.hours=h4;R.minute=R.minutes=fC;R.second=R.seconds=hC;R.millisecond=R.milliseconds=Ay;R.utcOffset=K4;R.utc=J4;R.local=Z4;R.parseZone=q4;R.hasAlignedHourOffset=eb;R.isDST=tb;R.isLocal=rb;R.isUtcOffset=ib;R.isUtc=ky;R.isUTC=ky;R.zoneAbbr=mC;R.zoneName=gC;R.dates=Bt("dates accessor is deprecated. Use date instead.",Ty);R.months=Bt("months accessor is deprecated. Use month instead",sy);R.years=Bt("years accessor is deprecated. Use year instead",uy);R.zone=Bt("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",X4);R.isDSTShifted=Bt("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",nb);function yC(e){return je(e*1e3)}function vC(){return je.apply(null,arguments).parseZone()}function Oy(e){return e}var me=tf.prototype;me.calendar=i_;me.longDateFormat=l_;me.invalidDate=c_;me.ordinal=h_;me.preparse=Oy;me.postformat=Oy;me.relativeTime=m_;me.pastFuture=g_;me.set=n_;me.eras=Hb;me.erasParse=Vb;me.erasConvertYear=Bb;me.erasAbbrRegex=Zb;me.erasNameRegex=Jb;me.erasNarrowRegex=qb;me.months=R_;me.monthsShort=T_;me.monthsParse=O_;me.monthsRegex=I_;me.monthsShortRegex=N_;me.week=$_;me.firstDayOfYear=W_;me.firstDayOfWeek=Y_;me.weekdays=q_;me.weekdaysMin=t4;me.weekdaysShort=e4;me.weekdaysParse=r4;me.weekdaysRegex=s4;me.weekdaysShortRegex=l4;me.weekdaysMinRegex=u4;me.isPM=d4;me.meridiem=p4;function As(e,t,n,r){var i=Wn(),o=kn().set(r,t);return i[n](o,e)}function Ly(e,t,n){if($n(e)&&(t=e,e=void 0),e=e||"",t!=null)return As(e,t,n,"month");var r,i=[];for(r=0;r<12;r++)i[r]=As(e,r,n,"month");return i}function vf(e,t,n,r){typeof e=="boolean"?($n(t)&&(n=t,t=void 0),t=t||""):(t=e,n=t,e=!1,$n(t)&&(n=t,t=void 0),t=t||"");var i=Wn(),o=e?i._week.dow:0,a,s=[];if(n!=null)return As(t,(n+o)%7,r,"day");for(a=0;a<7;a++)s[a]=As(t,(a+o)%7,r,"day");return s}function xC(e,t){return Ly(e,t,"months")}function wC(e,t){return Ly(e,t,"monthsShort")}function kC(e,t,n){return vf(e,t,n,"weekdays")}function SC(e,t,n){return vf(e,t,n,"weekdaysShort")}function _C(e,t,n){return vf(e,t,n,"weekdaysMin")}fr("en",{eras:[{since:"0001-01-01",until:1/0,offset:1,name:"Anno Domini",narrow:"AD",abbr:"AD"},{since:"0000-12-31",until:-1/0,offset:1,name:"Before Christ",narrow:"BC",abbr:"BC"}],dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,n=ie(e%100/10)===1?"th":t===1?"st":t===2?"nd":t===3?"rd":"th";return e+n}});z.lang=Bt("moment.lang is deprecated. Use moment.locale instead.",fr);z.langData=Bt("moment.langData is deprecated. Use moment.localeData instead.",Wn);var Cn=Math.abs;function bC(){var e=this._data;return this._milliseconds=Cn(this._milliseconds),this._days=Cn(this._days),this._months=Cn(this._months),e.milliseconds=Cn(e.milliseconds),e.seconds=Cn(e.seconds),e.minutes=Cn(e.minutes),e.hours=Cn(e.hours),e.months=Cn(e.months),e.years=Cn(e.years),this}function Ny(e,t,n,r){var i=un(t,n);return e._milliseconds+=r*i._milliseconds,e._days+=r*i._days,e._months+=r*i._months,e._bubble()}function CC(e,t){return Ny(this,e,t,1)}function DC(e,t){return Ny(this,e,t,-1)}function Mp(e){return e<0?Math.floor(e):Math.ceil(e)}function jC(){var e=this._milliseconds,t=this._days,n=this._months,r=this._data,i,o,a,s,l;return e>=0&&t>=0&&n>=0||e<=0&&t<=0&&n<=0||(e+=Mp(Lc(n)+t)*864e5,t=0,n=0),r.milliseconds=e%1e3,i=Ft(e/1e3),r.seconds=i%60,o=Ft(i/60),r.minutes=o%60,a=Ft(o/60),r.hours=a%24,t+=Ft(a/24),l=Ft(Iy(t)),n+=l,t-=Mp(Lc(l)),s=Ft(n/12),n%=12,r.days=t,r.months=n,r.years=s,this}function Iy(e){return e*4800/146097}function Lc(e){return e*146097/4800}function EC(e){if(!this.isValid())return NaN;var t,n,r=this._milliseconds;if(e=Gt(e),e==="month"||e==="quarter"||e==="year")switch(t=this._days+r/864e5,n=this._months+Iy(t),e){case"month":return n;case"quarter":return n/3;case"year":return n/12}else switch(t=this._days+Math.round(Lc(this._months)),e){case"week":return t/7+r/6048e5;case"day":return t+r/864e5;case"hour":return t*24+r/36e5;case"minute":return t*1440+r/6e4;case"second":return t*86400+r/1e3;case"millisecond":return Math.floor(t*864e5)+r;default:throw new Error("Unknown unit "+e)}}function MC(){return this.isValid()?this._milliseconds+this._days*864e5+this._months%12*2592e6+ie(this._months/12)*31536e6:NaN}function Hn(e){return function(){return this.as(e)}}var PC=Hn("ms"),RC=Hn("s"),TC=Hn("m"),AC=Hn("h"),OC=Hn("d"),LC=Hn("w"),NC=Hn("M"),IC=Hn("Q"),zC=Hn("y");function FC(){return un(this)}function $C(e){return e=Gt(e),this.isValid()?this[e+"s"]():NaN}function Wr(e){return function(){return this.isValid()?this._data[e]:NaN}}var UC=Wr("milliseconds"),YC=Wr("seconds"),WC=Wr("minutes"),HC=Wr("hours"),VC=Wr("days"),BC=Wr("months"),GC=Wr("years");function QC(){return Ft(this.days()/7)}var En=Math.round,pi={ss:44,s:45,m:45,h:22,d:26,w:null,M:11};function KC(e,t,n,r,i){return i.relativeTime(t||1,!!n,e,r)}function XC(e,t,n,r){var i=un(e).abs(),o=En(i.as("s")),a=En(i.as("m")),s=En(i.as("h")),l=En(i.as("d")),c=En(i.as("M")),d=En(i.as("w")),f=En(i.as("y")),y=o<=n.ss&&["s",o]||o<n.s&&["ss",o]||a<=1&&["m"]||a<n.m&&["mm",a]||s<=1&&["h"]||s<n.h&&["hh",s]||l<=1&&["d"]||l<n.d&&["dd",l];return n.w!=null&&(y=y||d<=1&&["w"]||d<n.w&&["ww",d]),y=y||c<=1&&["M"]||c<n.M&&["MM",c]||f<=1&&["y"]||["yy",f],y[2]=t,y[3]=+e>0,y[4]=r,KC.apply(null,y)}function JC(e){return e===void 0?En:typeof e=="function"?(En=e,!0):!1}function ZC(e,t){return pi[e]===void 0?!1:t===void 0?pi[e]:(pi[e]=t,e==="s"&&(pi.ss=t-1),!0)}function qC(e,t){if(!this.isValid())return this.localeData().invalidDate();var n=!1,r=pi,i,o;return typeof e=="object"&&(t=e,e=!1),typeof e=="boolean"&&(n=e),typeof t=="object"&&(r=Object.assign({},pi,t),t.s!=null&&t.ss==null&&(r.ss=t.s-1)),i=this.localeData(),o=XC(this,!n,r,i),n&&(o=i.pastFuture(+this,o)),i.postformat(o)}var vu=Math.abs;function Jr(e){return(e>0)-(e<0)||+e}function Pl(){if(!this.isValid())return this.localeData().invalidDate();var e=vu(this._milliseconds)/1e3,t=vu(this._days),n=vu(this._months),r,i,o,a,s=this.asSeconds(),l,c,d,f;return s?(r=Ft(e/60),i=Ft(r/60),e%=60,r%=60,o=Ft(n/12),n%=12,a=e?e.toFixed(3).replace(/\.?0+$/,""):"",l=s<0?"-":"",c=Jr(this._months)!==Jr(s)?"-":"",d=Jr(this._days)!==Jr(s)?"-":"",f=Jr(this._milliseconds)!==Jr(s)?"-":"",l+"P"+(o?c+o+"Y":"")+(n?c+n+"M":"")+(t?d+t+"D":"")+(i||r||e?"T":"")+(i?f+i+"H":"")+(r?f+r+"M":"")+(e?f+a+"S":"")):"P0D"}var ue=El.prototype;ue.isValid=V4;ue.abs=bC;ue.add=CC;ue.subtract=DC;ue.as=EC;ue.asMilliseconds=PC;ue.asSeconds=RC;ue.asMinutes=TC;ue.asHours=AC;ue.asDays=OC;ue.asWeeks=LC;ue.asMonths=NC;ue.asQuarters=IC;ue.asYears=zC;ue.valueOf=MC;ue._bubble=jC;ue.clone=FC;ue.get=$C;ue.milliseconds=UC;ue.seconds=YC;ue.minutes=WC;ue.hours=HC;ue.days=VC;ue.weeks=QC;ue.months=BC;ue.years=GC;ue.humanize=qC;ue.toISOString=Pl;ue.toString=Pl;ue.toJSON=Pl;ue.locale=Cy;ue.localeData=jy;ue.toIsoString=Bt("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Pl);ue.lang=Dy;B("X",0,0,"unix");B("x",0,0,"valueOf");$("x",bl);$("X",k_);ke("X",function(e,t,n){n._d=new Date(parseFloat(e)*1e3)});ke("x",function(e,t,n){n._d=new Date(ie(e))});//! moment.js
z.version="2.29.4";e_(je);z.fn=R;z.min=U4;z.max=Y4;z.now=W4;z.utc=kn;z.unix=yC;z.months=xC;z.isDate=Qo;z.locale=fr;z.invalid=xl;z.duration=un;z.isMoment=ln;z.weekdays=kC;z.parseZone=vC;z.localeData=Wn;z.isDuration=Xa;z.monthsShort=wC;z.weekdaysMin=_C;z.defineLocale=cf;z.updateLocale=v4;z.locales=x4;z.weekdaysShort=SC;z.normalizeUnits=Gt;z.relativeTimeRounding=JC;z.relativeTimeThreshold=ZC;z.calendarFormat=pb;z.prototype=R;z.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"};const eD="/assets/hr-qr-code-3856ea95.jpg",tD="/assets/location-cf5a6f84.svg",nD="/assets/clock-718648c0.svg",rD="/assets/calendar-cd5a76f0.svg",iD=m.div`
  min-height: 100vh;
  padding-top: 84px;
  background: #fafafa;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`,oD=m.div`
  display: flex;
  max-width: 1440px;
  min-height: calc(100vh - 84px);
  margin-inline: auto;
  padding-block: 48px;
  padding-inline: 48px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`,aD=m.aside`
  display: block;
  width: 250px;
  margin-right: 48px;
  @media screen and (max-width: 1024px) {
    order: 2;
    width: 100%;
    margin-right: 0;
    margin-bottom: 32px;
  }
`,sD=m.main`
  flex-grow: 1;
  @media screen and (max-width: 1024px) {
    order: 3;
  }
`,lD=m.aside`
  width: 200px;
  margin-left: 48px;
  word-break: break-all;
  @media screen and (max-width: 1024px) {
    order: 1;
    width: 100%;
    margin-left: 0;
    margin-bottom: 32px;
  }
`,uD=m.section`
  position: sticky;
  top: calc(84px + 48px);
  left: 0;
  min-height: 100px;
  padding: 16px;
  background: #fff;
`,zy=m.section`
  padding: 16px;
  margin-bottom: 16px;
  min-height: 100px;
  background: #fff;
  :last-child {
    margin-bottom: 0;
  }
`,cD=m(zy)`
  position: sticky;
  top: calc(84px + 48px);
  left: 0;
`,Fy=m.p`
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 13.5px;
`,Pp=m(Fy)`
  color: #7680dd;
  word-break: keep-all;
  text-transform: capitalize;
`;m(Fy)`
  position: relative;
  padding-left: 24px;
  ::before {
    position: absolute;
    top: -3px;
    left: 0;
    content: '📨';
  }
`;const $y=m.p`
  font-size: 12px;
  margin-bottom: 6px;
`,Gn=m($y)`
  font-weight: 700;
`,Jt=m($y)`
  font-weight: 400;
  word-break: keep-all;
`,dD=m.span`
  color: #7680dd;
`,fD=m.img`
  display: block;
  width: 120px;
  margin-inline: auto;
`,hD=m.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`,pD=m.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
`;m.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`;const mD=m.section`
  min-height: 200px;
  /* background: #000; */
`,gD=m.div`
  display: flex;
  min-height: 200px;
  margin-bottom: 32px;
  padding: 20px;
  background: #fff;
  border: 1px solid rgba(20, 20, 20, 0.05);
  border-radius: 8px;
  box-shadow: 0px 1px 2.5px rgba(0, 0, 0, 0.03);
  :last-child {
    margin-bottom: 0;
  }
  @media screen and (max-width: 1024px) {
    padding: 15px;
    border-radius: 6px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 24px;
    padding: 10px;
    border-radius: 4px;
  }
`,yD=m.img`
  height: min-content;
  width: 60px;
  margin-right: 24px;
  @media screen and (max-width: 1024px) {
    width: 45px;
    margin-right: 18px;
  }
  @media screen and (max-width: 768px) {
    width: 30px;
    margin-right: 12px;
  }
`,vD=m.div`
  flex-grow: 1;
  position: relative;
`,xD=m.p`
  font-size: 15px;
  font-weight: 600;
  color: #7767a0;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`,wD=m.h3`
  font-size: 22.5px;
  font-weight: 600;
  margin-bottom: 12px;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
    margin-bottom: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 6px;
  }
`,kD=m.div`
  display: flex;
  margin-bottom: 12px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 9px;
    flex-direction: column;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 6px;
  }
`,xu=m.div`
  font-size: 15px;
  font-weight: 400;
  padding-right: 24px;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`,wu=m.div`
  position: relative;
  padding-left: 20px;
  font-size: 15px;
  font-weight: 400;
  padding-right: 24px;
  ::before {
    position: absolute;
    top: 3px;
    left: 0;
    display: inline-block;
    content: '';
    width: 16px;
    height: 16px;
    background-image: url(${e=>e.icon});
    background-size: cover;
  }
  @media screen and (max-width: 1024px) {
    font-size: 13px;
    ::before {
      width: 15px;
      height: 15px;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    ::before {
      width: 14px;
      height: 14px;
    }
  }
`,Uy=m.li`
  font-size: 13.5px;
  font-weight: 400;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
`,SD=m(Uy)`
  color: #7680dd;
`;m.button`
  padding: 6px 12px;
  color: #d9dbef;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  background: #7680dd;
  border: none;
  border-radius: 4px;
`;const _D=m.div`
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Rp=m.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 400;
`,Tp=m.input`
  margin: 0;
  margin-right: 10px;
  height: 14px;
  width: 14px;
`,Ap=[{id:"Distributed storage software development senior engineer".split(" ").join("-").toLowerCase(),label:"Distributed storage software development senior engineer",tag:["full-time","urgent recruitment"],workNature:"Teleworking",workType:"fullTime",releaseTime:"2023-5-17",content:[{title:"[Job Responsibilities]",body:["Participate in the development of high-performance distributed storage systems, involving development content including but not limited to:Distributed storage system development;","Improve the testing of DatenLord and build a new DatenLord testing framework;","Improve the performance of DatenLord distributed performance."]},{title:"[Job Requirements]",body:["At least 5 years of experience in distributed system development or research, preferably in distributed storage system development or research;","Relevant development and usage experience of distributed storage systems such as HDFS , Ceph, GlusterFS;","Familiarity with Rust, C or C++ languages;","Experienced in developing and maintaining open source projects."]}]},{id:"Rust distributed storage development".split(" ").join("-").toLowerCase(),label:"Rust distributed storage development",tag:["internship","soon to be filled"],workNature:"Teleworking",workType:"internship",releaseTime:"2023-5-17",content:[{title:"[Job Responsibilities]",body:["Participate in the development of high-performance distributed storage systems, involving development content including but not limited to:","Distributed storage system development;","Distributed data consistency protocol research and development;","Distributed caching, data management services;","Kernel-driven development using Rust language."]},{title:"[Job Requirements]",body:["Proficiency in Rust language, familiar with multi-threaded, high concurrency programming;","Familiar with Linux operation system storage management related functions;","Strong learning ability, self-driven and team player;","6 months or more internship time, 4~5 days per week."]},{title:"[Preferred Skills]",body:["Familiarity with Rust asynchronous programming, experienced with tokio or async-std is preferred;","Familiar with distributed consistency protocol Paxos or Raft, distributed KV storage etcd, experienced in programming CSI interface of K8S is preferred;","Previously experienced with open source projects/open source contributions is preferred."]}]},{id:"FPGA development".split(" ").join("-").toLowerCase(),label:"FPGA development",tag:["internship"],workNature:"Teleworking",workType:"internship",releaseTime:"2023-5-17",content:[{title:"[Job Responsibilities]",body:["Responsible for implementing network IO acceleration based on FPGA, as well as the design and RTL implementation of algorithm acceleration for encryption, compression, coding, etc.;","Realize RTL design, integration and verification of commonly used peripheral interface IP;","Cooperate with upper layer software to realize software and hardware joint debugging."]},{title:"[Job Requirements]",body:["Familiar with FPGA-based design flow, familiar with Xilinx FPGA chip architecture, proficient in Xilinx FPGA development tools;","Proficiency in the use of Verilog, SystemVerilog and SystemVerilog Assertion;","Proficiency in TCL, Python scripting language;","Strong learning ability, self-driven and team player;","6 months or more of internship time, 4~5 days per week."]},{title:"[Preferred Skills]",body:["Familiarity with at least one new generation HDL language such as Bluespec, SpinalHDL, Chisel, Clash, etc;","Familiar with CXL, PCIe, AXI, ACE, CHI and other related bus interface development is preferred;","Familiar with TCP/IP, RDMA, NVMe protocols and experienced in encryption, compression and coding development is preferred."]}]},{id:"The joint hardware and software research and development internship".split(" ").join("-").toLowerCase(),label:"The joint hardware and software research and development internship",tag:["internship"],workNature:"Teleworking",workType:"internship",releaseTime:"2023-5-17",content:[{title:"[Job Responsibilities]",body:["Participate in the hardware and software development of high performance storage SoC chips:","Responsible for the RTL implementation of network IO acceleration;","Responsible for the design and RTL implementation of algorithm acceleration for encryption, compression, coding, etc.;","Responsible for Linux driver development of SoC chip;","Responsible for the implementation of hardware and software joint debugging and automated testing."]},{title:"[Job Requirements]",body:["Familiar with IC design flow, familiar with commonly used simulation, synthesis and other EDA tools;","Familiar with Xilinx's FPGA design flow, proficient in Xilinx's FPGA development tools;","Familiar with new generation HDL languages such as Bluespec, SpinalHDL, Chisel or Clash;","Familiarity with Rust for Linux development kernel modules, drivers;","Familiarity with QEMU-based toolchain of hardware and software joint debugging;","Strong learning ability, self-driven and team player."]},{title:"[Preferred Skills]",body:["Experienced in network or storage hardware system development is preferred;","Familiarity with TCP/IP or InfiniBand/RDMA network protocol stack is preferred;","Familiarity with protocol interface development such as CXL, PCIe, AXI, ACE, CHI, NVMe, etc. Is preferred;","Relevant experience in DSP domain, familiar with LDPC, fountain codes, elliptic curve encryption algorithms and zero-knowledge proof algorithms is preferred;","Experienced in Linux kernel network, file and storage related development is preferred;","Long-term internship (more than 1 year) is preferred."]}]}],bD=()=>{const[e,t]=j.useState(Ap),[n,r]=j.useState({fullTime:!0,internship:!0});return j.useEffect(()=>{t(Ap.filter(i=>n[i.workType]===!0))},[n]),u.jsxs(iD,{children:[u.jsx(Vt,{theme:"dark",activeId:"company"}),u.jsxs(oD,{children:[u.jsx(aD,{children:u.jsxs(uD,{children:[u.jsx(hD,{children:"Filters"}),u.jsx(pD,{children:"Type of employment"}),u.jsxs(Rp,{children:[u.jsx(Tp,{type:"checkbox",id:"full-time",checked:n.fullTime,onChange:()=>{const i={...n};i.fullTime=!i.fullTime,r(i)}}),u.jsx("label",{htmlFor:"full-time",children:"Full time"})]}),u.jsxs(Rp,{children:[u.jsx(Tp,{type:"checkbox",id:"internship",checked:n.internship,onChange:()=>{const i={...n};i.internship=!i.internship,r(i)}}),u.jsx("label",{htmlFor:"internship",children:"internship"})]})]})}),u.jsx(sD,{children:u.jsx(mD,{children:e.map(i=>{const{id:o,label:a,tag:s,workNature:l,workType:c,releaseTime:d,content:f}=i;return u.jsxs(gD,{children:[u.jsx(yD,{src:F0}),u.jsxs(vD,{children:[u.jsx(xD,{children:s.join(", ")}),u.jsx(_D,{children:u.jsx(wD,{children:a})}),u.jsxs(kD,{children:[u.jsx(wu,{icon:tD,children:l}),u.jsx(xu,{children:"·"}),u.jsx(wu,{icon:nD,children:c}),u.jsx(xu,{children:"·"}),u.jsx(xu,{children:"·"}),u.jsx(wu,{icon:rD,children:z(d,"YYYY-MM-DD").fromNow()})]}),f.map(({title:y,body:_})=>u.jsxs("div",{children:[u.jsx(SD,{as:"p",children:y}),u.jsx("ol",{children:_.map(x=>u.jsx(Uy,{children:x},x))})]},y))]})]},o)})})}),u.jsxs(lD,{children:[u.jsxs(zy,{children:[u.jsx(Pp,{children:"Interview process"}),u.jsx(Jt,{children:"Internship position:"}),u.jsx(Gn,{children:"Project written test"}),u.jsx(Jt,{children:"- two days"}),u.jsx(Gn,{children:"Idea review"}),u.jsx(Jt,{children:"- communication and mentoring"}),u.jsx(Gn,{children:"Performance optimization"}),u.jsx(Jt,{children:"- no more than one week"}),u.jsx(Gn,{children:"Cross-Interview"}),u.jsx("div",{style:{height:"0.25rem"}}),u.jsx(Jt,{children:"School recruitment / social recruitment positions:"}),u.jsx(Gn,{children:"Project written test"}),u.jsx(Jt,{children:"- two days"}),u.jsx(Gn,{children:"Idea review"}),u.jsx(Jt,{children:"- communication and mentoring"}),u.jsx(Gn,{children:"Performance optimization"}),u.jsx(Jt,{children:"- no more than one week"}),u.jsx(Gn,{children:"Technical open talk evaluation"})]}),u.jsxs(cD,{children:[u.jsx(Pp,{children:"How to apply"}),u.jsx(Jt,{children:"- Resume submission to the email:"}),u.jsx(Jt,{children:u.jsx(dD,{children:"info@datenlord.com"})}),u.jsx(Jt,{children:"- Scan the QR code to add WeChat of DatenLord assistant"}),u.jsx(fD,{src:eD})]})]})]})]})},CD="/assets/gitter-c3110784.svg",DD="/assets/github-dbd6884e.svg",jD=[{id:"WangHengyu",label:"Hengyu Wang"},{id:"LiHongyu",label:"Hongyu Li"}],ED=m.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`,MD=m.div`
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-inline: 128px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    padding-block: 48px;
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 32px;
    padding-inline: 64px;
  }
`,PD=m.div`
  display: flex;
  align-items: center;
  margin-bottom: 96px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 72px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 48px;
  }
`,RD=m.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 96px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 72px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 48px;
  }
`,TD=m.div``,AD=m.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    align-items: center;
  }
`,OD=m.img`
  margin-right: 64px;
  width: 100%;
  @media screen and (max-width: 1024px) {
    margin-bottom: 48px;
    margin-right: 0;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 32px;
    margin-right: 0;
  }
`,Yy=m.div`
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.1;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    font-size: 22.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 15px;
  }
`,LD=m(Yy)`
  padding-left: 24px;
  border-left: 24px solid #7680dd;
  margin-bottom: 48px;
  @media screen and (max-width: 1024px) {
    padding-left: 18px;
    border-width: 18px;
    margin-bottom: 36px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 12px;
    border-width: 12px;
    margin-bottom: 24px;
  }
`,Wy=m.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
`,Op=m.div`
  font-weight: 400;
  font-size: 13.5px;
  line-height: 1.65;
  margin-bottom: 27px;
  @media screen and (max-width: 1024px) {
    font-size: 12;
    margin-bottom: 20.25px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 13.5px;
  }
`,Lp=m.div`
  padding: 28px;
  width: 48%;
  border-radius: 12px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 32px;
    padding: 21px;
    border-radius: 9px;
  }
  @media screen and (max-width: 768px) {
    padding: 14px;
    border-radius: 6px;
  }
`,Np=m.div`
  display: flex;
  align-items: center;
  margin-bottom: 27px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 20.25px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 13.5px;
  }
`,Ip=m.div`
  height: 100%;
  margin-right: 16px;
  padding-right: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 0.9;
  border-right: 2px solid #000;
  @media screen and (max-width: 1024px) {
    margin-right: 12px;
    padding-right: 12px;
    font-size: 13.5px;
    border-width: 1.5px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 8px;
    padding-right: 8px;
    font-size: 12px;
    border-width: 1px;
  }
`,zp=m.img`
  width: 14px;
  @media screen and (max-width: 1024px) {
    width: 10.5px;
  }
  @media screen and (max-width: 768px) {
    width: 7px;
  }
`,Ra=m.div`
  width: fit-content;
  margin-inline: auto 16px;
  padding: 4px 32px;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  color: white;
  font-weight: 400;
  font-size: 13.5px;
  line-height: 1.66;
  border-radius: 46.5px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    margin-right: 12px;
    padding: 3px 24px;
    border-radius: 34.9px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 8px;
    padding: 2px 16px;
    font-size: 12px;
    border-radius: 23.25px;
  }
`,ND=m.div`
  border-radius: 16px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.160784);
  overflow: hidden;
`,ID=m.div`
  display: flex;
  /* height: 100%; */
  width: 100%;
  height: 80px;
  @media screen and (max-width: 1024px) {
    height: 60px;
  }
  @media screen and (max-width: 768px) {
    height: 40px;
  }
`,zD=m.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: ${({isActive:e})=>e?"white":"inherit"};
  font-weight: 600;
  font-size: 22.5px;
  line-height: 1.48;
  background: ${({isActive:e})=>e?"#7680DD":"white"};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: 16.875px;
    border-top-left-radius: 10.5;
    border-top-right-radius: 10.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 11.25px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
`,FD=m.div`
  padding: 64px;
  background: #d9dbef;
  @media screen and (max-width: 1024px) {
    padding: 48px;
  }
  @media screen and (max-width: 768px) {
    padding: 32px;
  }
`,$D=m.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    margin: 16px;
  }
`,Fp=m(Wy)`
  width: 46%;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 32px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 24px;
  }
`,Ta={description:["Hengyu Wang is a graduate student majoring in computer science. He joined the async-rdma project because it happens to fit in his academic interest on integrating software and hardware. Guided by his community mentor, he grows with the development of the project and is invited to share his practical experience on using Rust to package RDMA on several hands-on workshops.","I am having unforgettable experience with the async-rdma project. The DatenLord community is friendly and my mentor is a seasoned engineer who encourages me to verify my ideas and assumptions about the project while pay attention to the engineering discipline, which shift my perspective from a student who merely focuses on running a program to a professional engineer who cares about its maintainability and stability as well."],id:"GTwhy",url:"https://github.com/GTwhy"},Aa={description:["Hongyu Li is passionate about open source community and Rust, and thus joined this particular project of DatenLord to add support for Rust to be merged in the Linux kernel. With the guidance of his community mentor, he honed his skills in Rust in the process of contributing code, writing document and replying revisions to the upstream.","Working with the Rust for Linux project in DatenLord is rewarding. The community is friendly and interactive. I was encouraged by my mentor to seriously weigh different options to revise even a small bug and go beyond just write code, but lines of ELEGANT codes. What I acquire in the community is not only conceptual, but practical."],id:"Richard Li",url:"https://github.com/Richardhongyu"},UD=()=>{const[e,t]=j.useState("WangHengyu");return u.jsxs(ED,{children:[u.jsx(Vt,{theme:"dark",activeId:"resources"}),u.jsxs(MD,{children:[u.jsxs(PD,{children:[u.jsx(OD,{src:yo}),u.jsxs(AD,{children:[u.jsx(Yy,{children:"Contributing is Thinking and Learning"}),u.jsx(Wy,{children:"Open source is not merely about contributing code in Github. In Datenlord, however, we believe that giving is thinking and learning, and together with the received feedback from the virtual community are capable of framing trust and collaboration."})]})]}),u.jsxs(RD,{children:[u.jsxs(Lp,{children:[u.jsxs(Np,{children:[u.jsx(Ip,{children:"Join Conversation on Gitter"}),u.jsx(zp,{src:CD})]}),u.jsx(Op,{children:"Join our community of experts in building the next generation of cloud-native, geo-distributed storage system"}),u.jsx(Ra,{as:"a",href:"https://app.gitter.im/#/room/#datenlord_datenlord:gitter.im",children:"DatenLord Gitter Channel"})]}),u.jsxs(Lp,{children:[u.jsxs(Np,{children:[u.jsx(Ip,{children:"Become A Contributor"}),u.jsx(zp,{src:DD})]}),u.jsx(Op,{children:"Looking for the source code, or have an idea to contribute? Join our open source community on GitHub."}),u.jsx(Ra,{as:"a",href:"https://github.com/datenlord",children:"DatenLord on Github"})]})]}),u.jsxs(TD,{children:[u.jsx(LD,{children:"Story Spotlight"}),u.jsxs(ND,{children:[u.jsx(ID,{children:jD.map(({id:n,label:r})=>u.jsx(zD,{isActive:e===n,onClick:()=>t(n),children:r},n))}),u.jsxs(FD,{children:[u.jsxs($D,{children:[u.jsx(Fp,{children:e==="WangHengyu"?Ta.description[0]:Aa.description[0]}),u.jsx(Fp,{children:e==="WangHengyu"?Ta.description[1]:Aa.description[1]})]}),e==="WangHengyu"?u.jsxs(Ra,{as:"a",href:Ta.url,children:["Github ID: ",Ta.id]}):u.jsxs(Ra,{as:"a",href:Aa.url,children:["Github ID: ",Aa.id]})]})]})]})]})]})},YD=m.div`
  padding-top: 84px;
  color: #42424a;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`,WD=m.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-inline: 128px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    padding-block: 48px;
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 32px;
    padding-inline: 64px;
  }
  @media screen and (max-width: 425px) {
    padding-block: 24px;
    padding-inline: 48px;
  }

`,Hy=m.div`
  margin-bottom: 52px;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.1;
  text-align: center;
  @media screen and (max-width: 1024px) {
    margin-bottom: 39px;
    font-size: 22.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 26px;
    font-size: 15px;
  }
`,HD=m.div`
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 22.5px;
  line-height: 1.5;
  text-align: center;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    font-size: 16.875px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 11.25px;
  }
`,Nc=m.div`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    margin-bottom: 12px;
    font-size: 13.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
    font-size: 9px;
  }
`,VD=m(Hy)`
  padding-left: 16px;
  text-align: left;
  border-left: 16px solid #7680dd;
  @media screen and (max-width: 1024px) {
    padding-left: 12px;
    border-width: 12px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 8px;
    border-width: 8px;
  }
`,$p=m(Nc)`
  margin-bottom: 32px;
  padding-right: 12px;
  width: min-content;
  line-height: 1.375;
  border-right: 4px solid #7680dd;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    padding-right: 9px;
    border-width: 3px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    padding-right: 6px;
    border-width: 2px;
  }
`,Up=m.div`
  margin-bottom: 96px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 72px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 48px;
  }
`,Yp=m.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`,Ic=m.div`
  padding: 32px;
  width: 48%;
  min-height: 200px;
  border-radius: 14px;
  box-shadow: 0px 9px 30px rgba(0, 0, 0, 0.13);
  @media screen and (max-width: 1024px) {
    margin-bottom: 32px;
    width: 100%;
    padding: 24px;
    min-height: 150px;
    border-radius: 10.5px;
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    min-height: 150px;
    border-radius: 7px;
  }
`,BD=m(Ic)`
  cursor: pointer;
`,Wp=m.div`
  font-weight: 400;
  font-size: 13.5px;
  line-height: 1.66;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`,GD=m.img`
  display: block;
  width: 150px;
  height: 150px;
  margin-inline: auto;
  @media screen and (max-width: 1024px) {
    height: 112.5px;
    width: 112.5px;
  }
  @media screen and (max-width: 768px) {
    height: 75px;
    width: 75px;
  }
`,QD=()=>{var o,a,s,l;const[e,t]=j.useState(),n=Yn(),{id:r}=w0(),i=c=>{switch(c){case"Unified-and-High-Performance-Data-Access-Across-Clouds":return{title:"Unified and High Performance Data Access Across Clouds",problem:{title:"Cloud barrier leads to data isolation and data fragmentation:",description:"Data is bound to a specific cloud and cannot access freely. The isolation between clouds may not pose a problem when business scale is small. However, with the development of business which needs to access multiple clouds and multiple data centers world wide  frequently, data isolation and data fragmentation resulting from cloud barrier become impediment to business growth."},solution:{title:"Unified data management to automate data migration and backup:",description:"No matter where data is stored, DatenLord can accelerate data access across clouds by leveraging memory to cache hot data, and provide unified data management to automate data migration and backup."},related:[{title:"Geo-distributed metadata management",cover:Ga,url:"/solution/Geo-Distributed-Metadata-management"},{title:"Hardware acceleration for storage network",cover:yo,url:"/solution/Hardware-Acceleration-For-Storage-Network"}]};case"Geo-Distributed-Metadata-management":return{title:"Geo-Distributed Metadata management",problem:{title:"High latency and inconsistency for geo-distributed Storage",description:"Nowadays distributed consensus protocol is confined to be used in a single data center, and geo-distributed consensus protocol is only contemplated in theory. In the circumstances of accessing data across clouds, the speed and consistency has to be compromised."},solution:{title:"The first industrial geo-distributed metadata management by consensus protocol",description:"DatenLord leverages asynchronous programming architecture and bypasses the Linux kernel to achieve completely kernel-independent, autonomous scheduling and management of storage IO. The protocol ensures data consistency across data nodes. The low-latency geo-distributed consensus protocol guarantees high-speed and strong consistency in WAN scenarios; and no single point bottleneck in the system."},related:[{title:"Unified and high performance data access across cloud",cover:Fo,url:"/solution/Unified-and-High-Performance-Data-Access-Across-Clouds"},{title:"Hardware acceleration for storage network",cover:yo,url:"/solution/Hardware-Acceleration-For-Storage-Network"}]};case"Hardware-Acceleration-For-Storage-Network":return{title:"Hardware-Acceleration-For-Storage-Network",problem:{title:"High latency and inconsistency for geo-distributed Storage",description:"Communication across clouds requires reliable high-speed network and fast caching mechanism. Current software-based solution has become the performance bottleneck and can no longer meet the requirement as huge amount of data  already scatter around  different cloud providers and geo-distributed data centers."},solution:{title:"Hardware Accelerator",description:"Hardware agile development methodology to build customized hardware; Adoption of RDMA and DPDK to build high performance network; Hardware implementations of RDMA protocol, encryption, compression and encoding and ultra-fast storage proof. "},related:[{title:"Unified and high performance data access across cloud",cover:Ga,url:"/solution/Unified-and-High-Performance-Data-Access-Across-Clouds"},{title:"Hardware acceleration for storage network",cover:Fo,url:"/solution/Hardware-Acceleration-For-Storage-Network"}]};default:return{title:"Unified and High Performance Data Access Across Clouds",problem:{title:"Cloud barrier leads to data isolation and data fragmentation:",description:"Data is bound to a specific cloud and cannot access freely. The isolation between clouds may not pose a problem when business scale is small. However, with the development of business which needs to access multiple clouds and multiple data centers world wide  frequently, data isolation and data fragmentation resulting from cloud barrier become impediment to business growth."},solution:{title:"Unified data management to automate data migration and backup:",description:"No matter where data is stored, DatenLord can accelerate data access across clouds by leveraging memory to cache hot data, and provide unified data management to automate data migration and backup."},related:[{title:"Geo-distributed metadata management",cover:Ga,url:"/solution/Geo-Distributed-Metadata-management"},{title:"Hardware acceleration for storage network",cover:yo,url:"/solution/Hardware-Acceleration-For-Storage-Network"}]}}};return j.useEffect(()=>{window.scrollTo(0,0);const c=i(r);t(c)},[r]),u.jsx(YD,{children:u.jsxs(WD,{children:[u.jsx(Vt,{theme:"dark",activeId:"solution"}),u.jsxs(Up,{children:[u.jsx(Hy,{children:e==null?void 0:e.title}),u.jsxs(Yp,{children:[u.jsxs(Ic,{children:[u.jsx($p,{children:"Problem"}),u.jsx(Nc,{children:(o=e==null?void 0:e.problem)==null?void 0:o.title}),u.jsx(Wp,{children:(a=e==null?void 0:e.problem)==null?void 0:a.description})]}),u.jsxs(Ic,{children:[u.jsx($p,{children:"Solution"}),u.jsx(Nc,{children:(s=e==null?void 0:e.solution)==null?void 0:s.title}),u.jsx(Wp,{children:(l=e==null?void 0:e.solution)==null?void 0:l.description})]})]})]}),u.jsxs(Up,{children:[u.jsx(VD,{children:"Related Resources"}),u.jsx(Yp,{children:((e==null?void 0:e.related)||[]).map(({title:c,cover:d,url:f})=>u.jsxs(BD,{onClick:()=>n(f),children:[u.jsx(HD,{children:c}),u.jsx(GD,{src:d})]},c))})]})]})})},KD="modulepreload",XD=function(e){return"/"+e},Hp={},xf=function(t,n,r){if(!n||n.length===0)return t();const i=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=XD(o),o in Hp)return;Hp[o]=!0;const a=o.endsWith(".css"),s=a?'[rel="stylesheet"]':"";if(!!r)for(let d=i.length-1;d>=0;d--){const f=i[d];if(f.href===o&&(!a||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${s}`))return;const c=document.createElement("link");if(c.rel=a?"stylesheet":KD,a||(c.as="script",c.crossOrigin=""),c.href=o,document.head.appendChild(c),a)return new Promise((d,f)=>{c.addEventListener("load",d),c.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t())},JD="/assets/arrow-ecc6ea9b.svg",ZD=[{id:"rdma",label:"rdma"},{id:"xline",label:"Xline"},{id:"rust",label:"Rust"}],qD=[{id:999999,label:"ALL"},{id:1,label:"Last 1 Month"},{id:6,label:"Last 6 Months"},{id:12,label:"Last 1 Year"}],Vy=m.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 1.375;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`,Vp=m.div`
  max-width: 85%;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    margin-bottom: 12px;
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
    font-size: 12px;
  }
`,Bp=m.div`
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16.5px;
`,ej=m(Vy)`
  height: 32px;
  text-align: center;
`,tj=m(Vy)`
  margin-bottom: 26px;
  color: #7680dd;
`,nj=m.div`
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 8px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    margin-bottom: 12px;
    font-size: 6px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
    font-size: 4px;
  }
`,rj=m.img`
  display: block;
  margin-inline: auto;
  width: 100%;
  margin-top: 24px;
  border-radius: 8px;
  @media screen and (max-width: 1024px) {
    margin-top: 18px;
    border-radius: 6px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 12px;
    border-radius: 4px;
  }
`,ij=m.div`
  padding-top: 84px;
  color: #42424a;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`,oj=m.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-top: 48px;
  padding-inline: 128px;
  @media screen and (max-width: 1024px) {
    padding-block: 48px;
    padding-top: 32px;
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 32px;
    padding-top: 24px;
    padding-inline: 64px;
  }
  @media screen and (max-width: 425px) {
    padding-block: 16px;
    padding-top: 12px;
    padding-inline: 32px;
  }
`,aj=m.div`
  position: sticky;
  top: calc(84px + 48px + 48px);
  left: 0;
`,Gp=m.div`
  margin-bottom: 32px;
`,Qp=m.div`
  width: 200px;
  margin-bottom: 16px;
  padding-block: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  background: ${({isActive:e})=>e?"#D9DBEF":"white"};
  border: 1px solid #d9dbef;
  border-radius: 16px;
`,sj=m.div`
  column-count: 2;
  column-gap: 32px;
  flex-grow: 1;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`,lj=m.div`
  position: relative;
  margin-bottom: 32px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.160784);
  cursor: pointer;
  page-break-inside: avoid;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 8px;
  }
`,uj=m.div`
  flex-shrink: 0;
  width: 250px;
  margin-right: 32px;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`,cj=m.img`
  position: absolute;
  top: 36px;
  right: 36px;
  width: 18px;
  height: 18px;
  @media screen and (max-width: 1024px) {
    top: 27px;
    right: 27px;
    width: 13.5px;
    height: 13.5px;
  }
  @media screen and (max-width: 768px) {
    top: 18px;
    right: 27px;
    width: 13.5px;
    height: 13.5px;
  }
`,Kp=Object.assign({"/src/blogs/2022-07-21-Understanding-Functor-in-Rust/index.md":()=>xf(()=>import("./index-99aeb84d.js"),[])}),dj=()=>{const[e,t]=j.useState([]),[n,r]=j.useState([]),[i,o]=j.useState([]),[a,s]=j.useState(999999),l=Yn();j.useEffect(()=>{Promise.all(Object.keys(Kp).map(d=>Kp[d]())).then(d=>{t(d),r(d)})},[]);function c(d,f){const y=new Set(d);return console.log(f.some(_=>y.has(_))),f.some(_=>y.has(_))}return j.useEffect(()=>{const d=e.filter(f=>{const y=z(),_=z(f.metadata.date);return y.diff(_,"months")<=a});if(i.length===0){const f=d;console.log(f),r(f)}else{const f=d.filter(y=>c(i,y.metadata.tags));console.log(f),r(f)}},[i,a]),j.useEffect(()=>{},[e]),u.jsxs(ij,{children:[u.jsx(Vt,{theme:"dark",activeId:"resources"}),u.jsx(ej,{children:"Blog"}),u.jsxs(oj,{children:[u.jsx(uj,{children:u.jsxs(aj,{children:[u.jsx(tj,{children:"Sort"}),u.jsxs(Gp,{children:[u.jsx(Bp,{children:"Category"}),ZD.map(({id:d,label:f})=>u.jsx(Qp,{isActive:i.includes(d),onClick:()=>{i.includes(d)?o(i.filter(y=>y!==d)):o([...i,d])},children:f},d))]}),u.jsxs(Gp,{children:[u.jsx(Bp,{children:"Time"}),qD.map(({id:d,label:f})=>u.jsx(Qp,{isActive:d===a,onClick:()=>s(d),children:f},d))]})]})}),u.jsx(sj,{children:n.length===0?u.jsx(Vp,{children:"No match results"}):n.map(d=>u.jsxs(lj,{onClick:()=>{l(`${d.metadata.date}-${d.metadata.title.split(" ").join("-")}`)},children:[u.jsx(cj,{src:JD}),u.jsx(Vp,{children:d.metadata.title}),u.jsx(nj,{children:d.metadata.description}),d.assetURLs[0]&&u.jsx(rj,{src:d.assetURLs[0],alt:"cover"})]},d.metadata.title))})]})]})},By=(e,t)=>{const n=j.useRef({});j.useEffect(()=>{const r=s=>{n.current=s.reduce((d,f)=>(d[f.target.innerHTML]=f,d),n.current);const l=[];Object.keys(n.current).forEach(d=>{const f=n.current[d];f.isIntersecting&&l.push(f)});const c=d=>a.findIndex(f=>f.id===d);if(l.length===1)e(l[0].target.id);else if(l.length>1){const d=l.sort((f,y)=>c(f.target.id)-c(y.target.id));e(d[0].target.id)}},i={rootMargin:"0px 0px -40% 0px"},o=new IntersectionObserver(r,i),a=Array.from(document.querySelectorAll("h2, h3"));return a.forEach(s=>o.observe(s)),()=>o.disconnect()},[t])},fj=m.div`
  padding-top: 84px;
  color: #42424a;
  background: #f5f5f5;
  min-height: 100vh;
`,hj=m.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-top: 32px;
  padding-inline: 128px;
`,pj=m.div`
  flex-grow: 1;
  margin-right: 32px;
  padding-inline: 64px;
  background: #fff;
  border-radius: 8px;
`,mj=m.div`
  flex-shrink: 0;
  width: 300px;
`,gj=m.div`
  position: sticky;
  top: calc(84px + 32px);
  left: 0;
  padding: 32px;
  background: #ffffff;
  border-radius: 8px;
`,yj=m.div`
  display: block;
  margin-block: 16px;
  padding-left: ${({level:e})=>e===3?"48px":"16px"};
  color: ${({isActive:e})=>e?"#722ed1":"inherit"};
  border-left: ${({isActive:e})=>e?"8px solid #722ed1":"8px solid transparent"};
  font-weight: 700;
  font-size: 0.18rem;
  line-height: 1.5;
  /* border-radius: 50%; */
  cursor: pointer;
`,vj=Object.assign({"/src/blogs/2022-07-21-Understanding-Functor-in-Rust/index.md":()=>xf(()=>import("./index-99aeb84d.js"),[])}),xj=()=>{const{params:e}=w0(),[t,n]=j.useState(),[r,i]=j.useState("");By(i,t),j.useEffect(()=>{vj[`/src/blogs/${e}/index.md`]().then(a=>{n(a)}).catch(a=>{console.log(a)})},[]);const o=a=>{var s;(s=document.querySelector(`#${a}`))==null||s.scrollIntoView({behavior:"smooth"})};return u.jsxs(fj,{children:[u.jsxs(hj,{children:[u.jsx(pj,{className:"content",dangerouslySetInnerHTML:{__html:(t==null?void 0:t.default)||""}}),(t==null?void 0:t.toc.length)!==0&&u.jsx(mj,{children:u.jsx(gj,{children:((t==null?void 0:t.toc)||[]).map(({label:a,level:s})=>{const l=a.split(" ").join("-").toLowerCase();return u.jsx(yj,{level:s,isActive:r===l,onClick:()=>o(l),children:a},a)})})})]}),u.jsx(Vt,{theme:"dark",activeId:"resources"})]})},wj="/assets/image1-9be52310.png",kj="/assets/image2-baebe8ee.png",Sj="/assets/image3-4fcf521a.png",_j="/assets/dot-37a9b3fe.svg",bj=m.div`
  margin-top: 84px;
  color: #42424a;
  font-family: PingFang SC;
  @media screen and (max-width: 1024px) {
    margin-top: 69px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 53px;
  }
`,Cj=m.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 24px;
  padding-inline: 165px;
  @media screen and (max-width: 1024px) {
    padding-block: 18px;
    padding-inline: 123.75px;
  }
  @media screen and (max-width: 768px) {
    margin-block: 12px;
    padding-inline: 82.5px;
  }
  @media screen and (max-width: 425px) {
    margin-block: 6px;
    padding-inline: 41.25px;
  }
`,Dj=m.h1`
  font-weight: 600px;
  font-size: 36px;
  line-height: 1.5;
  text-align: center;
  color: #42424a;
  @media screen and (max-width: 1024px) {
    font-size: 27px;
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`,jj=m.ul``,Ej=m.li`
  display: flex;
  align-items: center;
  padding-block: 24px;
  padding-inline: 12px;
  border-bottom: 0.5px solid #9a9a9a;
  cursor: pointer;
  /* :last-child {
    border-bottom: none;
  } */
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding-block: 18px;
    padding-inline: 9px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 12px;
    padding-inline: 6px;
  }
`,Mj=m.div`
  flex-grow: 1;
  margin-right: 48px;
  @media screen and (max-width: 1024px) {
    margin-right: 0;
  }
`,Pj=m.img`
  width: 40%;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`,Rj=m.div`
  margin-bottom: 6px;
  font-size: 15px;
  line-height: 2;
  font-weight: 600px;
  color: #7680dd;
  @media screen and (max-width: 1024px) {
    margin-bottom: 4.5px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 3px;
  }
`,Tj=m.div`
  margin-bottom: 27px;
  font-size: 27px;
  line-height: 1.22;
  font-weight: 600;
  color: #1e1e1e;
  @media screen and (max-width: 1024px) {
    margin-bottom: 20.25px;
    font-size: 20.25;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 13.5px;
    font-size: 16px;
  }
`,Aj=m.div`
  margin-bottom: 6px;
  font-size: 13.5px;
  line-height: 1.77;
  font-weight: 400;
  color: #7d7d7d;
  @media screen and (max-width: 1024px) {
    margin-bottom: 4.5px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 3px;
  }
`,Oj=m.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1%.5;
  font-weight: 600;
  @media screen and (max-width: 1024px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 6px;
  }
`,Lj=m.img`
  width: 22px;
  height: 22px;
  padding-inline: 8px;
  @media screen and (max-width: 1024px) {
    width: 16.5px;
    height: 16.5px;
    padding-inline: 6px;
  }
  @media screen and (max-width: 768px) {
    width: 11px;
    height: 11px;
    padding-inline: 4px;
  }
`,Nj=m.div`
  color: #797979;
`,Ij=m.div`
  color: #7680dd;
`,zj=[{date:"2023-01-19",title:"Geo-distributed Metadata Management System",description:"The webinar aims to briefly introduce DatenLord’s open source project Xline, a distributed metadata management system for multi-clusters. It reveals the motivation of Xline, the architecture of it and the important consensus protocol, CURP. The performance comparison shows the advantage of Xline over the current solution.",author:"By jicheng Shi",read:"19min",img:wj,url:"https://www.cncf.io/online-programs/cncf-on-demand-webinar-geo-distributed-metadata-management-system/"},{date:"2023-05-04",title:"Proofing the Correctness of the CURP Consensus Protocol Using TLA+",description:"The CURP Replication Protocol (NSDI ’19) aims to eliminate the additional round trips between servers in replicated state machines. We extended CURP into a consensus protocol and used it in our open source project Xline. This webinar is about how we modeled the CURP consensus protocol in TLA+ and verified the correctness of it.",author:"By Ye Tian",read:"20min",img:kj,url:"https://www.cncf.io/online-programs/cncf-on-demand-webinar-proofing-the-correctness-of-the-curp-consensus-protocol-using-tla/"},{date:"2023-09-08",title:"How to Write a Distributed Key-value store in Rust",description:"In this presentation, we will explore how to use Rust to build a distributed key-value store, taking the open-source distributed KV storage Xline as an example.",author:"By Jiawei Zhao",read:"35min",img:Sj,url:"https://community.cncf.io/events/details/cncf-cncf-online-programs-presents-cncf-on-demand-webinar-how-to-write-a-distributed-key-value-store-in-rust/"}],Fj=e=>{const{date:t,title:n,description:r,author:i,read:o,img:a,url:s}=e.data;return u.jsxs(Ej,{onClick:()=>window.location.href=`${s}`,children:[u.jsxs(Mj,{children:[u.jsx(Rj,{children:z(t,"YYYY-MM-DD").format("dddd MMMM D, YYYY")}),u.jsx(Tj,{children:n}),u.jsx(Aj,{children:r}),u.jsxs(Oj,{children:[u.jsx(Nj,{children:i}),u.jsx(Lj,{src:_j}),u.jsx(Ij,{children:o})]})]}),u.jsx(Pj,{src:a})]})},$j=()=>u.jsxs(bj,{children:[u.jsx(Vt,{theme:"dark",activeId:"resources"}),u.jsx(Dj,{children:"Tech Talk"}),u.jsx(Cj,{children:u.jsx(jj,{children:zj.map(e=>u.jsx(Fj,{data:e},e.title))})})]}),Uj=m.div`
  background: #f5f5f5;
`;m.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 64px;
  width: 100%;
  background: #ffffff;
`;const Yj=m.main`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  margin-top: 64px;
  padding-inline: 64px;
  padding-block: 24px;
`,Wj=m.div`
  flex-grow: 1;
  margin-right: 32px;
  padding: 64px;
  background: #ffffff;
`,Hj=m.div`
  flex-shrink: 0;
  width: 300px;
`,Xp=m.div`
  height: 200px;
  margin-bottom: 24px;
  background: lightpink;
`,Vj=m.div`
  position: sticky;
  top: calc(64px + 24px);
  left: 0;
  padding: 32px;
  background: #ffffff;
`,Bj=m.div`
  display: block;
  padding-left: ${({level:e})=>e===2?"16px":"0"};
  color: ${({isActive:e})=>e?"red":"blue"};
  line-height: 2;
`,Gj=()=>{const[e,t]=j.useState(),[n,r]=j.useState("");By(r,e),j.useEffect(()=>{xf(()=>import("./test-6734be34.js"),[]).then(o=>{t(o)}).catch(o=>{console.log(o)})},[]);const i=o=>{var a;(a=document.querySelector(`#${o}`))==null||a.scrollIntoView({behavior:"smooth"})};return console.log(e==null?void 0:e.metadata.cover),u.jsxs(Uj,{children:[u.jsx("img",{src:e==null?void 0:e.assetURLs[0],alt:"fail"}),u.jsx("div",{children:e==null?void 0:e.assetURLs}),u.jsxs(Yj,{children:[u.jsx(Wj,{className:"content",dangerouslySetInnerHTML:{__html:(e==null?void 0:e.default)||""}}),u.jsxs(Hj,{children:[u.jsx(Xp,{}),u.jsx(Xp,{}),u.jsx(Vj,{children:((e==null?void 0:e.toc)||[]).map(({label:o,level:a})=>{const s=o.split(" ").join("-").toLowerCase();return u.jsx(Bj,{level:a,isActive:n===s,onClick:()=>i(s),children:o},o)})})]})]})]})},Qj=Uw([{path:"",element:u.jsx(DS,{})},{path:"products/RDMA",element:u.jsx(GS,{})},{path:"customers",element:u.jsx(i2,{})},{path:"solution/:id",element:u.jsx(QD,{})},{path:"company",children:[{path:"why-join",element:u.jsx(R2,{})},{path:"contact-us",element:u.jsx(z2,{})},{path:"why-build",element:u.jsx(q2,{})},{path:"join-us",element:u.jsx(bD,{})}]},{path:"resources",children:[{path:"contribute",element:u.jsx(UD,{})},{path:"tech-talk",element:u.jsx($j,{})},{path:"blog",element:u.jsx(dj,{})},{path:"blog/:params",element:u.jsx(xj,{})}]},{path:"test",children:[{path:"full-page-scroll",element:u.jsx(RS,{})},{path:"toc",element:u.jsx(Gj,{})}]}]),Kj={color:"lightpink"},Xj=Wk`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter, sans-serif;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-block: 0;
  }

  p {
    margin-block: 0;
  }

  ol, ul {
    margin-block: 0;
    padding-inline-start: 0px;
  }

  a {
    display: block;
    text-decoration: none;
  }

  html{
    font-size: 100px;
    scroll-padding-top: 128px;

    @media screen and (max-width: 1440px) {
      font-size: 75px;
    }

    @media screen and (max-width: 1024px) {
      font-size: 54px;
    }

    @media screen and (max-width: 768px) {
      font-size: 40px;
    }

    @media screen and (max-width: 425px) {
      font-size: 30px;
    }
  }

  .content {
    font-weight: 400;
    font-size: 0.18rem;
    line-height: 0.28rem;
    h1 {
      margin-block: 0.48rem;
      font-weight: 700;
      font-size: 0.36rem;
      line-height: 0.52rem;
    }
    h2 {
      margin-block: 0.48rem;
      font-weight: 700;
      font-size: 0.32rem;
      line-height: 0.44rem;
    }
    h3 {
      margin-block: 0.4rem;
      font-weight: 700;
      font-size: 0.28rem;
      line-height: 0.36rem;
    }
    h4 {
      margin-block: 0.32rem;
      font-weight: 700;
      font-size: 0.24rem;
      line-height: 0.32rem;
    }
    h5 {
      margin-block: 0.32rem;
      font-weight: 700;
      font-size: 0.22rem;
      line-height: 0.28rem;
    }
    h6 {
      margin-block: 0.24rem;
      font-weight: 700;
      font-size: 0.2rem;
      line-height: 0.24rem;
    }
    p {
      margin-block: 0.32rem;
      font-weight: 400;
      font-size: 0.18rem;
      line-height: 0.28rem;
    }
    a {
      display: inline;
      text-decoration: underline;
      color: #0052D9;
    }
    img {
      margin-block: 0.64rem;
      display: block;
      margin-inline: auto;
      max-width: 60%;
    }
    ol, ul {
      margin-block: 0.16rem;
      padding-inline-start: 20px;
    }
    blockquote {
      margin-block: 0.32rem;
      margin-inline: 0;
      padding-left: 10px;
      color: #8c8c8c;
      border-left: 4px solid #8c8c8c
    }
    hr {
      margin-block: 0.48rem;
    }
    pre {
      padding: 12px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow-x: scroll;
      code {
        padding: 0;
      }
    }
    code {
    padding: 4px;
    border-radius: 4px;
    background: #f0f0f0;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    .hljs-comment,
    .hljs-quote {
      color: #998;
      font-style: italic;
    }
    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-subst {
      color: #333;
      font-weight: 700;
    }
    .hljs-literal,
    .hljs-number,
    .hljs-tag .hljs-attr,
    .hljs-template-variable,
    .hljs-variable {
      color: teal;
    }
    .hljs-doctag,
    .hljs-string {
      color: #d14;
    }
    .hljs-section,
    .hljs-selector-id,
    .hljs-title {
      color: #900;
      font-weight: 700;
    }
    .hljs-subst {
      font-weight: 400;
    }
    .hljs-class .hljs-title,
    .hljs-type {
      color: #458;
      font-weight: 700;
    }
    .hljs-attribute,
    .hljs-name,
    .hljs-tag {
      color: navy;
      font-weight: 400;
    }
    .hljs-link,
    .hljs-regexp {
      color: #009926;
    }
    .hljs-bullet,
    .hljs-symbol {
      color: #990073;
    }
    .hljs-built_in,
    .hljs-builtin-name {
      color: #0086b3;
    }
    .hljs-meta {
      color: #999;
      font-weight: 700;
    }
    .hljs-deletion {
      background: #fdd;
    }
    .hljs-addition {
      background: #dfd;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }
  }
`;Su.createRoot(document.getElementById("root")).render(u.jsxs(Uk,{theme:Kj,children:[u.jsx(Nw,{router:Qj}),u.jsx(Xj,{})]}))});export default Jj();