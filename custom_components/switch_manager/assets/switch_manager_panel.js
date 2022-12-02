/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$8=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$6=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$7(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$6(e,n)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$5(t){return e$7({...t,state:!0})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$9=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i$5(i,n){return o$9({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$8;null!=(null===(n$8=window.HTMLSlotElement)||void 0===n$8?void 0:n$8.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4=window,e$6=t$4.ShadowRoot&&(void 0===t$4.ShadyCSS||t$4.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$7=Symbol(),n$7=new WeakMap;class o$8{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$7)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$7.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$7.set(s,t));}return t}toString(){return this.cssText}}const r$5=t=>new o$8("string"==typeof t?t:t+"",void 0,s$7),i$4=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$8(n,t,s$7)},S$3=(s,n)=>{e$6?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$4.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$3=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$6;const e$5=window,r$4=e$5.trustedTypes,h$3=r$4?r$4.emptyScript:"",o$7=e$5.reactiveElementPolyfillSupport,n$6={toAttribute(t,i){switch(i){case Boolean:t=t?h$3:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$3=(t,i)=>i!==t&&(i==i||t==t),l$5={attribute:!0,type:String,converter:n$6,reflect:!1,hasChanged:a$3};class d$3 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$5){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$5}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$3(i));}else void 0!==i&&s.push(c$3(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$3(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$5){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$6).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$6;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$3)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}d$3.finalized=!0,d$3.elementProperties=new Map,d$3.elementStyles=[],d$3.shadowRootOptions={mode:"open"},null==o$7||o$7({ReactiveElement:d$3}),(null!==(s$6=e$5.reactiveElementVersions)&&void 0!==s$6?s$6:e$5.reactiveElementVersions=[]).push("1.4.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$3;const i$3=window,s$5=i$3.trustedTypes,e$4=s$5?s$5.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$6=`lit$${(Math.random()+"").slice(9)}$`,n$5="?"+o$6,l$4=`<${n$5}>`,h$2=document,r$3=(t="")=>h$2.createComment(t),d$2=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u$1=Array.isArray,c$2=t=>u$1(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a$2=/-->/g,f$1=/>/g,_$1=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m$1=/'/g,p$1=/"/g,$$1=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x$1=Symbol.for("lit-noChange"),b$1=Symbol.for("lit-nothing"),T$1=new WeakMap,A$1=h$2.createTreeWalker(h$2,129,null,!1),E$1=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v$1;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v$1?"!--"===u[1]?d=a$2:void 0!==u[1]?d=f$1:void 0!==u[2]?($$1.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_$1):void 0!==u[3]&&(d=_$1):d===_$1?">"===u[0]?(d=null!=h?h:v$1,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_$1:'"'===u[3]?p$1:m$1):d===p$1||d===m$1?d=_$1:d===a$2||d===f$1?d=v$1:(d=_$1,h=void 0);const y=d===_$1&&t[i+1].startsWith("/>")?" ":"";r+=d===v$1?s+l$4:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$6+y):s+o$6+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$4?e$4.createHTML(u):u,n]};class C$1{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E$1(t,i);if(this.el=C$1.createElement(v,e),A$1.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A$1.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$6)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$6),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M$1:"?"===i[1]?k$1:"@"===i[1]?H$1:S$2});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($$1.test(l.tagName)){const t=l.textContent.split(o$6),i=t.length-1;if(i>0){l.textContent=s$5?s$5.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r$3()),A$1.nextNode(),c.push({type:2,index:++h});l.append(t[i],r$3());}}}else if(8===l.nodeType)if(l.data===n$5)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$6,t+1));)c.push({type:7,index:h}),t+=o$6.length-1;}h++;}}static createElement(t,i){const s=h$2.createElement("template");return s.innerHTML=t,s}}function P$1(t,i,s=t,e){var o,n,l,h;if(i===x$1)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d$2(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P$1(t,r._$AS(t,i.values),r,e)),i}class V$1{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h$2).importNode(s,!0);A$1.currentNode=o;let n=A$1.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N$1(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I$1(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A$1.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N$1{constructor(t,i,s,e){var o;this.type=2,this._$AH=b$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P$1(this,t,i),d$2(t)?t===b$1||null==t||""===t?(this._$AH!==b$1&&this._$AR(),this._$AH=b$1):t!==this._$AH&&t!==x$1&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c$2(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b$1&&d$2(this._$AH)?this._$AA.nextSibling.data=t:this.T(h$2.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C$1.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V$1(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T$1.get(t.strings);return void 0===i&&T$1.set(t.strings,i=new C$1(t)),i}k(t){u$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N$1(this.O(r$3()),this.O(r$3()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S$2{constructor(t,i,s,e,o){this.type=1,this._$AH=b$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b$1;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P$1(this,t,i,0),n=!d$2(t)||t!==this._$AH&&t!==x$1,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P$1(this,e[s+l],i,l),h===x$1&&(h=this._$AH[l]),n||(n=!d$2(h)||h!==this._$AH[l]),h===b$1?t=b$1:t!==b$1&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M$1 extends S$2{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b$1?void 0:t;}}const R$1=s$5?s$5.emptyScript:"";class k$1 extends S$2{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b$1?this.element.setAttribute(this.name,R$1):this.element.removeAttribute(this.name);}}class H$1 extends S$2{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P$1(this,t,i,0))&&void 0!==s?s:b$1)===x$1)return;const e=this._$AH,o=t===b$1&&e!==b$1||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b$1&&(e===b$1||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I$1{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P$1(this,t);}}const z$1=i$3.litHtmlPolyfillSupport;null==z$1||z$1(C$1,N$1),(null!==(t$3=i$3.litHtmlVersions)&&void 0!==t$3?t$3:i$3.litHtmlVersions=[]).push("2.4.0");const Z$1=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N$1(i.insertBefore(r$3(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$3,o$5;class s$4 extends d$3{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z$1(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x$1}}s$4.finalized=!0,s$4._$litElement$=!0,null===(l$3=globalThis.litElementHydrateSupport)||void 0===l$3||l$3.call(globalThis,{LitElement:s$4});const n$4=globalThis.litElementPolyfillSupport;null==n$4||n$4({LitElement:s$4});(null!==(o$5=globalThis.litElementVersions)&&void 0!==o$5?o$5:globalThis.litElementVersions=[]).push("3.2.2");

var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}

// Material Design Icons v7.0.96
var mdiAlertOutline = "M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";
var mdiArrowLeft = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
var mdiContentSave = "M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z";
var mdiDelete = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
var mdiDotsVertical = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
var mdiGestureTapButton = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z";
var mdiPlayCircleOutline = "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z";
var mdiPlus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
var mdiRenameBox = "M18,17H10.5L12.5,15H18M6,17V14.5L13.88,6.65C14.07,6.45 14.39,6.45 14.59,6.65L16.35,8.41C16.55,8.61 16.55,8.92 16.35,9.12L8.47,17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z";
var mdiStopCircleOutline = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9";

const MODES = ["single", "restart", "queued", "parallel"];

// Polymer legacy event helpers used courtesy of the Polymer project.
//
// Copyright (c) 2017 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/**
 * Dispatches a custom event with an optional detail value.
 *
 * @param {string} type Name of event type.
 * @param {*=} detail Detail value containing event-specific
 *   payload.
 * @param {{ bubbles: (boolean|undefined),
 *           cancelable: (boolean|undefined),
 *           composed: (boolean|undefined) }=}
 *  options Object specifying options.  These may include:
 *  `bubbles` (boolean, defaults to `true`),
 *  `cancelable` (boolean, defaults to false), and
 *  `node` on which to fire the event (HTMLElement, defaults to `this`).
 * @return {Event} The new event that was fired.
 */
const fireEvent = (node, type, detail, options) => {
    options = options || {};
    // @ts-ignore
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

const DOMAIN = 'switch_manager';
function computeRTL(hass) {
    const lang = hass.language || "en";
    if (hass.translationMetadata.translations[lang]) {
        return hass.translationMetadata.translations[lang].isRTL || false;
    }
    return false;
}
function computeRTLDirection(hass) {
    return emitRTLDirection(computeRTL(hass));
}
function emitRTLDirection(rtl) {
    return rtl ? "rtl" : "ltr";
}
function buildUrl(suffix) {
    if (!suffix)
        return `/${DOMAIN}`;
    return `/${DOMAIN}/${suffix}`;
}
function buildAssetUrl(asset) {
    return `/assets/${DOMAIN}/${asset}`;
}
function buildWSPath(suffix) {
    return `${DOMAIN}/${suffix}`;
}
function getValueById(dom, id, in_render_root = true) {
    if (in_render_root)
        return dom.renderRoot.querySelector(`#${id}`).value.trim();
    return dom.querySelector(`#${id}`).value.trim();
}
function createConfigFromBlueprint(blueprint) {
    let config = {
        id: null,
        name: 'New Switch',
        enabled: true,
        identifier: '',
        blueprint: blueprint,
        valid_blueprint: true,
        buttons: []
    };
    blueprint.buttons.forEach((button, i) => {
        config.buttons[i] = {
            actions: []
        };
        button.actions.forEach((action, ii) => {
            config.buttons[i].actions[ii] = {
                mode: MODES[0],
                sequence: []
            };
        });
    });
    return config;
}
function navigate(ev) {
    if (typeof ev == 'string') {
        window.history.pushState({}, null, ev);
        window.dispatchEvent(new PopStateEvent('popstate'));
        return false;
    }
    var target = ev.target;
    if (target.localName !== 'a')
        target = target.closest('a');
    if (target.localName === 'a' && target.href) {
        window.history.pushState({}, null, target.href);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }
    return false;
}
const loadComponents = async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (customElements.get('ha-automation-action') && customElements.get('ha-data-table')) {
        return;
    }
    await customElements.whenDefined("partial-panel-resolver");
    const ppResolver = document.createElement("partial-panel-resolver");
    const routes = ppResolver.getRoutes([
        {
            component_name: "config",
            url_path: "a",
        },
    ]);
    await ((_c = (_b = (_a = routes === null || routes === void 0 ? void 0 : routes.routes) === null || _a === void 0 ? void 0 : _a.a) === null || _b === void 0 ? void 0 : _b.load) === null || _c === void 0 ? void 0 : _c.call(_b));
    await customElements.whenDefined("ha-panel-config");
    const configRouter = document.createElement("ha-panel-config");
    // await configRouter?.routerOptions?.routes?.dashboard?.load?.(); // Load ha-config-dashboard
    await ((_g = (_f = (_e = (_d = configRouter === null || configRouter === void 0 ? void 0 : configRouter.routerOptions) === null || _d === void 0 ? void 0 : _d.routes) === null || _e === void 0 ? void 0 : _e.script) === null || _f === void 0 ? void 0 : _f.load) === null || _g === void 0 ? void 0 : _g.call(_f)); // Load ha-data-table
    await customElements.whenDefined("ha-config-dashboard");
};
// export const fireEvent = (  
//     node: HTMLElement | Window,
//     type: string,
//     detail?: {},
//     options?: {
//       bubbles?: boolean;
//       cancelable?: boolean;
//       composed?: boolean;
//     }) => 
// {
//     options = options || {};
//     // @ts-ignore
//     detail = detail === null || detail === undefined ? {} : detail;
//     const event = new Event(type, {
//       bubbles: options.bubbles === undefined ? true : options.bubbles,
//       cancelable: Boolean(options.cancelable),
//       composed: options.composed === undefined ? true : options.composed,
//     });
//     (event as any).detail = detail;
//     node.dispatchEvent(event);
//     return event;
// }
const createCloseHeading = (title) => y `
    <div class="header_title">${title}</div>
    <ha-icon-button
      .label=${'Close'}
      .path=${mdiClose}
      dialogAction="close"
      class="header_button"></ha-icon-button>`;
const showToast = (el, params) => fireEvent(el, "hass-notification", params);
const showConfirmDialog = (element, dialogParams) => new Promise((resolve) => {
    const origCancel = dialogParams.cancel;
    const origConfirm = dialogParams.confirm;
    fireEvent(element, "show-dialog", {
        dialogTag: "switch-manager-dialog-confirm",
        dialogImport: () => Promise.resolve().then(function () { return dialogConfirm; }),
        dialogParams: Object.assign(Object.assign({}, dialogParams), { cancel: () => {
                resolve((dialogParams === null || dialogParams === void 0 ? void 0 : dialogParams.prompt) ? null : false);
                if (origCancel) {
                    origCancel();
                }
            }, confirm: () => {
                resolve((dialogParams === null || dialogParams === void 0 ? void 0 : dialogParams.prompt) ? null : true);
                if (origConfirm) {
                    origConfirm();
                }
            } }),
    });
});

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window,
  e$3 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  s$3 = Symbol(),
  n$3 = new WeakMap();
class o$4 {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== s$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e$3 && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = n$3.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && n$3.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const r$2 = t => new o$4("string" == typeof t ? t : t + "", void 0, s$3),
  i$2 = (t, ...e) => {
    const n = 1 === t.length ? t[0] : e.reduce((e, s, n) => e + (t => {
      if (!0 === t._$cssResult$) return t.cssText;
      if ("number" == typeof t) return t;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s) + t[n + 1], t[0]);
    return new o$4(n, t, s$3);
  },
  S$1 = (s, n) => {
    e$3 ? s.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(e => {
      const n = document.createElement("style"),
        o = t$2.litNonce;
      void 0 !== o && n.setAttribute("nonce", o), n.textContent = e.cssText, s.appendChild(n);
    });
  },
  c$1 = e$3 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";
    for (const s of t.cssRules) e += s.cssText;
    return r$2(e);
  })(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$2 = window,
  r$1 = e$2.trustedTypes,
  h$1 = r$1 ? r$1.emptyScript : "",
  o$3 = e$2.reactiveElementPolyfillSupport,
  n$2 = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? h$1 : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    }
  },
  a$1 = (t, i) => i !== t && (i == i || t == t),
  l$2 = {
    attribute: !0,
    type: String,
    converter: n$2,
    reflect: !1,
    hasChanged: a$1
  };
class d$1 extends HTMLElement {
  constructor() {
    super(), this._$Ei = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var i;
    this.finalize(), (null !== (i = this.h) && void 0 !== i ? i : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this._$Ep(s, i);
      void 0 !== e && (this._$Ev.set(e, s), t.push(e));
    }), t;
  }
  static createProperty(t, i = l$2) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const r = this[t];
        this[i] = e, this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), void 0 !== t.h && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
        i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());
      for (const i of e) s.unshift(c$1(i));
    } else void 0 !== i && s.push(c$1(i));
    return s;
  }
  static _$Ep(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach(t => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$EO(t, i, s = l$2) {
    var e;
    const r = this.constructor._$Ep(t, s);
    if (void 0 !== r && !0 === s.reflect) {
      const h = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : n$2).toAttribute(i, s.type);
      this._$El = t, null == h ? this.removeAttribute(r) : this.setAttribute(r, h), this._$El = null;
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      r = e._$Ev.get(t);
    if (void 0 !== r && this._$El !== r) {
      const t = e.getPropertyOptions(r),
        h = "function" == typeof t.converter ? {
          fromAttribute: t.converter
        } : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute) ? t.converter : n$2;
      this._$El = r, this[r] = h.fromAttribute(i, t.type), this._$El = null;
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || a$1)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i) => this[i] = t), this._$Ei = void 0);
    let i = !1;
    const s = this._$AL;
    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this._$Ek();
    } catch (t) {
      throw i = !1, this._$Ek(), t;
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
d$1.finalized = !0, d$1.elementProperties = new Map(), d$1.elementStyles = [], d$1.shadowRootOptions = {
  mode: "open"
}, null == o$3 || o$3({
  ReactiveElement: d$1
}), (null !== (s$2 = e$2.reactiveElementVersions) && void 0 !== s$2 ? s$2 : e$2.reactiveElementVersions = []).push("1.4.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = window,
  s$1 = i$1.trustedTypes,
  e$1 = s$1 ? s$1.createPolicy("lit-html", {
    createHTML: t => t
  }) : void 0,
  o$2 = `lit$${(Math.random() + "").slice(9)}$`,
  n$1 = "?" + o$2,
  l$1 = `<${n$1}>`,
  h = document,
  r = (t = "") => h.createComment(t),
  d = t => null === t || "object" != typeof t && "function" != typeof t,
  u = Array.isArray,
  c = t => u(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
  v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  a = /-->/g,
  f = />/g,
  _ = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g"),
  m = /'/g,
  p = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  x = Symbol.for("lit-noChange"),
  b = Symbol.for("lit-nothing"),
  T = new WeakMap(),
  A = h.createTreeWalker(h, 129, null, !1),
  E = (t, i) => {
    const s = t.length - 1,
      n = [];
    let h,
      r = 2 === i ? "<svg>" : "",
      d = v;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let e,
        u,
        c = -1,
        g = 0;
      for (; g < s.length && (d.lastIndex = g, u = d.exec(s), null !== u);) g = d.lastIndex, d === v ? "!--" === u[1] ? d = a : void 0 !== u[1] ? d = f : void 0 !== u[2] ? ($.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = _) : void 0 !== u[3] && (d = _) : d === _ ? ">" === u[0] ? (d = null != h ? h : v, c = -1) : void 0 === u[1] ? c = -2 : (c = d.lastIndex - u[2].length, e = u[1], d = void 0 === u[3] ? _ : '"' === u[3] ? p : m) : d === p || d === m ? d = _ : d === a || d === f ? d = v : (d = _, h = void 0);
      const y = d === _ && t[i + 1].startsWith("/>") ? " " : "";
      r += d === v ? s + l$1 : c >= 0 ? (n.push(e), s.slice(0, c) + "$lit$" + s.slice(c) + o$2 + y) : s + o$2 + (-2 === c ? (n.push(void 0), i) : y);
    }
    const u = r + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [void 0 !== e$1 ? e$1.createHTML(u) : u, n];
  };
class C {
  constructor({
    strings: t,
    _$litType$: i
  }, e) {
    let l;
    this.parts = [];
    let h = 0,
      d = 0;
    const u = t.length - 1,
      c = this.parts,
      [v, a] = E(t, i);
    if (this.el = C.createElement(v, e), A.currentNode = this.el.content, 2 === i) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (l = A.nextNode()) && c.length < u;) {
      if (1 === l.nodeType) {
        if (l.hasAttributes()) {
          const t = [];
          for (const i of l.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(o$2)) {
            const s = a[d++];
            if (t.push(i), void 0 !== s) {
              const t = l.getAttribute(s.toLowerCase() + "$lit$").split(o$2),
                i = /([.?@])?(.*)/.exec(s);
              c.push({
                type: 1,
                index: h,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? M : "?" === i[1] ? k : "@" === i[1] ? H : S
              });
            } else c.push({
              type: 6,
              index: h
            });
          }
          for (const i of t) l.removeAttribute(i);
        }
        if ($.test(l.tagName)) {
          const t = l.textContent.split(o$2),
            i = t.length - 1;
          if (i > 0) {
            l.textContent = s$1 ? s$1.emptyScript : "";
            for (let s = 0; s < i; s++) l.append(t[s], r()), A.nextNode(), c.push({
              type: 2,
              index: ++h
            });
            l.append(t[i], r());
          }
        }
      } else if (8 === l.nodeType) if (l.data === n$1) c.push({
        type: 2,
        index: h
      });else {
        let t = -1;
        for (; -1 !== (t = l.data.indexOf(o$2, t + 1));) c.push({
          type: 7,
          index: h
        }), t += o$2.length - 1;
      }
      h++;
    }
  }
  static createElement(t, i) {
    const s = h.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(t, i, s = t, e) {
  var o, n, l, h;
  if (i === x) return i;
  let r = void 0 !== e ? null === (o = s._$Co) || void 0 === o ? void 0 : o[e] : s._$Cl;
  const u = d(i) ? void 0 : i._$litDirective$;
  return (null == r ? void 0 : r.constructor) !== u && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1), void 0 === u ? r = void 0 : (r = new u(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Co) && void 0 !== l ? l : h._$Co = [])[e] = r : s._$Cl = r), void 0 !== r && (i = P(t, r._$AS(t, i.values), r, e)), i;
}
class V {
  constructor(t, i) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var i;
    const {
        el: {
          content: s
        },
        parts: e
      } = this._$AD,
      o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : h).importNode(s, !0);
    A.currentNode = o;
    let n = A.nextNode(),
      l = 0,
      r = 0,
      d = e[0];
    for (; void 0 !== d;) {
      if (l === d.index) {
        let i;
        2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new I(n, this, t)), this.u.push(i), d = e[++r];
      }
      l !== (null == d ? void 0 : d.index) && (n = A.nextNode(), l++);
    }
    return o;
  }
  p(t) {
    let i = 0;
    for (const s of this.u) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class N {
  constructor(t, i, s, e) {
    var o;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cm = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
  }
  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = P(this, t, i), d(t) ? t === b || null == t || "" === t ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== x && this.g(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : c(t) ? this.k(t) : this.g(t);
  }
  O(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== b && d(this._$AH) ? this._$AA.nextSibling.data = t : this.T(h.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var i;
    const {
        values: s,
        _$litType$: e
      } = t,
      o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = C.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.p(s);else {
      const t = new V(o, this),
        i = t.v(this.options);
      t.p(s), this.T(i), this._$AH = t;
    }
  }
  _$AC(t) {
    let i = T.get(t.strings);
    return void 0 === i && T.set(t.strings, i = new C(t)), i;
  }
  k(t) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const o of t) e === i.length ? i.push(s = new N(this.O(r()), this.O(r()), this, this.options)) : s = i[e], s._$AI(o), e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM && (this._$Cm = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class S {
  constructor(t, i, s, e, o) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o) t = P(this, t, i, 0), n = !d(t) || t !== this._$AH && t !== x, n && (this._$AH = t);else {
      const e = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = P(this, e[s + l], i, l), h === x && (h = this._$AH[l]), n || (n = !d(h) || h !== this._$AH[l]), h === b ? t = b : t !== b && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !e && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const R = s$1 ? s$1.emptyScript : "";
class k extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }
}
class H extends S {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), this.type = 5;
  }
  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = P(this, t, i, 0)) && void 0 !== s ? s : b) === x) return;
    const e = this._$AH,
      o = t === b && e !== b || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
      n = t !== b && (e === b || o);
    o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class I {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const z = i$1.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t$1 = i$1.litHtmlVersions) && void 0 !== t$1 ? t$1 : i$1.litHtmlVersions = []).push("2.4.0");
