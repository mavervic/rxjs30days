import { filter, fromEvent, mapTo, scan, tap } from "rxjs";

const start_btn = document.querySelector("#start");
const count_btn = document.querySelector("#count");
const error_btn = document.querySelector("#error");
const complete_btn = document.querySelector("#complete");

const status = document.querySelector("#status");
const currentCounter = document.querySelector("#currentCounter");
const evenCounter = document.querySelector("#evenCounter");

fromEvent(start_btn, "click")
  .pipe(
    mapTo(1),
    scan((acc, curr) => acc + curr),
    tap((value) => {
      status.innerHTML = "目前狀態：開始計數";
      currentCounter.innerHTML = `目前計數：${value}`;
    }),
    filter((value) => value % 2 === 0),
    tap((value) => {
      evenCounter.innerHTML = `目前計數：${value}`;
    })
  )
  .subscribe((e) => console.log(e));
