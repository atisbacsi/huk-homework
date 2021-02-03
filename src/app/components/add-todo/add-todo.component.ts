import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'todo-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  todoElem = new FormControl('');
  
  constructor() { }

  ngOnInit(): void {
  }

  addItem(): void {
    console.log(this.todoElem.value);
    this.todoElem.reset();
  }

}
