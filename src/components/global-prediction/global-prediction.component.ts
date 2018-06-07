import {
    Component,
    OnInit,
    ChangeDetectorRef,
    AfterContentInit
} from "@angular/core";

import { config } from "../../config";
import configFile from "../../config.file";


import { DragulaService } from "ng2-dragula";
import { HttpWrapper } from "../../services/http-wrapper.service";

import { first, concat, keys, orderBy } from "lodash";
import { Observable, forkJoin, merge } from "rxjs";
import { startWith, delay, tap } from "rxjs/operators";
import { Team } from "../../models/event.model";
import { IMap } from "../../types";

const {
    protocol,
    urlConfig: {
        auth: { baseUrl, version },
        predictions: { globalPredictions },
        teams: { getAll }
    }
} = config(configFile);

const teamsUrl = `${protocol}://${baseUrl}/${version}/${getAll}`;
const globalPredictionsUrl = `${protocol}://${baseUrl}/${version}/${globalPredictions}`;

@Component({
    selector: "app-global-prediction",
    templateUrl: "./global-prediction.component.html",
    styleUrls: ["./global-prediction.component.scss"]
})
export class GlobalPredictionComponent implements AfterContentInit {
    hasError: boolean = false
    constructor(
        private dragulaService: DragulaService,
        private http: HttpWrapper<any>
    ) {
        dragulaService.dropModel.subscribe(value => {
            this.onDropModel(value.slice(1));
        });
    }

    gloablPredictionList: GlobalPrediction[] = []

    public teams: Array<DraggableModel<GlobalPrediction>> = [];
    public teamsCopy: Array<DraggableModel<GlobalPrediction>> = [];

    ngAfterContentInit() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0),
                tap(() => {
                    const teams$ = this.http.get(teamsUrl);
                    const globalPrediction$ = this.http.get(globalPredictionsUrl);
                    let teamsList: Team[] = []
                    let mergedPredictions: IMap<GlobalPrediction> = {}
                    return forkJoin([teams$, globalPrediction$])
                        .map(result => {
                            teamsList = result.shift()
                            result.pop().filter(prediction => {
                                return prediction.place <= 4
                            })
                                .forEach(prediction => {
                                    mergedPredictions[prediction.team.id] = prediction
                                })
                            keys(mergedPredictions)
                                .forEach(key => {
                                    this.gloablPredictionList.push(mergedPredictions[key])
                                })
                            teamsList.forEach(team => {
                                if (!mergedPredictions[team.id]) {
                                    this.gloablPredictionList.push({
                                        id: null,
                                        place: null,
                                        team: team
                                    })
                                }
                            })
                            this.gloablPredictionList = 
                                orderBy(this.gloablPredictionList, ['place'], ['asc']);
                        })
                        .subscribe()
                })
            )
            .subscribe();
    }

    onDropModel(args) {
        let [el, target, source] = args;
        console.log(this.gloablPredictionList);
    }

    save() {
        const predictionDto = this.gloablPredictionList.map((prediction, index) => {
            return {
                team: prediction.team.id,
                place: index + 1
            };
        }).filter(prediction => prediction.place <= 4)

        this.http.post(globalPredictionsUrl, predictionDto)
            .catch(err => {
                return Observable.of(err)
            })
            .subscribe((response) => {
                console.log(response)
            })
    }
}

export interface DraggableModel<T> {
    id?: number;
    type?: string;
    entity: T
}

export interface GlobalPrediction {
    id?: number
    place?: number
    team: Team
}
