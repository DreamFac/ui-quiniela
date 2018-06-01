// angular
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'

// redux
import { Action, ActionCreator } from 'redux'
import { select } from '@angular-redux/store'
import { createEpicMiddleware } from 'redux-observable'

// rxjs
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/observable/fromPromise'
import { startWith, delay, tap } from 'rxjs/operators';

// app
import { LoginActions } from '../actions/login.actions'
import { ReduxAction, JwtInfo } from 'src/store/types';
import { LogInModel } from 'src/models/login.model';
import { AuthService } from 'src/services/auth.service';
import { DashboardActions } from '../../components/dashboard/dashboard.actions';

@Injectable()
export class LoginEpics {
  constructor(private authService: AuthService, private router: Router) { }
  createEpics() {
    return [
      createEpicMiddleware(this.login),
      createEpicMiddleware(this.loginSuccess)
    ]
  }
  login = (action$: any, store: any): Observable<Action> => {
    return action$.ofType(LoginActions.LOGIN)
      .concatMap((result: ReduxAction<LogInModel>) => {
        const { payload } = result
        return this.authService.login(payload)
          .map((response: any) => {
            if (response.error) {
              return LoginActions.failed(response.error)
            }
            return LoginActions.success(response)
          })
      })
  }

  loginSuccess = (action$: any, store: any): Observable<Action> => {
    return action$.ofType(LoginActions.LOGIN_SUCCESS)
      .concatMap((result: ReduxAction<JwtInfo>) => {
        const { payload } = result
        return Observable.fromPromise(
          this.router.navigateByUrl('/dashboard'))
          .map(result => LoginActions.done(payload))
      })
  }
}
