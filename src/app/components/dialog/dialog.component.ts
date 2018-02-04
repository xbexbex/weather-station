import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireLiteDatabase } from 'angularfire-lite';
import { FormControl, ValidationErrors } from '@angular/forms';
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
export class DialogComponent implements OnInit {

  errorMessage: string;
  temperatureRegExp: RegExp;
  timeRegExp: RegExp;
  dateRegExp: RegExp;

  temperatureControl: FormControl;
  timeControl: FormControl;
  dateControl: FormControl;
  temperatureError: string;
  timeError: string;
  dateError: string;

  sendButtonDisabled: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public db: AngularFireLiteDatabase,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.temperatureControl = new FormControl();
    this.timeControl = new FormControl();
    this.dateControl = new FormControl();
    this.sendButtonDisabled = true;

    this.dateRegExp = /^(?!(?![02468][048]|[13579][26]00)..(?!(?!00)[02468][048]|[13579][26])...02.29)\d{4}([-])(?=0.|1[012])(?!(0[13578]|1[02]).31|02.3)\d\d\1[012]|3[01]$/;
    this.timeRegExp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
    this.temperatureRegExp = /^(([-]?(([1-2][0-9][0-9])|([0-9][0-9]))([.]([0-9]*)))|[300]([.][0]+)?)$/;

    this.temperatureControlSubscribe();
    this.timeControlSubscribe();
    this.dateControlSubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  temperatureControlSubscribe(): void {
    this.temperatureControl.valueChanges.subscribe((data) => {
      this.temperatureError = this.validateTemperature(data);
      if (this.temperatureError) {
        this.temperatureControl.setErrors({});
      } else {
        this.temperatureControl.setErrors(null);
      }
    });
  }

  timeControlSubscribe(): void {
    this.timeControl.valueChanges.subscribe((data) => {
      this.timeError = this.validateTime(data);
      if (this.timeError) {
        this.timeControl.setErrors({});
        this.sendButtonDisabled = true;
      } else {
        this.timeControl.setErrors(null);
      }
    });
  }

  dateControlSubscribe(): void {
    this.dateControl.valueChanges.subscribe((data) => {
      this.dateError = this.validateDate(data);
      if (this.temperatureError) {
        this.temperatureControl.setErrors({});
      } else {
        this.temperatureControl.setErrors(null);
      }
    });
  }

  dateTimeToSeconds(date: string, time: string): number {
    if (time.length === 5) {
      time += ':00';
    }
    return Date.parse(date + 'T' + time + '+0000');
  }

  sendTemperature(temperatureInput: string, timeInput: string, dateInput: string): void { // validates and submits the user's reading to database
  if (this.validateTemperature(temperatureInput) === null
      && this.validateDate(dateInput) === null
      && this.validateTime(timeInput) === null
      && this.validateDateTime(dateInput, timeInput)) {
      const data = { temperature: temperatureInput, time: timeInput, utc: this.dateTimeToSeconds(dateInput, timeInput) };
      this.db.push('readings/' + this.data.key, data);
    }
  }

  validateTemperature(temperature: string): string {
    if (temperature == null) {
      return 'Required';
    }
    const number = Number.parseFloat(temperature);
    if (isNaN(number)) {
      return 'Invalid format. Example: "-5.5667"';
    }
    if (number > 300) {
      return 'Cannot be higher than 300';
    }
    if (number < -273.15) {
      return 'Cannot be lower than the absolute zero';
    }
    return null;
  }

  validateDate(date: string): string {
    if (this.dateRegExp.test(date)) {
      return null;
    }
    return 'Invalid format. Example: "12-Jun-2017"';
  }

  validateTime(time: string): string {
    if (this.timeRegExp.test(time)) {
      return null;
    }
    return 'Invalid format. Example: "12:05:02"';
  }

  validateDateTime(date: string, time: string): boolean { // ensures that the datetime is in correct format and also not in the future
    const dateUTC = this.dateTimeToSeconds(date, time);
    const currentDateUTC = Date.now() + this.data.offset;
    if (dateUTC <= currentDateUTC) {
      return true;
    }
    this.errorMessage = 'Invalid time';
    return false;
  }
}
