import { from, of } from "rxjs";

// 傳遞可迭代的物件當參數
from([1, 2, 3]).subscribe((value) => {
  console.log(value);
});

// 傳遞 Observable 當參數
from(of(1, 2, 3)).subscribe((value) => {
  console.log(value);
});

// 傳入 Promise 當參數
from(Promise.resolve(1)).subscribe((data) => {
  console.log(data);
});
