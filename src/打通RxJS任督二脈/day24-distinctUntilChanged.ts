import { distinctUntilChanged, from } from "rxjs";

/*
只要目前事件資料值跟上一次事件資料值一樣，這次就事件就不會發生，若目前事件資料值跟上一次事件資料值不同時
*/
from([1, 1, 2, 3, 3, 1])
  .pipe(distinctUntilChanged())
  .subscribe((data) => {
    console.log(`distinctUntilChanged 示範 (1): ${data}`);
  });
/*
(1   1    2    3    3    1)
distinctUntilChanged()
(1        2    3         1)
     ^ 事件值跟上次一樣，不顯示
          ^ 事件值跟上次不一樣，顯示
*/

/*
如果傳入的是物件distinctUntilChanged 內可以傳入一個 compare callback function，
這個 function 會傳入「目前」和「上次」的事件值，讓我們可以比較判斷是否有被變更。
*/
const students = [
  { id: 1, score: 70 },
  { id: 1, score: 80 },
  { id: 2, score: 90 },
  { id: 3, score: 100 },
];
from(students)
  .pipe(
    distinctUntilChanged((studentA, studentB) => studentA.id === studentB.id)
  )
  .subscribe((student) => {
    console.log(
      `distinctUntilChanged 示範 (2): ${student.id} - ${student.score}`
    );
  });
// distinctUntilChanged 示範 (2): 1 - 70
// distinctUntilChanged 示範 (2): 2 - 90
// distinctUntilChanged 示範 (2): 3 - 100

/*
distinctUntilChanged 還有第二個參數是 keySelector function，
這個 function 跟 distinct 的 keySelector 參數一樣，是用來決定傳入的物件比較是否重複用的 key：
*/
from(students)
  .pipe(
    distinctUntilChanged(
      // compare function
      (idA, idB) => idA === idB,
      // keySelector function
      (student) => student.id
    )
  )
  .subscribe((student) => {
    console.log(
      `distinctUntilChanged 示範 (3): ${student.id} - ${student.score}`
    );
  });
// distinctUntilChanged 示範 (3): 1 - 70
// distinctUntilChanged 示範 (3): 2 - 90
// distinctUntilChanged 示範 (3): 3 - 100
