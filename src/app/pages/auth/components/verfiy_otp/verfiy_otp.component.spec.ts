/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Verfiy_otpComponent } from './verfiy_otp.component';

describe('Verfiy_otpComponent', () => {
  let component: Verfiy_otpComponent;
  let fixture: ComponentFixture<Verfiy_otpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Verfiy_otpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Verfiy_otpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
