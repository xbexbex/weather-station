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
  temperatureInput: number;
  dateInput: string;
  timeInput: string;
  date: string;
  dateUTC: number;
  constructor(public db: AngularFireLiteDatabase, private http: HttpClient) { }

  ngOnInit() {
    this.db.read('observation-points/' + this.observationPointKey).subscribe((data) => {
      console.log(data);
      this.name = data[3]; //returns the data in a weird array format instead of proper json, hopefully to be fixed later
      this.temperatures = data[4][0];
      const url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + data[0] + '&timestamp='
        + this.roundedTime() + '&key=' + environment.dateApiKey;
      this.http.get(url).subscribe((timedata: any) => {
        console.log(url);
        console.log(timedata);
        this.runClock(Date.now() + timedata.dstOffset + timedata.rawOffset);
      });
    });
  }

  runClock(date: number) {
    this.dateUTC = date;
    setInterval(() => {
      this.dateUTC += 1;
      const second = Math.floor(this.dateUTC % 60);
      const minute = Math.floor((this.dateUTC / 60) % 60);
      const hour = Math.floor((this.dateUTC / ( 60 * 60)) % 24);
      this.date = hour + ':' + minute + ':' + second;
    }, 1000);
  }

  roundedTime() {
    return Math.round((Date.now() / 1000));
  }

  sendTemperature(temperatureInput: number, timeInput: string, dateInput: string) {
    if (this.validateTemperature(temperatureInput) && this.validateDateTime(dateInput, timeInput)) {
      const data = { temperature: temperatureInput, date: dateInput, time: timeInput };
      this.db.push('observation-points/' + this.observationPointKey + '/readings', data);
    }
  }

  validateTemperature(temperature: number) {
    if (temperature > 300 || temperature < -273.15) {
      return false;
    }
    return true;
  }

  validateDateTime(date: string, time: string) {
    return true;
  }
}
