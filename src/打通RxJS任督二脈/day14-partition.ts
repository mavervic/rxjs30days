import { interval, map, of, partition, take } from "rxjs";

const source$ = of(1, 2, 3, 4, 5, 6);

/* 用 filter 達成會比較麻煩 */
// const sourceEven$ = source$.pipe(filter((data) => data % 2 === 0));
// const sourceOdd$ = source$.pipe(filter((data) => data % 2 !== 0));
/* 用 partition 達成會比較簡單 */
const [sourceEven$, sourceOdd$] = partition(source$, (data) => data % 2 === 0);

// 測試
sourceEven$.subscribe((data) => {
  console.log(`partition 範例 (偶數): ${data}`);
});
sourceOdd$.subscribe((data) => {
  console.log(`partition 範例 (奇數): ${data}`);
});

// 定時變更「登入」、「登出」狀態
// 實際上應該搭配 Subject 來控制
const isLogin$ = interval(1000).pipe(
  take(6),
  map((_, index) => index % 2 === 0)
);

const [login$, logout$] = partition(isLogin$, (data) => data);

login$.subscribe(() => console.log("我又登入囉！"));
logout$.subscribe(() => console.log("我又登出啦！"));
