import { map, mergeMap, timer } from "rxjs";

/*
mergeMap 會把所有被轉換成的 Observable 「合併」(merge)到同一條資料流內，
因此會有平行處理的概念，也就是每此轉換的 Observable 都會直接訂閱，
不會退訂上一次的 Observable，也不會等待上一次的 Observable 結束，
因此任何目前存在中的 Observable 資料流有新事件，都會被轉換成整體資料流的事件
*/
const source1$ = timer(0, 3000);
const getSource2 = (input) => timer(0, 1500)
  .pipe(map(data => `資料流 ${input}: ${data}`));

source1$.pipe(
  mergeMap(data => getSource2(data))
).subscribe(result => {
  console.log(result);
});