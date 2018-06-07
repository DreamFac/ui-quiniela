import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { HttpWrapper } from "../../services/http-wrapper.service";
import { startWith } from "rxjs/operators";
import { EventListService } from "../event-list/event-list.service";
import { PredictionService } from "../../services/prediction.service";
import { EventModel } from "../../models/event.model";
import { Prediction, EventPrediction, IMap } from "../../types";
import { intersectionBy, keys } from "lodash";
import { EventPredictionModel } from "../../models/event-prediction.model";

@Injectable()
export class DashboardService {
    constructor(
        private http: HttpWrapper<any>,
        private eventService: EventListService,
        private predictionService: PredictionService
    ) { }

    mergeEventsPredictions(): Observable<Array<EventPredictionModel> | any> {
        const events$ = this.eventService.getAll();
        const predictions$ = this.predictionService.getAll();
        return forkJoin([events$, predictions$])
            .map(result => {
                let predictionsMap = {
                    predictions: []
                }
                let eventPredictionList: EventPredictionModel[] = [];
                let eventPredictionMap: IMap<EventPredictionModel> = {};
                const eventList: EventModel[] = result.shift() as EventModel[];
                const predictionList: Prediction[] = result.pop() as Prediction[];
                eventList.forEach(event => {
                    if (!eventPredictionMap[event.id]) {
                        eventPredictionMap[event.id] = new EventPredictionModel(event);
                    }
                });
                predictionList.forEach(prediction => {
                    if (!predictionsMap[prediction.team_event.event]) {
                        predictionsMap[prediction.team_event.event] = {
                            predictions: [].concat(prediction)
                        }
                    } else {
                        predictionsMap[prediction.team_event.event]
                            .predictions.push(prediction)
                    }
                    eventPredictionMap[prediction.team_event.event] =
                        new EventPredictionModel(
                            eventPredictionMap[prediction.team_event.event].event,
                            predictionsMap[prediction.team_event.event].predictions
                        )
                });
                keys(eventPredictionMap).forEach(key => {
                    eventPredictionList.push(eventPredictionMap[key]);
                });
                return eventPredictionList;
            });
    }
}
