import { count, of } from "rxjs";

/*
count 可以用來計算來源 Observable 發生過多少次事件
*/
of(5, 1, 9, 8)
  .pipe(count())
  .subscribe((data) => {
    console.log(`count 示範 (1): ${data}`);
  });
// count 示範 (1): 4

/*
count 可以傳入 predicate callback function，
來判斷事件資料是否符合固定條件，當來源 Observable 結束時，
新的 Observable 會發生的事件值為「所有符合指定條件事件」的總數
*/
of(5, 1, 9, 8)
  .pipe(count((data) => data > 5))
  .subscribe((data) => {
    console.log(`count 示範 (2): ${data}`);
  });
// count 示範 (2): 2
