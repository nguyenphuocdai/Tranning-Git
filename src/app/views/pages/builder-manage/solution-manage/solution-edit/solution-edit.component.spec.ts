import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionEditComponent } from './solution-edit.component';

describe('SolutionEditComponent', () => {
  let component: SolutionEditComponent;
  let fixture: ComponentFixture<SolutionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
