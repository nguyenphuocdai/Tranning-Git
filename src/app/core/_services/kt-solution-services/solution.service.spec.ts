/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SolutionService } from './solution.service';

describe('Service: Solution', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolutionService]
    });
  });

  it('should ...', inject([SolutionService], (service: SolutionService) => {
    expect(service).toBeTruthy();
  }));
});
