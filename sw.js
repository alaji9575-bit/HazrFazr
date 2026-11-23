const CACHE_NAME="hazrfazr-v8";;
const APP_SHELL=["./","./index.html","./manifest.webmanifest","./icon.svg","./assets/hero.svg","./assets/islamic.svg","./assets/geography.svg","./assets/science.svg","./assets/sports.svg","./assets/space.svg","./assets/animals.svg","./assets/technology.svg","./assets/food.svg","./assets/cinema.svg","./assets/nature.svg","./assets/general.svg","./assets/cat-01.svg","./assets/cat-02.svg","./assets/cat-03.svg","./assets/cat-04.svg","./assets/cat-05.svg","./assets/cat-06.svg","./assets/cat-07.svg","./assets/cat-08.svg","./assets/cat-09.svg","./assets/cat-10.svg","./assets/cat-11.svg","./assets/cat-12.svg","./assets/cat-13.svg","./assets/cat-14.svg","./assets/cat-15.svg","./assets/cat-16.svg","./assets/cat-17.svg","./assets/cat-18.svg","./assets/cat-19.svg","./assets/cat-20.svg","./assets/cat-21.svg","./assets/cat-22.svg","./assets/cat-23.svg","./assets/cat-24.svg","./assets/cat-25.svg","./assets/cat-26.svg","./assets/cat-27.svg","./assets/cat-28.svg","./assets/cat-29.svg","./assets/cat-30.svg","./assets/cat-31.svg","./assets/cat-32.svg","./assets/cat-33.svg","./assets/cat-34.svg","./assets/cat-35.svg"];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));
 self.skipWaiting();
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))));
 self.clients.claim();
});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 const url=new URL(event.request.url);
 if(url.hostname==="images.unsplash.com"){
  event.respondWith(caches.open(CACHE_NAME).then(async cache=>{
   const cached=await cache.match(event.request);
   if(cached)return cached;
   const response=await fetch(event.request);
   if(response&&response.ok)await cache.put(event.request,response.clone());
   return response;
  }));
  return;
 }
 if(url.origin!==self.location.origin)return;
 if(event.request.mode==="navigate"){
  event.respondWith(fetch(event.request).then(response=>{
   const copy=response.clone();
   caches.open(CACHE_NAME).then(cache=>cache.put("./index.html",copy));
   return response;
  }).catch(()=>caches.match("./index.html").then(cached=>cached||caches.match("./"))));
  return;
 }
 event.respondWith(caches.match(event.request).then(cached=>{
  if(cached)return cached;
  return fetch(event.request).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy))}
   return response;
  });
 }));
});