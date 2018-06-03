// angular
import { Injectable } from "@angular/core";

// redux
import { Action, ActionCreator } from "redux";
import { select, NgRedux } from "@angular-redux/store";
import { createEpicMiddleware } from "redux-observable";

// rxjs
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/concatMap";

// app
import { ReduxAction } from "src/store/types";
import { AppState } from "../../store/model";
import { UserProfileService } from "./user-profile.service";
import { UserPointsActions } from "./user-points.actions";

@Injectable()
export class UserPointsEpics {
  constructor(
    private userProfileService: UserProfileService,
    private store: NgRedux<AppState>
  ) { }
  createEpics() {
    return [
      createEpicMiddleware(this.get),
      createEpicMiddleware(this.getFail)
    ];
  }
  get = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(UserPointsActions.GET)
      .concatMap((result: ReduxAction<number>) => {
        const { payload } = result;
        return this.userProfileService.getPoints().map(response => {
            const { points } = response
          return UserPointsActions.getSuccess(points);
        });
      });
  };
  getFail = (action$: any, store: any): Observable<Action> => {
    return action$
      .ofType(UserPointsActions.GET_FAIL)
      .concatMap((result: ReduxAction<any>) => {
        const { payload } = result;
        return UserPointsActions.getFail(payload);
      });
  };
}
