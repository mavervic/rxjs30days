import { map, Subject, switchAll, take, timer } from "rxjs";

/*
xxxAll 系列和 xxxMap 系列處理「上一個」資料流的方式一樣，
差別在於 xxxAll 是使用別人傳給我們的 Observable of Observable，
而 xxxMap 必須自行撰寫轉換成 Observable 的規則 。

Observable of Observable意思雷同於陣列中的陣列，
也就是二維陣列，也就是說Observable of Observable訂閱後會拿到的還是Observable，

所以xxxAll就如同陣列的flat方法一樣，能把二維的變成一維的
*/

function generateStream(round) {
  return timer(0, 1000).pipe(
    map(data => `資料流 ${round}: ${data + 1}`),
    take(3)
  );
}
  
const source$ = new Subject();
const stream$ = source$.pipe(map(round => generateStream(round)));

stream$.pipe(
  switchAll()
).subscribe(result => console.log(result));

// stream$.pipe(
//   concatAll()
// ).subscribe((value) => console.log(value));

// stream$.pipe(
//   // v6命名為combineAll v8命名為combineLatestAll，確實更加貼切
//   combineLatestAll() 
// ).subscribe(result => console.log(result));

// 第一次事件
source$.next(1);

// 第二次事件
setTimeout(() => {
  source$.next(2);
}, 5000);

// 第三次事件
setTimeout(() => {
  source$.next(3);
}, 6000);



