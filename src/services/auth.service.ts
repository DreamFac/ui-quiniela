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
import { select } from "@angular-redux/store";
import { UserInfo } from "../types";
import { Router } from "@angular/router";

const {
  protocol,
  urlConfig: {
    auth: { baseUrl, version, loginEndpoint },
    events: { getAllEndpoint },
    teams: { getAll }
  }
} = config(configFile);

@Injectable()
export class AuthService {
  user: UserInfo = {
    leaderboardInfo: {
      points: 0,
      ranking: 0
    }
  };
  @select(["login", "jwtInfo"])
  jwtInfo: Observable<JwtInfo>;
  constructor(private http: HttpClient, private router: Router) {}
  login(loginModel: LogInModel): Observable<JwtInfo> {
    const loginUrl = `${protocol}://${baseUrl}/${version}/${loginEndpoint}`;
    return this.http
      .post(loginUrl, loginModel)
      .catch(err => {
        return Observable.of(err);
      })
      .map((response: any) => {
        // add your own jwt decode implementation
        // and/or error mapping/handling here
        return response;
      });
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
        } else if ( response.status === 401 ) {
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
    this.user = userInfo;
    return userInfo;
  }

  setLeaderboardInfo(info: { points: number; ranking: number }) {
    this.user.leaderboardInfo = info;
  }
}
