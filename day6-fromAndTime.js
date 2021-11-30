"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
rxjs_1.from(["Jerry", "Anna"]).subscribe({
    next: function (value) {
        console.log(value);
    },
    complete: function () {
        console.log("complete!");
    },
    error: function (error) {
        console.log(error);
    },
});
// 可以傳入 Promise 物件，如下
// 如果我們傳入 Promise 物件實例，當正常回傳時，就會被送到 next，並立即送出完成通知，如果有錯誤則會送到 error。
rxjs_1.from(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello RxJS!");
    }, 3000);
})).subscribe({
    next: function (value) {
        console.log(value);
    },
    complete: function () {
        console.log("complete!");
    },
    error: function (error) {
        console.log(error);
    },
});
// 其實在訂閱 observable 後，會回傳一個 subscription 物件，這個物件具有釋放資源的unsubscribe 方法，範例如下
var subscription = rxjs_1.timer(1000, 1000).subscribe({
    next: function (value) {
        console.log(value);
    },
    complete: function () {
        console.log("complete!");
    },
    error: function (error) {
        console.log("Throw Error: " + error);
    },
});
// 這裡我們用了 setTimeout 在 5 秒後，執行了 subscription.unsubscribe() 來停止訂閱並釋放資源。
// Events observable 盡量不要用 unsubscribe ，通常我們會使用 takeUntil
setTimeout(() => {
    subscription.unsubscribe(); // 停止訂閱(退訂)， RxJS 4.x 以前的版本用 dispose()
}, 5000);
