import {
  delay,
  fromEvent,
  iif,
  interval,
  map,
  of,
  pipe,
  retryWhen,
  switchMap,
  take,
  throwError,
} from "rxjs";

interval(1000)
  .pipe(
    switchMap((data) =>
      iif(
        () => data % 2 === 0,
        of(data),
        throwError(() => new Error("發生錯誤"))
      )
    ),
    retryWhen(pipe(take(3), delay(3000))),
    map((data) => data + 1)
  )
  .subscribe({
    next: (data) => {
      console.log(`retryWhen 示範 (1): ${data}`);
    },
    error: (error) => {
      console.log(`retryWhen 示範 (1): 錯誤 - ${error}`);
    },
    complete: () => {
      console.log("retryWhen 示範 (1): 完成");
    },
  });
/*
如果希望重試幾次次後發生錯誤，一樣加入 throwError 即可：
*/

const retryTimesThenThrowError = (every, times) =>
  interval(every).pipe(
    switchMap((value, index) =>
      iif(
        () => index === times,
        throwError(() => new Error("發生錯誤")),
        of(value)
      )
    )
  );

interval(1000)
  .pipe(
    switchMap((data) =>
      iif(
        () => data % 2 === 0,
        of(data),
        throwError(() => new Error("發生錯誤"))
      )
    ),
    map((data) => data + 1),
    retryWhen((error) => retryTimesThenThrowError(3000, 3))
  )
  .subscribe({
    next: (data) => {
      console.log(`retryWhen 示範 (2): ${data}`);
    },
    error: (error) => {
      console.log(`retryWhen 示範 (2): 錯誤 - ${error}`);
    },
    complete: () => {
      console.log("retryWhen 示範 (2): 完成");
    },
  });

/*
另外一個小技巧，我們也可以讓使用者自己決定何時要重試：
*/
const click$ = fromEvent(document, "click");
interval(1000)
  .pipe(
    switchMap((data) =>
      iif(
        () => data % 2 === 0,
        of(data),
        throwError(() => new Error("發生錯誤"))
      )
    ),
    map((data) => data + 1),
    retryWhen(() => click$)
  )
  .subscribe({
    next: (data) => {
      console.log(`retryWhen 示範 (3): ${data}`);
    },
    error: (error) => {
      console.log(`retryWhen 示範 (3): 錯誤 - ${error}`);
    },
    complete: () => {
      console.log("retryWhen 示範 (3): 結束");
    },
  });
