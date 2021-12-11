import { filter, from, interval, map, take, toArray } from "rxjs";

/*
toArray 在來源 Observable 發生事件時，不會立即發生在新的 Observable 上，
而是將資料暫存起來，當來源 Observable 結束時，
將這些資料組合成一個陣列發生在新的 Observable 上
*/
interval(1000)
  .pipe(take(3), toArray())
  .subscribe((data) => {
    console.log(`toArray 示範: ${data}`);
  });
// toArray 示範: 0,1,2

/*
toArray 還有一種妙用，就是拿來處理陣列相關的邏輯，
我們可以使用 of、from 或 range 等建立 Observable 的 operator 來產生一個固定的 Observable，
透過 Observable 及 pipe 是一筆一筆資料流入所有 operators 的特性，來處理資料
*/
from([1, 2, 3, 4, 5, 6, 7, 8, 9])
  .pipe(
    map((value) => value * value),
    filter((value) => value % 3 === 0),
    toArray()
  )
  .subscribe((result) => console.log(result));

/*
乍看之下跟直接使用陣列的操作沒什麼不同

但實際上效能會好上很多，
因為 Observable 不會把整個陣列全部帶入 map 再帶入 filter 內；
同時還可以享有更多 operators 的支援
*/
[1, 2, 3, 4, 5, 6, 7, 8, 9]
  .map((value) => value * value)
  .filter((value) => value % 3 === 0);
