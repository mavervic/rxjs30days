import { filter, take, timer } from "rxjs";

const source$ = timer(0, 1000).pipe(take(10));

/*
filter 的 callback function 參數除了事件值以外，還有這個事件是第幾次發生的 (index)
*/
source$
  .pipe(filter((data, index) => data > 3 && index % 2 === 0))
  .subscribe((data) => {
    console.log(`filter 範例 (2): ${data}`);
  });
