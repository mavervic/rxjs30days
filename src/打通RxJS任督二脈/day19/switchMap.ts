import { fromEvent, interval, map, switchMap, timer } from "rxjs";
import { ajax } from 'rxjs/ajax';

/*
switchMap 內是一個 project function 
傳入的參數為前一個 Observable 的事件值，
同時必須回傳一個 Observable；
因此可以幫助我們把來源事件值換成另外一個 Observable，
而 switchMap 收到這個 Observable 後會幫我們進行訂閱的動作，
再把訂閱結果當作新的事件值。

switchMap 還有另外一個重點，就是「切換」(switch)的概念，
當來源 Observable 有新的事件時，如果上一次轉換的 Observable 還沒完成，
會退訂上一次的資料流，並改用新的 Observable 資料流
*/
interval(3000).pipe(
  switchMap(() => timer(0, 1000))
).subscribe(data => {
  console.log(data);
});

// 重新整理資料流
const refresh$ = fromEvent(document.querySelector('#refresh'), 'click');

// 抓 API 的資料流
const request$ = ajax('https://api.github.com/repos/reactivex/rxjs/issues')
  .pipe(map(response => response.response));


  refresh$.subscribe(() => {
    request$.subscribe(result => {
      // 更新畫面資訊
      console.log(result);
      
    });
  })

// 用 switchMap 換成其他另一個 Observable
refresh$.pipe(
  switchMap(data => request$)
).subscribe(result => {
	// 更新畫面資料
  // ...
});