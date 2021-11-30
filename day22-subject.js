"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
var source$ = rxjs_1.interval(1000).pipe(rxjs_1.take(3));
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
/* observerA 跟 observerB 都各自收到了元素 */
// source$.subscribe(observerA);
// source$.subscribe(observerB);
/*
可以從 log 中看出 1 秒後 observerA 已經印到了 1，
這時 observerB 開始印卻是從 0 開始，而不是接著 observerA 的進度，
代表這兩次的訂閱是完全分開來執行的，或者說是每次的訂閱都建立了一個新的執行。
*/
// source$.subscribe(observerA);
// setTimeout(() => {
//     source$.subscribe(observerB);
// }, 1000);
/*
我們可以建立一個中間人來訂閱 source 再由中間人轉送資料出去，
就可以達到組播(multicast)的效果
*/
// var subject = {
//   observers: [],
//   subscribe: function(observer: Observer<any>) {
//       this.observers.push(observer)
//   },
//   next: function(value) {
//       this.observers.forEach(o => o.next(value))    
//   },
//   error: function(error){
//       this.observers.forEach(o => o.error(error))
//   },
//   complete: function() {
//       this.observers.forEach(o => o.complete())
//   }
// }
// subject.subscribe(observerA)
// source$.subscribe(subject);
// setTimeout(() => {
//     subject.subscribe(observerB);
// }, 1000);
/*
上面是自己手寫的 subject，但運作方式跟 RxJS 的 Subject 實例是幾乎一樣的，
把程式碼改成 RxJS 提供的 Subject 試試
*/
var subject$ = new rxjs_1.Subject();
subject$.subscribe(observerA);
source$.subscribe(subject$);
setTimeout(() => {
    subject$.subscribe(observerB);
}, 1000);
