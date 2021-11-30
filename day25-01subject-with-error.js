"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const source = rxjs_1.interval(1000).pipe(rxjs_1.take(5));
const subject = new rxjs_1.Subject();
const example = subject.pipe(rxjs_1.map(x => {
    if (x === 1) {
        throw new Error('oops');
    }
    return x;
}));
/*
預期 B 會在送出 1 的時候掛掉，另外 A 跟 C 則會持續發送元素
但想想，Subject裡面其實是利用迭代做廣播，
所以迭代過程中有拋出error會造成所有訂閱者跟著壞掉
*/
// subject.subscribe(x => console.log('A', x));
// example.subscribe(x => console.log('B', x));
// subject.subscribe(x => console.log('C', x));
/*
所以乖乖地寫erorr hondle
*/
subject.subscribe({
    next: (value) => console.log('A', value),
    error: (err) => console.log('A Error:' + err)
});
example.subscribe({
    next: (value) => console.log('A', value),
    error: (err) => console.log('A Error:' + err)
});
subject.subscribe({
    next: (value) => console.log('C', value),
    error: (err) => console.log('A Error:' + err)
});
source.subscribe(subject);