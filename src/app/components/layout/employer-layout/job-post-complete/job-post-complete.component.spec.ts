import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostCompleteComponent } from './job-post-complete.component';

describe('JobPostCompleteComponent', () => {
  let component: JobPostCompleteComponent;
  let fixture: ComponentFixture<JobPostCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
