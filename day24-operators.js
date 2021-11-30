"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
/*
share可以用來掛載 subject 並回傳一個可連結(connectable)的 observable
透過 share 來掛載一個 subject 之後這個 observable(source$) 的訂閱其實都是訂閱到 subject 上。

原本這段是multicast，但是rxjs7已經將此operator淘汰了，所以參考官網用share代替
https://rxjs.dev/deprecations/multicasting#connectableobservable
https://rxjs.dev/api/operators/share
https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-24/#share
*/
var source$ = rxjs_1.interval(1000).pipe(rxjs_1.take(3), rxjs_1.share());
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
var a = source$.subscribe(observerA); // subject.subscribe(observerA)
setTimeout(() => {
    source$.subscribe(observerB); // subject.subscribe(observerB)
}, 1000);
