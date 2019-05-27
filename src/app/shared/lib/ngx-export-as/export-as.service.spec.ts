/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExportAsService } from './export-as.service';

describe('Service: ExportAs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportAsService]
    });
  });

  it('should ...', inject([ExportAsService], (service: ExportAsService) => {
    expect(service).toBeTruthy();
  }));
});