const Z = (t, i, s) => {
  var e, o;
  const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let l = n._$litPart$;
  if (void 0 === l) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    n._$litPart$ = l = new N(i.insertBefore(r(), t), t, void 0, null != s ? s : {});
  }
  return l._$AI(t), l;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o$1;
class s extends d$1 {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Z(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return x;
  }
}
s.finalized = !0, s._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
  LitElement: s
});
const n = globalThis.litElementPolyfillSupport;
null == n || n({
  LitElement: s
});
(null !== (o$1 = globalThis.litElementVersions) && void 0 !== o$1 ? o$1 : globalThis.litElementVersions = []).push("3.2.2");

const buttonLinkStyle = i$2 `
  button.link {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
    outline: none;
  }
`;
const haStyle = i$2 `
  :host {
    font-family: var(--paper-font-body1_-_font-family);
    -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);
    font-size: var(--paper-font-body1_-_font-size);
    font-weight: var(--paper-font-body1_-_font-weight);
    line-height: var(--paper-font-body1_-_line-height);
  }

  app-header-layout,
  ha-app-layout {
    background-color: var(--primary-background-color);
  }

  app-header,
  app-toolbar {
    background-color: var(--app-header-background-color);
    font-weight: 400;
    color: var(--app-header-text-color, white);
  }

  app-toolbar {
    height: var(--header-height);
    border-bottom: var(--app-header-border-bottom);
    box-sizing: border-box;
  }

  app-header div[sticky] {
    height: 48px;
  }

  app-toolbar [main-title] {
    margin-left: 20px;
  }

  h1 {
    font-family: var(--paper-font-headline_-_font-family);
    -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
    white-space: var(--paper-font-headline_-_white-space);
    overflow: var(--paper-font-headline_-_overflow);
    text-overflow: var(--paper-font-headline_-_text-overflow);
    font-size: var(--paper-font-headline_-_font-size);
    font-weight: var(--paper-font-headline_-_font-weight);
    line-height: var(--paper-font-headline_-_line-height);
  }

  h2 {
    font-family: var(--paper-font-title_-_font-family);
    -webkit-font-smoothing: var(--paper-font-title_-_-webkit-font-smoothing);
    white-space: var(--paper-font-title_-_white-space);
    overflow: var(--paper-font-title_-_overflow);
    text-overflow: var(--paper-font-title_-_text-overflow);
    font-size: var(--paper-font-title_-_font-size);
    font-weight: var(--paper-font-title_-_font-weight);
    line-height: var(--paper-font-title_-_line-height);
  }

  h3 {
    font-family: var(--paper-font-subhead_-_font-family);
    -webkit-font-smoothing: var(--paper-font-subhead_-_-webkit-font-smoothing);
    white-space: var(--paper-font-subhead_-_white-space);
    overflow: var(--paper-font-subhead_-_overflow);
    text-overflow: var(--paper-font-subhead_-_text-overflow);
    font-size: var(--paper-font-subhead_-_font-size);
    font-weight: var(--paper-font-subhead_-_font-weight);
    line-height: var(--paper-font-subhead_-_line-height);
  }

  a {
    color: var(--primary-color);
  }

  .secondary {
    color: var(--secondary-text-color);
  }

  .error {
    color: var(--error-color);
  }

  .warning {
    color: var(--error-color);
  }

  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }

  ${buttonLinkStyle}

  .card-actions a {
    text-decoration: none;
  }

  .card-actions .warning {
    --mdc-theme-primary: var(--error-color);
  }

  .layout.horizontal,
  .layout.vertical {
    display: flex;
  }
  .layout.inline {
    display: inline-flex;
  }
  .layout.horizontal {
    flex-direction: row;
  }
  .layout.vertical {
    flex-direction: column;
  }
  .layout.wrap {
    flex-wrap: wrap;
  }
  .layout.no-wrap {
    flex-wrap: nowrap;
  }
  .layout.center,
  .layout.center-center {
    align-items: center;
  }
  .layout.bottom {
    align-items: flex-end;
  }
  .layout.center-justified,
  .layout.center-center {
    justify-content: center;
  }
  .flex {
    flex: 1;
    flex-basis: 0.000000001px;
  }
  .flex-auto {
    flex: 1 1 auto;
  }
  .flex-none {
    flex: none;
  }
  .layout.justified {
    justify-content: space-between;
  }
`;
const haStyleDialog = i$2 `
  /* mwc-dialog (ha-dialog) styles */
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
  }

  ha-dialog .form {
    color: var(--primary-text-color);
  }

  a {
    color: var(--primary-color);
  }

  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --mdc-dialog-min-width: calc(
        100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
      );
      --mdc-dialog-max-width: calc(
        100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
      );
      --mdc-dialog-min-height: 100%;
      --mdc-dialog-max-height: 100%;
      --vertical-align-dialog: flex-end;
      --ha-dialog-border-radius: 0px;
    }
  }
  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }
  .error {
    color: var(--error-color);
  }
`;
const haStyleScrollbar = i$2 `
  .ha-scrollbar::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }

  .ha-scrollbar::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: var(--scrollbar-thumb-color);
  }

  .ha-scrollbar {
    overflow-y: auto;
    scrollbar-color: var(--scrollbar-thumb-color) transparent;
    scrollbar-width: thin;
  }
`;
i$2 `
  body {
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    height: calc(100vh - 32px);
    width: 100vw;
  }
`;

