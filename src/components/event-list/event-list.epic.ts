// angular
import { Injectable } from '@angular/core'

// redux
import { Action, ActionCreator } from 'redux'
import { select } from '@angular-redux/store'
import { createEpicMiddleware } from 'redux-observable'

// rxjs
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/observable/fromPromise'

// app
import { ReduxAction } from 'src/store/types';
import { EventListActions } from './event-list.actions';
import { EventModel } from '../../models/event.model';
import { EventListService } from './event-list.service';

@Injectable()
export class EventListEpic {
  constructor(private eventListService: EventListService) {}
  createEpics() {
    return [createEpicMiddleware(this.getAll)]
  }
  getAll = (action$: any, store: any): Observable<Action> => {
    return action$.ofType(EventListActions.GET_ALL)
      .concatMap((result: ReduxAction<EventModel>) => {
        const { payload } = result
        return this.eventListService.getAll()
            .map((response) => {
                return EventListActions.getAllSuccess(response)
            })
      })
  }
}
