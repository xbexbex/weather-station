import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireLite } from 'angularfire-lite';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../environments/environment';
import {
  MatButtonModule,
  MatInputModule
} from '@angular/material';

import { ObservationPointComponent } from './observation-point.component';

describe('ObservationPointComponent', () => {
  let component: ObservationPointComponent;
  let fixture: ComponentFixture<ObservationPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObservationPointComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        AngularFireLite.forRoot(fakeConfig), //to be replaced with a mock provider
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationPointComponent);
    component = fixture.componentInstance;
    component.dateUTC = 1516988966159;
    component.observationPoint = {
      name: 'Test',
      key: 'test',
      img: 'test',
      offset: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept valid date and valid time', () => {
    expect(component.validateDateTime('2017-12-12', '15:15')).toBeTruthy();
  });

  it('should reject valid date and invalid time', () => {
    expect(component.validateDateTime('2017-12-12', '15')).toBeFalsy();
  });

  it('should reject valid date and invalid time', () => {
    expect(component.validateDateTime('2017-12-12', '25:60')).toBeFalsy();
  });

  it('should reject valid date and invalid time', () => {
    expect(component.validateDateTime('2017-12-12', 'asdfg')).toBeFalsy();
  });

  it('should reject invalid date and valid time', () => {
    expect(component.validateDateTime('2000-13-32', '15:15')).toBeFalsy();
  });

  it('should reject invalid date and valid time', () => {
    expect(component.validateDateTime('asdfg', '15:15')).toBeFalsy();
  });

  it('should reject empty date and time', () => {
    expect(component.validateDateTime('', '')).toBeFalsy();
  });

  it('should reject empty date and valid time', () => {
    expect(component.validateDateTime('', '15:00')).toBeFalsy();
  });

  it('should reject valid date and empty time', () => {
    expect(component.validateDateTime('2017-12-12', '')).toBeFalsy();
  });

  it('should reject date and time in the future', () => {
    expect(component.validateDateTime('3025-01-26', '17:50')).toBeFalsy();
  });
});

const fakeConfig = {
  apiKey: 'fake',
  authDomain: 'fake.firebaseapp.com',
  databaseURL: 'https://fake.firebaseio.com',
  projectId: 'fake',
  storageBucket: 'fake.appspot.com',
  messagingSenderId: '1059518516058'
};
