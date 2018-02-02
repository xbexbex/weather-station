import { Component, Inject } from '@angular/core';
import { AngularFireLiteDatabase } from 'angularfire-lite';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public db: AngularFireLiteDatabase,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  dateTimeToSeconds(date: string, time: string): number {
    if (time.length === 5) {
      time += ':00';
    }
    return Date.parse(date + 'T' + time + '+0000');
  }

  sendTemperature(temperatureInput: string, timeInput: string, dateInput: string) { // validates and submits the user's reading to database
    if (this.validateTemperature(temperatureInput) && this.validateDateTime(dateInput, timeInput)) {
      const data = { temperature: temperatureInput, time: timeInput, utc: this.dateTimeToSeconds(dateInput, timeInput) };
      this.db.push('readings/' + this.data.key, data);
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

  validateDateTime(date: string, time: string) { // ensures that the datetime is in correct format and also not in the future
    const dateRegExp = /^(?!(?![02468][048]|[13579][26]00)..(?!(?!00)[02468][048]|[13579][26])...02.29)\d{4}([-])(?=0.|1[012])(?!(0[13578]|1[02]).31|02.3)\d\d\1[012]|3[01]$/;
    const timeRegExp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
    if (timeRegExp.test(time) && dateRegExp.test(date)) {
      const dateUTC = this.dateTimeToSeconds(date, time);
      const currentDateUTC = Date.now() + this.data.offset;
      if (dateUTC <= currentDateUTC) {
        return true;
      }
    }
    this.errorMessage = 'Invalid time';
    return false;
  }
}
