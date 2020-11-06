import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobApplyComponent } from './candidate-job-apply.component';

describe('CandidateJobApplyComponent', () => {
  let component: CandidateJobApplyComponent;
  let fixture: ComponentFixture<CandidateJobApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateJobApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateJobApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
