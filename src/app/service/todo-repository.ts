import { Observable } from "rxjs";
import { TodoElem } from "../model/TodoElem";
import { TodoList } from "../model/TodoList";

export interface TodoRepository {
    add(elem: TodoElem): void;
    remove(elem: TodoElem): void;
    update(elem: TodoElem): void;
    getAll(): Observable<TodoList>;
}