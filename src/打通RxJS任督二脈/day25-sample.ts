import { interval, sample, Subject } from "rxjs";

/*
sample 是單純「取樣」的意思，我們可以傳入一個 notifer 的 Observable，
每 notifier 有新事件發生時，sample 就會在來源 Observable 上取一筆最近發生過的事件值，
因此透過 sample 我們可以自行決定取樣的時機點。
*/
const notifier$ = new Subject();
const source$ = interval(1000);
source$.pipe(sample(notifier$)).subscribe((data) => {
  console.log(`sample 示範: ${data}`);
});

setTimeout(() => notifier$.next(1), 1500);
// sample 示範: 0
setTimeout(() => notifier$.next(1), 1600);
// (沒事)
setTimeout(() => notifier$.next(1), 5000);
// sample 示範: 4

/*
運作過程如下：
  source$ 是每 1000 毫秒發生一次事件的 Observable
    1500 毫秒時，notifier$ 發出事件，取樣一次，此時 0~1500 毫秒內來源 Observable 最後一次事件值為 0，發生在新的 Observable 上
    1600 毫秒時，notifier$ 發生事件，取樣一次，此時 1501~1600 毫秒內來源 Observable 沒有任何事件發生過，因此新的 Observable 上也沒有事件發生
    5000 毫秒時，notifier$ 發生事件，取樣一次，此時 1601~5000 毫秒內來源 Observable 最後一次事件值為 4，發生在新的 Observable 上
需要自行決定取樣點邏輯的時候，就是使用 sample 時機囉。
*/
