import { fromEvent, interval, skipUntil } from "rxjs";

const click$ = fromEvent(document.querySelector("#btnStart"), "click");
const source$ = interval(1000);

/*
skipUntil 會持續忽略資料，直到指定的 Observable 發出新的事件時，才開始資料流：
*/
source$
  .pipe(skipUntil(click$))
  .subscribe((data) => console.log(`skipUntil 示範 (1): ${data}`));
