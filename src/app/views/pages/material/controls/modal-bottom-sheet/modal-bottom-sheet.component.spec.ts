import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBottomSheetComponent } from './modal-bottom-sheet.component';

describe('ModalBottomSheetComponent', () => {
  let component: ModalBottomSheetComponent;
  let fixture: ComponentFixture<ModalBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
