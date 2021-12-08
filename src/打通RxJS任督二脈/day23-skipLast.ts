import { interval, skipLast } from "rxjs";

/*
看 skipLast 這個命名我以為會在complete之後才開始送出值..很酷的實作想法

skipLast 不用等到整個 Observable 結束才知道要怎麼開始抓資料的值，
從 skipLast 的實作 來看的話，會在前面 N 次事件發生時不做任何事情，
當 N + 1 次事件發生時，才把資料流從頭開始依照每次新事件發生時把資料送出。
*/
interval(1000)
  .pipe(skipLast(3))
  .subscribe((data) => {
    console.log(`skipLast 示範 (2)： ${data}`);
  });
