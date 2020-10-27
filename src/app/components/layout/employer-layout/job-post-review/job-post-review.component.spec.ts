import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostReviewComponent } from './job-post-review.component';

describe('JobPostReviewComponent', () => {
  let component: JobPostReviewComponent;
  let fixture: ComponentFixture<JobPostReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
