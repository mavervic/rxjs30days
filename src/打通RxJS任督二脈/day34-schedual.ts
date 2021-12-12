import {
  asyncScheduler,
  combineLatest,
  map,
  observeOn,
  of,
  queueScheduler,
  scheduled,
  subscribeOn,
} from "rxjs";

/*
這篇scheduler的觀念太神，需要多拜讀
這篇scheduler的觀念太神，需要多拜讀
這篇scheduler的觀念太神，需要多拜讀
https://ithelp.ithome.com.tw/articles/10253801
*/
console.log("start");
of(1, 2)
  .pipe(observeOn(asyncScheduler))
  .subscribe({
    next: (result) => console.log(result),
    complete: () => console.log("complete"),
  });
console.log("end");

console.log("start");
of(1, 2)
  .pipe(subscribeOn(asyncScheduler))
  .subscribe({
    next: (result) => console.log(result),
    complete: () => console.log("complete"),
  });
console.log("end");

/*
預期應該要4、5、6但第一個of會先完成變成第二個of只能看到第一個of的2
*/
const sourceA$ = of(1, 2);
const sourceB$ = of(3, 4);
combineLatest([sourceA$, sourceB$])
  .pipe(map(([a, b]) => a + b))
  .subscribe((result) => {
    console.log(result);
  });

/*
因此需要一個虛擬的時間窗格
*/
const sourceQueA$ = scheduled([1, 2], queueScheduler);
const sourceQueB$ = scheduled([3, 4], queueScheduler);

combineLatest([sourceQueA$, sourceQueB$])
  .pipe(
    subscribeOn(queueScheduler),
    map(([a, b]) => a + b)
  )
  .subscribe((result) => {
    console.log(result);
  });
