import { Component, OnInit } from '@angular/core';
import { TodoElem } from 'src/app/model/TodoElem';
import { TodoRepositoryDummyService } from 'src/app/service/todo-repository-dummy.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: TodoElem[];

  constructor(private repository: TodoRepositoryDummyService) { }

  ngOnInit(): void {
    this.repository.getAll().subscribe(todos => {this.list = todos.todos; console.log(todos);});
  }

}
