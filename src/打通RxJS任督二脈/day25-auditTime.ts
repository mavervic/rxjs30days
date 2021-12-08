import { auditTime, interval } from "rxjs";

interval(1000)
  .pipe(auditTime(1500))
  .subscribe((data) => {
    console.log(`auditTime 示範: ${data}`);
  });

// auditTime 示範: 1
// auditTime 示範: 3
// auditTime 示範: 5
// auditTime 示範: 7

/*
-----0-----1-----2-----3-----4....
auditTime(1500)
--------------1-----------3---....
     ^ 發生事件後，等待 1500 毫秒
              ^ 1500 毫秒後，取來源 Observable 最近一次事件資料
*/
