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
  CSSclass = 'observation-point-div-narrow';
  temperatures: {};
  temperatureString: number;
  dateString: string;
  timeString: string;
  time: string;
  dateUTC: number;
  errorMessage: string;
  maxTemperature: Reading;
  minTemperature: Reading;
  lastTemperature: Reading;
  constructor(public db: AngularFireLiteDatabase, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.isWide) {
      this.CSSclass = 'observation-point-div-wide';
    }
    this.maxTemperature = { temperature: '--', time: '' };
    this.minTemperature = { temperature: '--', time: '' };
    this.lastTemperature = { temperature: '--', time: '' };
    const date = Date.now() + this.observationPoint.offset;
    this.runClock(date);
    this.fetchTemperatures(date);
  }

  fetchTemperatures(date: number) { // fetches the latest temperature data for the observation point
    date = date - 86400000; // 24 hours in milliseconds
    const minMaxQuery = this.db.query('readings/' + this.observationPoint.key).orderByChild('utc').startAt(date).on('value');
    const lastQuery = this.db.query('readings/' + this.observationPoint.key).orderByChild('utc').limitToLast(1).on('value');
    this.minMaxTemperatureSubscribe(minMaxQuery);
    this.lastTemperatureSubscribe(lastQuery);
  }

  minMaxTemperatureSubscribe(observable: Observable<any>) {
    observable.subscribe((data) => {
      if (data != null && data !== undefined && data.length > 0) {
        let temp = { temperature: data[0][0].temperature, time: data[0][0].time };
        let utc = Number.parseInt(data[0][0].utc);
        let last = 0;
        let min = temp;
        let max = temp;
        for (let i = 1; i < data.length; i++) {
          temp = { temperature: data[i][0].temperature, time: data[i][0].time };
          if (Number.parseFloat(min.temperature) > Number.parseFloat(temp.temperature)) {
            min = temp;
          }
          if (Number.parseFloat(max.temperature) < Number.parseFloat(temp.temperature)) {
            max = temp;
          }
          if (Number.parseInt(data[i][0].utc) > utc) {
            last = i;
            utc = Number.parseInt(data[i][0].utc);
          }
        }
        this.maxTemperature = max;
        this.minTemperature = min;
      }
    });
  }

  lastTemperatureSubscribe(observable: Observable<any>) {
    observable.subscribe((data) => {
      if (data != null && data !== undefined && data.length > 0) {
        this.lastTemperature = { temperature: data[0][0].temperature, time: data[0][0].time };
      }
    });
  }

  runClock(date: number) { // updates the clock for the observation point every second
    this.dateUTC = date;
    this.dateString = this.parseDateFromSeconds(this.dateUTC);
    this.timeString = this.parseTimeFromSeconds(this.dateUTC);
    setInterval(() => {
      this.dateUTC += 1000;
      this.time = this.parseTimeFromSeconds(this.dateUTC);
    }, 1000);
  }

  parseTimeFromSeconds(dateUTC) {
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

  parseDateFromSeconds(dateUTC): string {
    const date = new Date(dateUTC).toISOString().substring(0, 10);
    return date;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        nameString: this.observationPoint.name,
        dateString: this.dateString,
        timeString: this.timeString,
        key: this.observationPoint.key,
        offset: this.observationPoint.offset }
    });
  }
}
