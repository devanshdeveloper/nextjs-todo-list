import {
  DataSnapshot,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { auth, db } from ".";

export type TodoType = {
  text: string;
  isCompleted: boolean;
};

export function addTodo(data: TodoType) {
  return set(push(ref(db, `todos/${auth.currentUser?.uid}/`)), data);
}
export function onTodos(then: (todo: DataSnapshot) => void) {
  return onValue(ref(db, `todos/${auth.currentUser?.uid}/`), then);
}
export function deleteTodo(id: string) {
  return remove(ref(db, `todos/${auth.currentUser?.uid}/${id}`));
}
export function toggleCompleted(id: string, isCompleted: boolean) {
  return update(ref(db, `todos/${auth.currentUser?.uid}/${id}`), {
    isCompleted: !isCompleted,
  });
}