const fabStyle = i$4 `
  .fab-container {
    position: absolute;
    right: 0;
    bottom: 0;
    overflow: hidden;
    padding: 1.2em;
  }
  ha-fab {
    position: relative;
  }
  ha-fab[collapse] {
    bottom: calc(-80px - env(safe-area-inset-bottom));
    transition: bottom 0.3s;
  }
  ha-fab.dirty {
    bottom: 0;
  }
  ha-fab.blocked {
    bottom: calc(-80px - env(safe-area-inset-bottom));
  }
`;

let SwitchManagerIndex = class SwitchManagerIndex extends s$4 {
    constructor() {
        super(...arguments);
        this._data = [];
        this._columns = memoizeOne(() => ({
            image: {
                title: "",
                sortable: false,
                filterable: false,
                grows: false,
                width: '90px',
                template: (blueprint_id, data) => {
                    if (!data.switch.valid_blueprint)
                        return '';
                    if (!data.switch.blueprint.has_image)
                        return y `<ha-svg-icon style="fill: var(--primary-color); margin: 0 auto;display:block;height: 85%;
                        width: 85%;" .path=${mdiGestureTapButton}></ha-svg-icon>`;
                    return y `<img style="max-height: 48px;display: block;margin:0 auto;" src="${buildAssetUrl(`${blueprint_id}.png`)}" />`;
                }
            },
            name: {
                title: 'Name',
                main: true,
                direction: "asc",
                sortable: true,
                filterable: true,
                grows: true,
                template: (name, data) => data.error ?
                    y `<span style="color: red;">${name} (${data.error})</span>`
                    : name
            },
            enabled: {
                title: "",
                width: "10%",
                template: (enabled) => !enabled ? y `
                        <ha-chip>
                            Disabled
                        </ha-chip>` : '',
            },
            service: {
                title: 'Service',
                sortable: true,
                filterable: true,
                width: '15%'
            },
            type: {
                title: 'Type',
                sortable: true,
                filterable: true,
                grows: false,
                width: '15%'
            },
            actions: {
                title: "",
                width: this.narrow ? undefined : "10%",
                type: "overflow-menu",
                template: (id, data) => y `
                        <ha-icon-overflow-menu
                        .hass=${this.hass}
                        narrow
                        .items=${[
                    {
                        path: !data.enabled ? mdiPlayCircleOutline : mdiStopCircleOutline,
                        label: !data.enabled ? 'Enable' : 'Disable',
                        disabled: (data.error),
                        action: () => this._toggleEnabled(data.switch_id, data.enabled),
                    },
                    {
                        label: "Delete",
                        path: mdiDelete,
                        action: () => this._deleteConfirm(data),
                        warning: true,
                    }
                ]}>
                        </ha-icon-overflow-menu>`
            }
        }));
    }
    render() {
        return y `
            <ha-app-layout>
                <app-header slot="header" fixed>
                    <app-toolbar>
                        <ha-menu-button
                            .hass=${this.hass}
                            .narrow=${this.narrow}
                            ></ha-menu-button>
                        <div main-title>Switch Manager</div>
                    </app-toolbar>
                </app-header>      
            </ha-app-layout>
            <hui-view>
                <hui-panel-view>
                    <ha-data-table
                        .columns=${this._columns()}
                        .data=${this._data}
                        noDataText="No Switches"
                        id="switch_id"
                        index="index"
                        clickable
                        @row-click=${this._rowClicked}
                        .dir=${computeRTLDirection(this.hass)}>

                    </ha-data-table>

                    <div class="fab-container">
                        <ha-fab
                            slot="fab"
                            .label=${'Add Switch'}
                            extended
                            @click=${this._showBlueprintDialog}>
                            <ha-svg-icon slot="icon" .path=${mdiPlus}></ha-svg-icon>
                        </ha-fab>
                    </div>
                </hui-panel-view>
            </hui-view>
        `;
    }
    static get styles() {
        return [
            haStyle,
            haStyleScrollbar,
            fabStyle,
            i$4 `
            ha-data-table {
            }
            hui-view {
                display: block;
                height: calc(100vh - var(--header-height));
                overflow-y: auto;
            }
        `
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this._populateSwitches();
    }
    _populateSwitches() {
        const __data = [];
        this.hass.callWS({ type: buildWSPath('configs') }).then(promise => {
            Object.values(promise.configs).forEach((_switch) => {
                let blueprint;
                if (_switch.valid_blueprint)
                    blueprint = _switch.blueprint;
                else
                    blueprint = { id: _switch.blueprint };
                __data.push({
                    switch: _switch,
                    image: blueprint.id,
                    switch_id: _switch.id,
                    error: _switch._error,
                    enabled: _switch.enabled,
                    name: _switch.name,
                    service: blueprint.service,
                    type: blueprint.name,
                    actions: _switch.id
                });
            });
            this._data = __data;
        });
    }
    _rowClicked(e) {
        navigate(buildUrl(`edit/${e.detail.id}`));
    }
    async _toggleEnabled(id, enabled) {
        this.hass.callWS({ type: buildWSPath('config/enabled'), enabled: !enabled, config_id: id }).then(r => {
            this._populateSwitches();
            showToast(this, {
                message: `Switch ${r.enabled ? 'Enabled' : 'Disabled'}`
            });
        }).catch(error => showToast(this, { message: error.message }));
    }
    async _deleteConfirm(_switch) {
        showConfirmDialog(this, {
            title: 'Delete switch?',
            text: `${_switch.name} will be permanently deleted.`,
            confirmText: 'Delete',
            dismissText: 'Cancel',
            confirm: () => this._delete(_switch.switch_id),
            confirmation: true,
            destructive: true,
        });
    }
    async _delete(id) {
        this.hass.callWS({ type: buildWSPath('config/delete'), config_id: id.toString() }).then(promise => {
            this._populateSwitches();
            showToast(this, {
                message: 'Switch Deleted'
            });
        }).catch(error => showToast(this, { message: error.message }));
    }
    _showBlueprintDialog() {
        fireEvent(this, 'show-dialog', {
            dialogTag: "switch-manager-dialog-blueprint-selector",
            dialogImport: () => Promise.resolve().then(function () { return dialogBlueprintSelector; }),
            dialogParams: {},
        });
    }
};
__decorate([
    e$7()
], SwitchManagerIndex.prototype, "hass", void 0);
__decorate([
    e$7()
], SwitchManagerIndex.prototype, "narrow", void 0);
__decorate([
    e$7()
], SwitchManagerIndex.prototype, "panel", void 0);
__decorate([
    e$7()
], SwitchManagerIndex.prototype, "route", void 0);
__decorate([
    t$5()
], SwitchManagerIndex.prototype, "_data", void 0);
SwitchManagerIndex = __decorate([
    e$8('switch-manager-index')
], SwitchManagerIndex);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=e(class extends i{constructor(t$1){var i;if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||(null===(i=t$1.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.nt){this.nt=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(t))&&this.nt.add(t);return this.render(s)}const e=i.element.classList;this.nt.forEach((t=>{t in s||(e.remove(t),this.nt.delete(t));}));for(const t in s){const i=!!s[t];i===this.nt.has(t)||(null===(o=this.st)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.nt.add(t)):(e.remove(t),this.nt.delete(t)));}return x$1}});

