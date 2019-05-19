/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FuploadImageComponent } from './fupload-image.component';

describe('FuploadImageComponent', () => {
  let component: FuploadImageComponent;
  let fixture: ComponentFixture<FuploadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuploadImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
