import { exhaustMap, fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";

const refresh$ = fromEvent(document.querySelector('#refresh'), 'click');
const request$ = ajax('https://api.github.com/repos/reactivex/rxjs/issues');

/*
exhaust 有「力竭」的意思，
可以把它理解成，來源 Observable 有新事件發生時，
它是沒有力氣產生新的 Observable 的；也就是說當來源事件發生時，
如果上一次轉換的 Observable 尚未結束，就不會產生新的 Observable。

以「重新整理」的功能來說，
當按下按鈕時會去抓 API 資料，
此時若是再按一次按鈕，使用 exhaustMap 的話，
就可以在 API 資料回來(Observable 結束)前避免產生重複的 API 請求囉！
*/
refresh$.pipe(
  exhaustMap(data => request$)
).subscribe(result => {
  // 更新畫面資料
  // ...
});