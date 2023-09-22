/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { My_pointsComponent } from './my_points.component';

describe('My_pointsComponent', () => {
  let component: My_pointsComponent;
  let fixture: ComponentFixture<My_pointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ My_pointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(My_pointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
