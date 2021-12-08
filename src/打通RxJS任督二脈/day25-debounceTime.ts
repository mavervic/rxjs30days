import { debounceTime, Subject } from "rxjs";

const source$ = new Subject();

/*
debounceTime 可以指定一個時間間隔，當來源 Observable 有新事件資料發生時，
會等待這段時間，如果這段時間內沒有新的事件發生，將這個資料值發生在新的 Observable 上；
如果在這段等待時間有新的事件發生，則原來事件不會發生在新的資料流上，並持續等待。
*/
source$.pipe(debounceTime(500)).subscribe((data) => {
  console.log(`debounceTime 示範: ${data}`);
});

setTimeout(() => source$.next(1), 0);
setTimeout(() => source$.next(2), 100);
setTimeout(() => source$.next(3), 200);
setTimeout(() => source$.next(4), 800);
setTimeout(() => source$.next(5), 1200);
setTimeout(() => source$.next(6), 1800);
setTimeout(() => source$.complete(), 2000);
// debounceTime 示範: 3
// debounceTime 示範: 5
// debounceTime 示範: 6
