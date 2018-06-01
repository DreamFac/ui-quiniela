import { loginReducer } from './reducers/login.reducer'
import { Reducer, AnyAction } from 'redux';
import { PersistedState } from 'redux-persist/es/types';
import { eventListReducer } from '../components/event-list/event-list.reducer';
import { predictionReducer } from './reducers/prediction.reducer';
import { dashboardReducer } from '../components/dashboard/dashboard.reducer';

export const rootReducer: any = {
  login: loginReducer,
  dashboard: dashboardReducer,
  events: eventListReducer,
  predictions: predictionReducer
}
