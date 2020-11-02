import { TestBed } from '@angular/core/testing';

import { JobSaveService } from './job-save.service';

describe('JobSaveService', () => {
  let service: JobSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
