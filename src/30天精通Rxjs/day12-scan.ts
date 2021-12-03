import { from } from "rxjs";

var arr = [1, 2, 3, 4];
var result = arr.reduce((origin, next) => {
  console.log(origin);
  return origin + next;
}, 0);

console.log(result);

var source = from("hello").pipe();

// var example = source.scan((origin, next) => origin + next, "");

source.subscribe({
  next: (value) => {
    console.log(value);
  },
  error: (err) => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  },
});
