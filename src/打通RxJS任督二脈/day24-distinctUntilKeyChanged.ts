import { distinctUntilKeyChanged, from } from "rxjs";

const students = [
  { id: 1, score: 70 },
  { id: 1, score: 80 },
  { id: 2, score: 90 },
  { id: 3, score: 100 },
];

/*
我們可以用 distinctUntilKeyChanged 來簡化 distinctUntilChanged 的寫法。
*/
from(students)
  .pipe(distinctUntilKeyChanged("id"))
  .subscribe((student) => {
    console.log(
      `distinctUntilKeyChanged 示範 (1): ${student.id} - ${student.score}`
    );
  });

/*
distinctUntilKeyChanged 還可以在再傳入一個 compare function，來決定資料是否重複
*/
from(students)
  .pipe(distinctUntilKeyChanged("id", (idA, idB) => idA === idB))
  .subscribe((student) => {
    console.log(
      `distinctUntilKeyChanged 示範 (2): ${student.id} - ${student.score}`
    );
  });
