import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DialogComponent } from '../dialog/dialog.component';
import { AngularFireLiteDatabase } from 'angularfire-lite';
import { Reading, ObservationPoint } from '../../constants/interfaces';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-observation-point',
  templateUrl: './observation-point.component.html',
  styleUrls: ['./observation-point.component.css']
})
export class ObservationPointComponent implements OnInit {

  @Input() observationPoint: ObservationPoint;
  @Input() isWide = false;
  CSSclass: string;
  temperatures: {};
  temperatureString: number;
  dateString: string;
  timeString: string;
  timeWithoutSeconds: string;
  dateUTC: number;
  refreshTimer: number;
  errorMessage: string;
  maxTemperature: Reading;
  minTemperature: Reading;
  lastTemperature: Reading;
  minMaxTemperatures: string[];
  constructor(public db: AngularFireLiteDatabase, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.isWide) {
      this.CSSclass = 'observation-point-div-wide';
    } else {
      this.CSSclass = 'observation-point-div-narrow';
    }
    const date = Date.now() + this.observationPoint.offset;
    this.observationPoint.img = 'url("../../../assets/img/' + this.observationPoint.img + '")';
    this.runClock(date);
    this.fetchTemperatures(date);
  }

  fetchTemperatures(date: number): void { // fetches the latest temperature data for the observation point
    date = date - 86400000; // 24 hours in milliseconds
    const minMaxQuery = this.db.query('readings/' + this.observationPoint.key).orderByChild('utc').startAt(date).on('value');
    const lastQuery = this.db.query('readings/' + this.observationPoint.key).orderByChild('utc').limitToLast(1).on('value');
    this.minMaxTemperatureSubscribe(minMaxQuery);
    this.lastTemperatureSubscribe(lastQuery);
  }

  minMaxTemperatureSubscribe(observable: Observable<any>): void { // updates the observation point's min and max temperature
    observable.subscribe((data) => {
      this.minMaxTemperatures = data;
      this.setMinAndMaxTemperature(this.minMaxTemperatures);
    });
  }

  setMinAndMaxTemperature(data): void {
    let temp = { temperature: '-', time: null };
    let min = temp;
    let max = temp;
    let db = -1;
    if (data != null && data !== undefined && data.length > 0) {
      for (let i = 0; i < data.length; i++) { // loops through the array and finds the min and max temperatures
        if (Date.now() + this.observationPoint.offset - 86400000 < data[i][0].utc) {
          if (temp.time === null) {
            temp = { temperature: data[i][0].temperature, time: data[i][0].time };
            min = temp;
            max = temp;
          } else {
            temp = { temperature: data[i][0].temperature, time: data[i][0].time };
            if (Number.parseFloat(min.temperature) > Number.parseFloat(temp.temperature)) {
              min = temp;
              db = i;
            }
            if (Number.parseFloat(max.temperature) < Number.parseFloat(temp.temperature)) {
              max = temp;
            }
          }
        }
      }
      console.log(this.observationPoint.name);
      console.log(min.temperature);
      console.log(Date.now() + this.observationPoint.offset - 86400000);
      if (db > -1) {
        console.log(data[db][0].utc);
        console.log(Date.now() + this.observationPoint.offset - 86400000 < data[db][0].utc);
      }
      if (temp.time !== null) {
        max.temperature = this.truncateTemperature(max.temperature);
        min.temperature = this.truncateTemperature(min.temperature);
      }
    }
    this.maxTemperature = max;
    this.minTemperature = min;
  }

  lastTemperatureSubscribe(observable: Observable<any>): void { // updates the observation point's latest temperature
    observable.subscribe((data) => {
      if (data != null && data !== undefined && data.length > 0) {
        const temperature = this.truncateTemperature(data[0][0].temperature);
        if (this.dateUTC - 86400000 > data[0][0].utc) { // the big number is one day in milliseconds
          this.lastTemperature = { temperature, time: this.parseDateFromSeconds(data[0][0].utc) };
        } else {
          this.lastTemperature = { temperature, time: data[0][0].time };
        }
      } else {
        this.lastTemperature = { temperature: '-', time: '' };
      }
    });
  }

  runClock(date: number): void { // updates the clock for the observation point every second
    this.dateUTC = date;
    this.refreshTimer = 0;
    this.dateString = this.parseDateFromSeconds(this.dateUTC);
    this.timeString = this.parseTimeFromSeconds(this.dateUTC);
    this.timeWithoutSeconds = this.timeString.substr(0, 5);
    setInterval(() => {
      this.dateUTC += 1000;
      this.refreshTimer ++;
      this.dateString = this.parseDateFromSeconds(this.dateUTC);
      this.timeString = this.parseTimeFromSeconds(this.dateUTC);
      this.timeWithoutSeconds = this.timeString.substr(0, 5);
      if (this.refreshTimer === 60) { // refreshes the min and max temperatures every minute
        this.setMinAndMaxTemperature(this.minMaxTemperatures);
        this.refreshTimer = 0;
      }
    }, 1000);
  }

  parseTimeFromSeconds(dateUTC): string {
    const second = Math.floor((dateUTC / 1000) % 60);
    const minute = Math.floor((dateUTC / (1000 * 60)) % 60);
    const hour = Math.floor((dateUTC / (1000 * 60 * 60)) % 24);
    let timeString = '';
    if (hour < 10) {
      timeString += '0' + hour + ':';
    } else {
      timeString += hour + ':';
    }
    if (minute < 10) {
      timeString += '0' + minute + ':';
    } else {
      timeString += minute + ':';
    }
    if (second < 10) {
      timeString += '0' + second;
    } else {
      timeString += second;
    }
    return timeString;
  }

  truncateTemperature(temperature: string): string {
    if (temperature.indexOf('.') > -1) {
      temperature = temperature.substr(0, temperature.indexOf('.') + 3);
    }
    return temperature;
  }

  parseDateFromSeconds(dateUTC): string {
    const date = new Date(dateUTC).toISOString().substring(0, 10);
    return date;
  }

  openDialog(): void { // opens the form for adding input readings
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {
        nameString: this.observationPoint.name,
        dateString: this.dateString,
        timeString: this.timeString,
        key: this.observationPoint.key,
        offset: this.observationPoint.offset
      }
    });
  }
}
