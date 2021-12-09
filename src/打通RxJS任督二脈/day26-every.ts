import { every, interval, map, take } from "rxjs";



/*
every 也是傳入一個 predicate callback function，every 會將事件資訊傳入此 function，
並判斷來源 Observable 是否「全部符合指定條件」，
如果符合，在來源 Observable 結束時會得到 true 事件；
如果不符合，則會在事件資料不符合指定條件同時得到 false 事件並結束
*/
const source$ = interval(1000)
  .pipe(
    map(data => data * 2),
    take(3)
  );

source$
  .pipe(
    every(data => data % 2 === 0)
  )
  .subscribe(data => {
    console.log(`every 示範 (1): ${data}`);
  });
/*
---0---2---4|
every(data => data % 2 === 0)
-----------(true|)
*/


interval(1000)
  .pipe(every(data => data % 2 === 0))
  .subscribe(data => {
    console.log(`every 示範 (2): ${data}`);
  });
// every 示範 (2): false
/*
---0---1---2---3....
every(data => data % 2 === 0)
-------(false|)
*/