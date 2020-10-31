import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobSaveComponent } from './candidate-job-save.component';

describe('CandidateJobSaveComponent', () => {
  let component: CandidateJobSaveComponent;
  let fixture: ComponentFixture<CandidateJobSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateJobSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateJobSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
