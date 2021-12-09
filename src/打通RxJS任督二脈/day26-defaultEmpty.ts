import { defaultIfEmpty, Subject } from "rxjs";

const emptySource$ = new Subject();
emptySource$
  .pipe(defaultIfEmpty('a'))
  .subscribe(data => {
    console.log(`defaultIfEmpty 示範 (1): ${data}`)
  });
setTimeout(() => emptySource$.complete(), 2000);
// defaultIfEmpty 示範 (1): a