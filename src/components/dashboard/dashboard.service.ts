import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpWrapper } from '../../services/http-wrapper.service';
import { startWith } from 'rxjs/operators';
import { EventListService } from '../event-list/event-list.service';
import { PredictionService } from '../../services/prediction.service';
import { EventModel } from '../../models/event.model';
import { Prediction, EventPredictionModel } from '../../types';
import { intersectionBy, keys } from 'lodash';

@Injectable()
export class DashboardService {
    constructor(
        private http: HttpWrapper<any>,
        private eventService: EventListService,
        private predictionService: PredictionService
    ) { }

    mergeEventsPredictions(): Observable<Array<EventPredictionModel>> {
        const events$ = this.eventService.getAll()
        const predictions$ = this.predictionService.getAll()
        return forkJoin([events$, predictions$])
            .map((result) => {
                let eventPredictionList: EventPredictionModel[] = []
                let eventPredictionMap: IMap<EventPredictionModel> = {}
                const eventList: EventModel[] = result.shift() as EventModel[]
                const predictionList: Prediction[] = result.pop() as Prediction[]
                eventList.forEach((event, eventIndex) => {
                    predictionList.forEach((prediction, predictionIndex) => {
                        if (event.id === prediction.team_event.id) {
                            eventPredictionMap[event.id] = {
                                event: event,
                                prediction: prediction
                            }
                        } else if (!eventPredictionMap[event.id]) {
                            eventPredictionMap[event.id] = {
                                event: event
                            }
                        }
                    })
                });
                keys(eventPredictionMap).forEach((key) => {
                    eventPredictionList.push(eventPredictionMap[key])
                })
                return eventPredictionList
            })
    }
}

interface IMap<T> {
    [key: string]: T;
}