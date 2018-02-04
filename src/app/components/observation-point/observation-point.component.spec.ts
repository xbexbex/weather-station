import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireLite } from 'angularfire-lite';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../environments/environment';
import {
  MatButtonModule,
  MatInputModule
} from '@angular/material';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';

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
        MatDialogModule,
        AngularFireLite.forRoot(fakeConfig), //to be replaced with a mock provider
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef, useValue: {}},
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
});

const fakeConfig = {
  apiKey: 'fake',
  authDomain: 'fake.firebaseapp.com',
  databaseURL: 'https://fake.firebaseio.com',
  projectId: 'fake',
  storageBucket: 'fake.appspot.com',
  messagingSenderId: '1059518516058'
};
