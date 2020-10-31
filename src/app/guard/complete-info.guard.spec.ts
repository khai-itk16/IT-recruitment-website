import { TestBed } from '@angular/core/testing';

import { CompleteInfoGuard } from './complete-info.guard';

describe('CompleteInfoGuard', () => {
  let guard: CompleteInfoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompleteInfoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
