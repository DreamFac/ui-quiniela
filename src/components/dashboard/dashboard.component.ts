import { Component, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { DashboardActions } from './dashboard.actions';
import { EventPredictionModel } from '../../types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterContentInit {
  eventPredictions: Array<EventPredictionModel> = []
  constructor() { }

  ngAfterContentInit() {
    Observable.of()
      .pipe(
        startWith(null),
        delay(100),
        tap(() => DashboardActions.mergeEventsPredictions())
      ).subscribe()
  }
}
