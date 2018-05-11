import { loginReducer } from './reducers/login.reducer'
import { Reducer, AnyAction } from 'redux';
import { PersistedState } from 'redux-persist/es/types';
import { eventListReducer } from '../components/event-list/event-list.reducer';

export const rootReducer: any = {
  login: loginReducer,
  events: eventListReducer
}
