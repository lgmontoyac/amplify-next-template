if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const d=e=>i(e,t),f={module:{uri:t},exports:n,require:d};s[t]=Promise.all(a.map((e=>f[e]||d(e)))).then((e=>(c(...e),n)))}}define(["./workbox-f52fd911"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"59e4cb0515072dc5d624569289dc8ff7"},{url:"/_next/static/7o5m3-7yef-4pfRsBNPPW/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/7o5m3-7yef-4pfRsBNPPW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/105-91e089c4b84aa6bc.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/160-54476ab65d1057c1.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/323-948eeeb8a7e6777b.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/584-62e4a0f9a1029d44.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/69-9cbb3c126fd31f9d.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/895.2262e0544e6ad637.js",revision:"2262e0544e6ad637"},{url:"/_next/static/chunks/app/_not-found-52eb00ec5d73535a.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/app/detail/%5Bslug%5D/page-f03015727a70850d.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/app/layout-bb6bef0a0b3e0154.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/app/list/page-82568f088d7194f4.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/app/page-cd45a95b71b3fdbc.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/fd9d1056-be1010a555dd28b3.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/main-app-647768ae9a538344.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/main-e8cbbdd8434e7ee3.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b29ff3ad12eed6fb.js",revision:"7o5m3-7yef-4pfRsBNPPW"},{url:"/_next/static/css/15b418456535484b.css",revision:"15b418456535484b"},{url:"/_next/static/css/28414d09be9fe2d7.css",revision:"28414d09be9fe2d7"},{url:"/_next/static/css/5dc781c0f413ab1d.css",revision:"5dc781c0f413ab1d"},{url:"/_next/static/css/6c9da843ab08711b.css",revision:"6c9da843ab08711b"},{url:"/_next/static/media/0039b43dcccd2067-s.p.ttf",revision:"7f19429deb75880a47921d57882f2491"},{url:"/_next/static/media/0755905261d4c20d-s.p.ttf",revision:"93cde6c18d42b020d71098387742aba8"},{url:"/_next/static/media/1dcf1509fadbcb69-s.p.ttf",revision:"3be006b41e7cb030d35e8ca116ffa3cc"},{url:"/_next/static/media/49480c97edd9448d-s.p.ttf",revision:"12b9abd7fc141cfeb4aad236336af5c6"},{url:"/_next/static/media/4afb1b18e9cd4586-s.p.ttf",revision:"281b8904873913a00a10b41584372556"},{url:"/_next/static/media/4f7b78416031b1be-s.p.ttf",revision:"e3f0fa1113dc23d972b38186c82fd5de"},{url:"/_next/static/media/51219276ef913e76-s.p.ttf",revision:"9fc0af0a795de3ff8ba7882dd5f91afc"},{url:"/_next/static/media/605645f024e73459-s.p.ttf",revision:"7e825c39f15050069cf660719d9409b7"},{url:"/_next/static/media/6bcc9bbb3bdfa2d8-s.p.ttf",revision:"7257a19c35a26f96198ece19b9231f26"},{url:"/_next/static/media/8223607d484e136a-s.p.ttf",revision:"d085097cf6a19fec8ea0f3dad8331509"},{url:"/_next/static/media/8cc1dcd2cb5ac989-s.p.ttf",revision:"dd93e37c71fe225fe7627bb5d825d1ef"},{url:"/_next/static/media/8f411a12aaa1bdd1-s.p.ttf",revision:"7fa90be7851ce19a9509451736f5404f"},{url:"/_next/static/media/923fa6ac4e258be7-s.p.ttf",revision:"1b31986af9cb3af2be6845b30e5b3958"},{url:"/_next/static/media/a265a078039b9b6f-s.p.ttf",revision:"33367c9ca49d7db456b1596e8b73ff4f"},{url:"/_next/static/media/adb6e3e739bb97bf-s.p.ttf",revision:"04b5cd6fb11bec60dfa3c5a3cc1dcc4f"},{url:"/_next/static/media/c774f3441e8065a8-s.p.ttf",revision:"755ac808845779e6aa71ac9f211e954a"},{url:"/_next/static/media/d91bb7fc5f8d4102-s.p.ttf",revision:"e0cd3ed0a805dea72c8300d792898965"},{url:"/_next/static/media/e6d94836181e8010-s.p.ttf",revision:"6e95d632a4a1d406f273d9546573ee45"},{url:"/_next/static/media/fb3bbc4a6e99e89e-s.p.ttf",revision:"2e5a3e2aeeb3d17f7f3c0dd69646cac9"},{url:"/assets/colors/black.svg",revision:"0eafb93ece72ed06e62b7eee3ce3f8a3"},{url:"/assets/colors/gray.svg",revision:"e171f660bd9d96b6739e820c5e85724a"},{url:"/assets/colors/selected.svg",revision:"d68cac1e876f16597d9c51855ac32d38"},{url:"/assets/colors/white.svg",revision:"dc3097a88a70504888462c615bce31ef"},{url:"/assets/icons/icon_ABS_aro.svg",revision:"48bda609239d4b936d042c760e6821ca"},{url:"/assets/icons/icon_airbags.svg",revision:"bf84c2f64270c414d5f7adf184868725"},{url:"/assets/icons/icon_alerta.svg",revision:"9a0005453ef3eedf1d36bb8056743eab"},{url:"/assets/icons/icon_arrow.svg",revision:"723b8a8194a27ccf120619d25df66b6e"},{url:"/assets/icons/icon_close.svg",revision:"8c377757c98a90d1a98ffe6f4051db41"},{url:"/assets/icons/icon_contain.svg",revision:"10e6845a573faa72096dc5ca141067ce"},{url:"/assets/icons/icon_control_estabilidad.svg",revision:"f19a37f4c24a8b6e2441cdf173335dba"},{url:"/assets/icons/icon_garantia.svg",revision:"dd1f4434bc353a15ded874e3c5e48f0c"},{url:"/assets/icons/icon_isofix.svg",revision:"31b5a75377198dc988a0109716bef16e"},{url:"/assets/icons/icon_motor.svg",revision:"bb9733a43ca167a3a73f5e1ac7cdc612"},{url:"/assets/icons/icon_no_contain.svg",revision:"93e1a287ca78b8fc927c868d4f9037bc"},{url:"/assets/icons/icon_pasajeros.svg",revision:"ba53d2c0e51092c5451527ec5a6dd3f4"},{url:"/assets/icons/icon_puertas.svg",revision:"47b5450933d11ed1c65ab24635318931"},{url:"/assets/icons/icon_velocidades.svg",revision:"edd891b5eec9be2ce61814366f0f1361"},{url:"/assets/images/logo.svg",revision:"8bd04fe6983a44524e948869c6a5f2da"},{url:"/assets/images/site_logo.svg",revision:"5e5e571051e86121019a4c87310f9d23"},{url:"/assets/logo_Toyota.png",revision:"b1e9afffb7dc75603e1a68628572f006"},{url:"/assets/video/prado-reel.mp4",revision:"ddfb91a5b1e0c5df5f6d98696717854d"},{url:"/icons/back.svg",revision:"61cd38b04073ec9ed3f557d6fbe41771"},{url:"/icons/next.svg",revision:"a92fef35f8308641e69581a1e8d4f74d"},{url:"/icons/search.svg",revision:"61010ed3df07125c4641e56f0998e0ea"},{url:"/icons/slidePrev.svg",revision:"12e495edb022f3d0821863c25a501359"},{url:"/images/1.jpg",revision:"60f0bce826842d80296a1320670e58d2"},{url:"/images/2.png",revision:"7712c9e10c2daa98354be9839813e604"},{url:"/images/3.png",revision:"9c31ac8b01c0889a1a0b4a749b7090d7"},{url:"/images/4.jpg",revision:"eb3d956fa1d633210d1507e6e0c2c97d"},{url:"/images/5.png",revision:"3137399c1b179e600a7197074ddf0dab"},{url:"/images/6.jpg",revision:"60f0bce826842d80296a1320670e58d2"},{url:"/images/7.jpg",revision:"60f0bce826842d80296a1320670e58d2"},{url:"/manifest.json",revision:"0d0c7cf70b4cf2178f299b8138341668"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/stage\.d3bds4wb3334u\.amplifyapp\.com\/.*$/,new e.NetworkFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js|css|html|png|jpg|jpeg|svg|gif|ico)$/,new e.CacheFirst({cacheName:"static-resources",plugins:[new e.ExpirationPlugin({maxAgeSeconds:2592e3})]}),"GET")}));