let SwitchManagerButtonActions = class SwitchManagerButtonActions extends s$4 {
    constructor() {
        super(...arguments);
        this.index = 0;
    }
    render() {
        if (!this.actions || this.actions.length == 1)
            return;
        return y `
            <div id="tabbar" .hass=${this.hass}>
                <paper-tabs selected="${this.index}" @iron-select=${this._tab_changed}>
                    ${this.actions.map(i => y `<paper-tab>${i.title}</paper-tab>`)}
                </paper-tabs>
            </div> 
        `;
    }
    static get styles() {
        return i$4 `
            :host {
                display: flex;
                justify-content: center;
            }

            paper-tabs {
                display: flex;
                justify-content: center;
                flex: 1 1 0%;
                height: var(--header-height);
            }
            paper-tab {
                padding: 0px 32px;
                box-sizing: border-box;
                text-transform: uppercase;
            }
            paper-tab.iron-selected {
                border-bottom: 2px solid var(--primary-color);
                color: var(--primary-color);
            }
        `;
    }
    _tab_changed(ev) {
        let event = new CustomEvent('changed', {
            detail: {
                index: ev.detail.item.parentNode.indexOf(ev.detail.item)
            }
        });
        this.dispatchEvent(event);
    }
};
__decorate([
    e$7()
], SwitchManagerButtonActions.prototype, "hass", void 0);
__decorate([
    t$5()
], SwitchManagerButtonActions.prototype, "actions", void 0);
__decorate([
    e$7({ reflect: true })
], SwitchManagerButtonActions.prototype, "index", void 0);
SwitchManagerButtonActions = __decorate([
    e$8('switch-manager-button-actions')
], SwitchManagerButtonActions);

