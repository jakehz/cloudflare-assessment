!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const o=n(1);addEventListener("fetch",e=>{e.respondWith(async function(e){const t=new o;t.get("/links",i),t.get("/sociallinks",a);let n=await t.route(e);if(404==n.status)try{let e=[];i().json().then(t=>{e=t});let t=[];a().json().then(e=>{t=e}),n=await fetch("https://static-links-page.signalnerve.workers.dev");let o="https://media-exp1.licdn.com/dms/image/C5603AQH1dL35hqgXIg/profile-displayphoto-shrink_200_200/0?e=1609372800&v=beta&t=NclQIAjfNQN53TKnfWLfA1xwtDWvxuElF_CRgg4klIg",l="Jacob Hernandez";n=(new HTMLRewriter).on("div#links",new r(e)).on("img#avatar",new s("src",o)).on("div#profile",new s("style","")).on("h1#name",{async element(e){e.append(l)}}).on("div#social",new r(t)).transform(n)}catch(e){console.log(e),n=new Response("Not Found",{status:404})}n||(n=new Response("no response",{status:404}));return n}(e.request))});class r{constructor(e){this.links=e}async element(e){this.links.forEach(t=>{e.append('<a href="'+t.link+'">'+t.name+"</a>",{html:!0})})}}class s{constructor(e,t){this.attribute=e,this.value=t}async element(e){e.setAttribute(this.attribute,this.value)}}function i(){return new Response(JSON.stringify([{name:"Google",link:"https://www.google.com"},{name:"Yahoo",link:"https://www.yahoo.com"},{name:"Cloudflare",link:"https://www.cloudflare.com"}],null,2),{headers:{"Content-Type":"application/json"}})}function a(){return new Response(JSON.stringify([{name:"Twitter",link:"https://www.twitter.com/jakehrz"},{name:"Facebook",link:"https://www.facebook.com/profile.php?id=100011431864887"},{name:"Github",link:"https://www.github.com/jakehz"}],null,2),{headers:{"Content-Type":"application/json"}})}},function(e,t){const n=e=>t=>t.method.toLowerCase()===e.toLowerCase(),o=n("connect"),r=n("delete"),s=n("get"),i=n("head"),a=n("options"),l=n("patch"),u=n("post"),c=n("put"),h=n("trace"),d=e=>t=>{const n=new URL(t.url).pathname;return(n.match(e)||[])[0]===n};e.exports=class{constructor(){this.routes=[]}handle(e,t){return this.routes.push({conditions:e,handler:t}),this}connect(e,t){return this.handle([o,d(e)],t)}delete(e,t){return this.handle([r,d(e)],t)}get(e,t){return this.handle([s,d(e)],t)}head(e,t){return this.handle([i,d(e)],t)}options(e,t){return this.handle([a,d(e)],t)}patch(e,t){return this.handle([l,d(e)],t)}post(e,t){return this.handle([u,d(e)],t)}put(e,t){return this.handle([c,d(e)],t)}trace(e,t){return this.handle([h,d(e)],t)}all(e){return this.handle([],e)}route(e){const t=this.resolve(e);return t?t.handler(e):new Response("resource not found",{status:404,statusText:"not found",headers:{"content-type":"text/plain"}})}resolve(e){return this.routes.find(t=>!(t.conditions&&(!Array.isArray(t)||t.conditions.length))||("function"==typeof t.conditions?t.conditions(e):t.conditions.every(t=>t(e))))}}}]);