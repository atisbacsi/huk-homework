import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoRepositoryDummyService } from './service/todo-repository-dummy.service';
import { LocalStorageService } from './service/local-storage.service';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [LocalStorageService, TodoRepositoryDummyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
