import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoElem } from 'src/app/model/TodoElem';
import { TodoStatus } from 'src/app/model/TodoStatus';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() 
  todo: TodoElem = {name: 'X', status: TodoStatus.Open, id: 0};

  constructor() { }

  ngOnInit(): void {
  }

  @Output() removedItem = new EventEmitter<TodoElem>();
  @Output() readyItem = new EventEmitter<TodoElem>();

  remove(): void {
    this.removedItem.emit(this.todo);
  }

  ready(): void {
    this.todo.status = TodoStatus.Ready;
    this.readyItem.emit(this.todo);
  }

  get isReady(): boolean {
    return this.todo.status === TodoStatus.Ready;
  }
}
