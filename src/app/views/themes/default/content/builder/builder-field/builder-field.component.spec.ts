import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderFieldComponent } from './builder-field.component';

describe('BuilderFieldComponent', () => {
  let component: BuilderFieldComponent;
  let fixture: ComponentFixture<BuilderFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
