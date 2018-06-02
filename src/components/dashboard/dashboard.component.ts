import { Component, AfterContentChecked, AfterContentInit, Output, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { DashboardActions } from './dashboard.actions';
import { EventPrediction, Prediction } from '../../types';
import { select } from '@angular-redux/store';
import { EventPredictionModel } from '../../models/event-prediction.model';
import { first } from 'lodash';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterContentInit {
  @select(['userPoints', 'points'])
  points: Observable<number>
  @select(['dashboard', 'eventPredictionList'])
  @Output() eventPredictions: Observable<Array<EventPredictionModel>>
  eventResults: Array<EventModel> = []
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

  ngAfterContentInit() {
    // Not implented
    this.eventPredictions.subscribe((result) => {
      if ( result && result.length ) {
        this.eventResults = result.map(eventPrediction => {
          return first(
            eventPrediction.predictions.map(prediction => {
              if ( prediction.team_event.completed && !prediction.read ) {
                if (prediction.prediction === prediction.team_event.result) {
                  eventPrediction.event.wonPrediction = true
                }
                return eventPrediction.event
              }
            })
          )
        })
        .filter(eventPred => eventPred !== undefined)
      }
    })
  }
}
