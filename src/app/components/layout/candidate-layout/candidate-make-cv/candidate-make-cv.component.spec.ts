import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMakeCVComponent } from './candidate-make-cv.component';

describe('CandidateMakeCVComponent', () => {
  let component: CandidateMakeCVComponent;
  let fixture: ComponentFixture<CandidateMakeCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateMakeCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateMakeCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
