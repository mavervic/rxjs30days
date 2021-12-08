import { interval, map, takeWhile } from "rxjs";

const source$ = interval(1000).pipe(map((data) => data + 1));

/*
takeWhile 內需要傳入一個 callback function，這個 callback function 決定 takeWhile 發生事件的時機，
只要事件值持續符合 callback function 內的條件，就會持續產生事件，直到不符合條件後結束。

takeWhile 的 callback 可以傳入事件值 (value) 及索引值 (index)；
除了 callback function 之外，還有一個 inclusive 參數，
代表是否要包含判斷不符合條件的那個值，預設為 false，
當設為 true 時，發生結束條件的那次事件值也會被包含在要發生的事件內。
*/
source$.pipe(takeWhile((data) => data < 5, false)).subscribe({
  next: (data) => console.log(`takeWhile 示範 (1): ${data}`),
  complete: () => console.log("takeWhile 結束 (1)"),
});
