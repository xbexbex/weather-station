import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireLiteDatabase } from 'angularfire-lite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  observationPoints: {};
  loading = true;
  constructor(public db: AngularFireLiteDatabase) { }

  ngOnInit() {
    // fetches a list of observation points from the database
    this.db.query('observation-points').orderByChild('key').once('value').subscribe((data) => {
      if (data != null && data.length !== 0) {
        this.observationPoints = data;
        this.loading = false;
      }
    });
  }
}
