import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TodoElem } from '../model/TodoElem';
import { TodoList } from '../model/TodoList';
import { LocalStorageService } from './local-storage.service';
import { TodoRepository } from './todo-repository';

export const SESSIONSTORAGE_KEY = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoRepositoryDummyService implements TodoRepository {

  private id: number = 0;
  private elementList: TodoList = { todos: [] };
  private addQueue: Subject<TodoElem> = new Subject();
  private delQueue: Subject<TodoElem> = new Subject();
  private updateQueue: Subject<TodoElem> = new Subject();
  private allElements: Subject<TodoList> = new Subject();

  constructor(private localStorage: LocalStorageService) { 

    const savedList: TodoList = this.localStorage.get(SESSIONSTORAGE_KEY);
    if (savedList) {
      this.elementList = savedList;
    } else {
      this.elementList =  { todos: [] };
    }

    this.addQueue.subscribe(elem => this.reduceAdded(elem));
    this.delQueue.subscribe(elem => this.reduceDeleted(elem));
    this.updateQueue.subscribe(elem => this.reduceUpdated(elem));
  }

  private reduceAdded(elem: TodoElem): void {
    elem.id = this.id++;
    this.elementList.todos.push(elem);
    this.localStorage.set(SESSIONSTORAGE_KEY, this.elementList);
    this.allElements.next(this.elementList);
  }

  private reduceDeleted(elem: TodoElem): void {
    const delIndex = this.elementList.todos.findIndex(e => e.id === elem.id);
    if (delIndex > -1) {
      this.elementList.todos.splice(delIndex, 1);
      this.localStorage.set(SESSIONSTORAGE_KEY, this.elementList);
    }    

    this.allElements.next(this.elementList);
  }

  private reduceUpdated(elem: TodoElem): void {
    const searched = this.elementList.todos.find(e => e.id === elem.id);
    if (searched) {
      searched.status = elem.status;
      this.localStorage.set(SESSIONSTORAGE_KEY, this.elementList);
      searched.name = elem.name;
    }

    this.allElements.next(this.elementList);
  }

  add(elem: TodoElem): void { 
    this.addQueue.next(elem);
  }
  remove(elem: TodoElem): void {
    this.delQueue.next(elem);
  }
  update(elem: TodoElem): void {
    this.updateQueue.next(elem);    
  }

  getAll(): Observable<TodoList> {
    return this.allElements;
  }
}
