const scripts=document.scripts;
const loadjs=document.querySelector('script[src*="load.js"]')
const loadJsSrcData=loadjs.src.split("=")
const pixelIdStringIndex=loadJsSrcData.findIndex(data=>data.includes("id"))
const pixelId=loadJsSrcData[pixelIdStringIndex+1];

const cookies=document.cookie.split(";")
const ID_ENGINE_SESSION_ID_KEY='__idengine_sid'
const ID_ENGINE_SESSION_ID_VALUE=cookies.filter((cookie)=>cookie.includes(ID_ENGINE_SESSION_ID_KEY))[0].split("=")[1]


