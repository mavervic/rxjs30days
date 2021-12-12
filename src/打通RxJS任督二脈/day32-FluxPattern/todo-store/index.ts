import { shareReplay } from "rxjs";
import { store$ as storeSubject$ } from "./todo-store";
export * from "./todo-actions";

// TODO: 設定讓外部使用 todo-store 的程式可以使用哪些內容
export const store$ = storeSubject$.asObservable().pipe(shareReplay(1));
