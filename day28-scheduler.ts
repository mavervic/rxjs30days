import { asyncScheduler, from, Observable, observeOn } from "rxjs";

var observable = new Observable(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

console.log("before subscribe");
observable
  .pipe(observeOn(asyncScheduler)) // 設為 async
  .subscribe({
    next: (value) => {
      console.log(value);
    },
    error: (err) => {
      console.log("Error: " + err);
    },
    complete: () => {
      console.log("complete");
    },
  });
console.log("after subscribe");

// rxjs v8版本即將棄用多個第二個參數可以傳入Scheduler的operators
from([1, 2, 3, 4, 5], asyncScheduler);
