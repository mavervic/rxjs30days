import { from, reduce, scan } from "rxjs";

const donateAmount = [100, 500, 300, 250];

/*
reduce 用來運算來源 Observable 彙總後的結果，
與 scan 非常像，差別在於 scan 在來源 Observable 發生事件後都會進行運算並同時在新的 Observable 上發生，
而 reduce 在來源 Observable 發生事件後，只會進行運算，但不會在新的 Observable 上發生事件，
直到來源 Observable 結束時，才在新的 Observable 上發生運算後的結果作為事件

白話就是scan關注每次的過程，reduce僅關注最後的結果
*/
const accumDonate1$ = from([100, 500, 300, 250]).pipe(
  scan(
    (acc, value) => acc + value, // 累加函數
    0 // 初始值
  )
);

accumDonate1$.subscribe((amount) => {
  console.log(`目前 donate 金額累計：${amount}`);
});

const accumDonate2$ = from([100, 500, 300, 250]).pipe(
  reduce(
    (acc, value) => acc + value, // 累加函數
    0 // 初始值
  )
);

accumDonate2$.subscribe((amount) => {
  console.log(`目前 donate 金額累計：${amount}`);
});
