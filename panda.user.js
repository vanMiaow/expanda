// ==UserScript==
// @name 熊猫书签
// @namespace https://vanmiaow.github.io/expanda/
// @description zh-cn/
// @license WTFPL
// @version 28v1
// @match *://exhentai.org/*
// @match *://e-hentai.org/*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
// modified by vanMiaow:
// 0. add indent
// 1. update nodes
// 2. max count from fixed 3 to n.length
// 3. remove interaction with expanda webpage
// 4. store exkey in browser instead of script
(function() {
    'use strict';
    let exkey = GM_getValue('exkey', 'yay');
    let valid = exkey.match(/^\w{39}x\w{9}$/);
    while (!valid) {
        exkey = window.prompt('Enter valid exkey:', exkey);
        if (valid = exkey.match(/^\w{39}x\w{9}$/)) { GM_setValue('exkey', exkey);};
    };
    console.log(exkey);
    (function panda_init(c) {
        let n = ['https://vanmiaow.github.io/expanda/', 'https://noprogramming.github.io/expanda/', 'https://expanda.vercel.app/'];
        if (c >= n.length) { return;};
        let t = setTimeout(function() {
            clearTimeout(t);
            panda_init(c + 1);
        }, 3000);
        let s = document.createElement('script');
        s.src = (n[c] ? n[c] : n[0]) + 'panda.js?' + parseInt(Date.parse(new Date()) / 600000) + c;
        console.log(s.src);
        s.onerror = function() {
            clearTimeout(t);
            panda_init(c + 1);
        };
        s.onload = function() {
            clearTimeout(t);
        };
        s.setAttribute('exkey', exkey);
        document.body.appendChild(s);
    }) (0);
})();
