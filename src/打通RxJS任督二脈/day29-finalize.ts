import {
  finalize,
  iif,
  interval,
  map,
  of,
  switchMap,
  take,
  throwError,
} from "rxjs";

interval(1000)
  .pipe(
    take(5),
    finalize(() => {
      console.log("finalize 示範 (1): 在 pipe 內的 finalize 被呼叫了");
    }),
    map((data) => data + 1)
  )
  .subscribe({
    next: (data) => {
      console.log(`finalize 示範 (1): ${data}`);
    },
    complete: () => {
      console.log(`finalize 示範 (1): 完成`);
    },
  });
// finalize 示範 (1): 1
// finalize 示範 (1): 2
// finalize 示範 (1): 3
// finalize 示範 (1): 4
// finalize 示範 (1): 5
// finalize 示範 (1): 完成
// finalize 示範 (1): 在 pipe 內的 finalize 被呼叫了

/*
從結果可以看到，finalize 也會比 subsribe 的 error 還慢被呼叫。
透過 finalize 我們可以確保就算過程中發生錯誤導致整個資料流中斷，還會有個地方可以處理些事情
*/
interval(1000)
  .pipe(
    switchMap((data) =>
      iif(() => data % 2 === 0, of(data), throwError("發生錯誤"))
    ),
    // 當之前的 operator 發生錯誤時，資料流會中斷，但會進來 finalize
    finalize(() => {
      console.log("finalize 示範 (2): 在 pipe 內的 finalize 被呼叫了");
    }),
    // 當之前的 operator 發生錯誤時，這裏就不會呼叫了
    map((data) => data + 1)
  )
  .subscribe({
    next: (data) => {
      console.log(`finalize 示範 (2): ${data}`);
    },
    error: (error) => {
      console.log(`finalize 示範 (2): 錯誤 - ${error}`);
    },
  });
// finalize 示範 (2): 1
// finalize 示範 (2): 錯誤 - 發生錯誤
// finalize 示範 (2): 在 pipe 內的 finalize 被呼叫了
