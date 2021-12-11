import { min, of } from "rxjs";

/*
跟 max 相反，min 會判斷來源 Observable 資料的最小值

min 會判斷來源 Observable 資料的最小值，
在來源 Observable 結束後，將最小值事件資料發生在新的 Observable 上
*/
of(5, 1, 9, 8)
  .pipe(min())
  .subscribe((data) => {
    console.log(`min 示範 (1): ${data}`);
  });

/*
min 內也可以傳入 comparer callback function
*/
of(
  { name: "Student A", score: 80 },
  { name: "Student B", score: 90 },
  { name: "Student C", score: 60 },
  { name: "Student D", score: 70 }
)
  .pipe(min((studentA, studentB) => studentA.score - studentB.score))
  .subscribe((student) => {
    console.log(`min 示範 (2): ${student.name} - ${student.score}`);
  });
