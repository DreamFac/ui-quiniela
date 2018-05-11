import { Injectable } from '@angular/core'
import { LogInModel } from 'src/models/login.model';
import { ReduxAction } from 'src/store/types';
import { EventModel, Event } from 'src/models/event.model';
import { dispatch } from '@angular-redux/store';

@Injectable()
export class EventListActions {
  static readonly GET_ALL = 'EVENTS/GET_ALL'
  static readonly GET_ALL_SUCCESS = 'EVENTS/GET_ALL_SUCCESS'

  @dispatch()
  static getAll (): ReduxAction<any> {
    return {
      type: EventListActions.GET_ALL,
      payload: []
    }
  }
  static getAllSuccess (events: Array<Event>): ReduxAction<Array<EventModel>> {
    return {
      type: EventListActions.GET_ALL_SUCCESS,
      payload: events
    }
  }
}
