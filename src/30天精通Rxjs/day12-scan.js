"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
var arr = [1, 2, 3, 4];
var result = arr.reduce((origin, next) => {
    console.log(origin);
    return origin + next;
}, 0);
console.log(result);
var source = (0, rxjs_1.from)("hello").pipe();
// var example = source.scan((origin, next) => origin + next, "");
source.subscribe({
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
