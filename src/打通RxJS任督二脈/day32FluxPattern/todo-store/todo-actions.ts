import { TodoActionTypes } from "./todo-action-types";

// TODO: 建立產生 Action 的方法
// Action 格式
export interface TodoAction {
  type: TodoActionTypes;
  payload: string;
}

// {
//    // 提供給 Dispatcher 判斷 Action 的類型
//    type: TodoActionTypes.XXXX
//    // 提供給 Dispatcher 的相關設定資訊
//    payload: ...
// }
export const loadTodoItemsAction = (): TodoAction => {
  return {
    type: TodoActionTypes.LoadTodoItems,
    payload: null,
  };
};

export const addTodoItemAction = (payload: string): TodoAction => {
  return {
    type: TodoActionTypes.AddTodoItem,
    payload,
  };
};

export const toggleTodoItemAction = (payload: string): TodoAction => {
  return {
    type: TodoActionTypes.ToggleTodoItem,
    payload,
  };
};
