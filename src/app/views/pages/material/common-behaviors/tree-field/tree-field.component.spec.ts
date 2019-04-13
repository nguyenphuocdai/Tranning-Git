import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeFieldComponent } from './tree-field.component';

describe('TreeComponent', () => {
  let component: TreeFieldComponent;
  let fixture: ComponentFixture<TreeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