class SwitchManagerSwitchEditor extends s$4 {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.sequence = [];
        this.button_index = 0;
        this.action_index = 0;
        this._dirty = false;
        this._block_save = false;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        if (!this.config)
            return y ``;
        return y `
            <ha-app-layout>
                <app-header slot="header" fixed>
                    <app-toolbar>
                        <ha-menu-button
                            .hass=${this.hass}
                            .narrow=${this.narrow}>
                        </ha-menu-button>
                        <ha-icon-button
                            .path=${mdiArrowLeft}
                            @click=${() => navigate(buildUrl())}>
                        </ha-icon-button>
                        <div main-title id="title-container">
                            <span>Switch Manager - ${(_a = this.config) === null || _a === void 0 ? void 0 : _a.name}</span>
                        </div>
                        <div>
                            <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
                                <ha-icon-button
                                    slot="trigger"
                                    .label=${this.hass.localize("ui.common.menu")}
                                    .path=${mdiDotsVertical}>
                                </ha-icon-button>
                                
                                <mwc-list-item
                                    graphic="icon"
                                    @click=${this._showRenameDialog}
                                    .disabled=${((_b = this.config) === null || _b === void 0 ? void 0 : _b._error)}>
                                        Rename
                                        <ha-svg-icon slot="graphic" .path=${mdiRenameBox}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                                
                                <mwc-list-item
                                    graphic="icon"
                                    .disabled=${!this.config || this.is_new || !((_c = this.config) === null || _c === void 0 ? void 0 : _c.valid_blueprint)}
                                    @click=${this._toggleEnabled}>
                                        ${!((_d = this.config) === null || _d === void 0 ? void 0 : _d.enabled) ? 'Enable' : 'Disable'}
                                        <ha-svg-icon
                                            slot="graphic"
                                            .path=${!((_e = this.config) === null || _e === void 0 ? void 0 : _e.enabled) ? mdiPlayCircleOutline : mdiStopCircleOutline}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                                
                                <li divider role="separator"></li>

                                <mwc-list-item
                                    .disabled=${this.is_new}
                                    class=${o({ warning: Boolean(!this.is_new) })}
                                    graphic="icon"
                                    @click=${this._deleteConfirm}>
                                        Delete
                                        <ha-svg-icon
                                            class=${o({ warning: Boolean(!this.is_new) })}
                                            slot="graphic"
                                            .path=${mdiDelete}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                            </ha-button-menu>
                        </div>
                    </app-toolbar> 
                </app-header>
            </ha-app-layout>
            <hui-view>
                <hui-panel-view>
                    ${((_f = this.config) === null || _f === void 0 ? void 0 : _f.valid_blueprint) ? y `
                    <h3 id="blueprint-name">${(_g = this.blueprint) === null || _g === void 0 ? void 0 : _g.service} / ${(_h = this.blueprint) === null || _h === void 0 ? void 0 : _h.name}</h3>
                    <span id="identifier">
                        <ha-textfield 
                            id="identifier-input" 
                            type="text" 
                            .value="${(_j = this.config) === null || _j === void 0 ? void 0 : _j.identifier}" 
                            required="true" 
                            .label=${(_k = this.blueprint) === null || _k === void 0 ? void 0 : _k.identifier_key}
                            @input="${this._identifierChanged}"></ha-textfield>
                    </span>` : ''}
                    
                
                    <div id="switch-image">
                    ${this.blueprint && !((_l = this.blueprint) === null || _l === void 0 ? void 0 : _l.has_image) ?
            y `<ha-svg-icon .path=${mdiGestureTapButton}></ha-svg-icon>` :
            y `<svg id="switch-svg"></svg>`}
                    </div>

                    ${((_m = this.config) === null || _m === void 0 ? void 0 : _m.valid_blueprint) ? y `
                    <switch-manager-button-actions
                        .hass=${this.hass}
                        .actions=${(_p = (_o = this.blueprint) === null || _o === void 0 ? void 0 : _o.buttons[this.button_index]) === null || _p === void 0 ? void 0 : _p.actions}
                        .index=${this.action_index}
                        @changed=${this._actionChanged}>
                    </switch-manager-button-actions>` : ''}
                    
                    <ha-card outlined>
                        <div class="card-content">

                            ${this._errors ? y `
                            <ha-alert alert-type="error">
                                ${this._errors}
                            </ha-alert>` : ''}
                            ${this.config && !this.config.enabled ? y `
                            <ha-alert alert-type="info">
                                Switch is disabled
                                <mwc-button slot="action" @click=${this._toggleEnabled}>
                                    Enable
                                </mwc-button>
                            </ha-alert>` : ''}
                            ${((_q = this.config) === null || _q === void 0 ? void 0 : _q.valid_blueprint) ? y `
                            <div id="sequence-container">
                                <div class="header">
                                    <h2 id="sequence-heading" class="name">
                                        Sequence                                
                                        <ha-selector-select
                                            id="mode-selector"
                                            .hass=${this.hass}
                                            .value=${(_s = (_r = this.config) === null || _r === void 0 ? void 0 : _r.buttons[this.button_index]) === null || _s === void 0 ? void 0 : _s.actions[this.action_index].mode}
                                            label="Mode"
                                            .selector=${{
            select: {
                mode: "dropdown",
                options: MODES.map((mode) => ({
                    label: mode.charAt(0).toUpperCase() + mode.slice(1),
                    value: mode,
                })),
            }
        }}
                                            @value-changed=${this._modeValueChanged}>
                                        </ha-selector-select>
                                    </h2>
                                </div>
                        
