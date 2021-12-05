import { interval, map, scan, take } from "rxjs";
import { startWith } from "rxjs/operators";

// 預設值
const firstTwoFibs = [0, 1];
// // An endless stream of Fibonnaci numbers.
// const fibonnaci$ = interval(1000).pipe(
//   // Scan to get the fibonnaci numbers (after 0, 1)
//   scan(([a, b]) => [b, a + b], firstTwoFibs),
//   // Get the second number in the tuple, it's the one you calculated
//   map(([, n]) => n),
//   // Start with our first two digits :)
//   startWith(...firstTwoFibs)
// );

// fibonnaci$.subscribe((value) => {
//   console.log(value);
// });

/**
 * 費波列
 */
interval(1000)
  .pipe(
    take(10),
    scan(([acc, curr]) => [curr, acc + curr], firstTwoFibs),
    map(([_, n]) => n),
    startWith(...firstTwoFibs)
  )
  .subscribe((value) => {
    console.log(value);
  });
