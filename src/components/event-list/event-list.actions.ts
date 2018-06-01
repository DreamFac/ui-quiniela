import { Injectable } from '@angular/core'
import { LogInModel } from 'src/models/login.model';
import { ReduxAction } from 'src/store/types';
import { EventModel, Event, Team, Tie, TeamModel } from 'src/models/event.model';
import { dispatch } from '@angular-redux/store';
import { EventPredictionModel } from '../../models/event-prediction.model';

@Injectable()
export class EventListActions {
  static readonly GET_ALL = 'EVENTS/GET_ALL'
  static readonly GET_ALL_SUCCESS = 'EVENTS/GET_ALL_SUCCESS'
  static readonly SELECT_TEAM = 'EVENTS/SELECT_TEAM'
  static readonly SELECT_TIE = 'EVENTS/SELECT_TIE'
  static readonly SELECT_TEAM_OK = 'EVENTS/SELECT_TEAM_OK'

  @dispatch()
  static getAll (): ReduxAction<any> {
    return {
      type: EventListActions.GET_ALL,
      payload: []
    }
  }
  static getAllSuccess (events: Array<EventModel>): ReduxAction<Array<EventModel>> {
    return {
      type: EventListActions.GET_ALL_SUCCESS,
      payload: events
    }
  }
  @dispatch()
  static selectTie (eventPrediction: EventPredictionModel): ReduxAction<EventPredictionModel> {
      return {
          type: EventListActions.SELECT_TIE,
          payload: eventPrediction
      }
  }
  @dispatch()
  static selectTeam (eventPrediction: EventPredictionModel, team: Team): ReduxAction<{eventPrediction: EventPredictionModel, team: Team}> {
      return {
          type: EventListActions.SELECT_TEAM,
          payload: {
              eventPrediction,
              team
          }
      }
  }
  static selectTeamSuccess (event: EventPredictionModel): ReduxAction<EventPredictionModel> {
    return {
        type: EventListActions.SELECT_TEAM_OK,
        payload: event
    }
}
}
