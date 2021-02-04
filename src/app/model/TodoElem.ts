import { TodoStatus } from "./TodoStatus";

export interface TodoElem {
    id?: number,
    name: string,
    status: TodoStatus,
    dueDate?: string,
}