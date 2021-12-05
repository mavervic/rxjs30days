"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const start_btn = document.querySelector("#start");
const count_btn = document.querySelector("#count");
const error_btn = document.querySelector("#error");
const complete_btn = document.querySelector("#complete");
const status = document.querySelector("#status");
const currentCounter = document.querySelector("#currentCounter");
const evenCounter = document.querySelector("#evenCounter");
const startClick = (0, rxjs_1.fromEvent)(start_btn, "click");
const countClick = (0, rxjs_1.fromEvent)(count_btn, "click");
const errorClick = (0, rxjs_1.fromEvent)(error_btn, "click");
const completeClick = (0, rxjs_1.fromEvent)(complete_btn, "click");
/**
 * 嘗試自己實作不看解答，仍不夠好
 */
startClick
    .pipe((0, rxjs_1.tap)(() => {
    status.innerHTML = "目前狀態：開始計數";
    currentCounter.innerHTML = `目前計數：0`;
}), (0, rxjs_1.map)(() => countClick), (0, rxjs_1.concatAll)(), (0, rxjs_1.mapTo)(1), (0, rxjs_1.scan)((acc, curr) => acc + curr), (0, rxjs_1.takeUntil)(completeClick))
    .subscribe({
    next: (value) => {
        currentCounter.innerHTML = `目前計數：${value}`;
        if (value % 2 === 0) {
            evenCounter.innerHTML = `目前計數：${value}`;
        }
    },
    error: (error) => {
        console.error(error);
    },
    complete: () => {
        status.innerHTML = "目前狀態：完成";
    },
});
