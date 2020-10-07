import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAchievementComponent } from './modal-achievement.component';

describe('ModalAchievementComponent', () => {
  let component: ModalAchievementComponent;
  let fixture: ComponentFixture<ModalAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
