import { iif, interval, map, of, switchMap, take, tap, throwError } from "rxjs";

/*
一般會將effect side的邏輯放在subscribe()中，
但要在流中處理就會放在tap，
tap也可傳入一個Observer
*/
interval(1000)
  .pipe(
    take(3),
    map((data) => data * 2),
    map((data) => data + 1),
    // 當資料為 3 時，拋出錯誤
    switchMap((data) => iif(() => data === 3, throwError("error"), of(data))),
    tap({
      next: (data) => console.log(`tap 示範 (3): ${data}`),
      error: (error) => console.log(`tap 示範 (3): 發生錯誤 - ${error}`),
      complete: () => console.log("tap 示範 (3): 結束"),
    })
  )
  .subscribe();
