import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodoRepositoryDummyService } from 'src/app/service/todo-repository-dummy.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let repository: jasmine.SpyObj<TodoRepositoryDummyService>;

  beforeEach(async () => {
    const spyRepository = jasmine.createSpyObj('TodoRepositoryDummyService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [
        { provide: TodoRepositoryDummyService, useValue: spyRepository },
      ],      
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    repository = TestBed.inject(
      TodoRepositoryDummyService
      ) as jasmine.SpyObj<TodoRepositoryDummyService>;
      
    repository.getAll.and.returnValue(of());

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
