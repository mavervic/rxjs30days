import { EMPTY, iif, of } from "rxjs";

const emitOneIfEven = (data) => {
  return iif(() => data % 2 === 0, of("Hello"), EMPTY);
};

emitOneIfEven(1).subscribe((data) => {
  console.log(`iif 範例 (1): ${data}`);
});
emitOneIfEven(2).subscribe((data) => {
  console.log(`iif 範例 (2): ${data}`);
});
