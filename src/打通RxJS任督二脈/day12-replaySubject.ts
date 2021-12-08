import { ReplaySubject } from "rxjs";
const source$ = new ReplaySubject(3);

source$.next(1);
source$.next(2);
source$.subscribe((value) => console.log(`第一個訂閱者得到了數值: ${value}`));

source$.next(3);
source$.next(4);
source$.subscribe((value) => console.log(`第二個訂閱者得到了數值: ${value}`));

source$.next(5);
source$.subscribe((value) => console.log(`第三個訂閱者得到了數值: ${value}`));
