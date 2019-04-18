/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardListModuleComponent } from './card-list-module.component';

describe('CardListModuleComponent', () => {
  let component: CardListModuleComponent;
  let fixture: ComponentFixture<CardListModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
