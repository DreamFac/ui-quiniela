import { Reducer, AnyAction } from 'redux'
import { Team, EventModel } from 'src/models/event.model';
import { DashboardActions } from './dashboard.actions';
import { EventPrediction } from '../../types';

export interface DashboardState {
    eventPredictionList: EventPrediction[]
}
export const DASHBOARD_INITIAL_STATE = {
    eventPredictionList: []
}
export const dashboardReducer: Reducer<DashboardState> = (
    state: DashboardState = { ...DASHBOARD_INITIAL_STATE },
    action: AnyAction
): DashboardState => {
    switch (action.type) {
        case DashboardActions.MERGE_EVENTS_PREDICTIONS:
            return { ...state, ...DASHBOARD_INITIAL_STATE }
        case DashboardActions.MERGE_EVENTS_PREDICTIONS_SUCCESS:
            return { ...state, eventPredictionList: action.payload }
        case DashboardActions.MERGE_EVENTS_PREDICTIONS_FAIL:
            return { ...state, eventPredictionList: action.payload }
        case DashboardActions.MERGE_EVENTS_PREDICTIONS_DONE:
            return { ...state, eventPredictionList: action.payload }
        default:
            return state
    }
}
