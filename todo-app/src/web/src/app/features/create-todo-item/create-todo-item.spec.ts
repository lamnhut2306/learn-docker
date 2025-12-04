import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoItem } from './create-todo-item';

describe('CreateTodoItem', () => {
  let component: CreateTodoItem;
  let fixture: ComponentFixture<CreateTodoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTodoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
