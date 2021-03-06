import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AngularFireLiteDatabase } from 'angularfire-lite';
import { environment } from '../environments/environment';
import { ObservationPoint } from './constants/interfaces';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  observationPoints: {};
  wideObservationPoint; // if odd number of observations points, one of them is wider than the rest
  loading = true;
  constructor(public db: AngularFireLiteDatabase, private http: HttpClient) { }

  ngOnInit() {
    const temporaryPoints: ObservationPoint[] = [];
    this.db.query('observation-points').orderByChild('key').once('value').subscribe((data) => { // fetches a list of observation points from the database
      if (data != null && data.length !== 0) {
        const observables = this.fetchTimes(data);
        Observable.forkJoin(observables).subscribe((timedata) => { // waits for all the observables to return
          for (let i = 0; i < timedata.length; i++) {
            const offset = (timedata[i].dstOffset + timedata[i].rawOffset) * 1000;
            const temporaryPoint = {
              name: data[i][0].name,
              key: data[i][0].key,
              img: data[i][0].img,
              offset: offset
            };
            temporaryPoints.push(temporaryPoint);
          }
          this.sortPoints(temporaryPoints); // arranges the array by time offset value
          if (temporaryPoints.length % 2 === 1) {
            this.wideObservationPoint = temporaryPoints.splice(0, 1)[0];
          }
          this.observationPoints = temporaryPoints;
          this.loading = false;
        });
      }
    });
  }

  sortPoints(points: ObservationPoint[]): ObservationPoint[] {
    const offset = new Date().getTimezoneOffset() * 60000;
    points.sort(function (a, b) {
      const aValue = Math.abs(offset - (a.offset * -1));
      const bValue = Math.abs(offset - (b.offset * -1));
      if (aValue <= bValue) {
        return -1;
      }
      return 1;
    });
    return points;
  }

  fetchTimes(data: JSON[]): Observable<any>[] {
    const observables = [];
    for (let i = 0; i < data.length; i++) {
      observables.push(this.fetchTime(data[i][0].coordinates));
    }
    return observables;
  }

  fetchTime(location: string): Observable<any> {
    const url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + location + '&timestamp='
      + Math.round(Date.now() / 1000) + '&key=' + environment.dateApiKey;
    return this.http.get(url);
  }
}
