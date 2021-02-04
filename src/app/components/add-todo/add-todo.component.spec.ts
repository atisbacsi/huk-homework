import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TodoStatus } from 'src/app/model/TodoStatus';
import { TodoRepositoryDummyService } from 'src/app/service/todo-repository-dummy.service';

import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let repository: jasmine.SpyObj<TodoRepositoryDummyService>;

  beforeEach(async () => {
    const spyRepository = jasmine.createSpyObj('TodoRepositoryDummyService', [
      'add',
    ]);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddTodoComponent],
      providers: [
        { provide: TodoRepositoryDummyService, useValue: spyRepository },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    repository = TestBed.inject(
      TodoRepositoryDummyService
    ) as jasmine.SpyObj<TodoRepositoryDummyService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new elem', () => {
    const inputBoxDE: DebugElement = fixture.debugElement.query(
      By.css('.title')
    );

    const inputBox: HTMLInputElement = inputBoxDE.nativeElement;
    inputBox.value = 'a new todo';
    inputBox.dispatchEvent(new Event('input'));

    const buttonDE: DebugElement = fixture.debugElement.query(
      By.css('.enteritem')
    );

    const button: HTMLInputElement = inputBoxDE.nativeElement;

    click(buttonDE);

    fixture.detectChanges();

    expect(repository.add).toHaveBeenCalledWith({
      name: 'a new todo',
      status: TodoStatus.Open,
    });
  });

  it('shouldnt add null element', () => {
    const buttonDE: DebugElement = fixture.debugElement.query(
      By.css('.enteritem')
    );

    click(buttonDE);

    fixture.detectChanges();
    expect(repository.add).not.toHaveBeenCalled();
  });

  it('shouldnt add "" element', () => {
    const inputBoxDE: DebugElement = fixture.debugElement.query(
      By.css('.title')
    );

    const inputBox: HTMLInputElement = inputBoxDE.nativeElement;
    inputBox.value = '';
    inputBox.dispatchEvent(new Event('input'));

    const buttonDE: DebugElement = fixture.debugElement.query(
      By.css('.enteritem')
    );

    click(buttonDE);

    fixture.detectChanges();
    expect(repository.add).not.toHaveBeenCalled();
  });
});

export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
