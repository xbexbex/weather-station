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
  constructor(public db: AngularFireLiteDatabase) { }

  ngOnInit() {
    // fetches a list of observation points from the database
    this.observationPoints = this.db.query('observation-points');
  }
}
