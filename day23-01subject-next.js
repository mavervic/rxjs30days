"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
var subject$ = new rxjs_1.Subject();
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
};
var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
};
subject$.subscribe(observerA);
subject$.subscribe(observerB);
/*
可以直接用 subject 的 next 方法傳送值，所有訂閱的 observer 就會接收到，
又因為 Subject 本身是 Observable，所以這樣的使用方式很適合用在某些無法直接使用 Observable 的前端框架中
 */
subject$.next(1);
subject$.next(2);
