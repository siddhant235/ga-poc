const scripts=document.scripts;
const loadjs=document.querySelector('script[src*="load.js"]')
console.log("load js src",loadjs.src.split("?"))
console.log("scripts collection",scripts,loadjs)

