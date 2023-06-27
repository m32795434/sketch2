let e;async function t(e){return new Promise(t=>{setTimeout(t,e)})}const o=document.querySelector("#etch-a-sketch"),a=o.getContext("2d"),s=document.querySelector(".shake"),n=document.querySelector('input[type="range"]'),i=document.querySelector("#random-color"),r=document.querySelector("#shapes-select");var c=document.getElementById("audio-player"),d=document.getElementById("change-button"),l=document.getElementById("volume-slider");const p=["https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2F8-bit-arcade-138828.mp3?alt=media&token=2e99e284-3b94-4d20-9896-929f745e56f2","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fbrahms-lullaby-violin-129646.mp3?alt=media&token=85a6569f-2358-4d39-8b31-81c7dc5dcada","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2F8-bit-dream-land-142093.mp3?alt=media&token=677ab70b-d282-41fa-ae11-7607a5e5a208","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fdesesperebolo-9006.mp3?alt=media&token=ea240ead-6733-40e6-821c-c32ee5596e8e","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fhappy-epic-cinematic-8306.mp3?alt=media&token=ad1f8935-e35b-463a-826f-7eab9da0c171","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Felixir-of-life-9420.mp3?alt=media&token=bcf93ee9-c771-4619-b662-a4076010dc90","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Finspiring-epic-motivation-cinematic-trailer-11218.mp3?alt=media&token=2b914963-8b37-4571-acf0-99bf99cda173","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fsimple-piano-melody-9834.mp3?alt=media&token=c069316b-418e-40dc-b8a5-6294b192fd1b","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fpassword-infinity-123276.mp3?alt=media&token=01c4aa2c-c88d-4e52-bfd9-3ea2c8df50e3","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fsoulful-moonlight-sonata-111916.mp3?alt=media&token=a7b3244d-7a67-4703-afdf-5c6128ee3d55","https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fuplifting-life-short-146426.mp3?alt=media&token=346c37a9-ed0c-4728-9fad-6a052d9189e0"],u=p.length;let m=-1,f=0;const{width:v,height:b}=o;a.strokeStyle=`hsl(${360*Math.random()}, 100%, 50%)`,i.value="on",r.value="round";let h=Math.floor(Math.random()*v),g=Math.floor(Math.random()*b);a.lineJoin="round",a.lineCap="round",a.lineWidth=40,a.beginPath(),a.moveTo(h,g),a.lineTo(h,g),a.stroke();let y=!1;function k(e){f=e?e.target.value:n.value}function E(e,t){"on"===i.value&&(a.strokeStyle=`hsl(${360*Math.random()}, 100%, 50%)`),a.beginPath(),a.moveTo(e,t),a.lineTo(e,t),a.lineWidth=40*f,a.stroke()}function L(e,t,a){if(e.preventDefault(),"mousemove"===e.type&&!y)return;if(a&&t&&([h,g]=[t,a]),e instanceof TouchEvent){if("touchstart"===e.type)y=!0;else if("touchend"===e.type||"touchcancel"===e.type){y=!1;return}h=e.touches[0].clientX-o.offsetLeft,g=e.touches[0].clientY-o.offsetTop}let s=window.visualViewport.width;s>=1251&&s<=1280?E(2.1666*h,2*g):s>=1024&&s<=1250?E(2.7368*h,2.6666*g):s>=844&&s<1023?E(3.2911*h,4*g):s<=843?E(4.3333*h,4*g):E(2*h,2*g)}async function w(){if(e=document.querySelector("#picker")){S(e);let t=e.shadowRoot.querySelector("button");t.style.cssText+="transition: width .5s linear; width: 10vw;"}else if(await t(3e3),e=document.querySelector("#picker")){S(e);let t=e.shadowRoot.querySelector("button");t.style.cssText+="transition: width .5s linear; width: 10vw;"}else alert("Sorry\uD83D\uDE15. Color picker not available!")}function S(e){e.addEventListener("change",e=>{i.value="off",a.strokeStyle=e.detail.hsl})}o.addEventListener("mousedown",e=>{y=!0,L(e,e.offsetX,e.offsetY)}),o.addEventListener("mousemove",e=>L(e,e.offsetX,e.offsetY)),o.addEventListener("mouseup",()=>{y=!1}),o.addEventListener("mouseout",()=>{y=!1}),o.addEventListener("touchstart",e=>L(e)),o.addEventListener("touchmove",e=>{L(e),e.preventDefault()}),o.addEventListener("touchend",e=>L(e)),o.addEventListener("touchcancel",e=>L(e)),n.addEventListener("input",k),r.addEventListener("input",e=>{let t=e.currentTarget.value;console.log("shape:",t),a.lineCap=`${t}`,a.lineJoin=`${t}`}),i.addEventListener("input",t=>{let o=t.currentTarget.value;"off"===o&&(e.color=a.strokeStyle)}),s.addEventListener("click",function(){o.classList.add("shake"),a.clearRect(0,0,v,b),o.addEventListener("animationend",()=>{o.classList.remove("shake")},{once:!0})}),d.addEventListener("click",function(){c.pause(),m+1>=0&&m+1<u?c.src=p[++m]:(m=0,c.src=p[m]),c.play()}),l.addEventListener("input",function(){c.volume=l.value}),k(),w();
//# sourceMappingURL=index.b49f1c5d.js.map
