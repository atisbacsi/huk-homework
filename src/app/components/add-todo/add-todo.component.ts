import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoElem } from 'src/app/model/TodoElem';
import { TodoStatus } from 'src/app/model/TodoStatus';
import { TodoRepositoryDummyService } from '../../service/todo-repository-dummy.service';

@Component({
  selector: 'todo-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  todoElem = new FormControl('');

  constructor(private repository: TodoRepositoryDummyService) {}

  ngOnInit(): void {}

  addItem(): void {
    const title: string = this.todoElem.value;
    if (title && title.length > 0) {
      const newItem: TodoElem = { name: title, status: TodoStatus.Open };
      this.repository.add(newItem);
      this.todoElem.reset();
    }
  }
}
