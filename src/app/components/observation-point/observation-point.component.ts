import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireLiteDatabase } from 'angularfire-lite';

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
  constructor(public db: AngularFireLiteDatabase) { }

  ngOnInit() {
    this.db.read('observation-points/' + this.observationPointKey).subscribe((data) => {
      this.name = data[1]; //returns the data in a weird array format instead of proper json, hopefully to be fixed later
      this.temperatures = data[2][0];
    });
  }

  sendTemperature(temperatureInput: number, timeInput: string, dateInput: string) {
    if (this.validateTemperature(temperatureInput) && this.validateDateTime(dateInput, timeInput)) {
      const data = {temperature: temperatureInput, date: dateInput, time: timeInput};
      this.db.push('observation-points/' + this.observationPointKey + '/readings', data);
    }
  }

  validateTemperature(temperature: number) {
    return true;
  }

  validateDateTime(date: string, time: string) {
    return true;
  }
}
