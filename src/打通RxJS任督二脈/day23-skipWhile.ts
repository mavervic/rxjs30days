import { interval, skipWhile } from "rxjs";

interval(1000)
  .pipe(skipWhile((data) => data < 2))
  .subscribe((data) => console.log(`skipWhile 示範: ${data}`));
