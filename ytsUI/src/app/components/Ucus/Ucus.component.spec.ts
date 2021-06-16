/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UcusComponent } from './Ucus.component';

describe('UcusComponent', () => {
  let component: UcusComponent;
  let fixture: ComponentFixture<UcusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
