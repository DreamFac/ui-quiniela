import {
    Component,
    OnInit,
    ChangeDetectorRef,
    AfterContentInit
} from "@angular/core";

import { config } from "../../config";
import configFile from "../../config.file";

import { HttpWrapper } from "../../services/http-wrapper.service";

import { first, concat, keys, orderBy, isEmpty } from "lodash";
import { Observable, forkJoin, merge } from "rxjs";
import { startWith, delay, tap } from "rxjs/operators";
import { Team } from "../../models/event.model";
import { IMap } from "../../types";

import { DragulaService } from 'ng2-dragula';
import { isNgTemplate } from "@angular/compiler";

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

const mergedPredictions: IMap<GlobalPrediction> = {}

let dragInterval = null

@Component({
    selector: "app-global-prediction",
    templateUrl: "./global-prediction.component.html",
    styleUrls: ["./global-prediction.component.scss"]
})
export class GlobalPredictionComponent implements AfterContentInit {
    hasError: boolean = false
    teamsList: Team[] = []
    pickedList: GlobalPrediction[] = []
    gloablPredictionList: GlobalPrediction[] = []
    constructor(
        private http: HttpWrapper<any>,
        private dragulaService: DragulaService
    ) {
        dragulaService.setOptions('bag-one', {
            removeOnSpill: true
        });
        dragulaService.drop.subscribe(value => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.drag.subscribe(value => {
            // auto scroll
            this.onDragModel(value.slice(1));
        });
        // detach the mouse move event when the drag ends
        dragulaService.dragend.subscribe(value => {
            document.onmousemove = null;
        });
    }

    onDropModel(args) {
        let [el, target, source] = args;
        console.log('drop');
        console.log('list ::::: ', this.gloablPredictionList)
        clearInterval(dragInterval)
    }

    onDragModel(args) {
        let [el, target, source] = args;
        console.log('drag')
        // prevent scrolling
    }

    ngAfterContentInit() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0),
                tap(() => {

                    const teams$ = this.http.get(teamsUrl);
                    const globalPrediction$ = this.http.get(globalPredictionsUrl);
                    return forkJoin([teams$, globalPrediction$])
                        .map(result => {
                            this.teamsList = result.shift()
                            this.pickedList = result.pop()
                                .map((item) => item.team)
                        }).subscribe()
                })
            ).subscribe()
    }

    save() {

        const predictionDto = this.pickedList.map((team, index) => {
            return {
                team: team.id,
                place: index + 1
            };
        }).filter(prediction => prediction.place <= 4)

        this.http.get(globalPredictionsUrl)
            .subscribe(globalResult => {
                if (!globalResult.length) {
                    this.http.post(globalPredictionsUrl, predictionDto)
                        .catch(err => {
                            return Observable.of(err)
                        })
                        .subscribe((response) => {
                            console.log(response)
                        })
                } else {
                    this.http.delete(`${globalPredictionsUrl}`)
                        .catch(err => {
                            return Observable.of(err)
                        })
                        .subscribe(result => {
                            this.http.post(globalPredictionsUrl, predictionDto)
                                .catch(err => {
                                    return Observable.of(err)
                                })
                                .subscribe((response) => {
                                    console.log(response)
                                })
                        })
                }
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
