function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}const e=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e),i=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function s(t){return(e,s)=>void 0!==s?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,s):i(t,e)}function o(t){return s({...t,state:!0})}function n(t,e){return(({finisher:t,descriptor:e})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,n=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(n.finisher=function(e){t(e,s)}),n}{const o=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(o,s)}})({descriptor:i=>{const s={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[e]&&(this[e]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null),this[e]}}return s}})}var r;null===(r=window.HTMLSlotElement)||void 0===r||r.prototype.assignedElements;const a=window,l=a.ShadowRoot&&(void 0===a.ShadyCSS||a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,h=Symbol(),d=new WeakMap;class c{constructor(t,e,i){if(this._$cssResult$=!0,i!==h)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(l&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=d.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&d.set(e,t))}return t}toString(){return this.cssText}}const p=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new c(i,t,h)},u=l?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new c("string"==typeof t?t:t+"",void 0,h))(e)})(t):t;var v;const g=window,m=g.trustedTypes,_=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>e!==t&&(e==e||t==t),y={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$};class w extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||y}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{l?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=a.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=y){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:b).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:b;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||$)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var A;w.finalized=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:w}),(null!==(v=g.reactiveElementVersions)&&void 0!==v?v:g.reactiveElementVersions=[]).push("1.4.2");const x=window,S=x.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E=`lit$${(Math.random()+"").slice(9)}$`,k="?"+E,H=`<${k}>`,N=document,P=(t="")=>N.createComment(t),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,L=/>/g,R=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),D=/'/g,z=/"/g,j=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),I=new WeakMap,W=N.createTreeWalker(N,129,null,!1);class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,h]=((t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===T?"!--"===l[1]?r=O:void 0!==l[1]?r=L:void 0!==l[2]?(j.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=null!=o?o:T,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?R:'"'===l[3]?z:D):r===z||r===D?r=R:r===O||r===L?r=T:(r=R,o=void 0);const c=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===T?i+H:h>=0?(s.push(a),i.slice(0,h)+"$lit$"+i.slice(h)+E+c):i+E+(-2===h?(s.push(void 0),e):c)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==C?C.createHTML(a):a,s]})(t,e);if(this.el=Z.createElement(l,i),W.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=W.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(E)){const i=h[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(E),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Q:"?"===e[1]?Y:"@"===e[1]?tt:G})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(j.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),W.nextNode(),a.push({type:2,index:++o});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){var o,n,r,a;if(e===V)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const h=M(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=K(t,l._$AS(t,e.values),l,s)),e}class F{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:N).importNode(i,!0);W.currentNode=o;let n=W.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new et(n,this,t)),this.u.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=W.nextNode(),r++)}return o}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var o;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),M(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==V&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==B&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.p(i);else{const t=new F(o,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new J(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=K(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=K(this,s[i+r],e,r),a===V&&(a=this._$AH[r]),n||(n=!M(a)||a!==this._$AH[r]),a===B?t=B:t!==B&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Q extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}const X=S?S.emptyScript:"";class Y extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==B?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class tt extends G{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=K(this,t,e,0))&&void 0!==i?i:B)===V)return;const s=this._$AH,o=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==B&&(s===B||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const it=x.litHtmlPolyfillSupport;null==it||it(Z,J),(null!==(A=x.litHtmlVersions)&&void 0!==A?A:x.litHtmlVersions=[]).push("2.4.0");var st,ot;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new J(e.insertBefore(P(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return V}}nt.finalized=!0,nt._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:nt});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:nt}),(null!==(ot=globalThis.litElementVersions)&&void 0!==ot?ot:globalThis.litElementVersions=[]).push("3.2.2");var at=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function lt(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(s=t[i],o=e[i],!(s===o||at(s)&&at(o)))return!1;var s,o;return!0}var ht="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",dt="M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z",ct="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z",pt="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9";const ut=["single","restart","queued","parallel"],vt=(t,e,i,s)=>{s=s||{},i=null==i?{}:i;const o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o},gt="switch_manager";function mt(t){return t?`/${gt}/${t}`:`/${gt}`}function _t(t){return`/assets/${gt}/${t}`}function ft(t){return`${gt}/${t}`}function bt(t){if("string"==typeof t)return window.history.pushState({},null,t),window.dispatchEvent(new PopStateEvent("popstate")),!1;var e=t.target;return"a"!==e.localName&&(e=e.closest("a")),"a"===e.localName&&e.href&&(window.history.pushState({},null,e.href),window.dispatchEvent(new PopStateEvent("popstate"))),!1}const $t=t=>q`
    <div class="header_title">${t}</div>
    <ha-icon-button
      .label=${"Close"}
      .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
      dialogAction="close"
      class="header_button"></ha-icon-button>`,yt=(t,e)=>vt(t,"hass-notification",e),wt=(t,e)=>new Promise((i=>{const s=e.cancel,o=e.confirm;vt(t,"show-dialog",{dialogTag:"switch-manager-dialog-confirm",dialogImport:()=>Promise.resolve().then((function(){return Oe})),dialogParams:Object.assign(Object.assign({},e),{cancel:()=>{i(!!(null==e?void 0:e.prompt)&&null),s&&s()},confirm:()=>{i(!(null==e?void 0:e.prompt)||null),o&&o()}})})})),At=window,xt=At.ShadowRoot&&(void 0===At.ShadyCSS||At.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,St=Symbol(),Ct=new WeakMap;class Et{constructor(t,e,i){if(this._$cssResult$=!0,i!==St)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(xt&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=Ct.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ct.set(e,t))}return t}toString(){return this.cssText}}const kt=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new Et(i,t,St)},Ht=xt?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new Et("string"==typeof t?t:t+"",void 0,St))(e)})(t):t;var Nt;const Pt=window,Mt=Pt.trustedTypes,Ut=Mt?Mt.emptyScript:"",Tt=Pt.reactiveElementPolyfillSupport,Ot={toAttribute(t,e){switch(e){case Boolean:t=t?Ut:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},Lt=(t,e)=>e!==t&&(e==e||t==t),Rt={attribute:!0,type:String,converter:Ot,reflect:!1,hasChanged:Lt};class Dt extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=Rt){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Rt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(Ht(t))}else void 0!==t&&e.push(Ht(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{xt?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=At.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=Rt){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:Ot).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:Ot;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Lt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var zt;Dt.finalized=!0,Dt.elementProperties=new Map,Dt.elementStyles=[],Dt.shadowRootOptions={mode:"open"},null==Tt||Tt({ReactiveElement:Dt}),(null!==(Nt=Pt.reactiveElementVersions)&&void 0!==Nt?Nt:Pt.reactiveElementVersions=[]).push("1.4.2");const jt=window,qt=jt.trustedTypes,Vt=qt?qt.createPolicy("lit-html",{createHTML:t=>t}):void 0,Bt=`lit$${(Math.random()+"").slice(9)}$`,It="?"+Bt,Wt=`<${It}>`,Zt=document,Kt=(t="")=>Zt.createComment(t),Ft=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Jt=Array.isArray,Gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qt=/-->/g,Xt=/>/g,Yt=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),te=/'/g,ee=/"/g,ie=/^(?:script|style|textarea|title)$/i,se=Symbol.for("lit-noChange"),oe=Symbol.for("lit-nothing"),ne=new WeakMap,re=Zt.createTreeWalker(Zt,129,null,!1),ae=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=Gt;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===Gt?"!--"===l[1]?r=Qt:void 0!==l[1]?r=Xt:void 0!==l[2]?(ie.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=Yt):void 0!==l[3]&&(r=Yt):r===Yt?">"===l[0]?(r=null!=o?o:Gt,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?Yt:'"'===l[3]?ee:te):r===ee||r===te?r=Yt:r===Qt||r===Xt?r=Gt:(r=Yt,o=void 0);const c=r===Yt&&t[e+1].startsWith("/>")?" ":"";n+=r===Gt?i+Wt:h>=0?(s.push(a),i.slice(0,h)+"$lit$"+i.slice(h)+Bt+c):i+Bt+(-2===h?(s.push(void 0),e):c)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==Vt?Vt.createHTML(a):a,s]};class le{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,h]=ae(t,e);if(this.el=le.createElement(l,i),re.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=re.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(Bt)){const i=h[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(Bt),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?ue:"?"===e[1]?ge:"@"===e[1]?me:pe})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(ie.test(s.tagName)){const t=s.textContent.split(Bt),e=t.length-1;if(e>0){s.textContent=qt?qt.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],Kt()),re.nextNode(),a.push({type:2,index:++o});s.append(t[e],Kt())}}}else if(8===s.nodeType)if(s.data===It)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(Bt,t+1));)a.push({type:7,index:o}),t+=Bt.length-1}o++}}static createElement(t,e){const i=Zt.createElement("template");return i.innerHTML=t,i}}function he(t,e,i=t,s){var o,n,r,a;if(e===se)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const h=Ft(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=he(t,l._$AS(t,e.values),l,s)),e}class de{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:Zt).importNode(i,!0);re.currentNode=o;let n=re.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new ce(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new _e(n,this,t)),this.u.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=re.nextNode(),r++)}return o}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ce{constructor(t,e,i,s){var o;this.type=2,this._$AH=oe,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=he(this,t,e),Ft(t)?t===oe||null==t||""===t?(this._$AH!==oe&&this._$AR(),this._$AH=oe):t!==this._$AH&&t!==se&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>Jt(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==oe&&Ft(this._$AH)?this._$AA.nextSibling.data=t:this.T(Zt.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=le.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.p(i);else{const t=new de(o,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=ne.get(t.strings);return void 0===e&&ne.set(t.strings,e=new le(t)),e}k(t){Jt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new ce(this.O(Kt()),this.O(Kt()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class pe{constructor(t,e,i,s,o){this.type=1,this._$AH=oe,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=oe}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=he(this,t,e,0),n=!Ft(t)||t!==this._$AH&&t!==se,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=he(this,s[i+r],e,r),a===se&&(a=this._$AH[r]),n||(n=!Ft(a)||a!==this._$AH[r]),a===oe?t=oe:t!==oe&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===oe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class ue extends pe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===oe?void 0:t}}const ve=qt?qt.emptyScript:"";class ge extends pe{constructor(){super(...arguments),this.type=4}j(t){t&&t!==oe?this.element.setAttribute(this.name,ve):this.element.removeAttribute(this.name)}}class me extends pe{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=he(this,t,e,0))&&void 0!==i?i:oe)===se)return;const s=this._$AH,o=t===oe&&s!==oe||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==oe&&(s===oe||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class _e{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){he(this,t)}}const fe=jt.litHtmlPolyfillSupport;null==fe||fe(le,ce),(null!==(zt=jt.litHtmlVersions)&&void 0!==zt?zt:jt.litHtmlVersions=[]).push("2.4.0");var be,$e;class ye extends Dt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new ce(e.insertBefore(Kt(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return se}}ye.finalized=!0,ye._$litElement$=!0,null===(be=globalThis.litElementHydrateSupport)||void 0===be||be.call(globalThis,{LitElement:ye});const we=globalThis.litElementPolyfillSupport;null==we||we({LitElement:ye}),(null!==($e=globalThis.litElementVersions)&&void 0!==$e?$e:globalThis.litElementVersions=[]).push("3.2.2");const Ae=kt`
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

  ${kt`
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
`}

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
`,xe=kt`
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
`,Se=kt`
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
`;kt`
  body {
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    height: calc(100vh - 32px);
    width: 100vw;
  }
