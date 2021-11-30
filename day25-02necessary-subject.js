"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
/** 一定需要使用 Subject 的時機？ */
var result = rxjs_1.interval(1000).pipe(rxjs_1.take(6), rxjs_1.map(x => Math.random())); // side-effect，平常有可能是呼叫 API 或其他 side effect
/*
這段程式碼 A 跟 B 印出來的亂數就不一樣，
代表 random(side-effect) 被執行了兩次，
這種情況就一定會用到 subject(或其相關的 operators)
*/
var subA = result.subscribe(x => console.log('A: ' + x));
var subB = result.subscribe(x => console.log('B: ' + x));
