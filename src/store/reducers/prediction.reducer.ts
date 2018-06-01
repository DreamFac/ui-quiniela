import { Reducer, AnyAction } from 'redux'
import { Team, EventModel } from 'src/models/event.model';
import { Prediction } from '../../types';
import { PredictionActions } from '../actions/prediction.actions';

export interface PredictionState {
    prediction: Prediction,
    predictionList: Array<any>
}
export const PREDICTION_INITIAL_STATE = {
    prediction: null,
    predictionList: []
}
export const predictionReducer: Reducer<PredictionState> = (
    state: PredictionState = { ...PREDICTION_INITIAL_STATE },
    action: AnyAction
): PredictionState => {
    switch ( action.type ) {
        case PredictionActions.GET_ALL:
            return { ...state, predictionList: action.payload }
        case PredictionActions.GET_ALL_SUCCESS:
            return { ...state, predictionList: action.payload }
        case PredictionActions.CREATE:
            return { ...state, prediction: action.payload }
        case PredictionActions.CREATE_OK:
            return { ...state, prediction: action.payload }
        default:
            return state
    }
}
