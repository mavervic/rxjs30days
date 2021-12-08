import { distinct, from, Subject } from "rxjs";

/*
distinct 會將 Observable 內重複的值過濾掉
*/
from([1, 2, 3, 3, 2, 1, 4, 5])
  .pipe(distinct())
  .subscribe((data) => {
    console.log(`distinct 示範 (1): ${data}`);
  });

/*
如果今天是傳入的是物件呢？我們都知道兩個物件直接用 == 比較是不會相同的，例如以下程式碼會印出 false：
*/
const a = { id: 1, score: 100 };
const b = { id: 1, score: 100 };
console.log(a === b); // false

/*
也因此當使用 distinct operator 時，若傳入的都是物件，判斷上會有問題，
這時候可以在 distinct 內加入一個 keySellector 的 callback function，
callback function 會傳入每次事件的資料，並需要回傳比較用的任意值 key；
distinct 會透過這個 callback function 的回傳值來決定是否重複
*/
const students = [
  { id: 1, score: 70 },
  { id: 2, score: 80 },
  { id: 3, score: 90 },
  { id: 1, score: 100 },
  { id: 2, score: 100 },
];

from(students)
  .pipe(distinct((student) => student.id))
  .subscribe((student) => console.log(student));

/*
distinct 內部會記錄所有發生過的事件值，
我們也可以透過再多傳入一個 Observable 的方式(參數名稱為 flushes)來幫助我們判斷何時要清空紀錄事件值的內容，
每當這個 Observable 有新事件發生時，就會清空來源 Observable 內用來記錄資料重複的物件
*/
const source$ = new Subject<{ id: number; score: number }>();
const sourceFlushes$ = new Subject();
source$
  .pipe(distinct((student) => student.id, sourceFlushes$))
  .subscribe((student) => {
    console.log(`distinct 示範 (3): ${student.id} - ${student.score}`);
  });

setTimeout(() => source$.next({ id: 1, score: 70 }), 1000);
setTimeout(() => source$.next({ id: 2, score: 80 }), 2000);
setTimeout(() => source$.next({ id: 3, score: 90 }), 3000);
setTimeout(() => source$.next({ id: 1, score: 100 }), 4000);
// 在這裡清掉 Observable distinct 內記錄資料重複的物件
setTimeout(() => sourceFlushes$.next(1), 4500);
setTimeout(() => source$.next({ id: 2, score: 100 }), 5000);
// distinct 示範 (3): 1 - 70
// distinct 示範 (3): 2 - 80
// distinct 示範 (3): 3 - 90
// (第四秒發生 {id: 1, score: 100}，因為重複，所以事件不發生)
// (清空紀錄資料重複物件)
// distinct 示範 (3): 2 - 100 (id: 2 有發生過，但紀錄已被清空，因此事件會發生)
