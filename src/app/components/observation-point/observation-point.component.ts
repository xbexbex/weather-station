import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireLiteDatabase } from 'angularfire-lite';
import { environment } from '../../../environments/environment';
import { Reading } from '../../constants/interfaces';

@Component({
  selector: 'app-observation-point',
  templateUrl: './observation-point.component.html',
  styleUrls: ['./observation-point.component.css']
})
export class ObservationPointComponent implements OnInit {

  @Input() observationPointKey: string;
  name: string;
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
  constructor(public db: AngularFireLiteDatabase, private http: HttpClient) { }

  ngOnInit() {
    this.maxTemperature = { temperature: '--', time: '' };
    this.minTemperature = { temperature: '--', time: '' };
    this.lastTemperature = { temperature: '--', time: '' };
    this.db.query('observation-points/' + this.observationPointKey).limitToFirst(4).on('value').subscribe((data) => {
      if (data != null && data.length > 3) {
        this.name = data[3][0]; //returns the data in a weird array format instead of proper json, hopefully to be fixed later
        const url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + data[0][0] + '&timestamp='
          + Math.round(Date.now() / 1000) + '&key=' + environment.dateApiKey;
        this.http.get(url).subscribe((timedata: any) => {
          const date = Date.now() + ((timedata.dstOffset + timedata.rawOffset) * 1000);
          this.runClock(date);
          this.fetchTemperatures(date);
        });
      }
    });
  }

  fetchTemperatures(date: number) {
    date = date - 86400000;
    this.db.query('observation-points/' + this.observationPointKey + '/readings').orderByChild('utc').startAt(date).on('value').subscribe((data) => {
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
        this.lastTemperature = { temperature: data[last][0].temperature, time: data[last][0].time };
        this.maxTemperature = max;
        this.minTemperature = min;
      }
    });
  }

  runClock(date: number) {
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

  dateTimeToSeconds(date: string, time: string): number {
    if (time.length === 5) {
      time += ':00';
    }
    return Date.parse(date + 'T' + time + '+0000');
  }

  sendTemperature(temperatureInput: string, timeInput: string, dateInput: string) {
    if (this.validateTemperature(temperatureInput) && this.validateDateTime(dateInput, timeInput)) {
      const data = { temperature: temperatureInput, time: timeInput, utc: this.dateTimeToSeconds(dateInput, timeInput) };
      this.db.push('observation-points/' + this.observationPointKey + '/readings', data);
    }
  }

  validateTemperature(temperature: string) {
    if (temperature == null) {
      return false;
    }
    const number = Number.parseFloat(temperature);
    if (isNaN(number) || number > 300 || number < -273.15) {
      return false;
    }
    return true;
  }

  validateDateTime(date: string, time: string) {
    const dateRegExp = /^(?!(?![02468][048]|[13579][26]00)..(?!(?!00)[02468][048]|[13579][26])...02.29)\d{4}([-])(?=0.|1[012])(?!(0[13578]|1[02]).31|02.3)\d\d\1[012]|3[01]$/;
    const timeRegExp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
    if (timeRegExp.test(time) && dateRegExp.test(date)) {
      const dateUTC = this.dateTimeToSeconds(date, time);
      if (dateUTC <= this.dateUTC) {
        return true;
      }
    }
    this.errorMessage = 'Invalid time';
    return false;
  }
}
