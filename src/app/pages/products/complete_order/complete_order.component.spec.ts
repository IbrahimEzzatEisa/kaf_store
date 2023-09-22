/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Complete_orderComponent } from './complete_order.component';

describe('Complete_orderComponent', () => {
  let component: Complete_orderComponent;
  let fixture: ComponentFixture<Complete_orderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Complete_orderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Complete_orderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
