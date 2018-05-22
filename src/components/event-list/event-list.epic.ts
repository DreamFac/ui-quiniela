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
import { EventModel, Team, Tie } from "../../models/event.model";
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
      .map((result: ReduxAction<EventModel>) => {
        const { payload } = result;
        const { events: { eventList } } = store.getState()
        const event = this.eventListService.selectTie(eventList, payload)
        return EventListActions.selectTeamSuccess(event)
      })
  };
  selectTeam = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(EventListActions.SELECT_TEAM)
      .map((result: ReduxAction<Team>) => {
        const { payload } = result;
        const { events: { eventList } } = store.getState()
        return this.eventListService.selectTeam(eventList, payload)
      })
      .concatAll()
      .map((event: EventModel) => {
        return EventListActions.selectTeamSuccess(event)
      })
  };
}