                                <ha-automation-action
                                    role="region"
                                    aria-labelledby="sequence-heading"
                                    .actions=${this.sequence}
                                    @value-changed=${this._configSequenceChanged}
                                    .hass=${this.hass}
                                    .narrow=${this.narrow}
                                    .disabled=${this.disabled}>
                                </ha-automation-action>

                            </div>` : ''}
                        </div>
                    </ha-card>
                    ${((_t = this.config) === null || _t === void 0 ? void 0 : _t.valid_blueprint) ? y `
                    <div class="fab-container">
                        <ha-fab
                            slot="fab"
                            .label=${'Save'}
                            extended
                            collapse
                            @click=${this._save}
                            class=${o({
            dirty: this._dirty,
            blocked: this._block_save
        })}>
                            <ha-svg-icon slot="icon" .path=${mdiContentSave}></ha-svg-icon>
                        </ha-fab>
                    </div>` : ''}
                </hui-panel-view>
            </hui-view>
            
          `;
    }
    static get styles() {
        return [
            haStyle,
            fabStyle,
            i$4 `
            ha-card {
                margin: 0 auto;
                max-width: 1040px;
                --mdc-select-fill-color: transparent;
            }
            h3, #identifier {
                padding-left: 25px;
            }
            #identifier-input {
                width: 300px;
            }
            hui-view {
                height: calc(100vh - var(--header-height));
                display: block;
                overflow-y: auto;
                padding-bottom: 3em;
                box-sizing: border-box;
            }
            .header {
                display: flex;
                align-items: center;
            }
            .header:first-child {
                margin-top: -16px;
            }
            .header .name {
                font-size: 20px;
                font-weight: 400;
                flex: 1;
                margin-top: 0;
            }

            #switch-image {
                max-height: 380px;
                display: flex;
                margin: 1em;
                justify-content: center;
            }           
            @media screen and ( min-width: 1200px )
            {
                #switch-image {
                    margin-top: -65px;
                }
            }
            #sequence-container {
                padding: 28px 20px 0;
            }
            #mode-selector {
                display: inline-block;
                margin-left: 20px;
            }
            #switch-image > svg {
                /* for strokes on edge */
                overflow: visible;
            }
            #switch-image ha-svg-icon {
                fill: var(--primary-color);
                width: 260px;
                height: 260px;
            }
            #switch-image svg .button {
                fill: #00000000;
                stroke: #00adff3d;
                stroke-width: 3;
                cursor: pointer;
            }
            #switch-image svg .button[selected] {
                fill: #6bd3ff75;
                stroke: #0082e9;
            }
            .errors {
                padding: 20px;
                font-weight: bold;
                color: var(--error-color);
            }
            `
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this._loadConfig();
    }
    _loadConfig() {
        if ('id' in this.params) {
            this.is_new = false;
            this.hass.callWS({ type: buildWSPath('configs'), config_id: this.params.id }).then(promise => {
                this._setConfig(promise.config);
            });
        }
        else {
            this.is_new = true;
            this._dirty = true;
            if ('blueprint' in this.params)
                this._loadBlueprint(this.params.blueprint).then(promise => {
                    this._setConfig(createConfigFromBlueprint(promise.blueprint));
                    this._showRenameDialog();
                });
        }
    }
    _loadBlueprint(id) {
        return this.hass.callWS({ type: buildWSPath('blueprints'), blueprint_id: id });
    }
    _setConfig(config) {
        this.config = config;
        if (config._error) {
            this._errors = config._error;
            this._block_save = true;
            return;
        }
        this._setBlueprint(config.blueprint);
        this._updateSequence();
    }
    _setBlueprint(blueprint) {
        this.blueprint = blueprint;
        this.requestUpdate();
        this._drawSVG();
    }
    async _drawSVG() {
        if (!this.blueprint.has_image) {
            return;
        }
        await this.updateComplete;
        var img = new Image;
        img.src = buildAssetUrl(`${this.blueprint.id}.png`);
        img.onload = () => {
            // Add headroom for button strokes      
            this.svg.setAttributeNS(null, 'viewBox', `0 0 ${(img.width).toString()} ${(img.height).toString()}`);
            var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            svgimg.setAttributeNS(null, 'x', '0');
            svgimg.setAttributeNS(null, 'y', '0');
            svgimg.setAttributeNS(null, 'width', img.width.toString());
            svgimg.setAttributeNS(null, 'height', img.height.toString());
            svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', img.src);
            svgimg.setAttributeNS(null, 'visibility', 'visible');
            this.svg.prepend(svgimg);
        };
        // No need to render buttons or selection on buttons if there is only 1 button
        if (this.blueprint.buttons.length > 1) {
            this.blueprint.buttons.forEach((button, index) => {
                let svgshape;
                if (button.shape == 'circle') {
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    svgshape.setAttributeNS(null, 'cx', button.x.toString());
                    svgshape.setAttributeNS(null, 'cy', button.y.toString());
                    svgshape.setAttributeNS(null, 'r', button.width.toString());
                }
                else if (button.shape == 'path') {
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    svgshape.setAttributeNS(null, 'd', button.d.toString());
                }
                else {
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    svgshape.setAttributeNS(null, 'x', button.x.toString());
                    svgshape.setAttributeNS(null, 'y', button.y.toString());
                    svgshape.setAttributeNS(null, 'width', button.width.toString());
                    svgshape.setAttributeNS(null, 'height', button.height.toString());
                }
                svgshape.setAttribute('class', 'button');
                svgshape.setAttribute('index', index.toString());
                if (this.button_index == index) {
                    svgshape.setAttribute('selected', '');
                }
                svgshape.addEventListener('click', ev => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this._setButtonIndex(parseInt(ev.target.getAttribute('index')));
                });
                this.svg.append(svgshape);
            });
        }
    }
    _validate() {
        this._errors = null;
        this.identifier_input.invalid = false;
        if (!this.config.identifier) {
            this._errors = 'Identifier must not be empty';
            this.identifier_input.invalid = true;
            this.identifier_input.errorMessage = 'Identifier required';
            return false;
        }
        return true;
    }
    _save() {
        if (this._block_save || !this._validate())
            return;
        this._block_save = true;
        this._dirty = false;
        this.hass.callWS({
            type: buildWSPath('config/save'),
            config: Object.assign(Object.assign({}, this.config), { blueprint: this.config.blueprint.id })
        }).then(r => {
            if (this.is_new) {
                this.is_new = false;
                this.config.id = r.config_id;
                navigate(buildUrl(`edit/${r.config_id}`));
            }
            showToast(this, { message: 'Switch Saved' });
        }).catch(error => {
            showToast(this, { message: error.message });
            this._errors = error.message;
            this._dirty = true;
        }).finally(() => this._block_save = false);
    }
    _actionChanged(ev) {
        this._setActionIndex(ev.detail.index);
    }
    _setButtonIndex(index) {
        if (index == this.button_index)
            return;
        this.svg.querySelector('[selected]').removeAttribute('selected');
        this.svg.querySelector(`[index="${index}"]`).setAttribute('selected', '');
        this.button_index = index;
        this._setActionIndex(0);
    }
    _setActionIndex(index) {
        this.action_index = index;
        this._updateSequence();
    }
    _configSequenceChanged(ev) {
        this._updateSequence(ev.detail.value);
        this._errors = undefined;
        this._dirty = true;
    }
    _identifierChanged(ev) {
        this.config.identifier = getValueById(this, 'identifier-input');
        this._dirty = true;
    }
    _modeValueChanged(ev) {
        var _a;
        if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.buttons[this.button_index].actions[this.action_index].mode) == ev.detail.value)
            return;
        this.config.buttons[this.button_index].actions[this.action_index].mode = ev.detail.value;
        this.requestUpdate('config');
        this._dirty = true;
    }
    async _showRenameDialog() {
        fireEvent(this, "show-dialog", {
            dialogTag: "switch-manager-dialog-rename-switch",
            dialogImport: () => Promise.resolve().then(function () { return dialogRenameSwitch; }),
            dialogParams: {
                config: this.config,
                update: (config) => {
                    this.config.name = config.name;
                    this._dirty = true;
                    this.requestUpdate();
                },
                onClose: () => { }
            },
        });
    }
    _updateSequence(sequence) {
        if (sequence) {
            this.config.buttons[this.button_index].actions[this.action_index].sequence = sequence;
        }
        this.sequence = this.config.buttons[this.button_index].actions[this.action_index].sequence;
        this.requestUpdate('config');
    }
    _toggleEnabled() {
        this.hass.callWS({ type: buildWSPath('config/enabled'), enabled: !this.config.enabled, config_id: this.config.id }).then(r => {
            this.config.enabled = r.enabled;
            this.requestUpdate('config');
            showToast(this, { message: `Switch ${r.enabled ? 'Enabled' : 'Disabled'}` });
        }).catch(error => showToast(this, { message: error.message }));
    }
    async _deleteConfirm() {
        showConfirmDialog(this, {
            title: 'Delete switch?',
            text: `${this.config.name} will be permanently deleted.`,
            confirmText: 'Delete',
            dismissText: 'Cancel',
            confirm: () => this._delete(),
            confirmation: true,
            destructive: true,
        });
    }
    async _delete() {
        this.hass.callWS({ type: buildWSPath('config/delete'), config_id: this.config.id.toString() }).then(promise => {
            showToast(this, {
                message: 'Switch Deleted'
            });
            navigate(buildUrl());
        });
    }
}
__decorate([
    e$7()
], SwitchManagerSwitchEditor.prototype, "hass", void 0);
__decorate([
    e$7()
], SwitchManagerSwitchEditor.prototype, "narrow", void 0);
__decorate([
    e$7()
], SwitchManagerSwitchEditor.prototype, "panel", void 0);
__decorate([
    e$7()
], SwitchManagerSwitchEditor.prototype, "route", void 0);
__decorate([
    e$7()
], SwitchManagerSwitchEditor.prototype, "params", void 0);
__decorate([
    e$7()
], SwitchManagerSwitchEditor.prototype, "blueprint", void 0);
__decorate([
    e$7()
], SwitchManagerSwitchEditor.prototype, "config", void 0);
__decorate([
    e$7()
], SwitchManagerSwitchEditor.prototype, "disabled", void 0);
__decorate([
    t$5()
], SwitchManagerSwitchEditor.prototype, "sequence", void 0);
__decorate([
    t$5()
], SwitchManagerSwitchEditor.prototype, "button_index", void 0);
__decorate([
    t$5()
], SwitchManagerSwitchEditor.prototype, "action_index", void 0);
__decorate([
    t$5()
], SwitchManagerSwitchEditor.prototype, "is_new", void 0);
__decorate([
    t$5()
], SwitchManagerSwitchEditor.prototype, "_dirty", void 0);
__decorate([
    t$5()
], SwitchManagerSwitchEditor.prototype, "_block_save", void 0);
__decorate([
    t$5()
], SwitchManagerSwitchEditor.prototype, "_errors", void 0);
__decorate([
    i$5('#switch-svg')
], SwitchManagerSwitchEditor.prototype, "svg", void 0);
__decorate([
    i$5('#identifier-input')
], SwitchManagerSwitchEditor.prototype, "identifier_input", void 0);
customElements.define("switch-manager-switch-editor", SwitchManagerSwitchEditor);

