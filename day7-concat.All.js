"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
var obs1 = rxjs_1.interval(1000).pipe(rxjs_1.take(3));
var obs2 = rxjs_1.interval(500).pipe(rxjs_1.take(5));
var obs3 = rxjs_1.interval(2000).pipe(rxjs_1.take(8));
var source$ = rxjs_1.of(obs1, obs2, obs3);
var example$ = source$.pipe(rxjs_1.concatAll());
/*
concatAll會處理source先發出來的observable，必須等到這個observable結束，
才會再處理下一個source發出來的observable
*/
example$.subscribe({
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
