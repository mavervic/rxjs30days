import { max, of } from "rxjs";

/*
跟 min 相反，max 會判斷來源 Observable 資料的最大值

max 會判斷來源 Observable 資料的最大值，
在來源 Observable 結束後，將最大值事件資料發生在新的 Observable 上
*/
of(5, 1, 9, 8)
  .pipe(max())
  .subscribe((data) => {
    console.log(`max 示範 (1): ${data}`);
  });
// max 示範 (1): 9

/*
max 內也可以傳入 comparer callback function
*/
of(
  { name: "Student A", score: 80 },
  { name: "Student B", score: 90 },
  { name: "Student C", score: 60 },
  { name: "Student D", score: 70 }
)
  .pipe(max((studentA, studentB) => studentA.score - studentB.score))
  .subscribe((student) => {
    console.log(`max 示範 (2): ${student.name} - ${student.score}`);
  });
// max 示範 (2): Student B - 90
