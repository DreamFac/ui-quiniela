import { Injectable } from '@angular/core'
import { ReduxAction } from 'src/store/types';
import { dispatch } from '@angular-redux/store';
import { EventType, TeamEvent, ResultType, PredictionEnum, EventPrediction } from '../../types';
import { Tie, TeamModel } from '../../models/event.model';

@Injectable()
export class DashboardActions {
  static readonly MERGE_EVENTS_PREDICTIONS = 'DASHBOARD/MERGE_EVENTS_PREDICTIONS'
  static readonly MERGE_EVENTS_PREDICTIONS_SUCCESS = 'DASHBOARD/MERGE_EVENTS_PREDICTIONS_SUCCESS'
  static readonly MERGE_EVENTS_PREDICTIONS_FAIL = 'DASHBOARD/MERGE_EVENTS_PREDICTIONS_FAIL'
  static readonly MERGE_EVENTS_PREDICTIONS_DONE = 'DASHBOARD/MERGE_EVENTS_PREDICTIONS_DONE'

  @dispatch()
  static mergeEventsPredictions (): ReduxAction<any> {
    return {
      type: DashboardActions.MERGE_EVENTS_PREDICTIONS,
      payload: []
    }
  }
  static mergeEventsPredictionsSuccess (eventsPrediction: Array<EventPrediction>): ReduxAction<Array<EventPrediction>> {
    return {
      type: DashboardActions.MERGE_EVENTS_PREDICTIONS_SUCCESS,
      payload: eventsPrediction
    }
  }
  static mergeEventsPredictionsFail (eventsPrediction: Array<EventPrediction>): ReduxAction<Array<EventPrediction>> {
    return {
      type: DashboardActions.MERGE_EVENTS_PREDICTIONS_FAIL,
      payload: eventsPrediction
    }
  }
  static mergeEventsPredictionsDone (eventsPrediction: Array<EventPrediction>): ReduxAction<Array<EventPrediction>> {
    return {
      type: DashboardActions.MERGE_EVENTS_PREDICTIONS_DONE,
      payload: eventsPrediction
    }
  }
}