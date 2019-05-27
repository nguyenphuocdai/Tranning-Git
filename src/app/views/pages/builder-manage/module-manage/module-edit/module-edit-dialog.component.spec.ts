import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleEditDialogComponent } from './module-edit-dialog.component';

describe('ModuleEditDialogComponent', () => {
  let component: ModuleEditDialogComponent;
  let fixture: ComponentFixture<ModuleEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