let SwitchManagerPanel = class SwitchManagerPanel extends s$4 {
    get route() { return this._route; }
    ;
    set route(route) {
        this._route = route;
        let parts = route.path.split('/');
        if (parts[1] == 'new') {
            this.params = { action: 'new', blueprint: parts[2] };
        }
        else if (parts[1] == 'edit') {
            this.params = { action: 'edit', id: parts[2] };
        }
        else {
            this.params = {};
        }
    }
    ;
    constructor() {
        super();
        this.params = {};
        loadComponents();
    }
    render() {
        if ('action' in this.params)
            return y `        
                <switch-manager-switch-editor .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .params=${this.params}></switch-manager-index>
            `;
        return y `
                <switch-manager-index .hass=${this.hass} .narrow=${this.narrow} .route=${this.route}>
            `;
    }
    firstUpdated(changedProps) {
        super.firstUpdated(changedProps);
        this.hass.loadFragmentTranslation("config");
    }
};
__decorate([
    e$7({ attribute: false })
], SwitchManagerPanel.prototype, "hass", void 0);
__decorate([
    e$7()
], SwitchManagerPanel.prototype, "narrow", void 0);
__decorate([
    e$7()
], SwitchManagerPanel.prototype, "panel", void 0);
__decorate([
    t$5()
], SwitchManagerPanel.prototype, "params", void 0);
__decorate([
    e$7()
], SwitchManagerPanel.prototype, "route", null);
SwitchManagerPanel = __decorate([
    e$8('switch-manager-panel')
], SwitchManagerPanel);

let SwitchManagerDialogConfirm = class SwitchManagerDialogConfirm extends s$4 {
    async showDialog(params) {
        this._params = params;
    }
    closeDialog() {
        var _a, _b;
        if (((_a = this._params) === null || _a === void 0 ? void 0 : _a.confirmation) || ((_b = this._params) === null || _b === void 0 ? void 0 : _b.prompt)) {
            return false;
        }
        if (this._params) {
            this._dismiss();
            return true;
        }
        return true;
    }
    render() {
        if (!this._params) {
            return y ``;
        }
        const confirmPrompt = this._params.confirmation || this._params.prompt;
        return y `
            <ha-dialog
                open
                ?scrimClickAction=${confirmPrompt}
                ?escapeKeyAction=${confirmPrompt}
                @closed=${this._dialogClosed}
                defaultAction="ignore"
                .heading=${y `${this._params.warning
            ? y `<ha-svg-icon
                    .path=${mdiAlertOutline}
                    style="color: var(--warning-color)"
                    ></ha-svg-icon> `
            : ""}${this._params.title
            ? this._params.title
            : this._params.confirmation &&
                this.hass.localize("ui.dialogs.generic.default_confirmation_title")}`}>
                
                <div>
                    ${this._params.text ? y `
                    <p class=${this._params.prompt ? "no-bottom-padding" : ""}>
                        ${this._params.text}
                    </p>` : ""}
                </div>
                ${confirmPrompt &&
            y `
                <mwc-button @click=${this._dismiss} slot="secondaryAction">
                    ${this._params.dismissText
                ? this._params.dismissText
                : this.hass.localize("ui.dialogs.generic.cancel")}
                </mwc-button>
                `}
                <mwc-button
                    @click=${this._confirm}
                    ?dialogInitialFocus=${!this._params.prompt}
                    slot="primaryAction"
                    class=${o({
            destructive: this._params.destructive || false,
        })}>
                    ${this._params.confirmText
            ? this._params.confirmText
            : this.hass.localize("ui.dialogs.generic.ok")}
                </mwc-button>
            </ha-dialog>
        `;
    }
    _dismiss() {
        var _a;
        if ((_a = this._params) === null || _a === void 0 ? void 0 : _a.cancel) {
            this._params.cancel();
        }
        this._close();
    }
    _confirm() {
        if (this._params.confirm) {
            this._params.confirm();
        }
        this._close();
    }
    _dialogClosed(ev) {
        if (ev.detail.action === "ignore") {
            return;
        }
        this._dismiss();
    }
    _close() {
        if (!this._params) {
            return;
        }
        this._params = undefined;
        fireEvent(this, "dialog-closed", { dialog: this.localName });
    }
    static get styles() {
        return i$4 `
            :host([inert]) {
                pointer-events: initial !important;
                cursor: initial !important;
            }
            a {
                color: var(--primary-color);
            }
            p {
                margin: 0;
                color: var(--primary-text-color);
            }
            .no-bottom-padding {
                padding-bottom: 0;
            }
            .secondary {
                color: var(--secondary-text-color);
            }
            .destructive {
                --mdc-theme-primary: var(--error-color);
            }
            ha-dialog {
                --mdc-dialog-heading-ink-color: var(--primary-text-color);
                --mdc-dialog-content-ink-color: var(--primary-text-color);
                /* Place above other dialogs */
                --dialog-z-index: 104;
            }
            @media all and (min-width: 600px) {
                ha-dialog {
                --mdc-dialog-min-width: 400px;
                }
            }
            ha-textfield {
                width: 100%;
            }
        `;
    }
};
__decorate([
    e$7({ attribute: false })
], SwitchManagerDialogConfirm.prototype, "hass", void 0);
__decorate([
    t$5()
], SwitchManagerDialogConfirm.prototype, "_params", void 0);
SwitchManagerDialogConfirm = __decorate([
    e$8("switch-manager-dialog-confirm")
], SwitchManagerDialogConfirm);

