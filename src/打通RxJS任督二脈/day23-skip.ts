import { interval, skip } from "rxjs";

/*
「忽略」前 N 個事件值
*/
interval(1000)
  .pipe(skip(3))
  .subscribe((data) => {
    console.log(`skip 示範： ${data}`);
  });
