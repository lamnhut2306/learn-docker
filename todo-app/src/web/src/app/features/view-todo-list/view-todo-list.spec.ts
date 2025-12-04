import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodoList } from './view-todo-list';

describe('ViewTodoList', () => {
  let component: ViewTodoList;
  let fixture: ComponentFixture<ViewTodoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTodoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTodoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
