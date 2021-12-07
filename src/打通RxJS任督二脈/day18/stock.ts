import { from, map, pairwise, scan } from "rxjs";

/*
假設有一個資料流會發送每日收盤時股價，平均股價約 100 元上下
第一天股價一定是 100 元，可忽略它，從第二天開始呈現以下資訊
當股價比前一天高，顯示「股價上漲了！」
當股價比前一天低，顯示「股價下跌了！」
每天提示從歷史以來股價小於 100 元的天數
*/
const priceHistories = [100, 98, 96, 102, 99, 105, 105];

from(priceHistories)
  .pipe(
    pairwise(),
    map(([yesterdayPrice, todayPirce], index) => ({
      day: index + 2,
      todayPrice: todayPirce,
      isUps: yesterdayPrice < todayPirce,
      isDowns: yesterdayPrice > todayPirce,
      priceBelow100Days: 0,
    })),
    scan(
      (accu, value) => ({
        ...value,
        // 股價小於 100，天數 + 1
        priceBelow100Days:
          accu.priceBelow100Days + (value.todayPrice < 100 ? 1 : 0),
      }),
      {
        day: 1,
        todayPrice: 0,
        priceUp: false,
        priceDown: false,
        priceBelow100Days: 0,
      }
    )
  )
  .subscribe((data) => {
    console.log(`第 ${data.day} 天`);
    console.log(`本日股價: ${data.todayPrice}`);
    console.log(
      `本日股價 ${data.isUps ? "上漲" : data.isDowns ? "下跌" : "持平"}`
    );
    console.log(`歷史股價小於 100 的有 ${data.priceBelow100Days} 天`);
  });

// from(priceHistories)
//   .pipe(
//     // tap((value) => {

//     // }),
//     // scan((acc, curr, index) => {
//     //   console.log(`第${index}天`);

//     //   console.log(`歷史股價小於${acc}的有`);
//     // }),
//     pairwise(),
//     tap((value) => {
//       console.log(`本日股價${value[1]}`);

//       let isEq = value[0] === value[1];
//       if (isEq) {
//         console.log(`本日股價持平`);
//       } else {
//         let isUp = value[0] < value[1];
//         console.log(`本日股價${isUp ? "上漲" : "下跌"}`);
//       }
//     })
//   )
//   .subscribe((value) => {
//     console.log(value);
//   });