var dialogConfirm = /*#__PURE__*/Object.freeze({
    __proto__: null
});

let SwitchManagerBlueprintSelector = class SwitchManagerBlueprintSelector extends s$4 {
    constructor() {
        super(...arguments);
        this._opened = false;
    }
    showDialog() {
        this._opened = true;
    }
    closeDialog() {
        if (this._opened) {
            fireEvent(this, "dialog-closed", { dialog: this.localName });
        }
        this._opened = false;
    }
    render() {
        if (!this._opened) {
            return y ``;
        }
        return y `
            <ha-dialog        
                open
                hideActions
                @closed=${this.closeDialog}
                .heading=${y `<div class="header_title">Select Blueprint</div>`}>

                <mwc-list>
                    ${this._listBlueprints()}
                </mwc-list>
                <!-- <div id="content">
                    <ha-icon-button id="close-button" .path=${mdiClose}></ha-icon-button>               
                </div> -->
                </ha-dialog>
        `;
    }
    static get styles() {
        return i$4 `
        :host {
            --mdc-dialog-min-width: 500px;
        }

        mwc-list-item {
            height: 90px;
            padding: 0px 20px;
            align-items: center;
        }

        h2 {
            padding: 0px 0px 12px;
            margin: 0px;
            font-weight: normal;
            font-size: 1.3em;
            border-bottom: 1px solid #DDD;
            margin-bottom: 5px;
        }

        .row {

            display: flex;
            align-items: center;
        }
        a.blueprint-item {
            display: flex;
            padding: 0px 20px;
            align-items: center;
            -webkit-font-smoothing: antialiased;
            font-family: var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
            font-size: var(--mdc-typography-subtitle1-font-size, 1rem);
            font-weight: var(--mdc-typography-subtitle1-font-weight, 400);
            letter-spacing: var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);
            color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
            text-decoration: none;
        }
        .image {
            height: 90px;
            width: 90px;
            text-align: center;
        }
        .image img {
            max-width: 100%;
            max-height: 100%;
        }
        .image ha-svg-icon {
            fill: var(--primary-color);
            margin-top: 5px;
            width: 85%;
            height: 85%;
        }
        .name {
            padding-left: 1em;
        }
        `;
    }
    _itemClicked(id) {
        navigate(buildUrl(`new/${id}`));
        this.closeDialog();
    }
    connectedCallback() {
        super.connectedCallback();
        this._updateBlueprints();
    }
    _updateBlueprints() {
        this.hass.callWS({ type: buildWSPath('blueprints') }).then(promise => {
            this.blueprints = promise.blueprints;
        }).catch(error => showToast(this, { message: error.message }));
    }
    _listBlueprints() {
        if (!this.blueprints)
            return;
        let ordered = {};
        for (let b of Object.values(this.blueprints)) {
            if (!ordered[b.service])
                ordered[b.service] = [];
            ordered[b.service].push(b);
        }
        let _html = [];
        for (let k in ordered) {
            _html.push(y `<h2>${k}</h2>`);
            for (let i of ordered[k]) {
                _html.push(y `
                <mwc-list-item @click=${() => this._itemClicked(i.id)} data-item-id="${i.id}">
                        <div class="row">
                            <div class="image">
                                ${i.has_image ?
                    y `<img src="${buildAssetUrl(`${i.id}.png`)}" />` :
                    y `<ha-svg-icon style="fill: var(--primary-color);" .path=${mdiGestureTapButton}></ha-svg-icon>`}
                            </div>
                            <div class="name">${i.name}</div>
                        </div>
                </mwc-list-item>`);
            }
        }
        return _html;
    }
};
__decorate([
    e$7({ attribute: false })
], SwitchManagerBlueprintSelector.prototype, "hass", void 0);
__decorate([
    e$7({ attribute: false })
], SwitchManagerBlueprintSelector.prototype, "blueprints", void 0);
__decorate([
    t$5()
], SwitchManagerBlueprintSelector.prototype, "_opened", void 0);
SwitchManagerBlueprintSelector = __decorate([
    e$8('switch-manager-dialog-blueprint-selector')
], SwitchManagerBlueprintSelector);

var dialogBlueprintSelector = /*#__PURE__*/Object.freeze({
    __proto__: null
});

let SwitchManagerDialogRenameSwitch = class SwitchManagerDialogRenameSwitch extends s$4 {
    constructor() {
        super(...arguments);
        this._opened = false;
    }
    showDialog(params) {
        this._opened = true;
        this._error = null;
        this._params = params;
        this._newName = params.config.name;
    }
    closeDialog() {
        this._params.onClose();
        if (this._opened) {
            fireEvent(this, "dialog-closed", { dialog: this.localName });
        }
        this._opened = false;
    }
    render() {
        if (!this._opened) {
            return y ``;
        }
        return y `
            <ha-dialog
                open
                scrimClickAction
                @closed=${this.closeDialog}
                .heading="${createCloseHeading('Rename')}">
                ${this._error ? y `<ha-alert alert-type="error">Missing Name</ha-alert>` : ""}

                <ha-textfield
                    dialogInitialFocus
                    .value=${this._newName}
                    .placeholder=Name
                    .label=Name
                    required
                    type="string"
                    @input=${this._valueChanged}></ha-textfield>

                <mwc-button @click=${this.closeDialog} slot="secondaryAction">
                    Cancel
                </mwc-button>
                <mwc-button @click=${this._save} slot="primaryAction">
                    Rename
                </mwc-button>
            </ha-dialog>
        `;
    }
    static get styles() {
        return [
            haStyle,
            haStyleDialog,
            i$4 `
            ha-textfield,
            ha-textarea {
              display: block;
            }
            ha-alert {
              display: block;
              margin-bottom: 16px;
            }
          `,
        ];
    }
    _valueChanged(ev) {
        ev.stopPropagation();
        const target = ev.target;
        this._newName = target.value;
    }
    _save() {
        if (!this._newName) {
            this._error = "Name is required";
            return;
        }
        this._params.update(Object.assign(Object.assign({}, this._params.config), { name: this._newName }));
        this.closeDialog();
    }
};
__decorate([
    e$7({ attribute: false })
], SwitchManagerDialogRenameSwitch.prototype, "hass", void 0);
__decorate([
    t$5()
], SwitchManagerDialogRenameSwitch.prototype, "_opened", void 0);
__decorate([
    t$5()
], SwitchManagerDialogRenameSwitch.prototype, "_error", void 0);
SwitchManagerDialogRenameSwitch = __decorate([
    e$8('switch-manager-dialog-rename-switch')
], SwitchManagerDialogRenameSwitch);

var dialogRenameSwitch = /*#__PURE__*/Object.freeze({
    __proto__: null
});
