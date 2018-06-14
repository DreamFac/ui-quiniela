import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/observable/throw";
import { JwtInfo } from "src/store/types";
import { LogInModel } from "src/models/login.model";
import { config } from "src/config";
import configFile from "src/config.file";
import { HttpClient } from "@angular/common/http";
import { select, NgRedux } from "@angular-redux/store";
import { UserInfo } from "../types";
import { Router } from "@angular/router";
import { AppState } from "../store/model";
import { combineReducers } from "redux";
import { rootReducer } from "../store/reducers";
import { PURGE, REHYDRATE } from 'redux-persist'

const {
  protocol,
  urlConfig: {
    auth: { baseUrl, version, loginEndpoint },
    events: { getAllEndpoint },
    teams: { getAll }
  }
} = config(configFile);

const LEADERBOARD_INFO_INITIAL_STATE = {
  email: '',
  points: 0,
  ranking: 0
};

const USER_INFO_INITIAL_STATE = {
  exp: 0,
  jti: '',
  token_type: '',
  user_id: 0,
  leaderboardInfo: LEADERBOARD_INFO_INITIAL_STATE
}

@Injectable()
export class AuthService {
  public user: UserInfo = USER_INFO_INITIAL_STATE
  tempCreds: { username: string, password: string } = {
    username: '',
    password: ''
  }
  @select(["login", "jwtInfo"])
  jwtInfo: Observable<JwtInfo>;
  constructor(private http: HttpClient, private router: Router, private store: NgRedux<AppState>) { }
  login(loginModel: LogInModel): Observable<JwtInfo> {
    const loginUrl = `${protocol}://${baseUrl}/${version}/${loginEndpoint}`;
    return this.http
      .post(loginUrl, loginModel)
      .map((response: any) => {
        // add your own jwt decode implementation
        // and/or error mapping/handling here
        return response;
      });
  }

  logout() {
    //...
    localStorage.removeItem('persist:oracleapp-ui')
    //... sometime later
    this.store.dispatch({
      type: PURGE,
      payload: rootReducer,
      result: () => {
        document.location.reload()
      }
    })
    this.store.dispatch({
      type: REHYDRATE,
      payload: rootReducer,
      result: () => {

      }
    })
  }

  checkUserAuth(routeFallback: string) {
    // Check if user is logged in
    const teamsUrl = `${protocol}://${baseUrl}/${version}/${getAll}`;
    this.http
      .get(teamsUrl)
      .catch(err => {
        return Observable.of(err);
      })
      .subscribe(response => {
        if (response.length) {
          this.router.navigate(['/dashboard']);
        } else if (response.status === 401) {
          this.router.navigate([routeFallback])
        }
      });
  }

  getUserInfo(): UserInfo {
    let userInfo: UserInfo;
    const parseJwt = token => {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    };
    this.jwtInfo.subscribe(info => {
      userInfo = parseJwt(info.access);
    });
    return userInfo;
  }

  setTempCreds(dto) {
    this.tempCreds = dto
  }

  setLeaderboardInfo(info: { email: string, points: number; ranking: number } = { email: '', points: 0, ranking: 0 }) {
    this.user.leaderboardInfo = info;
  }
}
