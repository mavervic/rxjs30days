import { concatAll, fromEvent, map, mapTo, scan, takeUntil, tap } from "rxjs";

const start_btn = document.querySelector("#start");
const count_btn = document.querySelector("#count");
const error_btn = document.querySelector("#error");
const complete_btn = document.querySelector("#complete");

const status = document.querySelector("#status");
const currentCounter = document.querySelector("#currentCounter");
const evenCounter = document.querySelector("#evenCounter");

const startClick = fromEvent(start_btn, "click");
const countClick = fromEvent(count_btn, "click");
const errorClick = fromEvent(error_btn, "click");
const completeClick = fromEvent(complete_btn, "click");

/**
 * 嘗試自己實作不看解答，仍不夠好
 */
startClick
  .pipe(
    tap(() => {
      status.innerHTML = "目前狀態：開始計數";
      currentCounter.innerHTML = `目前計數：0`;
    }),
    map(() => countClick),
    concatAll(),
    mapTo(1),
    scan((acc, curr) => acc + curr),
    takeUntil(completeClick)
  )
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
