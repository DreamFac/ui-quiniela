import { Injectable } from '@angular/core'
import { ReduxAction } from 'src/store/types';
import { dispatch } from '@angular-redux/store';
import { EventType, TeamEvent, ResultType, PredictionEnum, EventPredictionModel } from '../../types';
import { Tie, TeamModel } from '../../models/event.model';

@Injectable()
export class DashboardActions {
  static readonly MERGE_EVENTS_PREDICTIONS = 'DASHBOARD/MERGE_EVENTS_PREDICTIONS'
  static readonly MERGE_EVENTS_PREDICTIONS_OK = 'DASHBOARD/MERGE_EVENTS_PREDICTIONS_OK'

  @dispatch()
  static mergeEventsPredictions (): ReduxAction<any> {
    return {
      type: DashboardActions.MERGE_EVENTS_PREDICTIONS,
      payload: []
    }
  }
  static mergeEventsPredictionsOk (eventsPrediction: Array<EventPredictionModel>): ReduxAction<Array<EventPredictionModel>> {
    return {
      type: DashboardActions.MERGE_EVENTS_PREDICTIONS_OK,
      payload: eventsPrediction
    }
  }
}