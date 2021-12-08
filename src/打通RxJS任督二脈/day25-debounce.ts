import { debounce, interval } from "rxjs";

const source$ = interval(3000);
const durationSelector = (value) => interval(value * 1000);

/*
debounce 和 debounceTime 都是在一個指定時間內沒有新事件才會讓此事件值發生，
差別在於 debounce 可以傳入 durationSelector 的 callback function，
debounce 會將來源 Observable 事件值傳入 durationSelector，
並回傳一個用來控制時機的 Observable 或 Promise，debounce 會依照此資訊來決定下次事件發生的時機點
*/
source$.pipe(debounce(durationSelector)).subscribe((data) => {
  console.log(`debounce 示範: ${data}`);
});
// debounce 示範: 0
// debounce 示範: 1
// debounce 示範: 2

/*
---0---1---2---3---4---5---6---....
debounce((value) => interval(value * 1000))
---0----1-----2----------------....
   ^ 第一次是 interval(0)，因此直接發生在新的 Observable 上
       ^ 之後發生事件 1，訂閱 interval(1000)
*/
