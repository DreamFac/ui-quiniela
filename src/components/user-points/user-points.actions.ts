import { Injectable } from '@angular/core'
import { ReduxAction } from 'src/store/types';
import { dispatch } from '@angular-redux/store';

@Injectable()
export class UserPointsActions {
    static readonly GET = 'USER_POINTS/GET'
    static readonly GET_SUCCESS = 'USER_POINTS/GET_SUCCESS'
    static readonly GET_FAIL = 'USER_POINTS/GET_FAIL'
    static readonly GET_DONE = 'USER_POINTS/GET_DONE'

    @dispatch()
    static get(): ReduxAction<any> {
        return {
            type: UserPointsActions.GET,
            payload: {}
        }
    }
    static getSuccess(points: number): ReduxAction<number> {
        return {
            type: UserPointsActions.GET_SUCCESS,
            payload: points
        }
    }
    static getFail(error: any): ReduxAction<any> {
        return {
            type: UserPointsActions.GET_FAIL,
            payload: error
        }
    }
    static getDone(): ReduxAction<any> {
        return {
            type: UserPointsActions.GET_DONE,
            payload: null
        }
    }
}
