import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceEmployerComponent } from './introduce-employer.component';

describe('IntroduceEmployerComponent', () => {
  let component: IntroduceEmployerComponent;
  let fixture: ComponentFixture<IntroduceEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroduceEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduceEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
