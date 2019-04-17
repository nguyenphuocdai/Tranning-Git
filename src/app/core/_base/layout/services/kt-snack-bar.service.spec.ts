/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KtSnackBarService } from './kt-snack-bar.service';

describe('Service: KtSnackBar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KtSnackBarService]
    });
  });

  it('should ...', inject([KtSnackBarService], (service: KtSnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
