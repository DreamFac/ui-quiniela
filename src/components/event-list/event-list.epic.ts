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
import { EventListActions } from "./event-list.actions";
import { EventModel, Team, Tie, Event, TeamModel } from "../../models/event.model";
import { EventListService } from "./event-list.service";
import { AppState } from "../../store/model";

@Injectable()
export class EventListEpic {
  constructor(
    private eventListService: EventListService,
    private store: NgRedux<AppState>
  ) {}
  createEpics() {
    return [
      createEpicMiddleware(this.getAll),
      createEpicMiddleware(this.selectTeam),
      createEpicMiddleware(this.selectTie)
    ];
  }
  getAll = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(EventListActions.GET_ALL)
      .concatMap((result: ReduxAction<EventModel>) => {
        const { payload } = result;
        return this.eventListService.getAll().map(response => {
          return EventListActions.getAllSuccess(response);
        });
      });
  };
  selectTie = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(EventListActions.SELECT_TIE)
      .concatMap((result: ReduxAction<EventModel>) => {
        const { payload } = result;
        return this.eventListService.selectTie(payload)
          .map(result => {
            return EventListActions.selectTeamSuccess(result)
          })
      })
  };
  selectTeam = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(EventListActions.SELECT_TEAM)
      .concatMap((result: ReduxAction<{event: EventModel, team: TeamModel}>) => {
        const { payload: { event, team } } = result;
        return this.eventListService.selectTeam(event, team)
      })
      .map((event: EventModel) => {
        return EventListActions.selectTeamSuccess(event)
      })
  };
}
