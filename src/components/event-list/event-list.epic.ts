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
import { startWith, delay, tap } from 'rxjs/operators';

// app
import { ReduxAction } from "src/store/types";
import { EventListActions } from "./event-list.actions";
import { EventModel, Team, Tie, Event, TeamModel } from "../../models/event.model";
import { EventListService } from "./event-list.service";
import { AppState } from "../../store/model";
import { EventPredictionModel } from "../../models/event-prediction.model";

@Injectable()
export class EventListEpic {
  constructor(
    private eventListService: EventListService,
    private store: NgRedux<AppState>
  ) { }
  createEpics() {
    return [
      createEpicMiddleware(this.getAll),
      createEpicMiddleware(this.selectTeam),
      createEpicMiddleware(this.selectTie),
      createEpicMiddleware(this.selectTeamFail)
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
      .concatMap((result: ReduxAction<EventPredictionModel>) => {
        const { payload: { event } } = result;
        const teamSelected = event.teamA.isPicked || event.teamB.isPicked

        if (event.tie.isPicked) {
          return this.eventListService.selectTie(result.payload, 'delete')
            .map(tieResult => {
              return EventListActions.selectTeamSuccess(tieResult)
            })
        } else if (!event.tie.isPicked && !teamSelected) {
          return this.eventListService.selectTie(result.payload, 'create')
            .map(tieResult => {
              return EventListActions.selectTeamSuccess(tieResult)
            })
        } else {
          return this.eventListService.selectTie(result.payload, 'update')
            .map(tieResult => {
              return EventListActions.selectTeamSuccess(tieResult)
            })
        }
      })
  };
  selectTeam = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(EventListActions.SELECT_TEAM)
      .concatMap((result: ReduxAction<{ eventPrediction: EventPredictionModel, team: TeamModel }>) => {
        const { payload: { eventPrediction, team } } = result;
        const { event: { teamA, teamB } } = eventPrediction
        const predictedTeam = teamA.isPicked ? teamA : teamB.isPicked ? teamB : null

        if ( eventPrediction.event.tie.isPicked ) {
          return this.eventListService.selectTeam(eventPrediction, team, 'update')
            .catch(this.errorHandler)
        } else if (!predictedTeam) {
          return this.eventListService.selectTeam(eventPrediction, team, 'create')
            .catch(this.errorHandler)
        } else if ( team.id === predictedTeam.id ) {
          return this.eventListService.selectTeam(eventPrediction, team, 'delete')
            .catch(this.errorHandler)
        } else if ( team.id !== predictedTeam.id ) {
          return this.eventListService.selectTeam(eventPrediction, team, 'update')
            .catch(this.errorHandler)
        }

      })
      .map((eventPrediction: EventPredictionModel) => {
        return EventListActions.selectTeamSuccess(eventPrediction)
      })
  };
  selectTeamFail = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(EventListActions.SELECT_TEAM_FAIL)
      .concatMap(() => {
        return Observable.of([])
      })
  }
  errorHandler(err) {
    return Observable.of()
      .pipe(
        startWith(null),
        tap(() => EventListActions.selectTeamFail(err)),
    )
  }
}
