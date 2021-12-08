import { audit, interval } from "rxjs";

const source$ = interval(1000);
const durationSelector = (value) => interval(value * 1200);

// 邏輯很繞，感覺很難用.....
source$.pipe(audit(durationSelector)).subscribe((data) => {
  console.log(`audit 示範: ${data}`);
});
// audit 示範: 0
// audit 示範: 2
// audit 示範: 6
// ...

/*
---0---1---2---3---4---5---6---....
audit((value) => interval(value * 1200))
---0--------2-----------------6....
   ^ 第一次是 interval(0)，因此直接發生在新的 Observable
       ^ 之後發生事件 1，audit() 內會等 1200 毫秒
            ^ 1200 毫秒後，讓來源 Observable 最新事件值發生
*/

/*
整個運作過程如下：
  source$ 發生事件 0，同時 audit() 內訂閱 interval(0)，因此直接讓 0 在新的 Observable 上發生，並退訂 interval(0)。
  source$ 發生事件 1，此時 audit() 內訂閱 interval(1200)，因此在 1200 毫秒後，將來源 Observable 最後一次事件值，也就是事件資料 2，發生在新的 Observable 上。
  source$ 發生事件 3，此時 audit() 內訂閱 interval(3600)，因此在 3600 毫秒後，將來源 Observable 最後一次事件值，也就是事件資料 6，發生在新的 Observable 上。
*/
