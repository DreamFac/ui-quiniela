import { Reducer, AnyAction } from 'redux'
import { EventListActions } from './event-list.actions';

export interface EventState {
    events: Array<any>
}
export const EVENTS_INITIAL_STATE = {
    events: []
}
export const eventListReducer: Reducer<EventState> = (
    state: EventState = { ...EVENTS_INITIAL_STATE },
    action: AnyAction
): EventState => {
    switch ( action.type ) {
        case EventListActions.GET_ALL:
            return { ...state, events: action.payload }
        default:
            return state
    }
}
