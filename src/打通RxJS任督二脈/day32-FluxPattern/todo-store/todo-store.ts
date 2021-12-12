import { BehaviorSubject } from "rxjs";

export interface TodoState {
  loading: boolean;
  todos: {
    id: number;
    name: string;
    done: boolean;
  }[];
}

export const store$ = new BehaviorSubject<TodoState>({
  loading: false,
  todos: [],
});
