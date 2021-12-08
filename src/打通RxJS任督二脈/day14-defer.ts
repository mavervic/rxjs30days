import { defer } from "rxjs";

/*
Promise一建立就會馬上執行
就算還沒呼叫 .then，程式依然會被執行
*/
console.log(`Promise 的問題:${new Date()}`);
const p = new Promise((resolve) => {
  console.log(`Promise 內被執行了${new Date()}`);
  setTimeout(() => {
    resolve("上傳成功!!");
  }, 1000);
});

setTimeout(() => {
  p.then((result) => {
    console.log(`Promise 結果: ${result}${new Date()}`);
  });
}, 5000);

/*
將 Promise 包成起來
因此在此 function 被呼叫前，都不會執行 Promise 內的程式
*/
console.log(`示範用 defer 解決 Promise 的問題:${new Date()}`);

const promiseFactory = () => {
  return new Promise((resolve) => {
    console.log(`Promise 內被執行了${new Date()}`);
    setTimeout(() => {
      resolve("上傳成功!!");
    }, 2000);
  });
};

const deferSource$ = defer(promiseFactory);

setTimeout(() => {
  // 直到被訂閱了，才會呼叫裡面的 Promise 內的程式
  deferSource$.subscribe((result) => {
    console.log(`Promise 結果: ${result}${new Date()}`);
  });
}, 2000);
