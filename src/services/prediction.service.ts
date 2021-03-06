import { Injectable } from '@angular/core';
import { HttpWrapper } from './http-wrapper.service';
import { config } from '../config';
import configFile from '../config.file';
import { Observable } from 'rxjs/Observable';
import { delay, tap, startWith } from "rxjs/operators";
import { Prediction, EventPredictionDto, ResultType, PredictionDto } from '../types';
import { EventModel, TeamModel } from '../models/event.model';
import { first } from 'lodash';
import { EventPredictionModel } from '../models/event-prediction.model';

const {
    protocol,
    urlConfig: {
        auth: { baseUrl, version, loginEndpoint },
        events: { resultTypes, getAllEndpoint, },
        predictions: { createPrediction, getPredictions }
    }
} = config(configFile);

@Injectable()
export class PredictionService {
    resultTypes: ResultType[] = []
    constructor(private http: HttpWrapper<any>) {
    }

    getAll(): Observable<Array<Prediction>> {
        const getAllPredictionsUrl = `${protocol}://${baseUrl}/${version}/${getPredictions}`;
        return this.http.get(getAllPredictionsUrl)
            .map((result) => {
                return result
            })
    }
    createPrediction(eventPrediction: EventPredictionModel, team: TeamModel): Observable<Prediction[]> {
        const predictTeamUrl = `${protocol}://${baseUrl}/${version}/predictions/`;
        const { event: { teamA, teamB } } = eventPrediction
        const notSelectedTeam = team.id !== teamA.id ? teamA : teamB
        const predictionDto: EventPredictionDto[] = [
            {
                team_event: team.teamEventId,
                team: team.id,
                result_type: 1,
                prediction: "1",
                delta: eventPrediction.event.deltaInHours
            },
            {
                team_event: notSelectedTeam.teamEventId,
                team: notSelectedTeam.id,
                result_type: 1,
                prediction: "0",
                delta: eventPrediction.event.deltaInHours
            }
        ]
        return this.http.post(predictTeamUrl, predictionDto)
            .map((response) => {
                return response
            })
    }
    updatePrediction(predictionDto: EventPredictionDto[]): Observable<Prediction[]> {
        const predictTeamUrl = `${protocol}://${baseUrl}/${version}/predictions/`;
        return this.http.put(predictTeamUrl, predictionDto)
            .map((response) => {
                return response
            })
    }
    deletePrediction(eventPrediction: EventPredictionModel, team: TeamModel): Observable<any> {
        const prediction = first(
            eventPrediction.predictions.filter(x => x.team_event.team.id === team.id)
        )
        if ( !prediction ) {
            return Observable.throw({})
        }
        const predictTeamUrl = `${protocol}://${baseUrl}/${version}/predictions/${prediction.id}`;
        return this.http.delete(predictTeamUrl)
            .map((response) => {
                return response
            })
    }
    createTie(eventPrediction: EventPredictionModel): Observable<Prediction[]> {
        const predictTeamUrl = `${protocol}://${baseUrl}/${version}/predictions/`;
        const { event: { teamA, teamB } } = eventPrediction
        const predictionDto: EventPredictionDto[] = [
            {
                team_event: eventPrediction.event.teamA.teamEventId,
                team: eventPrediction.event.teamA.id,
                result_type: 1,
                prediction: "-1",
                delta: eventPrediction.event.deltaInHours
            },
            {
                team_event: eventPrediction.event.teamB.teamEventId,
                team: eventPrediction.event.teamB.id,
                result_type: 1,
                prediction: "-1",
                delta: eventPrediction.event.deltaInHours
            }
        ]
        return this.http.post(predictTeamUrl, predictionDto)
            .map((response) => {
                return response
            })
    }
    updateTie(eventPrediction: EventPredictionModel): Observable<Prediction[]> {
        const predictTeamUrl = `${protocol}://${baseUrl}/${version}/predictions/`;
        const { event: { teamA, teamB } } = eventPrediction
        const predictionDto: EventPredictionDto[] = [
            {
                id: eventPrediction.predictions[1].id,
                team_event: eventPrediction.event.teamA.teamEventId,
                team: eventPrediction.event.teamA.id,
                result_type: 1,
                prediction: "-1",
                delta: eventPrediction.event.deltaInHours
            },
            {
                id: eventPrediction.predictions[0].id,
                team_event: eventPrediction.event.teamB.teamEventId,
                team: eventPrediction.event.teamB.id,
                result_type: 1,
                prediction: "-1",
                delta: eventPrediction.event.deltaInHours
            }
        ]
        return this.http.put(predictTeamUrl, predictionDto)
            .map((response) => {
                return response
            })
    }
    deleteTie(eventPrediction: EventPredictionModel): Observable<any> {
        const id = eventPrediction.predictions[0].id
        const predictTeamUrl = `${protocol}://${baseUrl}/${version}/predictions/${id}`;
        return this.http.delete(predictTeamUrl)
            .map((response) => {
                return response
            })
    }
}