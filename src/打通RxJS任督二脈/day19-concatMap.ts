import { concatMap, interval, take, timer } from "rxjs";


/*
concatMap 跟 switchMap一樣在每次事件發生時都會產生新的 Observable，
不過 concatMap 會等前面的 Observable 結束後，
才會「接續」(concat)新產生的 Observable 資料流。

在使用 concatMap 時，轉換後的 Observable 基本上都必須設定結束條件，
也就是要確保會完成 (complete)，
否則很容易就會產生不可預期的問題(就是一直不會結束...)。
*/
const source1$ = interval(3000);
const source2$ = timer(0, 1000)
  .pipe(
    take(5) // 轉換後的 Observable 基本上都必須設定結束條件
  );

source1$.pipe(
  concatMap(() => source2$)
).subscribe(data => {
  console.log(data);
});