import { interval, shareReplay } from "rxjs";

/*
shareReplay 可以直接當作 multicast(new ReplaySubject()) 與 refCount() 的組合，
與 share() 不同的地方在於，shareReplay() 還有重播的概念，也就是每次訂閱時，會重播過去 N 次發生的資料
*/
const source$ = interval(1000).pipe(shareReplay(2));

source$.subscribe((data) => {
  console.log(`shareReplay 示範 第一次訂閱: ${data}`);
});

setTimeout(() => {
  source$.subscribe((data) => {
    console.log(`shareReplay 示範 第二次訂閱: ${data}`);
  });
}, 5000);
// shareReplay 示範 第一次訂閱: 0
// shareReplay 示範 第一次訂閱: 1
// shareReplay 示範 第一次訂閱: 2
// shareReplay 示範 第一次訂閱: 3
// shareReplay 示範 第一次訂閱: 4
// (第二次訂閱發生時，先重播過去兩次的資料)
// shareReplay 示範 第二次訂閱: 3
// shareReplay 示範 第二次訂閱: 4
// shareReplay 示範 第一次訂閱: 5
// shareReplay 示範 第二次訂閱: 5
// shareReplay 示範 第一次訂閱: 6
// shareReplay 示範 第二次訂閱: 6
