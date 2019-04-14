import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionManagementComponent } from './solution-management.component';

describe('SolutionComponent', () => {
  let component: SolutionManagementComponent;
  let fixture: ComponentFixture<SolutionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
