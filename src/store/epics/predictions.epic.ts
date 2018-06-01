// angular
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

// redux
import { Action, ActionCreator } from "redux";
import { select } from "@angular-redux/store";
import { createEpicMiddleware } from "redux-observable";

// rxjs
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/concatMap";
import "rxjs/add/observable/fromPromise";

// app
import { ReduxAction } from "src/store/types";
import { PredictionActions } from "../actions/prediction.actions";
import { Prediction } from "../../types";
import { PredictionService } from "../../services/prediction.service";

@Injectable()
export class PredictionEpics {
    constructor(private predictionService: PredictionService) { }
    createEpics() {
        return [
            createEpicMiddleware(this.create),
            createEpicMiddleware(this.getAll)
        ];
    }
    create = (action$: any, store: any) => {
        return action$.ofType(PredictionActions.CREATE).map(() => {
            let prediction: Prediction;
            return PredictionActions.create(prediction);
        });
    };

    getAll = (action$: any, store: any) => {
        return action$
            .ofType(PredictionActions.GET_ALL)
            .concatMap((result: ReduxAction<Prediction>) => {
                return this.predictionService.getAll()
                    .map((result) => {
                        let prediction: Prediction;
                        return PredictionActions.getAllSuccess(result);
                    })
            });
    };
}
