/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExportJsonToExcelService } from './export-json-to-excel.service';

describe('Service: ExportJsonToExcel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportJsonToExcelService]
    });
  });

  it('should ...', inject([ExportJsonToExcelService], (service: ExportJsonToExcelService) => {
    expect(service).toBeTruthy();
  }));
});
