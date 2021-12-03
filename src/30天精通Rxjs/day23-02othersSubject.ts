import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

var subject$$$ = new Subject();

var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

subject$$$.subscribe(observerA);

subject$$$.next(1);
// "A next: 1"
subject$$$.next(2);
// "A next: 2"
subject$$$.next(3);
// "A next: 3"


/*
很多時候我們會希望 Subject 能代表當下的狀態，而不是單存的事件發送，
也就是說如果今天有一個新的訂閱，我們希望 Subject 能立即給出最後送出的值，而不是沒有回應
*/
setTimeout(() => {
    subject$$$.subscribe(observerB); // 3 秒後才訂閱，observerB 不會收到任何值。
},3000)



var subject$$ = new BehaviorSubject(0); // 0 為起始值
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

subject$$.subscribe(observerA);
// "A next: 0"
subject$$.next(1);
// "A next: 1"
subject$$.next(2);
// "A next: 2"
subject$$.next(3);
// "A next: 3"

setTimeout(() => {
    subject$$.subscribe(observerB); 
    // "B next: 3"
},3000)


/* 在某些時候我們會希望 Subject 代表事件，
但又能在新訂閱時重新發送最後的幾個元素，
這時我們就可以用 ReplaySubject，範例如下 
*/
var subject$ = new ReplaySubject(2);
var observerA = {
  next: value => console.log('A next: ' + value),
  error: error => console.log('A error: ' + error),
  complete: () => console.log('A complete!')
}

var observerB = {
  next: value => console.log('B next: ' + value),
  error: error => console.log('B error: ' + error),
  complete: () => console.log('B complete!')
}

subject$.subscribe(observerA);
subject$.next(1);
// "A next: 1"
subject$.next(2);
// "A next: 2"
subject$.next(3);
// "A next: 3"

setTimeout(() => {
    subject$.subscribe(observerB);
    // "B next: 2"
    // "B next: 3"
},3000)
/* 可能會有人以為 ReplaySubject(1) 是不是就等同於 BehaviorSubject，
其實是不一樣的，BehaviorSubject 在建立時就會有起始值，
比如 BehaviorSubject(0) 起始值就是 0，
BehaviorSubject 是代表著狀態而 ReplaySubject 只是事件的重放而已。
*/