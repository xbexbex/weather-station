import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MockComponent } from 'mock-component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireLite } from 'angularfire-lite';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import {
  MatButtonModule,
  MatInputModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { ObservationPointComponent } from './components/observation-point/observation-point.component';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(ObservationPointComponent)
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireLite.forRoot(environment.firebase), //to be replaced with a mock provider
        FormsModule,
        MatButtonModule,
        MatInputModule
      ],
    }).compileComponents();
  }));
});
