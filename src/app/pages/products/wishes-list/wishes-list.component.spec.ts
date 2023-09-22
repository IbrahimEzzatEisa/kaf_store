/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WishesListComponent } from './wishes-list.component';

describe('WishesListComponent', () => {
  let component: WishesListComponent;
  let fixture: ComponentFixture<WishesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