`;const Ce=p`
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
`;let Ee=class extends nt{constructor(){super(...arguments),this._data=[],this._columns=function(t,e){void 0===e&&(e=lt);var i=null;function s(){for(var s=[],o=0;o<arguments.length;o++)s[o]=arguments[o];if(i&&i.lastThis===this&&e(s,i.lastArgs))return i.lastResult;var n=t.apply(this,s);return i={lastResult:n,lastArgs:s,lastThis:this},n}return s.clear=function(){i=null},s}((()=>({image:{title:"",sortable:!1,filterable:!1,grows:!1,width:"90px",template:(t,e)=>e.switch.valid_blueprint?e.switch.blueprint.has_image?q`<img style="max-width: 100%;max-height: 48px;display: block;margin:0 auto;" src="${_t(`${t}.png`)}" />`:q`<ha-svg-icon style="fill: var(--primary-color); margin: 0 auto;display:block;height: 85%;
                        width: 85%;" .path=${dt}></ha-svg-icon>`:""},name:{title:"Name",main:!0,direction:"asc",sortable:!0,filterable:!0,grows:!0,template:(t,e)=>e.error?q`<span style="color: red;">${t} (${e.error})</span>`:t},enabled:{title:"",width:"10%",template:t=>t?"":q`
                        <ha-chip>
                            Disabled
                        </ha-chip>`},service:{title:"Service",sortable:!0,filterable:!0,width:"15%"},type:{title:"Type",sortable:!0,filterable:!0,grows:!1,width:"15%"},actions:{title:"",width:this.narrow?void 0:"10%",type:"overflow-menu",template:(t,e)=>q`
                        <ha-icon-overflow-menu
                        .hass=${this.hass}
                        narrow
                        .items=${[{path:e.enabled?pt:ct,label:e.enabled?"Disable":"Enable",disabled:e.error,action:()=>this._toggleEnabled(e.switch_id,e.enabled)},{label:"Delete",path:ht,action:()=>this._deleteConfirm(e),warning:!0}]}>
                        </ha-icon-overflow-menu>`}})))}render(){return q`
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
                        .dir=${t=this.hass,e=function(t){const e=t.language||"en";return t.translationMetadata.translations[e]&&t.translationMetadata.translations[e].isRTL||!1}(t),e?"rtl":"ltr"}>

                    </ha-data-table>

                    <div class="fab-container">
                        <ha-fab
                            slot="fab"
                            .label=${"Add Switch"}
                            extended
                            @click=${this._showBlueprintDialog}>
                            <ha-svg-icon slot="icon" .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}></ha-svg-icon>
                        </ha-fab>
                    </div>
                </hui-panel-view>
            </hui-view>
        `;var t,e}static get styles(){return[Ae,Se,Ce,p`
            ha-data-table {
            }
            hui-view {
                display: block;
                height: calc(100vh - var(--header-height));
                overflow-y: auto;
            }
        `]}connectedCallback(){super.connectedCallback(),this._populateSwitches()}_populateSwitches(){const t=[];this.hass.callWS({type:ft("configs")}).then((e=>{Object.values(e.configs).forEach((e=>{let i;i=e.valid_blueprint?e.blueprint:{id:e.blueprint},t.push({switch:e,image:i.id,switch_id:e.id,error:e._error,enabled:e.enabled,name:e.name,service:i.service,type:i.name,actions:e.id})})),this._data=t}))}_rowClicked(t){bt(mt(`edit/${t.detail.id}`))}async _toggleEnabled(t,e){this.hass.callWS({type:ft("config/enabled"),enabled:!e,config_id:t}).then((t=>{this._populateSwitches(),yt(this,{message:"Switch "+(t.enabled?"Enabled":"Disabled")})})).catch((t=>yt(this,{message:t.message})))}async _deleteConfirm(t){wt(this,{title:"Delete switch?",text:`${t.name} will be permanently deleted.`,confirmText:"Delete",dismissText:"Cancel",confirm:()=>this._delete(t.switch_id),confirmation:!0,destructive:!0})}async _delete(t){this.hass.callWS({type:ft("config/delete"),config_id:t.toString()}).then((t=>{this._populateSwitches(),yt(this,{message:"Switch Deleted"})})).catch((t=>yt(this,{message:t.message})))}_showBlueprintDialog(){vt(this,"show-dialog",{dialogTag:"switch-manager-dialog-blueprint-selector",dialogImport:()=>Promise.resolve().then((function(){return Re})),dialogParams:{}})}};t([s()],Ee.prototype,"hass",void 0),t([s()],Ee.prototype,"narrow",void 0),t([s()],Ee.prototype,"panel",void 0),t([s()],Ee.prototype,"route",void 0),t([o()],Ee.prototype,"_data",void 0),Ee=t([e("switch-manager-index")],Ee);const ke=1;class He{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const Ne=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends He{constructor(t){var e;if(super(t),t.type!==ke||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,s;if(void 0===this.nt){this.nt=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.st)||void 0===i?void 0:i.has(t))&&this.nt.add(t);return this.render(e)}const o=t.element.classList;this.nt.forEach((t=>{t in e||(o.remove(t),this.nt.delete(t))}));for(const t in e){const i=!!e[t];i===this.nt.has(t)||(null===(s=this.st)||void 0===s?void 0:s.has(t))||(i?(o.add(t),this.nt.add(t)):(o.remove(t),this.nt.delete(t)))}return V}});let Pe=class extends nt{constructor(){super(...arguments),this.index=0}render(){return this.blueprint_actions&&1!=this.blueprint_actions.length?q`
            <div id="tabbar" .hass=${this.hass}>
                <paper-tabs selected="${this.index}" @iron-select=${this._tab_changed}>
                    ${this.blueprint_actions.map(((t,e)=>q`
                        <paper-tab>${t.title}
                            ${this.config_actions[e].sequence.length?q`<ha-chip>${this.config_actions[e].sequence.length}</ha-chip>`:""}
                        </paper-tab>`))}
                </paper-tabs>
            </div> 
        `:""}static get styles(){return p`
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
            ha-chip {
                position: absolute;
                top: 0;
                right: -32px;
            }
        `}_tab_changed(t){let e=new CustomEvent("changed",{detail:{index:t.detail.item.parentNode.indexOf(t.detail.item)}});this.dispatchEvent(e)}};t([s()],Pe.prototype,"hass",void 0),t([s()],Pe.prototype,"blueprint_actions",void 0),t([s()],Pe.prototype,"config_actions",void 0),t([s({reflect:!0})],Pe.prototype,"index",void 0),Pe=t([e("switch-manager-button-actions")],Pe);class Me extends nt{constructor(){super(...arguments),this.disabled=!1,this.sequence=[],this.button_index=0,this.action_index=0,this._dirty=!1,this._block_save=!1}render(){var t,e,i,s,o,n,r,a,l,h,d,c,p,u,v,g,m,_;return this.config?q`
            <ha-app-layout>
                <app-header slot="header" fixed>
                    <app-toolbar>
                        <ha-menu-button
                            .hass=${this.hass}
                            .narrow=${this.narrow}>
                        </ha-menu-button>
                        <ha-icon-button
                            .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
                            @click=${()=>bt(mt())}>
                        </ha-icon-button>
                        <div main-title id="title-container">
                            <span>Switch Manager - ${null===(t=this.config)||void 0===t?void 0:t.name}</span>
                        </div>
                        <div>
                            <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
                                <ha-icon-button
                                    slot="trigger"
                                    .label=${this.hass.localize("ui.common.menu")}
                                    .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}>
                                </ha-icon-button>
                                
                                <mwc-list-item
                                    graphic="icon"
                                    @click=${this._showRenameDialog}
                                    .disabled=${null===(e=this.config)||void 0===e?void 0:e._error}>
                                        Rename
                                        <ha-svg-icon slot="graphic" .path=${"M18,17H10.5L12.5,15H18M6,17V14.5L13.88,6.65C14.07,6.45 14.39,6.45 14.59,6.65L16.35,8.41C16.55,8.61 16.55,8.92 16.35,9.12L8.47,17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                                
                                <mwc-list-item
                                    graphic="icon"
                                    .disabled=${!this.config||this.is_new||!(null===(i=this.config)||void 0===i?void 0:i.valid_blueprint)}
                                    @click=${this._toggleEnabled}>
                                        ${(null===(s=this.config)||void 0===s?void 0:s.enabled)?"Disable":"Enable"}
                                        <ha-svg-icon
                                            slot="graphic"
                                            .path=${(null===(o=this.config)||void 0===o?void 0:o.enabled)?pt:ct}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                                
                                <li divider role="separator"></li>

                                <mwc-list-item
                                    .disabled=${this.is_new}
                                    class=${Ne({warning:Boolean(!this.is_new)})}
                                    graphic="icon"
                                    @click=${this._deleteConfirm}>
                                        Delete
                                        <ha-svg-icon
                                            class=${Ne({warning:Boolean(!this.is_new)})}
                                            slot="graphic"
                                            .path=${ht}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                            </ha-button-menu>
                        </div>
                    </app-toolbar> 
                </app-header>
            </ha-app-layout>
            <hui-view>
                <hui-panel-view>
                    ${(null===(n=this.config)||void 0===n?void 0:n.valid_blueprint)?q`
                    <h3 id="blueprint-name">${null===(r=this.blueprint)||void 0===r?void 0:r.service} / ${null===(a=this.blueprint)||void 0===a?void 0:a.name}</h3>
                    <span id="identifier">
                        <ha-textfield 
                            id="identifier-input" 
                            type="text" 
                            .value="${null===(l=this.config)||void 0===l?void 0:l.identifier}" 
                            required="true" 
                            .label=${"mqtt"==this.blueprint.event_type?"mqtt topic":null===(h=this.blueprint)||void 0===h?void 0:h.identifier_key}
                            @input="${this._identifierChanged}"></ha-textfield>
                        ${"mqtt"!=this.blueprint.event_type?q`
                        <ha-icon-button
                            .path=${"M17,20C16.71,20 16.44,19.94 16.24,19.85C15.53,19.5 15.03,18.97 14.53,17.47C14,15.91 13.06,15.18 12.14,14.47C11.35,13.86 10.53,13.23 9.82,11.94C9.29,11 9,9.93 9,9C9,6.2 11.2,4 14,4C16.8,4 19,6.2 19,9H21C21,5.07 17.93,2 14,2C10.07,2 7,5.07 7,9C7,10.26 7.38,11.65 8.07,12.9C9,14.55 10.05,15.38 10.92,16.05C11.73,16.67 12.31,17.12 12.63,18.1C13.23,19.92 14,20.94 15.36,21.65C15.87,21.88 16.43,22 17,22A4,4 0 0,0 21,18H19A2,2 0 0,1 17,20M7.64,2.64L6.22,1.22C4.23,3.21 3,5.96 3,9C3,12.04 4.23,14.79 6.22,16.78L7.63,15.37C6,13.74 5,11.5 5,9C5,6.5 6,4.26 7.64,2.64M11.5,9A2.5,2.5 0 0,0 14,11.5A2.5,2.5 0 0,0 16.5,9A2.5,2.5 0 0,0 14,6.5A2.5,2.5 0 0,0 11.5,9Z"}
                            ?listening=${this._subscribed}
                            @click=${this._listenForEvent}>
                        </ha-icon-button>`:q`${this.blueprint.mqtt_topic_format?q`<ha-alert alert-type="info">Format: ${this.blueprint.mqtt_topic_format}</ha-alert>`:""}`}
                        ${this._subscribed?q`
                        <ha-alert alert-type="info">
                            Press a button on your switch
                        </ha-alert>`:""}
                    </span>`:""}
                    
                
                    <div id="switch-image">
                    ${this.blueprint&&!(null===(d=this.blueprint)||void 0===d?void 0:d.has_image)?q`<ha-svg-icon .path=${dt}></ha-svg-icon>`:q`<svg id="switch-svg"></svg>`}
                    </div>

                    ${(null===(c=this.config)||void 0===c?void 0:c.valid_blueprint)?q`
                    <switch-manager-button-actions
                        .hass=${this.hass}
                        .blueprint_actions=${null===(u=null===(p=this.blueprint)||void 0===p?void 0:p.buttons[this.button_index])||void 0===u?void 0:u.actions}
                        .config_actions=${this.config.buttons[this.button_index].actions}
                        .index=${this.action_index}
                        @changed=${this._actionChanged}>
                    </switch-manager-button-actions>`:""}
                    
                    <ha-card outlined>
                        <div class="card-content">

                            ${this._errors?q`
                            <ha-alert alert-type="error">
                                ${this._errors}
                            </ha-alert>`:""}
                            ${this.config&&!this.config.enabled?q`
                            <ha-alert alert-type="info">
                                Switch is disabled
                                <mwc-button slot="action" @click=${this._toggleEnabled}>
                                    Enable
                                </mwc-button>
                            </ha-alert>`:""}
                            ${(null===(v=this.config)||void 0===v?void 0:v.valid_blueprint)?q`
                            <div id="sequence-container">
                                <div class="header">
                                    <h2 id="sequence-heading" class="name">
                                        Sequence                                
                                        <ha-selector-select
                                            id="mode-selector"
                                            .hass=${this.hass}
                                            .value=${null===(m=null===(g=this.config)||void 0===g?void 0:g.buttons[this.button_index])||void 0===m?void 0:m.actions[this.action_index].mode}
                                            label="Mode"
                                            .selector=${{select:{mode:"dropdown",options:ut.map((t=>({label:t.charAt(0).toUpperCase()+t.slice(1),value:t})))}}}
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

                            </div>`:""}
                        </div>
                    </ha-card>
                    ${(null===(_=this.config)||void 0===_?void 0:_.valid_blueprint)?q`
                    <div class="fab-container">
                        <ha-fab
                            slot="fab"
                            .label=${"Save"}
                            extended
                            collapse
                            @click=${this._save}
                            class=${Ne({dirty:this._dirty,blocked:this._block_save})}>
                            <ha-svg-icon slot="icon" .path=${"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"}></ha-svg-icon>
                        </ha-fab>
                    </div>`:""}
                </hui-panel-view>
            </hui-view>            
          `:q``}static get styles(){return[Ae,Ce,p`
            @keyframes pulse {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0.4;
                }
            }
            ha-card {
                margin: 0 auto;
                max-width: 1040px;
                --mdc-select-fill-color: transparent;
            }
            h3, #identifier {
                padding-left: 25px;
                position: relative;
            }
            #identifier-input {
                width: 300px;
            }
            #identifier ha-icon-button {
                vertical-align: middle;
                background: var(--mdc-text-field-fill-color);
                border-radius: 50%;
                color: var(--mdc-text-field-ink-color);
                margn-top: -10px;
                margin-top: -14px;
                margin-left: -34px;
                position: relative;
                --mdc-icon-button-size: 54px;
                box-shadow: -5px 1px 8px -6px;
            }
            #identifier ha-icon-button[listening] {
                animation: 1s infinite alternate pulse;
            }
            #identifier ha-alert {
                display: block;
                width: 300px;
                position: absolute;
                margin-left: 25px;
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
            #switch-image svg image {
                filter: drop-shadow(0px 0px 8px #00000033);
            }
            #switch-image svg .button {
                fill: #00000000;
                stroke: #00adff3d;
                stroke-width: 3;
                cursor: pointer;
            }
            #switch-image svg .button[empty] {
                fill: #cfcfcf66;
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
            `]}connectedCallback(){super.connectedCallback(),this._loadConfig()}disconnectedCallback(){super.disconnectedCallback(),this._subscribed&&(this._subscribed(),this._subscribed=null)}_loadConfig(){"id"in this.params?(this.is_new=!1,this.hass.callWS({type:ft("configs"),config_id:this.params.id}).then((t=>{this._setConfig(t.config)}))):(this.is_new=!0,this._dirty=!0,"blueprint"in this.params&&this._loadBlueprint(this.params.blueprint).then((t=>{this._setConfig(function(t){let e={id:null,name:"New Switch",enabled:!0,identifier:"",blueprint:t,valid_blueprint:!0,buttons:[]};return t.buttons.forEach(((t,i)=>{e.buttons[i]={actions:[]},t.actions.forEach(((t,s)=>{e.buttons[i].actions[s]={mode:ut[0],sequence:[]}}))})),e}(t.blueprint)),this._showRenameDialog()})))}_loadBlueprint(t){return this.hass.callWS({type:ft("blueprints"),blueprint_id:t})}_setConfig(t){if(this.config=t,t._error)return this._errors=t._error,void(this._block_save=!0);this._setBlueprint(t.blueprint),this._updateSequence()}_setBlueprint(t){this.blueprint=t,this.requestUpdate(),this._drawSVG()}async _drawSVG(){if(this.blueprint.has_image){await this.updateComplete;var t=new Image;t.src=_t(`${this.blueprint.id}.png`),t.onload=()=>{this.svg.setAttributeNS(null,"viewBox",`0 0 ${t.width.toString()} ${t.height.toString()}`);var e=document.createElementNS("http://www.w3.org/2000/svg","image");e.setAttributeNS(null,"x","0"),e.setAttributeNS(null,"y","0"),e.setAttributeNS(null,"width",t.width.toString()),e.setAttributeNS(null,"height",t.height.toString()),e.setAttributeNS("http://www.w3.org/1999/xlink","href",t.src),e.setAttributeNS(null,"visibility","visible"),this.svg.prepend(e)},this.blueprint.buttons.length>1&&this.blueprint.buttons.forEach(((t,e)=>{let i;"circle"==t.shape?(i=document.createElementNS("http://www.w3.org/2000/svg","circle"),i.setAttributeNS(null,"cx",t.x.toString()),i.setAttributeNS(null,"cy",t.y.toString()),i.setAttributeNS(null,"r",t.width.toString())):"path"==t.shape?(i=document.createElementNS("http://www.w3.org/2000/svg","path"),i.setAttributeNS(null,"d",t.d.toString())):(i=document.createElementNS("http://www.w3.org/2000/svg","rect"),i.setAttributeNS(null,"x",t.x.toString()),i.setAttributeNS(null,"y",t.y.toString()),i.setAttributeNS(null,"width",t.width.toString()),i.setAttributeNS(null,"height",t.height.toString())),i.setAttribute("class","button"),i.setAttribute("index",e.toString()),this.button_index==e&&i.setAttribute("selected",""),this._buttonTotalSequence(this.config.buttons[e])||i.setAttribute("empty",""),i.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),this._setButtonIndex(parseInt(t.target.getAttribute("index")))})),this.svg.append(i)}))}}_buttonTotalSequence(t){let e=0;return t.actions.forEach((t=>{e+=t.sequence.length})),e}_validate(){return this._errors=null,this.identifier_input.invalid=!1,!!this.config.identifier||(this._errors="Identifier must not be empty",this.identifier_input.invalid=!0,this.identifier_input.errorMessage="Identifier required",!1)}_save(){!this._block_save&&this._validate()&&(this._block_save=!0,this._dirty=!1,this.hass.callWS({type:ft("config/save"),config:Object.assign(Object.assign({},this.config),{blueprint:this.config.blueprint.id})}).then((t=>{this.is_new&&(this.is_new=!1,this.config.id=t.config_id,bt(mt(`edit/${t.config_id}`))),yt(this,{message:"Switch Saved"})})).catch((t=>{yt(this,{message:t.message}),this._errors=t.message,this._dirty=!0})).finally((()=>this._block_save=!1)))}_actionChanged(t){this._setActionIndex(t.detail.index)}_setButtonIndex(t){t!=this.button_index&&(this.svg.querySelector("[selected]").removeAttribute("selected"),this.svg.querySelector(`[index="${t}"]`).setAttribute("selected",""),this.button_index=t,this._setActionIndex(0))}_setActionIndex(t){this.action_index=t,this._updateSequence()}_configSequenceChanged(t){this.requestUpdate("config"),this._updateSequence(t.detail.value),this._errors=void 0,this._dirty=!0}async _listenForEvent(){if(this._subscribed)return this._subscribed(),void(this._subscribed=void 0);this._subscribed=await this.hass.connection.subscribeEvents((t=>{this.blueprint.identifier_key in t.data&&(this.identifier_input.value=t.data[this.blueprint.identifier_key],this._identifierChanged(),this._subscribed(),this._subscribed=void 0)}),this.blueprint.event_type)}_identifierChanged(t){this.config.identifier=function(t,e,i=!0){return i?t.renderRoot.querySelector(`#${e}`).value.toString().trim():t.querySelector(`#${e}`).value.toString().trim()}(this,"identifier-input"),this._dirty=!0}_modeValueChanged(t){var e;(null===(e=this.config)||void 0===e?void 0:e.buttons[this.button_index].actions[this.action_index].mode)!=t.detail.value&&(this.config.buttons[this.button_index].actions[this.action_index].mode=t.detail.value,this.requestUpdate("config"),this._dirty=!0)}async _showRenameDialog(){vt(this,"show-dialog",{dialogTag:"switch-manager-dialog-rename-switch",dialogImport:()=>Promise.resolve().then((function(){return ze})),dialogParams:{config:this.config,update:t=>{this.config.name=t.name,this._dirty=!0,this.requestUpdate()},onClose:()=>{}}})}_updateSequence(t){var e,i,s,o;t&&(this.config.buttons[this.button_index].actions[this.action_index].sequence=t),this.sequence=this.config.buttons[this.button_index].actions[this.action_index].sequence,this._buttonTotalSequence(this.config.buttons[this.button_index])?null===(o=null===(s=this.svg)||void 0===s?void 0:s.querySelector("[selected]"))||void 0===o||o.removeAttribute("empty"):null===(i=null===(e=this.svg)||void 0===e?void 0:e.querySelector("[selected]"))||void 0===i||i.setAttribute("empty",""),this.requestUpdate("config")}_toggleEnabled(){this.hass.callWS({type:ft("config/enabled"),enabled:!this.config.enabled,config_id:this.config.id}).then((t=>{this.config.enabled=t.enabled,this.requestUpdate("config"),yt(this,{message:"Switch "+(t.enabled?"Enabled":"Disabled")})})).catch((t=>yt(this,{message:t.message})))}async _deleteConfirm(){wt(this,{title:"Delete switch?",text:`${this.config.name} will be permanently deleted.`,confirmText:"Delete",dismissText:"Cancel",confirm:()=>this._delete(),confirmation:!0,destructive:!0})}async _delete(){this.hass.callWS({type:ft("config/delete"),config_id:this.config.id.toString()}).then((t=>{yt(this,{message:"Switch Deleted"}),bt(mt())}))}}t([s()],Me.prototype,"hass",void 0),t([s()],Me.prototype,"narrow",void 0),t([s()],Me.prototype,"panel",void 0),t([s()],Me.prototype,"route",void 0),t([s()],Me.prototype,"params",void 0),t([s()],Me.prototype,"blueprint",void 0),t([s()],Me.prototype,"config",void 0),t([s()],Me.prototype,"disabled",void 0),t([o()],Me.prototype,"_subscribed",void 0),t([o()],Me.prototype,"sequence",void 0),t([o()],Me.prototype,"button_index",void 0),t([o()],Me.prototype,"action_index",void 0),t([o()],Me.prototype,"is_new",void 0),t([o()],Me.prototype,"_dirty",void 0),t([o()],Me.prototype,"_block_save",void 0),t([o()],Me.prototype,"_errors",void 0),t([n("#switch-svg")],Me.prototype,"svg",void 0),t([n("#identifier-input")],Me.prototype,"identifier_input",void 0),customElements.define("switch-manager-switch-editor",Me);let Ue=class extends nt{get route(){return this._route}set route(t){this._route=t;let e=t.path.split("/");"new"==e[1]?this.params={action:"new",blueprint:e[2]}:"edit"==e[1]?this.params={action:"edit",id:e[2]}:this.params={}}constructor(){super(),this.params={},this.component_name="custom",(async()=>{var t,e,i,s,o,n,r;if(customElements.get("ha-automation-action")&&customElements.get("ha-data-table"))return;await customElements.whenDefined("partial-panel-resolver");const a=document.createElement("partial-panel-resolver").getRoutes([{component_name:"config",url_path:"a"}]);await(null===(i=null===(e=null===(t=null==a?void 0:a.routes)||void 0===t?void 0:t.a)||void 0===e?void 0:e.load)||void 0===i?void 0:i.call(e)),await customElements.whenDefined("ha-panel-config");const l=document.createElement("ha-panel-config");await(null===(r=null===(n=null===(o=null===(s=null==l?void 0:l.routerOptions)||void 0===s?void 0:s.routes)||void 0===o?void 0:o.script)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await customElements.whenDefined("ha-config-dashboard")})()}render(){return"action"in this.params?q`        
                <switch-manager-switch-editor .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .params=${this.params}></switch-manager-index>
            `:q`
                <switch-manager-index .hass=${this.hass} .narrow=${this.narrow} .route=${this.route}>
            `}firstUpdated(t){super.firstUpdated(t),this.hass.loadFragmentTranslation("config")}};t([s()],Ue.prototype,"hass",void 0),t([s()],Ue.prototype,"narrow",void 0),t([s()],Ue.prototype,"panel",void 0),t([o()],Ue.prototype,"params",void 0),t([o()],Ue.prototype,"component_name",void 0),t([s()],Ue.prototype,"route",null),Ue=t([e("switch-manager-panel")],Ue);let Te=class extends nt{async showDialog(t){this._params=t}closeDialog(){var t,e;return!(null===(t=this._params)||void 0===t?void 0:t.confirmation)&&!(null===(e=this._params)||void 0===e?void 0:e.prompt)&&(!this._params||(this._dismiss(),!0))}render(){if(!this._params)return q``;const t=this._params.confirmation||this._params.prompt;return q`
            <ha-dialog
                open
                ?scrimClickAction=${t}
                ?escapeKeyAction=${t}
                @closed=${this._dialogClosed}
                defaultAction="ignore"
                .heading=${q`${this._params.warning?q`<ha-svg-icon
                    .path=${"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"}
                    style="color: var(--warning-color)"
                    ></ha-svg-icon> `:""}${this._params.title?this._params.title:this._params.confirmation&&this.hass.localize("ui.dialogs.generic.default_confirmation_title")}`}>
                
                <div>
                    ${this._params.text?q`
                    <p class=${this._params.prompt?"no-bottom-padding":""}>
                        ${this._params.text}
                    </p>`:""}
                </div>
                ${t&&q`
                <mwc-button @click=${this._dismiss} slot="secondaryAction">
                    ${this._params.dismissText?this._params.dismissText:this.hass.localize("ui.dialogs.generic.cancel")}
                </mwc-button>
                `}
                <mwc-button
                    @click=${this._confirm}
                    ?dialogInitialFocus=${!this._params.prompt}
                    slot="primaryAction"
                    class=${Ne({destructive:this._params.destructive||!1})}>
                    ${this._params.confirmText?this._params.confirmText:this.hass.localize("ui.dialogs.generic.ok")}
                </mwc-button>
            </ha-dialog>
        `}_dismiss(){var t;(null===(t=this._params)||void 0===t?void 0:t.cancel)&&this._params.cancel(),this._close()}_confirm(){this._params.confirm&&this._params.confirm(),this._close()}_dialogClosed(t){"ignore"!==t.detail.action&&this._dismiss()}_close(){this._params&&(this._params=void 0,vt(this,"dialog-closed",{dialog:this.localName}))}static get styles(){return p`
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
        `}};t([s({attribute:!1})],Te.prototype,"hass",void 0),t([o()],Te.prototype,"_params",void 0),Te=t([e("switch-manager-dialog-confirm")],Te);var Oe=Object.freeze({__proto__:null});let Le=class extends nt{constructor(){super(...arguments),this._opened=!1}showDialog(){this._opened=!0}closeDialog(){this._opened&&vt(this,"dialog-closed",{dialog:this.localName}),this._opened=!1}render(){return this._opened?q`
            <ha-dialog        
                open
                hideActions
                @closed=${this.closeDialog}
                .heading="${$t("Select Blueprint")}">
                <p>Can't find a blueprint for your switch? create your own.
                    <ha-icon-button .path=${"M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"} @click=${()=>window.open("https://github.com/Sian-Lee-SA/Home-Assistant-Switch-Manager#blueprints","_blank").focus()}></ha-icon-button>
                </p>
                <mwc-list>
                    ${this._listBlueprints()}
                </mwc-list>
            </ha-dialog>
        `:q``}static get styles(){return[xe,Se,p`

            mwc-list-item {
                min-width: 470px;
                height: 90px;
                padding: 0px 20px;
                align-items: center;
            }
            h2 {
                padding: 0px 0px 12px;
                margin: 15px 0px 0px;
                font-weight: normal;
                font-size: 1.3em;
                border-bottom: 1px solid #DDD;
            }
            h2:first-child {
                margin: 0;
            }
            p {
                margin: -35px 0 0 0;
                font-size: 0.8em;
            }
            ha-icon-button {
                vertical-align: middle;
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
                padding: 4px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
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
        `]}_itemClicked(t){bt(mt(`new/${t}`)),this.closeDialog()}connectedCallback(){super.connectedCallback(),this._updateBlueprints()}_updateBlueprints(){this.hass.callWS({type:ft("blueprints")}).then((t=>{this.blueprints=t.blueprints})).catch((t=>yt(this,{message:t.message})))}_listBlueprints(){if(!this.blueprints)return;let t={};for(let e of Object.values(this.blueprints))t[e.service]||(t[e.service]=[]),t[e.service].push(e);let e=[];for(let i in t){e.push(q`<h2>${i}</h2>`);for(let s of t[i])e.push(q`
                <mwc-list-item @click=${()=>this._itemClicked(s.id)} data-item-id="${s.id}">
                        <div class="row">
                            <div class="image">
                                ${s.has_image?q`<img src="${_t(`${s.id}.png`)}" />`:q`<ha-svg-icon style="fill: var(--primary-color);" .path=${dt}></ha-svg-icon>`}
                            </div>
                            <div class="name">${s.name}</div>
                        </div>
                </mwc-list-item>`)}return e}};t([s({attribute:!1})],Le.prototype,"hass",void 0),t([s({attribute:!1})],Le.prototype,"blueprints",void 0),t([o()],Le.prototype,"_opened",void 0),Le=t([e("switch-manager-dialog-blueprint-selector")],Le);var Re=Object.freeze({__proto__:null});let De=class extends nt{constructor(){super(...arguments),this._opened=!1}showDialog(t){this._opened=!0,this._error=null,this._params=t,this._newName=t.config.name}closeDialog(){this._params.onClose(),this._opened&&vt(this,"dialog-closed",{dialog:this.localName}),this._opened=!1}render(){return this._opened?q`
            <ha-dialog
                open
                scrimClickAction
                @closed=${this.closeDialog}
                .heading="${$t("Rename")}">
                ${this._error?q`<ha-alert alert-type="error">Missing Name</ha-alert>`:""}

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
        `:q``}static get styles(){return[Ae,xe,p`
            ha-textfield,
            ha-textarea {
              display: block;
            }
            ha-alert {
              display: block;
              margin-bottom: 16px;
            }
          `]}_valueChanged(t){t.stopPropagation();const e=t.target;this._newName=e.value}_save(){this._newName?(this._params.update(Object.assign(Object.assign({},this._params.config),{name:this._newName})),this.closeDialog()):this._error="Name is required"}};t([s({attribute:!1})],De.prototype,"hass",void 0),t([o()],De.prototype,"_opened",void 0),t([o()],De.prototype,"_error",void 0),De=t([e("switch-manager-dialog-rename-switch")],De);var ze=Object.freeze({__proto__:null});
