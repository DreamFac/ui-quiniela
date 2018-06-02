import { Reducer, AnyAction } from 'redux'
import { Team, EventModel } from 'src/models/event.model';
import { UserPointsActions } from './user-points.actions';

export interface UserPointsState {
    points: number,
    error: any
}
export const USER_POINTS_INITIAL_STATE = {
    points: 0,
    error: null
}
export const userPointsReducer: Reducer<UserPointsState> = (
    state: UserPointsState = { ...USER_POINTS_INITIAL_STATE },
    action: AnyAction
): UserPointsState => {
    switch (action.type) {
        case UserPointsActions.GET:
            return { ...state, ...USER_POINTS_INITIAL_STATE }
        case UserPointsActions.GET_SUCCESS:
            return { ...state, points: action.payload }
        case UserPointsActions.GET_FAIL:
            return { ...state, error: action.payload }
        case UserPointsActions.GET_DONE:
            return { ...state }
        default:
            return state
    }
}
