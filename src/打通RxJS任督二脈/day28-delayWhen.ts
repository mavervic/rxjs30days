import { delay, delayWhen, interval, of, take } from "rxjs";

const delayFn = (value) => {
  return of(value).pipe(delay((value % 2) * 2000));
};

interval(1000)
  .pipe(
    take(3),
    delayWhen((value) => delayFn(value))
  )
  .subscribe((data) => {
    console.log(`delayWhen 示範 (1): ${data}`);
  });
/*
----0----1----2|
delayWhen(value => of(value).pipe(delay(value % 2 * 2000)))
----0---------2----1|
         ^ 延遲兩秒發生
                   ^ 所以到這時才發生事件
*/
