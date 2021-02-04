import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { doesNotReject } from 'assert';
import { TodoElem } from 'src/app/model/TodoElem';
import { TodoStatus } from 'src/app/model/TodoStatus';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    component.todo = { name: 'Hausaufgabe', status: TodoStatus.Open, id: 1 };

    fixture.detectChanges();

    const todoElement: HTMLElement = fixture.nativeElement;
    const div = todoElement.querySelector('span');
    expect(div).toBeDefined();
    expect(div.textContent).toEqual('Hausaufgabe');
  });

  it('should have a button', () => {
    const button: DebugElement = fixture.debugElement.query(
      By.css('input[type=button][value=Del]')
    );
    expect(button).toBeDefined();
  });

  it('should trigger status update', (done) => {
    component.todo = { name: 'Hausaufgabe', status: TodoStatus.Open, id: 1 };

    component.readyItem.subscribe((todo: TodoElem) => {
      expect(todo.status).toBe(TodoStatus.Ready);
      done();
    });
    click(fixture.debugElement.query(By.css('span')));
    fixture.detectChanges();
  });

  it('should trigger delete', (done) => {
    component.todo = {
      name: 'Hausaufgabe',
      status: TodoStatus.Open,
      id: 123321,
    };

    component.removedItem.subscribe((todo: TodoElem) => {
      expect(todo.id).toBe(123321);
      done();
    });
    click(fixture.debugElement.query(By.css('input')));
    fixture.detectChanges();
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
