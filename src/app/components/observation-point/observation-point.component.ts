import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireLiteDatabase } from 'angularfire-lite';
import { environment } from '../../../environments/environment';

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
  constructor(public db: AngularFireLiteDatabase, private http: HttpClient) { }

  ngOnInit() {
    this.db.read('observation-points/' + this.observationPointKey).subscribe((data) => {
      console.log(data);
      this.name = data[3]; //returns the data in a weird array format instead of proper json, hopefully to be fixed later
      this.temperatures = data[4][0];
      const url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + data[0] + '&timestamp='
        + this.roundedTime() + '&key=' + environment.dateApiKey;
      this.http.get(url).subscribe((timedata: any) => {
        this.runClock(Date.now(), timedata.dstOffset + timedata.rawOffset);
      });
    });
  }

  runClock(date: number, offset: number) {
    this.dateUTC =  date + offset * 1000;
    this.dateString = this.parseDateFromSeconds(this.dateUTC);
    this.timeString = this.parseTimeFromSeconds(this.dateUTC);
    setInterval(() => {
      this.dateUTC += 1;
      this.time = this.parseTimeFromSeconds(this.dateUTC);
    }, 1000);
  }

  roundedTime() {
    return Math.round((Date.now() / 1000));
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
    console.log(date);
    return date;
  }

  sendTemperature(temperatureInput: number, timeInput: string, dateInput: string) {
    if (this.validateTemperature(temperatureInput) && this.validateDateTime(dateInput, timeInput)) {
      console.log('abua');
      const data = { temperature: temperatureInput, date: dateInput, time: timeInput };
      this.db.push('observation-points/' + this.observationPointKey + '/readings', data);
    }
  }

  validateTemperature(temperature: number) {
    if (temperature === null) {
      return false;
    }
    if (temperature > 300 || temperature < -273.15) {
      return false;
    }
    return true;
  }

  validateDateTime(date: string, time: string) {
    const dateRegExp = /^(?!(?![02468][048]|[13579][26]00)..(?!(?!00)[02468][048]|[13579][26])...02.29)\d{4}([-])(?=0.|1[012])(?!(0[13578]|1[02]).31|02.3)\d\d\1[012]|3[01]$/;
    const timeRegExp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
    if (timeRegExp.test(time) && dateRegExp.test(date)) {
      console.log('meme');
      if (time.length === 5) {
        time += ':00';
      }
      const dateUTC = Date.parse(date + 'T' + time + '+0000') / 1000;
      if (dateUTC <= this.dateUTC) {
        return true;
      }
    }
    this.errorMessage = 'Invalid time';
    return false;
  }
}
