!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="http://localhost/celebrity-hunted/public/js/frontend/",n(n.s=18)}([function(e,t,n){"use strict";var o=n(5),r=Object.prototype.toString;function i(e){return"[object Array]"===r.call(e)}function s(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==r.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===r.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.call(null,e[r],r,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===r.call(e)},isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:s,isDate:function(e){return"[object Date]"===r.call(e)},isFile:function(e){return"[object File]"===r.call(e)},isBlob:function(e){return"[object Blob]"===r.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:l,merge:function e(){var t={};function n(n,o){c(t[o])&&c(n)?t[o]=e(t[o],n):c(n)?t[o]=e({},n):i(n)?t[o]=n.slice():t[o]=n}for(var o=0,r=arguments.length;o<r;o++)l(arguments[o],n);return t},extend:function(e,t,n){return l(t,(function(t,r){e[r]=n&&"function"==typeof t?o(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},function(e,t,n){"use strict";(function(t){var o=n(0),r=n(26),i=n(7),s={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var c,u={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==t&&"[object process]"===Object.prototype.toString.call(t))&&(c=n(8)),c),transformRequest:[function(e,t){return r(t,"Accept"),r(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)||t&&"application/json"===t["Content-Type"]?(a(t,"application/json"),function(e,t,n){if(o.isString(e))try{return(t||JSON.parse)(e),o.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||u.transitional,n=t&&t.silentJSONParsing,r=t&&t.forcedJSONParsing,s=!n&&"json"===this.responseType;if(s||r&&o.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(s){if("SyntaxError"===e.name)throw i(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};o.forEach(["delete","get","head"],(function(e){u.headers[e]={}})),o.forEach(["post","put","patch"],(function(e){u.headers[e]=o.merge(s)})),e.exports=u}).call(this,n(25))},function(e,t,n){"use strict";function o(e){this.message=e}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,e.exports=o},function(e,t,n){e.exports=n(20)},function(e){e.exports=JSON.parse('{"text":{"welcome_title":"Bienvenue","welcome_text":"Retrouve sur l’image au moins une équipe et tente de remporter un bon d’achat d’une valeur de 1000€ sur Amazon.","button_start":"Commencer la<br />traque","button_start_disclaimer":"[ Le jeu se lancera en plein écran ] ","win_title":"Félicitations","win_text":"Vous avez trouvé {team_name} en {time}. Le temps moyen est de {average}.<br /><br />Tentez de gagner un bon d\'achat de 1000€ sur Amazon en vous inscrivant au tirage au sort.","already_signed_text":"Vous avez trouvé {team_name} en {time}. Le temps moyen est de {average}.<br /><br />Vous êtes déjà inscrit au jeu concours. Le tirage au sort aura lieu très bientôt !","cookies_text":"Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site web. En continuant à naviguer sur ce site, vous acceptez nos cookies.","cookies_accept":"Accepter","cookies_refuse":"Refuser","thanks_title":"Merci","thanks_text":"Vous êtes bien inscrit au jeu concours.<br /><br />Partagez ce jeu et augmentez vos chances de gagner !","welcome_more":"en savoir plus","help_title":"Le jeu concours","help_text":"Pour participer, zoomes à l’intérieur de l’image jusqu’à ce que tu trouves un des duos en fuite.<br /><br />Une fois trouvé, clique sur eux pour t’inscrire au tirage au sort en indiquant ton mail pour tenter de gagner un bon d’achat Amazon d’une valeur de 1000€.<br /><br />Augmente tes chances de gagner en partageant ton score sur les réseaux sociaux.<br /><br />Deux gagnants seront tirés au sort le 29/10/2021 puis le 02/11/2021.","policy_button_text":"Politique de confidentialité et règlement du jeu concours","policy_button_text_mobile":"Réglement et conditions générales","error_title":"Désolé","error_text":"Chaque joueur ne peut s’inscrire qu’une au jeu concours et vous vous êtes déjà inscrit.<br /><br />Le tirage au sort aura lieu très bientôt !","trailer_title":"La bande annonce"},"teams":{"team4":"Ramzy et Franck","team3":"Dadju et Darcy","team2":"Seb la Frite et Squeezie","team1":"Florent et Laure Manaudou"},"share":{"title":"Partage ton score et challenge tes amis à le battre !","desc":"#CelebrityHunted : J’ai retrouvé {team_name} en {time}. Toi aussi participe pour battre mon record !"}}')},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return e.apply(t,n)}}},function(e,t,n){"use strict";var o=n(0);function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,(function(e,t){null!=e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,(function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))})))})),i=s.join("&")}if(i){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},function(e,t,n){"use strict";e.exports=function(e,t,n,o,r){return e.config=t,n&&(e.code=n),e.request=o,e.response=r,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},function(e,t,n){"use strict";var o=n(0),r=n(27),i=n(28),s=n(6),a=n(29),c=n(32),u=n(33),l=n(9),d=n(1),f=n(2);e.exports=function(e){return new Promise((function(t,n){var p,m=e.data,h=e.headers,v=e.responseType;function y(){e.cancelToken&&e.cancelToken.unsubscribe(p),e.signal&&e.signal.removeEventListener("abort",p)}o.isFormData(m)&&delete h["Content-Type"];var g=new XMLHttpRequest;if(e.auth){var b=e.auth.username||"",w=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";h.Authorization="Basic "+btoa(b+":"+w)}var _=a(e.baseURL,e.url);function S(){if(g){var o="getAllResponseHeaders"in g?c(g.getAllResponseHeaders()):null,i={data:v&&"text"!==v&&"json"!==v?g.response:g.responseText,status:g.status,statusText:g.statusText,headers:o,config:e,request:g};r((function(e){t(e),y()}),(function(e){n(e),y()}),i),g=null}}if(g.open(e.method.toUpperCase(),s(_,e.params,e.paramsSerializer),!0),g.timeout=e.timeout,"onloadend"in g?g.onloadend=S:g.onreadystatechange=function(){g&&4===g.readyState&&(0!==g.status||g.responseURL&&0===g.responseURL.indexOf("file:"))&&setTimeout(S)},g.onabort=function(){g&&(n(l("Request aborted",e,"ECONNABORTED",g)),g=null)},g.onerror=function(){n(l("Network Error",e,null,g)),g=null},g.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",o=e.transitional||d.transitional;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,o.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",g)),g=null},o.isStandardBrowserEnv()){var k=(e.withCredentials||u(_))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;k&&(h[e.xsrfHeaderName]=k)}"setRequestHeader"in g&&o.forEach(h,(function(e,t){void 0===m&&"content-type"===t.toLowerCase()?delete h[t]:g.setRequestHeader(t,e)})),o.isUndefined(e.withCredentials)||(g.withCredentials=!!e.withCredentials),v&&"json"!==v&&(g.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&g.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&g.upload&&g.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(p=function(e){g&&(n(!e||e&&e.type?new f("canceled"):e),g.abort(),g=null)},e.cancelToken&&e.cancelToken.subscribe(p),e.signal&&(e.signal.aborted?p():e.signal.addEventListener("abort",p))),m||(m=null),g.send(m)}))}},function(e,t,n){"use strict";var o=n(7);e.exports=function(e,t,n,r,i){var s=new Error(e);return o(s,t,n,r,i)}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";var o=n(0);e.exports=function(e,t){t=t||{};var n={};function r(e,t){return o.isPlainObject(e)&&o.isPlainObject(t)?o.merge(e,t):o.isPlainObject(t)?o.merge({},t):o.isArray(t)?t.slice():t}function i(n){return o.isUndefined(t[n])?o.isUndefined(e[n])?void 0:r(void 0,e[n]):r(e[n],t[n])}function s(e){if(!o.isUndefined(t[e]))return r(void 0,t[e])}function a(n){return o.isUndefined(t[n])?o.isUndefined(e[n])?void 0:r(void 0,e[n]):r(void 0,t[n])}function c(n){return n in t?r(e[n],t[n]):n in e?r(void 0,e[n]):void 0}var u={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c};return o.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||i,r=t(e);o.isUndefined(r)&&t!==c||(n[e]=r)})),n}},function(e,t){e.exports={version:"0.23.0"}},function(e,t,n){var o,r;
/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/void 0===(r="function"==typeof(o=function(){"use strict";var e,t,n,o;return function(s){if(!document.querySelectorAll){var a=document.createStyleSheet();document.querySelectorAll=function(e,t,n,o,r){for(r=document.all,t=[],n=(e=e.replace(/\[for\b/gi,"[htmlFor").split(",")).length;n--;){for(a.addRule(e[n],"k:v"),o=r.length;o--;)r[o].currentStyle.k&&t.push(r[o]);a.removeRule(0)}return t}}var u=this,l=u._util={};l.elements=[],l.destroyed=!0,u.options=s||{},u.options.error=u.options.error||!1,u.options.offset=u.options.offset||100,u.options.root=u.options.root||document,u.options.success=u.options.success||!1,u.options.selector=u.options.selector||".b-lazy",u.options.separator=u.options.separator||"|",u.options.containerClass=u.options.container,u.options.container=!!u.options.containerClass&&document.querySelectorAll(u.options.containerClass),u.options.errorClass=u.options.errorClass||"b-error",u.options.breakpoints=u.options.breakpoints||!1,u.options.loadInvisible=u.options.loadInvisible||!1,u.options.successClass=u.options.successClass||"b-loaded",u.options.validateDelay=u.options.validateDelay||25,u.options.saveViewportOffsetDelay=u.options.saveViewportOffsetDelay||50,u.options.srcset=u.options.srcset||"data-srcset",u.options.src=e=u.options.src||"data-src",o=Element.prototype.closest,n=window.devicePixelRatio>1,(t={}).top=0-u.options.offset,t.left=0-u.options.offset,u.revalidate=function(){r(u)},u.load=function(e,t){var n=this.options;e&&void 0===e.length?c(e,t,n):_(e,(function(e){c(e,t,n)}))},u.destroy=function(){var e=u._util;u.options.container&&_(u.options.container,(function(t){w(t,"scroll",e.validateT)})),w(window,"scroll",e.validateT),w(window,"resize",e.validateT),w(window,"resize",e.saveViewportOffsetT),e.count=0,e.elements.length=0,e.destroyed=!0},l.validateT=S((function(){i(u)}),u.options.validateDelay,u),l.saveViewportOffsetT=S((function(){g(u.options.offset)}),u.options.saveViewportOffsetDelay,u),g(u.options.offset),_(u.options.breakpoints,(function(t){if(t.width>=window.screen.width)return e=t.src,!1})),setTimeout((function(){r(u)}))};function r(e){var t=e._util;t.elements=function(e){for(var t=[],n=e.root.querySelectorAll(e.selector),o=n.length;o--;t.unshift(n[o]));return t}(e.options),t.count=t.elements.length,t.destroyed&&(t.destroyed=!1,e.options.container&&_(e.options.container,(function(e){b(e,"scroll",t.validateT)})),b(window,"resize",t.saveViewportOffsetT),b(window,"resize",t.validateT),b(window,"scroll",t.validateT)),i(e)}function i(e){for(var t=e._util,n=0;n<t.count;n++){var o=t.elements[n];(s(o,e.options)||v(o,e.options.successClass))&&(e.load(o),t.elements.splice(n,1),t.count--,n--)}0===t.count&&e.destroy()}function s(e,n){var r=e.getBoundingClientRect();if(n.container&&o){var i=e.closest(n.containerClass);if(i){var s=i.getBoundingClientRect();if(a(s,t)){var c=s.top-n.offset,u=s.right+n.offset,l=s.bottom+n.offset,d=s.left-n.offset;return a(r,{top:c>t.top?c:t.top,right:u<t.right?u:t.right,bottom:l<t.bottom?l:t.bottom,left:d>t.left?d:t.left})}return!1}}return a(r,t)}function a(e,t){return e.right>=t.left&&e.bottom>=t.top&&e.left<=t.right&&e.top<=t.bottom}function c(t,o,r){if(!v(t,r.successClass)&&(o||r.loadInvisible||t.offsetWidth>0&&t.offsetHeight>0)){var i=p(t,e)||p(t,r.src);if(i){var s=i.split(r.separator),a=s[n&&s.length>1?1:0],c=p(t,r.srcset),f=h(t,"img"),m=t.parentNode,g=m&&h(m,"picture");if(f||void 0===t.src){var S=new Image,k=function(){r.error&&r.error(t,"invalid"),y(t,r.errorClass),w(S,"error",k),w(S,"load",E)},E=function(){f?g||d(t,a,c):t.style.backgroundImage='url("'+a+'")',u(t,r),w(S,"load",E),w(S,"error",k)};g&&(S=t,_(m.getElementsByTagName("source"),(function(e){l(e,"srcset",r.srcset)}))),b(S,"error",k),b(S,"load",E),d(S,a,c)}else t.src=a,u(t,r)}else h(t,"video")?(_(t.getElementsByTagName("source"),(function(e){l(e,"src",r.src)})),t.load(),u(t,r)):(r.error&&r.error(t,"missing"),y(t,r.errorClass))}}function u(e,t){y(e,t.successClass),t.success&&t.success(e),m(e,t.src),m(e,t.srcset),_(t.breakpoints,(function(t){m(e,t.src)}))}function l(e,t,n){var o=p(e,n);o&&(f(e,t,o),m(e,n))}function d(e,t,n){n&&f(e,"srcset",n),e.src=t}function f(e,t,n){e.setAttribute(t,n)}function p(e,t){return e.getAttribute(t)}function m(e,t){e.removeAttribute(t)}function h(e,t){return e.nodeName.toLowerCase()===t}function v(e,t){return-1!==(" "+e.className+" ").indexOf(" "+t+" ")}function y(e,t){v(e,t)||(e.className+=" "+t)}function g(e){t.bottom=(window.innerHeight||document.documentElement.clientHeight)+e,t.right=(window.innerWidth||document.documentElement.clientWidth)+e}function b(e,t,n){e.attachEvent?e.attachEvent&&e.attachEvent("on"+t,n):e.addEventListener(t,n,{capture:!1,passive:!0})}function w(e,t,n){e.detachEvent?e.detachEvent&&e.detachEvent("on"+t,n):e.removeEventListener(t,n,{capture:!1,passive:!0})}function _(e,t){if(e&&t)for(var n=e.length,o=0;o<n&&!1!==t(e[o],o);o++);}function S(e,t,n){var o=0;return function(){var r=+new Date;r-o<t||(o=r,e.apply(n,arguments))}}})?o.call(t,n,t,e):o)||(e.exports=r)},,,,,function(e,t,n){"use strict";n.r(t);n(19);var o=n(13),r=n.n(o),i=n(3),s=n.n(i),a=n(4);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init(),this.rotate=document.querySelector(".b--rotate-a")}var t,n,o;return t=e,(n=[{key:"init",value:function(){var e=this;new r.a({selector:".b--lazy-a",successClass:"b--lazy-a--fade-in"}),this.loadTextData(),document.addEventListener("loaded",(function(t){e.hideKrpanoButtons(),e.krpano=document.getElementById("krpanoSWFObject"),e.events(),e.showMobileHeader(),e.hidePreloader()})),window.selectedTeams=[],window.email="",window.emailExists=[],this.preloadImages(["skin/assets/team1_found.png","skin/assets/team2_found.png","skin/assets/team3_found.png","skin/assets/team4_found.png"])}},{key:"playSound",value:function(){var e=new Audio("img/loop.ogg");e.addEventListener("ended",(function(){this.currentTime=0,this.play()}),!1),e.play(),e.volume=.1}},{key:"mobileCheck",value:function(){return[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some((function(e){return navigator.userAgent.match(e)}))}},{key:"showMobileHeader",value:function(){if(1==this.mobileCheck()){var e=document.querySelector(".b--card-c__front-items__hd__media");e.style.top=window.header_y,e.style.left=window.header_x,e.style.width=window.header_width,e.style.height=window.header_height}}},{key:"simulateTeam",value:function(){window.selectedTeams[0]={team:"team1",start:22222,stop:22222,totalSeconds:30,teamAverage:30}}},{key:"preloadImages",value:function(e){try{e.forEach((function(e){(new Image).src=e}))}catch(e){}}},{key:"loadTextData",value:function(){document.querySelectorAll("[data-text]").forEach((function(e){e.innerHTML=a.text[e.getAttribute("data-text")]}))}},{key:"hidePreloader",value:function(){document.querySelector(".b--preloader-a").classList.remove("b--preloader-a--is-active");var e=document.querySelector(".b--preloader-a video");e.pause(),e.currentTime=0}},{key:"showSignupForm",value:function(e){var t=window.selectedTeams.filter((function(t){return t.team===e})),n=t[0].totalSeconds,o=t[0].teamAverage,r=document.querySelector("#modal-inscription .b--card-c__front-items__bd__content");r.innerHTML=r.innerHTML.replace("{team_name}",a.teams[e]).replace("{time}",this.showPrettyTime(n)).replace("{average}",this.showPrettyTime(o)),this.openModal("modal-inscription"),this.closeModal("modal-inscription")}},{key:"showAlreadySignedForm",value:function(e){var t=window.selectedTeams.filter((function(t){return t.team===e})),n=t[0].totalSeconds,o=document.querySelector("#modal-inscription-2 .b--card-c__front-items__bd__content");o.innerHTML=o.innerHTML.replace("{team_name}",a.teams[e]).replace("{time}",this.showPrettyTime(n)).replace("{average}",this.showPrettyTime(t[0].teamAverage)),this.openModal("modal-inscription-2"),this.closeModal("modal-inscription-2")}},{key:"hideSignupForm",value:function(){document.querySelector("#modal-inscription .close-modal").click()}},{key:"showShareModal",value:function(){this.openModal("modal-share"),this.closeModal("modal-share")}},{key:"hideShareModal",value:function(){document.querySelector("#modal-share").classList.remove("b--card-c--is-visible")}},{key:"toggleFullscreen",value:function(e){var t=document.body;e instanceof HTMLElement&&(t=e);var n=document.webkitIsFullScreen||document.mozFullScreen||!1;t.requestFullScreen=t.requestFullScreen||t.webkitRequestFullScreen||t.mozRequestFullScreen||function(){return!1},document.cancelFullScreen=document.cancelFullScreen||document.webkitCancelFullScreen||document.mozCancelFullScreen||function(){return!1},document.querySelector("#fullscreen").classList.toggle("fullscreen-back"),n?document.cancelFullScreen():t.requestFullScreen()}},{key:"events",value:function(){var e=this;document.querySelector("#modal-home .b--card-c__front-items__bd__btn").addEventListener("click",(function(t){e.toggleFullscreen(t),document.querySelector("#modal-home").classList.remove("b--card-c--is-visible"),e.showKrpanoButtons(),e.startTimer()})),document.querySelector("#fullscreen").addEventListener("click",(function(t){e.toggleFullscreen(t)})),["team1","team2","team3","team4"].forEach((function(t){document.addEventListener(t,e.hotspotClickHandler.bind(e))})),document.querySelector("#modal-inscription .b--card-c__media-wrapper__icon").addEventListener("click",(function(){document.querySelector(".b--card-c").classList.remove("b--card-c--is-visible"),e.startTimer()})),document.querySelector("#modal-inscription .b--card-c__front-items__bd__input__icon").addEventListener("click",(function(){e.registerEmail()})),document.querySelector("#modal-inscription .b--card-c__media-wrapper__icon").addEventListener("click",(function(){document.querySelector("#modal-inscription").classList.remove("b--card-c--is-visible")})),document.addEventListener("button_trailer",(function(){e.showTrailer()})),document.addEventListener("about",(function(t){console.log("yeeeeee"),e.showHelpModal()})),document.querySelectorAll("[data-text='welcome_more']").forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault(),e.showHelpModal()}))})),1==this.mobileCheck()&&(90==screen.orientation.angle&&this.rotate.classList.add("b--rotate-a--is-visible"),window.addEventListener("orientationchange",this.checkOrientationChange.bind(this)))}},{key:"showTrailer",value:function(){this.openModal("modal-trailer"),this.closeModal("modal-trailer")}},{key:"showErrorModal",value:function(){this.openModal("modal-error"),this.closeModal("modal-error")}},{key:"showHelpModal",value:function(){this.openModal("modal-help"),this.closeModal("modal-help")}},{key:"startTimer",value:function(){var e=performance.now();window.startTime=e}},{key:"registerEmail",value:function(){var e=this,t=document.querySelector("#modal-inscription .b--card-c__front-items__bd__input"),n=document.querySelector("#modal-inscription .b--card-c__front-items__ft__checkbox");this.validateEmail(t.value)?n.checked?this.emailExists(t.value).then((function(o){0==o.data.length?(e.createParticipant(t.value,"game"),window.email=t.value):(e.hideSignupForm(),e.showErrorModal()),t.value="",n.checked=!1})):(n.classList.add("error"),this.validateEmail(t.value)&&t.classList.remove("error")):(t.classList.add("error"),n.checked?n.classList.remove("error"):n.classList.add("error"))}},{key:"validateEmail",value:function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}},{key:"checkOrientationChange",value:function(){0==screen.orientation.angle?this.rotate.classList.remove("b--rotate-a--is-visible"):this.rotate.classList.add("b--rotate-a--is-visible")}},{key:"hotspotClickHandler",value:function(e){this.findHotSpot(e.type)}},{key:"hideKrpanoButtons",value:function(){$("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about").fadeTo("fast",0)}},{key:"showKrpanoButtons",value:function(){$("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about").fadeTo("fast",1)}},{key:"findHotSpot",value:function(e){if(0==window.selectedTeams.filter((function(t){return t.team===e})).length){var t=performance.now(),n=Math.round((t-window.startTime)/1e3);window.selectedTeams.push({team:e,startTime:window.startTime,stopTime:t,totalSeconds:n}),document.querySelector("#"+e+"_button").classList.add("team-found"),this.createScore(e,n)}else""==window.email?this.showSignupForm(e):this.showAlreadySignedForm(e)}},{key:"showPrettyTime",value:function(e){Math.floor(e/3600),e%=3600;var t=Math.floor(e/60),n=e%60;return e>59?t+":"+n+" min":n+" sec"}},{key:"createParticipant",value:function(e,t){var n=this;s.a.post("http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/api/participants",{email:e,type:t}).then((function(t){n.hideSignupForm(),n.showShareModal(),window.email=e;var o=document.querySelector("#modal-inscription .b--card-c__front-items__bd__input"),r=document.querySelector("#modal-inscription .b--card-c__front-items__ft__checkbox");o.value="",r.checked=!1})).catch((function(e){console.log("ERROR",e)}))}},{key:"createScore",value:function(e,t){var n=this;s.a.post("http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/api/scores",{teamName:e,timePassed:t}).then((function(e){window.selectedTeams.filter((function(t){return t.team===e.data.teamName}))[0].teamAverage=e.data.avg,""==window.email?n.showSignupForm(e.data.teamName):n.showAlreadySignedForm(e.data.teamName)})).catch((function(e){console.log("ERROR",e)}))}},{key:"emailExists",value:function(e){return s.a.get("http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/api/participants/"+e).then((function(e){return e})).catch((function(e){console.log(e)}))}},{key:"openModal",value:function(e){this.krpano.call("hide_teams()");var t={targetID:"#"+e,objectClass:"b--card-c",backdropClass:"b--modal-backdrop-a",targetClass:"b--card-c--is-visible"};this.toggleClass(document.querySelector(t.targetID),t.targetClass);var n=document.createElement("div");n.className=t.backdropClass,document.body.appendChild(n)}},{key:"closeModal",value:function(e){var t=this,n={targetID:"#"+e,objectClass:"b--card-c",backdropClass:"b--modal-backdrop-a",targetClass:"b--card-c--is-visible"};document.querySelectorAll(".close-modal").forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault(),t.krpano.call("show_teams()"),t.removeClass(document.querySelector(n.targetID),n.targetClass),t.removeBackdrop(n),t.loadTextData(),t.startTimer(),$(".b--video-a__video iframe")[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")}))})),document.querySelectorAll("."+n.backdropClass).forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault(),t.krpano.call("show_teams()"),t.removeClass(document.querySelector(n.targetID),n.targetClass),t.removeBackdrop(n),t.loadTextData(),t.startTimer(),$(".b--video-a__video iframe")[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")}))}))}},{key:"toggleClass",value:function(e,t,n){this._toggleClassElements(this._getElements(e),t,n)}},{key:"_toggleClassElements",value:function(e,t,n){var o,r=e.length;for(o=0;o<r;o++)this._toggleClassElement(e[o],t,n)}},{key:"_toggleClassElement",value:function(e,t,n){var o,r,i,s,a,c,u;if(r=n||"",i=(o=t||"").split(" "),s=r.split(" "),c=e.className.split(" "),0==s.length){for(u=!0,a=0;a<i.length;a++)-1==c.indexOf(i[a])&&(u=!1);u?this._removeClassElement(e,o):this._addClassElement(e,o)}else{for(u=!0,a=0;a<i.length;a++)-1==c.indexOf(i[a])&&(u=!1);u?(this._removeClassElement(e,o),this._addClassElement(e,r)):(this._removeClassElement(e,r),this._addClassElement(e,o))}}},{key:"removeBackdrop",value:function(e){if(document.querySelector("."+e.backdropClass)){var t=document.querySelector("."+e.backdropClass);t.parentNode.removeChild(t)}}},{key:"removeClass",value:function(e,t){this._removeClassElements(this._getElements(e),t)}},{key:"_removeClassElements",value:function(e,t){var n,o=e.length;for(n=0;n<o;n++)this._removeClassElement(e[n],t)}},{key:"_removeClassElement",value:function(e,t){var n,o,r;for(o=e.className.split(" "),r=t.split(" "),n=0;n<r.length;n++)for(;o.indexOf(r[n])>-1;)o.splice(o.indexOf(r[n]),1);e.className=o.join(" ")}},{key:"_getElements",value:function(e){return"object"==c(e)?[e]:document.querySelectorAll(e)}},{key:"_addClassElement",value:function(e,t){var n,o,r;for(o=e.className.split(" "),r=t.split(" "),n=0;n<r.length;n++)-1==o.indexOf(r[n])&&(e.className+=" "+r[n])}}])&&u(t.prototype,n),o&&u(t,o),e}();t.default=l,new l},function(e,t,n){},function(e,t,n){"use strict";var o=n(0),r=n(5),i=n(21),s=n(11);var a=function e(t){var n=new i(t),a=r(i.prototype.request,n);return o.extend(a,i.prototype,n),o.extend(a,n),a.create=function(n){return e(s(t,n))},a}(n(1));a.Axios=i,a.Cancel=n(2),a.CancelToken=n(35),a.isCancel=n(10),a.VERSION=n(12).version,a.all=function(e){return Promise.all(e)},a.spread=n(36),a.isAxiosError=n(37),e.exports=a,e.exports.default=a},function(e,t,n){"use strict";var o=n(0),r=n(6),i=n(22),s=n(23),a=n(11),c=n(34),u=c.validators;function l(e){this.defaults=e,this.interceptors={request:new i,response:new i}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&c.assertOptions(t,{silentJSONParsing:u.transitional(u.boolean),forcedJSONParsing:u.transitional(u.boolean),clarifyTimeoutError:u.transitional(u.boolean)},!1);var n=[],o=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(o=o&&t.synchronous,n.unshift(t.fulfilled,t.rejected))}));var r,i=[];if(this.interceptors.response.forEach((function(e){i.push(e.fulfilled,e.rejected)})),!o){var l=[s,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(i),r=Promise.resolve(e);l.length;)r=r.then(l.shift(),l.shift());return r}for(var d=e;n.length;){var f=n.shift(),p=n.shift();try{d=f(d)}catch(e){p(e);break}}try{r=s(d)}catch(e){return Promise.reject(e)}for(;i.length;)r=r.then(i.shift(),i.shift());return r},l.prototype.getUri=function(e){return e=a(this.defaults,e),r(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),o.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,n,o){return this.request(a(o||{},{method:e,url:t,data:n}))}})),e.exports=l},function(e,t,n){"use strict";var o=n(0);function r(){this.handlers=[]}r.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=r},function(e,t,n){"use strict";var o=n(0),r=n(24),i=n(10),s=n(1),a=n(2);function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a("canceled")}e.exports=function(e){return c(e),e.headers=e.headers||{},e.data=r.call(e,e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),o.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return c(e),t.data=r.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=r.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){"use strict";var o=n(0),r=n(1);e.exports=function(e,t,n){var i=this||r;return o.forEach(n,(function(n){e=n.call(i,e,t)})),e}},function(e,t){var n,o,r=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{o="function"==typeof clearTimeout?clearTimeout:s}catch(e){o=s}}();var c,u=[],l=!1,d=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):d=-1,u.length&&p())}function p(){if(!l){var e=a(f);l=!0;for(var t=u.length;t;){for(c=u,u=[];++d<t;)c&&c[d].run();d=-1,t=u.length}c=null,l=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===s||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||l||a(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=h,r.addListener=h,r.once=h,r.off=h,r.removeListener=h,r.removeAllListeners=h,r.emit=h,r.prependListener=h,r.prependOnceListener=h,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){"use strict";var o=n(0);e.exports=function(e,t){o.forEach(e,(function(n,o){o!==t&&o.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[o])}))}},function(e,t,n){"use strict";var o=n(9);e.exports=function(e,t,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(o("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var o=n(0);e.exports=o.isStandardBrowserEnv()?{write:function(e,t,n,r,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),o.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),o.isString(r)&&a.push("path="+r),o.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var o=n(30),r=n(31);e.exports=function(e,t){return e&&!o(t)?r(e,t):t}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var o=n(0),r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(o.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=o.trim(e.substr(0,i)).toLowerCase(),n=o.trim(e.substr(i+1)),t){if(s[t]&&r.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}})),s):s}},function(e,t,n){"use strict";var o=n(0);e.exports=o.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var o=e;return t&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=o.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var o=n(12).version,r={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){r[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var i={};r.transitional=function(e,t,n){function r(e,t){return"[Axios v"+o+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,o,s){if(!1===e)throw new Error(r(o," has been removed"+(t?" in "+t:"")));return t&&!i[o]&&(i[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,o,s)}},e.exports={assertOptions:function(e,t,n){if("object"!=typeof e)throw new TypeError("options must be an object");for(var o=Object.keys(e),r=o.length;r-- >0;){var i=o[r],s=t[i];if(s){var a=e[i],c=void 0===a||s(a,i,e);if(!0!==c)throw new TypeError("option "+i+" must be "+c)}else if(!0!==n)throw Error("Unknown option "+i)}},validators:r}},function(e,t,n){"use strict";var o=n(2);function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,o=n._listeners.length;for(t=0;t<o;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,o=new Promise((function(e){n.subscribe(e),t=e})).then(e);return o.cancel=function(){n.unsubscribe(t)},o},e((function(e){n.reason||(n.reason=new o(e),t(n.reason))}))}r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},r.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},r.source=function(){var e;return{token:new r((function(t){e=t})),cancel:e}},e.exports=r},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}}]);