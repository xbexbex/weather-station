import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireLiteDatabase } from 'angularfire-lite';
import { FormControl, ValidationErrors } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

// this is the dialog component for adding new readings for observation points

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  sendButtonDisabled: boolean;

  temperatureRegExp: RegExp;
  timeRegExp: RegExp;
  dateRegExp: RegExp;

  temperatureControl: FormControl;
  timeControl: FormControl;
  dateControl: FormControl;
  temperatureError: string;
  timeError: string;
  dateError: string;
  temperature: number;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public db: AngularFireLiteDatabase,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.temperatureControl = new FormControl();
    this.timeControl = new FormControl();
    this.dateControl = new FormControl();
    this.sendButtonDisabled = true;
    this.temperature = null;

    this.dateRegExp = /^(?!(?![02468][048]|[13579][26]00)..(?!(?!00)[02468][048]|[13579][26])...02.29)\d{4}([-])(?=0.|1[012])(?!(0[13578]|1[02]).31|02.3)\d\d\1[012]|3[01]$/;
    this.timeRegExp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
    this.temperatureRegExp = /^(([-]?(([1-2][0-9][0-9])|([0-9][0-9]))([.]([0-9]*)))|[300]([.][0]+)?)$/;

    this.temperatureControlSubscribe();
    this.timeControlSubscribe();
    this.dateControlSubscribe();
  }

  onNoClick(): void { // clicking outside the dialog will trigger this
    this.dialogRef.close();
  }

  temperatureControlSubscribe(): void { // for validating the temperature input in real time
    this.temperatureControl.valueChanges.subscribe((data) => {
      this.temperatureError = this.validateTemperature(data);
      if (this.temperatureError) {
        this.temperatureControl.setErrors({});
      } else {
        this.temperatureControl.setErrors(null);
      }
      this.checkErrors();
    });
  }

  timeControlSubscribe(): void { // for validating the time input in real time
    this.timeControl.valueChanges.subscribe((data) => {
      this.timeError = this.validateTime(data);
      if (this.timeError) {
        this.timeControl.setErrors({});
        this.sendButtonDisabled = true;
      } else {
        this.timeControl.setErrors(null);
      }
      this.checkErrors();
    });
  }

  dateControlSubscribe(): void { // for validating the date input in real time
    this.dateControl.valueChanges.subscribe((data) => {
      this.dateError = this.validateDate(data);
      if (this.temperatureError) {
        this.temperatureControl.setErrors({});
      } else {
        this.temperatureControl.setErrors(null);
      }
      this.checkErrors();
    });
  }

  checkErrors(): void {
    if (this.dateControl.errors === null
      && this.temperatureControl.errors === null
      && this.timeControl.errors === null) {
      this.sendButtonDisabled = false;
    } else {
      this.sendButtonDisabled = true;
    }
  }

  dateTimeToSeconds(date: string, time: string): number {
    if (time.length === 5) {
      time += ':00';
    }
    return Date.parse(date + 'T' + time + '+0000');
  }

  sendTemperature(temperatureInput: string, timeInput: string, dateInput: string): void { // validates and submits the user's reading to database
    this.successMessage = null;
    this.errorMessage = null;
    if (this.validateTemperature(temperatureInput) === null
      && this.validateDate(dateInput) === null
      && this.validateTime(timeInput) === null) {
      if (this.validateDateTime(dateInput, timeInput)) {
        const data = { temperature: temperatureInput, time: timeInput, utc: this.dateTimeToSeconds(dateInput, timeInput) };
        this.db.push('readings/' + this.data.key, data);
        this.successMessage = 'Reading sent!';
        this.temperature = undefined;
      } else {
        this.errorMessage = 'Time traveling currently not supported';
      }
    } else {
      this.errorMessage = 'Invalid inputs';
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
