import {
  catchError,
  iif,
  interval,
  map,
  of,
  switchMap,
  throwError,
} from "rxjs";

interval(1000)
  .pipe(
    map((data) => {
      if (data % 2 === 0) {
        return data;
      } else {
        throw new Error("發生錯誤");
      }
    }),
    catchError((error) => {
      return interval(1000);
    }),
    map((data) => data * 2)
  )
  .subscribe({
    next: (data) => {
      console.log(`catchError 示範 (2): ${data}`);
    },
    error: (error) => {
      console.log(`catchError 示範 (2): 錯誤 - ${error}`);
    },
  });
/*
           ---0---#
catchError(---0---1---2...)
           ---0-------0----1----2...
                  ^ 發生錯誤，換成 catchError 內的 Observable
       map(data => data * 2)
           ---0-------0----2----4...
*/

/*
如果遇到不能處理的問題，也可以就讓錯誤發生，此時只需要回傳 throwError 即可
*/
interval(1000)
  .pipe(
    map((data) => {
      if (data % 2 === 0) {
        return data;
      } else {
        throw new Error("發生錯誤");
      }
    }),
    catchError((error) => {
      if (error === null) {
        return interval(1000);
      }
      return throwError(() => error);
    })
  )
  .subscribe({
    next: (data) => {
      console.log(`catchError 示範 (3): ${data}`);
    },
    error: (error) => {
      console.log(`catchError 示範 (3): 錯誤 - ${error}`);
    },
  });

/*
在 Observable 中，不論是 throw new Error() 還是回傳 throwError()
都會產生錯誤並中斷資料流，所以前面程式使用 map 處理錯誤的邏輯也可以改成：
*/
interval(1000)
  .pipe(
    switchMap((data) =>
      iif(
        () => data % 2 === 0,
        of(data),
        throwError(() => new Error(`發生錯誤`))
      )
    )
  )
  .subscribe({
    next: (value) => {
      console.log(`next:${value}`);
    },
    error: (err) => {
      console.log(`next:${err}`);
    },
    complete: () => {
      console.log("結束");
    },
  });
