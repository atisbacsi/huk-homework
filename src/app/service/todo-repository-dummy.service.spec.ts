import { TestBed } from '@angular/core/testing';
import { TodoElem } from '../model/TodoElem';
import { TodoList } from '../model/TodoList';
import { TodoStatus } from '../model/TodoStatus';
import { LocalStorageService } from './local-storage.service';

import {
  TodoRepositoryDummyService,
  SESSIONSTORAGE_KEY,
} from './todo-repository-dummy.service';

describe('TodoRepositoryImplService', () => {
  let service: TodoRepositoryDummyService;
  let localStorage: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('localStorage', [
      'get',
      'set',
      'remove',
    ]);
    TestBed.configureTestingModule({
      providers: [
        TodoRepositoryDummyService,
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });
    service = TestBed.inject(TodoRepositoryDummyService);
    localStorage = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add element to stored list', () => {
    const elem: TodoElem = { name: 'hausaufgabe', status: TodoStatus.Open };
    service.add(elem);

    expect(localStorage.set).toHaveBeenCalledWith(SESSIONSTORAGE_KEY, {
      todos: [elem],
    });
  });

  it('should trigger list change', (done) => {
    service.getAll().subscribe(list => {
      const expectedList: TodoList = {todos: [{ name: 'hausaufgabe', status: TodoStatus.Open, id: 0 }]};
      expect(list).toEqual(expectedList);
      done();
    });

    const elem: TodoElem = { name: 'hausaufgabe', status: TodoStatus.Open };
    service.add(elem);
  });
  
  it('should remove element in stored list', () => {
    const elemToRemove: TodoElem = {
      name: 'hausaufgabe',
      status: TodoStatus.Open,
    };

    
    service.add({ name: 'toDoItem1', status: TodoStatus.Ready });
    service.add({ name: 'toDoItem2', status: TodoStatus.Open });
    service.add({ name: 'toDoItem3', status: TodoStatus.Ready });
    service.add(elemToRemove);
    service.add({ name: 'toDoItem4', status: TodoStatus.Open });
    service.add({ name: 'toDoItem5', status: TodoStatus.Ready });

    expect(localStorage.set).toHaveBeenCalledWith(SESSIONSTORAGE_KEY, {
      todos: [
        { name: 'toDoItem1', status: TodoStatus.Ready, id: 0 },
        { name: 'toDoItem2', status: TodoStatus.Open, id: 1 },
        { name: 'toDoItem3', status: TodoStatus.Ready, id: 2 },
        {
          name: 'hausaufgabe',
          status: TodoStatus.Open,
          id: 3
        },
        { name: 'toDoItem4', status: TodoStatus.Open, id: 4 },
        { name: 'toDoItem5', status: TodoStatus.Ready, id: 5 },        
      ],
    });
    
    service.remove(elemToRemove);
    
    expect(localStorage.set).toHaveBeenCalledWith(SESSIONSTORAGE_KEY, {
      todos: [
        { name: 'toDoItem1', status: TodoStatus.Ready, id: 0 },
        { name: 'toDoItem2', status: TodoStatus.Open, id: 1 },
        { name: 'toDoItem3', status: TodoStatus.Ready, id: 2 },
        { name: 'toDoItem4', status: TodoStatus.Open, id: 4 },
        { name: 'toDoItem5', status: TodoStatus.Ready, id: 5 },        
      ],
    });

  });

  it('should update element in stored list', () => {
    const elemToUpdate: TodoElem = {
      name: 'hausaufgabe',
      status: TodoStatus.Open,
    };

    
    service.add({ name: 'toDoItem1', status: TodoStatus.Ready });
    service.add({ name: 'toDoItem2', status: TodoStatus.Open });
    service.add({ name: 'toDoItem3', status: TodoStatus.Ready });
    service.add(elemToUpdate);
    service.add({ name: 'toDoItem4', status: TodoStatus.Open });
    service.add({ name: 'toDoItem5', status: TodoStatus.Ready });

    expect(localStorage.set).toHaveBeenCalledWith(SESSIONSTORAGE_KEY, {
      todos: [
        { name: 'toDoItem1', status: TodoStatus.Ready, id: 0 },
        { name: 'toDoItem2', status: TodoStatus.Open, id: 1 },
        { name: 'toDoItem3', status: TodoStatus.Ready, id: 2 },
        {
          name: 'hausaufgabe',
          status: TodoStatus.Open,
          id: 3
        },
        { name: 'toDoItem4', status: TodoStatus.Open, id: 4 },
        { name: 'toDoItem5', status: TodoStatus.Ready, id: 5 },        
      ],
    });
    
    elemToUpdate.status = TodoStatus.Ready;
    elemToUpdate.name = 'new Name';

    service.update(elemToUpdate);
    
    expect(localStorage.set).toHaveBeenCalledWith(SESSIONSTORAGE_KEY, {
      todos: [
        { name: 'toDoItem1', status: TodoStatus.Ready, id: 0 },
        { name: 'toDoItem2', status: TodoStatus.Open, id: 1 },
        { name: 'toDoItem3', status: TodoStatus.Ready, id: 2 },
        {
          name: 'new Name',
          status: TodoStatus.Ready,
          id: 3
        },        
        { name: 'toDoItem4', status: TodoStatus.Open, id: 4 },
        { name: 'toDoItem5', status: TodoStatus.Ready, id: 5 },        
      ],
    });

  });

  it('should give a uique identifier', () => {

  });

  it('should serve the existing list right after subscription', () => {

  });

  it('should serve the stored list right after creation', () => {

  });

});
