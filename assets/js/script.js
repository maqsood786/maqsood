gsap.registerPlugin(ScrollTrigger);

if(window.Lenis){
  const lenis = new Lenis({duration:1.2,smoothWheel:true,wheelMultiplier:.9,touchMultiplier:1.5});
  function raf(time){lenis.raf(time);requestAnimationFrame(raf)} requestAnimationFrame(raf);
  lenis.on("scroll",ScrollTrigger.update);
} else {
  function raf(){requestAnimationFrame(raf)} requestAnimationFrame(raf);
}

const loaderNumber=document.querySelector("#loaderNumber"),loaderLine=document.querySelector(".loader-line span");
let loaderValue={value:0};
gsap.to(loaderValue,{value:100,duration:2,ease:"power2.inOut",onUpdate:()=>{loaderNumber.textContent=Math.floor(loaderValue.value);loaderLine.style.width=`${loaderValue.value}%`},onComplete:()=>{gsap.to(".loader",{yPercent:-100,duration:1.1,ease:"power4.inOut",onComplete:()=>{document.querySelector(".loader").remove();document.body.classList.remove("is-loading");heroAnimation()}})}});

function splitText(el){const text=el.textContent.trim();el.innerHTML="";[...text].forEach(letter=>{const s=document.createElement("span");s.textContent=letter===" "?"\u00A0":letter;s.style.display="inline-block";el.appendChild(s)});return el.querySelectorAll("span")}
function heroAnimation(){
  document.querySelectorAll(".hero-title .line").forEach((line,i)=>gsap.from(splitText(line),{yPercent:120,rotateX:-80,opacity:0,duration:1.4,delay:i*.15,stagger:.025,ease:"power4.out"}));
  gsap.from(".hero-eyebrow",{y:30,opacity:0,duration:1,delay:.5,ease:"power3.out"});
  gsap.from(".hero-description",{y:30,opacity:0,duration:1,delay:.9,ease:"power3.out"});
  gsap.from(".hero-buttons",{y:30,opacity:0,duration:1,delay:1.05,ease:"power3.out"});
  gsap.from(".image-wrapper",{scale:.7,rotateY:25,rotateX:10,opacity:0,duration:1.8,delay:.4,ease:"power4.out"});
  gsap.from(".tech-tag",{scale:0,opacity:0,duration:1,delay:1,stagger:.12,ease:"back.out(2)"});
}

const cursor=document.querySelector(".cursor"),follower=document.querySelector(".cursor-follower");
const menuButton=document.querySelector(".menu-btn"),navLinks=document.querySelector(".nav-links");
menuButton.addEventListener("click",()=>{
  const isOpen=document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded",String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded","false");
}));
const updateNavbar=()=>document.querySelector(".navbar-custom").classList.toggle("scrolled",scrollY>24);
addEventListener("scroll",updateNavbar,{passive:true});
updateNavbar();

if(innerWidth>991){
  let mx=0,my=0,fx=0,fy=0;
  addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;gsap.to(cursor,{x:mx,y:my,duration:.1})});
  gsap.ticker.add(()=>{fx+=(mx-fx)*.12;fy+=(my-fy)*.12;gsap.set(follower,{x:fx,y:fy})});
  document.querySelectorAll("a,button,.project-card,.service-card").forEach(el=>{
    el.addEventListener("mouseenter",()=>gsap.to(follower,{scale:1.8,duration:.3}));
    el.addEventListener("mouseleave",()=>gsap.to(follower,{scale:1,duration:.3}));
  });
}

const heroVisual=document.querySelector(".hero-visual");
if(innerWidth>991){
  heroVisual.addEventListener("mousemove",e=>{
    const r=heroVisual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    gsap.to(".image-wrapper",{rotateY:x*14,rotateX:-y*12,x:x*20,y:y*15,duration:.8,ease:"power3.out"});
    gsap.to(".orbit-one",{x:x*-30,y:y*-20,duration:1});gsap.to(".orbit-two",{x:x*40,y:y*30,duration:1});
    gsap.to(".tech-tag",{x:x*25,y:y*20,duration:1,stagger:.02});
  });
  heroVisual.addEventListener("mouseleave",()=>gsap.to(".image-wrapper,.orbit-one,.orbit-two,.tech-tag",{x:0,y:0,rotateX:0,rotateY:0,duration:1,ease:"power3.out"}));
}

