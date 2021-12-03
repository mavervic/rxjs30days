import { concatAll, interval, of, take } from "rxjs";

var obs1 = interval(1000).pipe(take(3));
var obs2 = interval(500).pipe(take(5));
var obs3 = interval(2000).pipe(take(8));

var source$ = of(obs1, obs2, obs3);

var example$ = source$.pipe(concatAll());

/*
concatAll會處理source先發出來的observable，必須等到這個observable結束，
才會再處理下一個source發出來的observable
*/
example$.subscribe({
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
