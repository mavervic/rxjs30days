import { single, take, timer } from "rxjs";

/*
single 比較特殊，它可以幫助我們「限制」整個資料流只會有一次事件發生，當發生第二次事件時，就會發生錯誤
如果整個資料流只有一次事件發生，就不會發生錯誤

single 也一樣可以傳入 callback function，
此時條件會變成「在條件符合時，如果整個資料流只發生過一次事件，
發生該事件的值，否則發生 undefined
*/
timer(1000)
  .pipe(
    take(5),
    single((data) => ~~data === 1)
  )
  .subscribe({
    next: (data) => {
      console.log(`single 範例 (5): ${data}`);
    },
    error: (err) => {
      console.log(`single 發生錯誤範例 (5): ${err}`);
    },
    complete: () => {
      console.log("single 範例結束 (5)");
    },
  });
