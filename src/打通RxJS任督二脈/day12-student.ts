import { Subject } from "rxjs";

class Student {
  private _source$ = new Subject();

  get source$() {
    return this._source$;
  }

  updateScore(score) {
    if (score >= 60) {
      this._source$.next(score);
    }
  }
}

const vic = new Student();

vic.source$.subscribe((value) => {
  console.log(`最後一次及格分數為${value}`);
});

vic.updateScore(80);
vic.updateScore(50);
vic.updateScore(60);
vic.updateScore(50);
vic.updateScore(70);
vic.updateScore(50);
