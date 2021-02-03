import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoRepositoryDummyService } from './service/todo-repository-dummy.service';
import { LocalStorageService } from './service/local-storage.service';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [AppComponent, AddTodoComponent, ListComponent, ItemComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [
    LocalStorageService,
    TodoRepositoryDummyService,
    { provide: Window, useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
