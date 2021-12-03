"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
var observable = new rxjs_1.Observable(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});
console.log("before subscribe");
observable
    .pipe((0, rxjs_1.observeOn)(rxjs_1.asyncScheduler)) // 設為 async
    .subscribe({
    next: (value) => {
        console.log(value);
    },
    error: (err) => {
        console.log("Error: " + err);
    },
    complete: () => {
        console.log("complete");
    },
});
console.log("after subscribe");
// rxjs v8版本即將棄用多個第二個參數可以傳入Scheduler的operators
(0, rxjs_1.from)([1, 2, 3, 4, 5], rxjs_1.asyncScheduler);
