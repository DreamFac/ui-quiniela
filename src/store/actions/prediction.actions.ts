import { Injectable } from '@angular/core'
import { ReduxAction } from 'src/store/types';
import { dispatch } from '@angular-redux/store';
import { Prediction } from '../../types';
import { Team } from '../../models/event.model';

@Injectable()
export class PredictionActions {
  static readonly GET_ALL = 'PREDICTION/GET_ALL'
  static readonly GET_ALL_SUCCESS = 'PREDICTION/GET_ALL_SUCCESS'
  static readonly CREATE = 'PREDICTION/CREATE'
  static readonly UPDATE = 'PREDICTION/UPDATE'
  static readonly CREATE_OK = 'PREDICTION/DELETE'

  @dispatch()
  static getAll (): ReduxAction<any> {
    return {
      type: PredictionActions.GET_ALL,
      payload: []
    }
  }
  static getAllSuccess (predictions: Array<Prediction>): ReduxAction<Array<Prediction>> {
    return {
      type: PredictionActions.GET_ALL_SUCCESS,
      payload: predictions
    }
  }
  @dispatch()
  static create (prediction: Prediction): ReduxAction<Prediction> {
      return {
          type: PredictionActions.CREATE,
          payload: prediction
      }
  }
  static createSuccess (prediction: Prediction): ReduxAction<Prediction> {
    return {
        type: PredictionActions.CREATE_OK,
        payload: prediction
    }
}
}
