import { TestBed } from '@angular/core/testing';

import { CandidateCvService } from './candidate-cv.service';

describe('CandidateCvService', () => {
  let service: CandidateCvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateCvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
