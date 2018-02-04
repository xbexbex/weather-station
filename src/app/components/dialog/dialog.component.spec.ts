import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireLite } from 'angularfire-lite';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../environments/environment';
import { FormControl, ValidationErrors } from '@angular/forms';
import { OverlayContainer, ScrollStrategy } from '@angular/cdk/overlay';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import {
  MatButtonModule,
  MatInputModule,
} from '@angular/material';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        AngularFireLite.forRoot(fakeConfig), //to be replaced with a mock provider
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef, useValue: {}},
      ],
      schemas: [NO_ERRORS_SCHEMA],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    component.successMessage = null;
    component.errorMessage = null;
    component.data.offset = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept a valid reading', () => {
    component.sendTemperature('-5.7', '15:15', '2010-12-12');
    expect(component.successMessage !== null).toBeTruthy();
  });

  it('should reject a valid datetime with a too low temperature', () => {
    component.sendTemperature('-273.16', '15:15', '2010-12-12');
    expect(component.successMessage === null).toBeTruthy();
  });

  it('should reject a future datetime with a valid temperature', () => {
    component.sendTemperature('-100', '15:15', '4015-12-12');
    expect(component.successMessage === null).toBeTruthy();
  });

  it('should reject a too high temperature with a valid datetime', () => {
    component.sendTemperature('302', '15:15', '2010-12-12');
    expect(component.successMessage === null).toBeTruthy();
  });

  it('should reject an invalid temperature with a valid datetime', () => {
    component.sendTemperature('asdf', '15:15', '2010-12-12');
    expect(component.successMessage === null).toBeTruthy();
  });

  it('should reject a valid temperature and date with an invalid time', () => {
    component.sendTemperature('10', 'asdf', '2010-12-12');
    expect(component.successMessage === null).toBeTruthy();
  });

  it('should reject a valid temperature and date with an invalid time', () => {
    component.sendTemperature('10', '12:61', '2010-12-12');
    expect(component.successMessage === null).toBeTruthy();
  });

  it('should accept a valid temperature and date with a valid time with seconds', () => {
    component.sendTemperature('10', '12:59:48', '2010-12-12');
    expect(component.successMessage !== null).toBeTruthy();
  });

  it('should reject a valid temperature and time with an invalid date', () => {
    component.sendTemperature('10', '15:15', 'asdf');
    expect(component.successMessage === null).toBeTruthy();
  });

  it('should reject a valid temperature and time with an invalid date', () => {
    component.sendTemperature('10', '15:15', '2010-13-12');
    expect(component.successMessage === null).toBeTruthy();
  });
});

const fakeConfig = {
  apiKey: 'fake',
  authDomain: 'fake.firebaseapp.com',
  databaseURL: 'https://fake.firebaseio.com',
  projectId: 'fake',
  storageBucket: 'fake.appspot.com',
  messagingSenderId: '0000000'
};
