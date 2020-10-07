import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGoalComponent } from './modal-goal.component';

describe('ModalGoalComponent', () => {
  let component: ModalGoalComponent;
  let fixture: ComponentFixture<ModalGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
