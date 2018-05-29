import { Reducer, AnyAction } from 'redux'
import { EventListActions } from './event-list.actions';
import { Team, EventModel } from 'src/models/event.model';

export interface EventState {
    team?: Team
    event?: EventModel
    eventList: Array<any>
}
export const EVENTS_INITIAL_STATE = {
    eventList: []
}
export const eventListReducer: Reducer<EventState> = (
    state: EventState = { ...EVENTS_INITIAL_STATE },
    action: AnyAction
): EventState => {
    switch ( action.type ) {
        case EventListActions.GET_ALL:
            return { ...state, eventList: action.payload }
        case EventListActions.GET_ALL_SUCCESS:
            return { ...state, eventList: action.payload }
        case EventListActions.SELECT_TEAM:
            return { ...state, team: action.payload }
        case EventListActions.SELECT_TEAM_OK:
            return { ...state, event: action.payload }
        default:
            return state
    }
}
