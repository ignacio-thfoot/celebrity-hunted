!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="http://localhost/celebrity-hunted/public/js/frontend/",n(n.s=37)}([function(e,t,n){"use strict";var r=n(4),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function s(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:s,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:l,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(25),i=n(6),s={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var c,u={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==t&&"[object process]"===Object.prototype.toString.call(t))&&(c=n(7)),c),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)||t&&"application/json"===t["Content-Type"]?(a(t,"application/json"),function(e,t,n){if(r.isString(e))try{return(t||JSON.parse)(e),r.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||u.transitional,n=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,s=!n&&"json"===this.responseType;if(s||o&&r.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(s){if("SyntaxError"===e.name)throw i(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){u.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){u.headers[e]=r.merge(s)})),e.exports=u}).call(this,n(24))},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){e.exports=n(19)},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))})))})),i=s.join("&")}if(i){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},function(e,t,n){"use strict";var r=n(0),o=n(26),i=n(27),s=n(5),a=n(28),c=n(31),u=n(32),l=n(8),f=n(1),d=n(2);e.exports=function(e){return new Promise((function(t,n){var p,m=e.data,h=e.headers,v=e.responseType;function g(){e.cancelToken&&e.cancelToken.unsubscribe(p),e.signal&&e.signal.removeEventListener("abort",p)}r.isFormData(m)&&delete h["Content-Type"];var y=new XMLHttpRequest;if(e.auth){var b=e.auth.username||"",w=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";h.Authorization="Basic "+btoa(b+":"+w)}var E=a(e.baseURL,e.url);function x(){if(y){var r="getAllResponseHeaders"in y?c(y.getAllResponseHeaders()):null,i={data:v&&"text"!==v&&"json"!==v?y.response:y.responseText,status:y.status,statusText:y.statusText,headers:r,config:e,request:y};o((function(e){t(e),g()}),(function(e){n(e),g()}),i),y=null}}if(y.open(e.method.toUpperCase(),s(E,e.params,e.paramsSerializer),!0),y.timeout=e.timeout,"onloadend"in y?y.onloadend=x:y.onreadystatechange=function(){y&&4===y.readyState&&(0!==y.status||y.responseURL&&0===y.responseURL.indexOf("file:"))&&setTimeout(x)},y.onabort=function(){y&&(n(l("Request aborted",e,"ECONNABORTED",y)),y=null)},y.onerror=function(){n(l("Network Error",e,null,y)),y=null},y.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||f.transitional;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,r.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",y)),y=null},r.isStandardBrowserEnv()){var k=(e.withCredentials||u(E))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;k&&(h[e.xsrfHeaderName]=k)}"setRequestHeader"in y&&r.forEach(h,(function(e,t){void 0===m&&"content-type"===t.toLowerCase()?delete h[t]:y.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(y.withCredentials=!!e.withCredentials),v&&"json"!==v&&(y.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&y.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&y.upload&&y.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(p=function(e){y&&(n(!e||e&&e.type?new d("canceled"):e),y.abort(),y=null)},e.cancelToken&&e.cancelToken.subscribe(p),e.signal&&(e.signal.aborted?p():e.signal.addEventListener("abort",p))),m||(m=null),y.send(m)}))}},function(e,t,n){"use strict";var r=n(6);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){t=t||{};var n={};function o(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function i(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(e[n],t[n])}function s(e){if(!r.isUndefined(t[e]))return o(void 0,t[e])}function a(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(void 0,t[n])}function c(n){return n in t?o(e[n],t[n]):n in e?o(void 0,e[n]):void 0}var u={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c};return r.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||i,o=t(e);r.isUndefined(o)&&t!==c||(n[e]=o)})),n}},function(e,t){e.exports={version:"0.23.0"}},function(e,t,n){var r,o;
/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/void 0===(o="function"==typeof(r=function(){"use strict";var e,t,n,r;return function(s){if(!document.querySelectorAll){var a=document.createStyleSheet();document.querySelectorAll=function(e,t,n,r,o){for(o=document.all,t=[],n=(e=e.replace(/\[for\b/gi,"[htmlFor").split(",")).length;n--;){for(a.addRule(e[n],"k:v"),r=o.length;r--;)o[r].currentStyle.k&&t.push(o[r]);a.removeRule(0)}return t}}var u=this,l=u._util={};l.elements=[],l.destroyed=!0,u.options=s||{},u.options.error=u.options.error||!1,u.options.offset=u.options.offset||100,u.options.root=u.options.root||document,u.options.success=u.options.success||!1,u.options.selector=u.options.selector||".b-lazy",u.options.separator=u.options.separator||"|",u.options.containerClass=u.options.container,u.options.container=!!u.options.containerClass&&document.querySelectorAll(u.options.containerClass),u.options.errorClass=u.options.errorClass||"b-error",u.options.breakpoints=u.options.breakpoints||!1,u.options.loadInvisible=u.options.loadInvisible||!1,u.options.successClass=u.options.successClass||"b-loaded",u.options.validateDelay=u.options.validateDelay||25,u.options.saveViewportOffsetDelay=u.options.saveViewportOffsetDelay||50,u.options.srcset=u.options.srcset||"data-srcset",u.options.src=e=u.options.src||"data-src",r=Element.prototype.closest,n=window.devicePixelRatio>1,(t={}).top=0-u.options.offset,t.left=0-u.options.offset,u.revalidate=function(){o(u)},u.load=function(e,t){var n=this.options;e&&void 0===e.length?c(e,t,n):E(e,(function(e){c(e,t,n)}))},u.destroy=function(){var e=u._util;u.options.container&&E(u.options.container,(function(t){w(t,"scroll",e.validateT)})),w(window,"scroll",e.validateT),w(window,"resize",e.validateT),w(window,"resize",e.saveViewportOffsetT),e.count=0,e.elements.length=0,e.destroyed=!0},l.validateT=x((function(){i(u)}),u.options.validateDelay,u),l.saveViewportOffsetT=x((function(){y(u.options.offset)}),u.options.saveViewportOffsetDelay,u),y(u.options.offset),E(u.options.breakpoints,(function(t){if(t.width>=window.screen.width)return e=t.src,!1})),setTimeout((function(){o(u)}))};function o(e){var t=e._util;t.elements=function(e){for(var t=[],n=e.root.querySelectorAll(e.selector),r=n.length;r--;t.unshift(n[r]));return t}(e.options),t.count=t.elements.length,t.destroyed&&(t.destroyed=!1,e.options.container&&E(e.options.container,(function(e){b(e,"scroll",t.validateT)})),b(window,"resize",t.saveViewportOffsetT),b(window,"resize",t.validateT),b(window,"scroll",t.validateT)),i(e)}function i(e){for(var t=e._util,n=0;n<t.count;n++){var r=t.elements[n];(s(r,e.options)||v(r,e.options.successClass))&&(e.load(r),t.elements.splice(n,1),t.count--,n--)}0===t.count&&e.destroy()}function s(e,n){var o=e.getBoundingClientRect();if(n.container&&r){var i=e.closest(n.containerClass);if(i){var s=i.getBoundingClientRect();if(a(s,t)){var c=s.top-n.offset,u=s.right+n.offset,l=s.bottom+n.offset,f=s.left-n.offset;return a(o,{top:c>t.top?c:t.top,right:u<t.right?u:t.right,bottom:l<t.bottom?l:t.bottom,left:f>t.left?f:t.left})}return!1}}return a(o,t)}function a(e,t){return e.right>=t.left&&e.bottom>=t.top&&e.left<=t.right&&e.top<=t.bottom}function c(t,r,o){if(!v(t,o.successClass)&&(r||o.loadInvisible||t.offsetWidth>0&&t.offsetHeight>0)){var i=p(t,e)||p(t,o.src);if(i){var s=i.split(o.separator),a=s[n&&s.length>1?1:0],c=p(t,o.srcset),d=h(t,"img"),m=t.parentNode,y=m&&h(m,"picture");if(d||void 0===t.src){var x=new Image,k=function(){o.error&&o.error(t,"invalid"),g(t,o.errorClass),w(x,"error",k),w(x,"load",_)},_=function(){d?y||f(t,a,c):t.style.backgroundImage='url("'+a+'")',u(t,o),w(x,"load",_),w(x,"error",k)};y&&(x=t,E(m.getElementsByTagName("source"),(function(e){l(e,"srcset",o.srcset)}))),b(x,"error",k),b(x,"load",_),f(x,a,c)}else t.src=a,u(t,o)}else h(t,"video")?(E(t.getElementsByTagName("source"),(function(e){l(e,"src",o.src)})),t.load(),u(t,o)):(o.error&&o.error(t,"missing"),g(t,o.errorClass))}}function u(e,t){g(e,t.successClass),t.success&&t.success(e),m(e,t.src),m(e,t.srcset),E(t.breakpoints,(function(t){m(e,t.src)}))}function l(e,t,n){var r=p(e,n);r&&(d(e,t,r),m(e,n))}function f(e,t,n){n&&d(e,"srcset",n),e.src=t}function d(e,t,n){e.setAttribute(t,n)}function p(e,t){return e.getAttribute(t)}function m(e,t){e.removeAttribute(t)}function h(e,t){return e.nodeName.toLowerCase()===t}function v(e,t){return-1!==(" "+e.className+" ").indexOf(" "+t+" ")}function g(e,t){v(e,t)||(e.className+=" "+t)}function y(e){t.bottom=(window.innerHeight||document.documentElement.clientHeight)+e,t.right=(window.innerWidth||document.documentElement.clientWidth)+e}function b(e,t,n){e.attachEvent?e.attachEvent&&e.attachEvent("on"+t,n):e.addEventListener(t,n,{capture:!1,passive:!0})}function w(e,t,n){e.detachEvent?e.detachEvent&&e.detachEvent("on"+t,n):e.removeEventListener(t,n,{capture:!1,passive:!0})}function E(e,t){if(e&&t)for(var n=e.length,r=0;r<n&&!1!==t(e[r],r);r++);}function x(e,t,n){var r=0;return function(){var o=+new Date;o-r<t||(r=o,e.apply(n,arguments))}}})?r.call(t,n,t,e):r)||(e.exports=o)},function(e){e.exports=JSON.parse('{"max_teams":4,"text":{"rgpd":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, obcaecati odio eos tempore inventore sapiente animi, quisquam numquam itaque perspiciatis aliquid, vel nam dolore atque aspernatur delectus iste. Tempora, obcaecati?","instructions":"Retrouve sur l\'image au moins une team et tente de remporter une watch partie avec un des membres du casting.","button_start":"commencer la chasse","win_title":"Felicitations !","win_text":"Si tu souhaites participer au tirage au sort pour remporter ta watch partie","cookies_text":"Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site web. En continuant à naviguer sur ce site, vous acceptez nos cookies.","cookies_accept":"Accepter","cookies_refuse":"Refuser"}}')},,,,,function(e,t,n){},function(e,t,n){"use strict";var r=n(0),o=n(4),i=n(20),s=n(10);var a=function e(t){var n=new i(t),a=o(i.prototype.request,n);return r.extend(a,i.prototype,n),r.extend(a,n),a.create=function(n){return e(s(t,n))},a}(n(1));a.Axios=i,a.Cancel=n(2),a.CancelToken=n(34),a.isCancel=n(9),a.VERSION=n(11).version,a.all=function(e){return Promise.all(e)},a.spread=n(35),a.isAxiosError=n(36),e.exports=a,e.exports.default=a},function(e,t,n){"use strict";var r=n(0),o=n(5),i=n(21),s=n(22),a=n(10),c=n(33),u=c.validators;function l(e){this.defaults=e,this.interceptors={request:new i,response:new i}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&c.assertOptions(t,{silentJSONParsing:u.transitional(u.boolean),forcedJSONParsing:u.transitional(u.boolean),clarifyTimeoutError:u.transitional(u.boolean)},!1);var n=[],r=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(r=r&&t.synchronous,n.unshift(t.fulfilled,t.rejected))}));var o,i=[];if(this.interceptors.response.forEach((function(e){i.push(e.fulfilled,e.rejected)})),!r){var l=[s,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(i),o=Promise.resolve(e);l.length;)o=o.then(l.shift(),l.shift());return o}for(var f=e;n.length;){var d=n.shift(),p=n.shift();try{f=d(f)}catch(e){p(e);break}}try{o=s(f)}catch(e){return Promise.reject(e)}for(;i.length;)o=o.then(i.shift(),i.shift());return o},l.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,n,r){return this.request(a(r||{},{method:e,url:t,data:n}))}})),e.exports=l},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(23),i=n(9),s=n(1),a=n(2);function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a("canceled")}e.exports=function(e){return c(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return c(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){"use strict";var r=n(0),o=n(1);e.exports=function(e,t,n){var i=this||o;return r.forEach(n,(function(n){e=n.call(i,e,t)})),e}},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var c,u=[],l=!1,f=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&p())}function p(){if(!l){var e=a(d);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||l||a(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},function(e,t,n){"use strict";var r=n(8);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(29),o=n(30);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}})),s):s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r=n(11).version,o={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){o[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var i={};o.transitional=function(e,t,n){function o(e,t){return"[Axios v"+r+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,r,s){if(!1===e)throw new Error(o(r," has been removed"+(t?" in "+t:"")));return t&&!i[r]&&(i[r]=!0,console.warn(o(r," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,r,s)}},e.exports={assertOptions:function(e,t,n){if("object"!=typeof e)throw new TypeError("options must be an object");for(var r=Object.keys(e),o=r.length;o-- >0;){var i=r[o],s=t[i];if(s){var a=e[i],c=void 0===a||s(a,i,e);if(!0!==c)throw new TypeError("option "+i+" must be "+c)}else if(!0!==n)throw Error("Unknown option "+i)}},validators:o}},function(e,t,n){"use strict";var r=n(2);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},o.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},function(e,t,n){"use strict";n.r(t);n(18);var r=class{_getElements(e){return"object"==typeof e?[e]:document.querySelectorAll(e)}hide(e){this._hideElements(this._getElements(e))}_hideElements(e){var t,n=e.length;for(t=0;t<n;t++)this._hideElement(e[t])}_hideElement(e){this._styleElement(e,"display","none")}show(e,t){var n=this._getElements(e);t&&this._hideElements(n),this._showElements(n)}_showElements(e){var t,n=e.length;for(t=0;t<n;t++)this._showElement(e[t])}_showElement(e){this._styleElement(e,"display","block")}addStyle(e,t,n){this._styleElements(this._getElements(e),t,n)}_styleElements(e,t,n){var r,o=e.length;for(r=0;r<o;r++)this._styleElement(e[r],t,n)}_styleElement(e,t,n){e.style.setProperty(t,n)}toggleShow(e){var t,n=this._getElements(e),r=n.length;for(t=0;t<r;t++)"none"==n[t].style.display?this._styleElement(n[t],"display","block"):this._styleElement(n[t],"display","none")}addClass(e,t){this._addClassElements(this._getElements(e),t)}_addClassElements(e,t){var n,r=e.length;for(n=0;n<r;n++)this._addClassElement(e[n],t)}_addClassElement(e,t){var n,r,o;for(r=e.className.split(" "),o=t.split(" "),n=0;n<o.length;n++)-1==r.indexOf(o[n])&&(e.className+=" "+o[n])}removeClass(e,t){this._removeClassElements(this._getElements(e),t)}_removeClassElements(e,t){var n,r=e.length;for(n=0;n<r;n++)this._removeClassElement(e[n],t)}_removeClassElement(e,t){var n,r,o;for(r=e.className.split(" "),o=t.split(" "),n=0;n<o.length;n++)for(;r.indexOf(o[n])>-1;)r.splice(r.indexOf(o[n]),1);e.className=r.join(" ")}toggleClass(e,t,n){this._toggleClassElements(this._getElements(e),t,n)}_toggleClassElements(e,t,n){var r,o=e.length;for(r=0;r<o;r++)this._toggleClassElement(e[r],t,n)}_toggleClassElement(e,t,n){var r,o,i,s,a,c,u;if(o=n||"",i=(r=t||"").split(" "),s=o.split(" "),c=e.className.split(" "),0==s.length){for(u=!0,a=0;a<i.length;a++)-1==c.indexOf(i[a])&&(u=!1);u?this._removeClassElement(e,r):this._addClassElement(e,r)}else{for(u=!0,a=0;a<i.length;a++)-1==c.indexOf(i[a])&&(u=!1);u?(this._removeClassElement(e,r),this._addClassElement(e,o)):(this._removeClassElement(e,o),this._addClassElement(e,r))}}getBrowser(){return-1!=(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR"))?"Opera":-1!=navigator.userAgent.indexOf("Chrome")?"Chrome":-1!=navigator.userAgent.indexOf("Safari")?"Safari":-1!=navigator.userAgent.indexOf("Firefox")?"Firefox":-1!=navigator.userAgent.indexOf("MSIE")||1==!!document.documentMode?"IE":"Unknown"}};function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.modal=document.querySelectorAll('[data-ds-element="modal"]'),this.js_ui=new r,this.events()}var t,n,i;return t=e,(n=[{key:"events",value:function(){var e=this;this.modal.forEach((function(t){t.addEventListener("click",(function(n){n.preventDefault();var r={targetID:t.getAttribute("data-target"),targetClass:t.getAttribute("data-target-class"),objectId:t,objectClass:t.getAttribute("data-self-class"),backdropClass:t.getAttribute("data-backdrop")};e.openModal(r),e.closeModal(r)}))}))}},{key:"openModal",value:function(e){this.js_ui.toggleClass(document.querySelector(e.targetID),e.targetClass);var t=document.createElement("div");t.className=e.backdropClass,document.body.appendChild(t)}},{key:"closeModal",value:function(e){var t=this;document.querySelectorAll("[data-dismiss]").forEach((function(n){n.addEventListener("click",(function(n){n.preventDefault(),t.js_ui.removeClass(document.querySelector(e.targetID),e.targetClass),t.removeBackdrop(e)}))})),document.querySelectorAll("."+e.backdropClass).forEach((function(n){n.addEventListener("click",(function(n){n.preventDefault(),t.js_ui.removeClass(document.querySelector(e.targetID),e.targetClass),t.removeBackdrop(e)}))}))}},{key:"removeBackdrop",value:function(e){if(document.querySelector("."+e.backdropClass)){var t=document.querySelector("."+e.backdropClass);t.parentNode.removeChild(t)}}}])&&o(t.prototype,n),i&&o(t,i),e}(),s=n(12),a=n.n(s),c=n(3),u=n.n(c),l=n(13);function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var d=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init(),this.rotate=document.querySelector(".b--rotate-a")}var t,n,r;return t=e,(n=[{key:"init",value:function(){var e=this;new i,new a.a({selector:".b--lazy-a",successClass:"b--lazy-a--fade-in"}),this.loadTextData(),document.addEventListener("loaded",(function(t){setTimeout((function(){e.hidePreloader(),e.events()}),50)})),window.selectedTeams=[],window.email=""}},{key:"loadTextData",value:function(){document.querySelectorAll("[data-text]").forEach((function(e){e.innerHTML=l.text[e.getAttribute("data-text")]}))}},{key:"hidePreloader",value:function(){document.querySelector(".b--preloader-a").classList.remove("b--preloader-a--is-active")}},{key:"events",value:function(){var e=this;document.querySelector(".b--card-b__front-items__bd__btn").addEventListener("click",(function(){document.querySelector(".b--card-b").classList.toggle("b--card-b--is-hidden")})),document.querySelectorAll(".team_buttons").forEach((function(t){t.addEventListener("click",e.teamClickHandler.bind(e))})),document.querySelectorAll(".team_hotspots").forEach((function(t){t.addEventListener("click",e.hotspotClickHandler.bind(e))})),document.querySelector(".b--card-c__front-items__bd__input__icon").addEventListener("click",(function(){e.registerEmail()})),window.mobilecheck=function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t},1==window.mobilecheck()&&(90==screen.orientation.angle&&this.rotate.classList.add("b--rotate-a--is-visible"),window.addEventListener("orientationchange",this.checkOrientationChange.bind(this))),document.querySelector(".js--click-setCookie").addEventListener("click",(function(e){document.querySelector(".b--cookies-a").style.display="none"}))}},{key:"registerEmail",value:function(){var e=document.querySelector(".b--card-c__front-items__bd__input").value;this.validateEmail(e)&&this.createParticipant(e,"jeux")}},{key:"validateEmail",value:function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}},{key:"checkOrientationChange",value:function(){0==screen.orientation.angle?this.rotate.classList.remove("b--rotate-a--is-visible"):this.rotate.classList.add("b--rotate-a--is-visible")}},{key:"teamClickHandler",value:function(e){this.selectTeam(e.srcElement),document.querySelector(".b--card-c").classList.remove("b--card-c--is-visible"),console.log(e.srcElement.id)}},{key:"hotspotClickHandler",value:function(e){this.findHotSpot(e.srcElement),console.log(e.srcElement.id)}},{key:"selectTeam",value:function(e){if(0==window.selectedTeams.filter((function(t){return t.team===e.id})).length){window.currentTeam=e.id;var t=performance.now();window.selectedTeams.push({team:e.id,start:t,stop:0})}}},{key:"findHotSpot",value:function(e){var t=window.selectedTeams.filter((function(t){return t.team+"_hotspot"===e.id}));if(0==t.length);else if(0==t[0].stop){var n=performance.now();t[0].stop=n,console.log(t[0]);var r=document.getElementById(t[0].team);r.classList.add("is--active");var o=Math.round((t[0].stop-t[0].start)/1e3);this.createScore(r.id,o),this.modalTeamFound()}}},{key:"modalTeamFound",value:function(){document.querySelector(".b--card-c").classList.add("b--card-c--is-visible")}},{key:"showPrettyTime",value:function(e){return Math.floor(e/3600),e%=3600,Math.floor(e/60)+" minutes, "+e%60+" seconds."}},{key:"createParticipant",value:function(e,t){u.a.post("http://locahost:8000/api/scores",{email:e,type:t}).then((function(e){console.log("RESPONSE",e)})).catch((function(e){console.log("ERROR",e)}))}},{key:"createScore",value:function(e,t){u.a.post("http://locahost:8000/api/scores",{teamName:e,timePassed:t}).then((function(e){console.log("RESPONSE",e)})).catch((function(e){console.log("ERROR",e)}))}}])&&f(t.prototype,n),r&&f(t,r),e}();t.default=d;new d}]);