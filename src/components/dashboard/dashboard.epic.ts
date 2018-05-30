// angular
import { Injectable } from "@angular/core";

// redux
import { Action, ActionCreator } from "redux";
import { select, NgRedux } from "@angular-redux/store";
import { createEpicMiddleware } from "redux-observable";

// rxjs
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/concatAll";
import "rxjs/add/observable/fromPromise";
import { flatMap } from 'rxjs/operators';

// app
import { ReduxAction } from "src/store/types";
import { EventModel, Team, Tie, Event } from "../../models/event.model";
import { AppState } from "../../store/model";
import { DashboardActions } from "./dashboard.actions";
import { DashboardService } from "./dashboard.service";
import { EventPredictionModel } from "../../types";

@Injectable()
export class DashboardEpics {
  constructor(
    private dashboardService: DashboardService,
    private store: NgRedux<AppState>
  ) {}
  createEpics() {
    return [
      createEpicMiddleware(this.mergeEventsAndPredictions)
    ];
  }
  mergeEventsAndPredictions = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(DashboardActions.MERGE_EVENTS_PREDICTIONS)
      .concatMap((result: ReduxAction<EventPredictionModel>) => {
        const { payload } = result;
        return this.dashboardService.mergeEventsPredictions().map(response => {
          return DashboardActions.mergeEventsPredictionsOk(response);
        });
      });
  };
}
