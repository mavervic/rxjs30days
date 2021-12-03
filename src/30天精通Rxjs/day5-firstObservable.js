"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
var observable$ = new rxjs_1.Observable(function (observer) {
    observer.next("Jerry"); // RxJS 4.x 以前的版本用 onNext
    observer.next("Anna");
    setTimeout(() => {
        observer.next("RxJS 30 Days!");
    }, 30);
});
/*
這裡有一個重點，很多人認為 RxJS 是在做非同步處理，所以所有行為都是非同步的。
但其實這個觀念是錯的，RxJS 確實主要在處理非同步行為沒錯，但也同時能處理同步行為，像是上面的程式碼就是同步執行的。
*/
console.log("start");
observable$.subscribe(function (value) {
    console.log(value);
});
console.log("end");
