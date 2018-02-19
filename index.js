// ==UserScript==
// @name         New ES6-Userscript
// @namespace                        http://tampermonkey.net/
// @match                            https://market.yandex.ru/*
// @require                          https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require                          https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @require                          file:///home/midas/Download/player.js
// @resource     css                 file:///home/midas/Download/style.css
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: true */

    // Your code here...
    GM_addStyle(GM_getResourceText("css"));

    const lim = 100000;
    const doc = unsafeWindow.document;
    const popup = doc.createElement('div');
    popup.id = 'box';
    popup.style.display = "none";
    doc.getElementsByClassName("main")[0].appendChild(popup);

    const cont = doc.createElement('div');
    cont.id = "popup";
    popup.appendChild(cont);

    const player = doc.createElement("video");
    player.src = `data:video/mp4;base64,` + _raw;
    player.controls = false;
    player.id = "player";
    cont.appendChild(player);

    const togPop = p => p.style.display = p.style.display === "none" ? "block" : "none";
    const togBod = cl => cl[cl.contains("overlay") ? "remove" : "add"]("overlay");
    const toggle = () => togPop(popup) && togBod(doc.body.classList);
    player.onplay = toggle;
    player.onpause = toggle;

    const job = () => {
       if (Array.from(doc.getElementsByClassName("price"))
           .filter(x => x.classList.length === 1)
           .map(x => parseInt(x.textContent.replace(/\D/g, '')))
           .reduce((x, y) => x + y) > lim)
               player.play();
    };
    job();
    var i = setInterval(job, 10000);
    unsafeWindow.onclose = () => clearInterval(i);
    /* jshint ignore:start */
]]></>).toString();
                  var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */