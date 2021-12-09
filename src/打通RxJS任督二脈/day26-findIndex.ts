import { findIndex, interval, map } from "rxjs";

/*
findIndex 與 find 一樣需要一個 predicate callback function，
差別在於 findIndex 的條件符合時，新的 Observable 事件資料是「符合條件事件的索引值」，
也就是這個事件是來源 Observable 的第幾次事件
*/
interval(1000)
  .pipe(
    map(data => data * 2),
    findIndex(data => data === 6)
  )
  .subscribe(data => {
    console.log(`findIndex 示範: ${data}`);
  });