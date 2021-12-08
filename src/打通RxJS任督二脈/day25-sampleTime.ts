import { sampleTime, Subject } from "rxjs";

const source$ = new Subject();

/*
sampleTime 有「定期取樣」的意思
*/
source$.pipe(sampleTime(1500)).subscribe((data) => {
  console.log(`sampleTime 示範: ${data}`);
});

setTimeout(() => source$.next(1), 0);
setTimeout(() => source$.next(2), 500);
setTimeout(() => source$.next(3), 1000);
setTimeout(() => source$.next(4), 4000);
setTimeout(() => source$.next(5), 5000);
setTimeout(() => source$.complete(), 5500);
/*
1--2--3---------------4-----5--|
sampleTime(1500)
---------3---------------4-----|
         ^ 1500 毫秒取第一次
                  ^ 3000 毫秒取第二次 (但沒新資料)
                        ＾4500 毫秒取第三次
*/
