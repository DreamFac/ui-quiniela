import { Component, AfterContentChecked, AfterContentInit, Output, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { DashboardActions } from './dashboard.actions';
import { EventPrediction } from '../../types';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  @select(['dashboard', 'eventPredictionList'])
  @Output() eventPredictions: Array<EventPrediction>
  constructor() {
    Observable.of()
    .pipe(
        startWith(null),
        delay(0),
        tap(() => DashboardActions.mergeEventsPredictions())
    ).subscribe()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngAfterViewInit() {
    // Not implented
  }
}
