import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  of,
  shareReplay,
  switchMap,
  take,
} from "rxjs";
import { catchError, mapTo, scan, share, startWith } from "rxjs/operators";
import * as dataUtils from "./data-utils";
import * as domUtils from "./dom-utils";

// 實作自動完成功能
const keyword_element = document.querySelector("#keyword") as HTMLInputElement;
const keyword$ = fromEvent(keyword_element, "input").pipe(
  map((event) => (event.target as HTMLInputElement).value),
  startWith(""), // 讓資料流有初始值
  shareReplay(1) // 共享最後一次事件資料
);

keyword$
  .pipe(
    debounceTime(700),
    distinctUntilChanged(),
    filter((keyword) => keyword.length >= 3),
    switchMap((keyword) => dataUtils.getSuggestions(keyword))
  )
  .subscribe((suggestions) => {
    domUtils.fillAutoSuggestions(suggestions);
  });

// 實作關鍵字搜尋功能
const search$ = fromEvent(document.querySelector("#search"), "click");
const keywordForSearch$ = keyword$.pipe(take(1)); // 取得一次資料流事件後結束

const searchByKeyword$ = search$.pipe(
  switchMap(() => keywordForSearch$),
  filter((keyword) => !!keyword), // 排除空字串查詢
  switchMap((keyword) => dataUtils.getSearchResult(keyword))
);
searchByKeyword$.subscribe((result) => domUtils.fillSearchResult(result));

// 實作排序與分頁功能
// 建立 BehaviorSubject，預設使用 stars 進行降冪排序
const sortBy$ = new BehaviorSubject({ sort: "stars", order: "desc" });
const changeSort = (sortField: string) => {
  let order = "desc";
  if (sortField === sortBy$.value.sort && order === sortBy$.value.order) {
    order = "asc";
  }
  sortBy$.next({
    sort: sortField,
    order,
  });
};

fromEvent(document.querySelector("#sort-stars"), "click").subscribe(() => {
  changeSort("stars");
});
fromEvent(document.querySelector("#sort-forks"), "click").subscribe(() => {
  changeSort("forks");
});

const perPage$ = fromEvent(document.querySelector("#per-page"), "change").pipe(
  map((event) => (event.target as HTMLSelectElement).value)
);

const previousPage$ = fromEvent(
  document.querySelector("#previous-page"),
  "click"
).pipe(mapTo(-1));

const nextPage$ = fromEvent(document.querySelector("#next-page"), "click").pipe(
  mapTo(1)
);

const page$ = merge(previousPage$, nextPage$).pipe(
  scan((currPageIndex, value) => {
    const nextPage = currPageIndex + value;
    return nextPage < 1 ? 1 : nextPage;
  }, 1)
);

// 組合搜尋條件
const startSearch$ = combineLatest([
  searchByKeyword$,
  sortBy$,
  page$.pipe(startWith(1)), // 給予 page$ 初始資料
  perPage$.pipe(startWith(10)), // 給予 perPage$ 初始資料
]);

const getSearchResult = (
  keyword: string,
  sort: string,
  order: string,
  page: number,
  perPage: number
) => {
  return dataUtils.getSearchResult(keyword, sort, order, page, perPage).pipe(
    map((result) => ({ success: true, message: null, data: result })),
    catchError((error) =>
      of({ success: false, message: error.response.message, data: [] })
    )
  );
};

const searchResult$ = startSearch$.pipe(
  switchMap(([keyword, sort, page, perPage]) =>
    getSearchResult(keyword, sort.sort, sort.order, page, ~~perPage)
  ),
  share()
);

searchResult$.subscribe((result) => {
  domUtils.fillSearchResult(result.data);
  domUtils.loaded();
});

// 把「顯示資料」和「錯誤處理」當作兩個不同的資料來源處理，可以讓我們在閱讀程式時更加專注在原本的意圖上
searchResult$
  .pipe(filter((result) => result.success != true))
  .subscribe((result) => alert(result.message));

// 顯示頁碼/排序資訊
page$.subscribe((page) => {
  domUtils.updatePageNumber(page);
});

sortBy$.pipe(filter((sort) => sort.sort === "stars")).subscribe((sort) => {
  domUtils.updateStarsSort(sort);
});

sortBy$.pipe(filter((sort) => sort.sort === "forks")).subscribe((sort) => {
  domUtils.updateForksSort(sort);
});