if(innerWidth>991)document.querySelectorAll(".magnetic").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{const r=btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;gsap.to(btn,{x:x*.25,y:y*.25,duration:.4,ease:"power3.out"})});
  btn.addEventListener("mouseleave",()=>gsap.to(btn,{x:0,y:0,duration:.6,ease:"elastic.out(1,.4)"}));
});

gsap.to(".marquee",{xPercent:-50,duration:20,repeat:-1,ease:"none"});

gsap.from(".about-heading h2",{scrollTrigger:{trigger:".about-section",start:"top 70%"},y:100,opacity:0,duration:1.3,ease:"power4.out"});
gsap.from(".about-content",{scrollTrigger:{trigger:".about-section",start:"top 65%"},y:80,opacity:0,duration:1.2,delay:.2,ease:"power4.out"});

document.querySelectorAll(".counter").forEach(c=>gsap.to(c,{textContent:Number(c.dataset.target),duration:2,ease:"power2.out",snap:{textContent:1},scrollTrigger:{trigger:c,start:"top 85%",once:true}}));
gsap.fromTo(".technology-grid .tech-item",{y:30,opacity:0},{scrollTrigger:{trigger:".technology-grid",start:"top 85%",invalidateOnRefresh:true},y:0,opacity:1,stagger:.04,duration:.6,ease:"power3.out",immediateRender:false});
gsap.fromTo(".experience-item",{y:80,opacity:0},{scrollTrigger:{trigger:".experience-list",start:"top 75%",invalidateOnRefresh:true},y:0,opacity:1,stagger:.15,duration:1,ease:"power4.out",immediateRender:false});
gsap.fromTo(".service-card",{y:80,opacity:0},{scrollTrigger:{trigger:".services-grid",start:"top 75%",invalidateOnRefresh:true},y:0,opacity:1,stagger:.15,duration:1,ease:"power4.out",immediateRender:false});

if(innerWidth>991){
  const track=document.querySelector(".projects-track"),section=document.querySelector(".projects-section");
  const amount=()=>track.scrollWidth-innerWidth+innerWidth*.05;
  gsap.to(track,{x:()=>-amount(),ease:"none",scrollTrigger:{trigger:section,start:"top top",end:()=>`+=${amount()*1.2}`,scrub:1,invalidateOnRefresh:true,onUpdate:self=>gsap.to(".project-progress span",{width:`${self.progress*100}%`,duration:.1})}});
}
document.querySelectorAll(".project-image-wrap").forEach(wrapper=>{
  const image=wrapper.querySelector(".project-image");
  wrapper.addEventListener("mousemove",e=>{const r=wrapper.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(image,{x:x*18,y:y*18,scale:1.08,skewX:x*2,skewY:y*2,duration:.5,ease:"power3.out"})});
  wrapper.addEventListener("mouseleave",()=>gsap.to(image,{x:0,y:0,scale:1,skewX:0,skewY:0,duration:.8,ease:"power3.out"}));
});
gsap.from(".cta-content h2",{scrollTrigger:{trigger:".cta-section",start:"top 70%"},y:120,opacity:0,duration:1.4,ease:"power4.out"});
gsap.to(".cta-glow",{scale:1.5,opacity:.2,duration:3,repeat:-1,yoyo:true,ease:"sine.inOut"});
gsap.to(".orbit-one",{rotation:360,duration:25,repeat:-1,ease:"none"});gsap.to(".orbit-two",{rotation:-360,duration:18,repeat:-1,ease:"none"});
gsap.utils.toArray(".tech-tag").forEach((tag,i)=>gsap.to(tag,{y:i%2===0?-15:15,duration:2+i*.2,repeat:-1,yoyo:true,ease:"sine.inOut",delay:i*.15}));
gsap.to(".scroll-line span",{xPercent:400,duration:1.5,repeat:-1,ease:"power2.inOut"});
addEventListener("load",()=>setTimeout(()=>ScrollTrigger.refresh(),500));
addEventListener("resize",()=>ScrollTrigger.refresh());
