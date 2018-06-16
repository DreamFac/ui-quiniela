import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { delay, tap, startWith } from "rxjs/operators";
import { config } from "src/config";
import configFile from "src/config.file";
import { Event, EventModel, Team, Tie, TeamModel } from "../../models/event.model";
import { first } from 'lodash';
import { HttpWrapper } from "../../services/http-wrapper.service";
import { ResultType, EventPredictionDto, PredictionDto, Prediction } from "src/types";
import { PredictionService } from "../../services/prediction.service";
import { EventPredictionModel } from "../../models/event-prediction.model";

const {
  protocol,
  urlConfig: {
    auth: { baseUrl, version, loginEndpoint },
    events: { resultTypes, getAllEndpoint }
  }
} = config(configFile);

@Injectable()
export class EventListService {
  resultTypes: ResultType[] = [{id:1}]
  constructor(
    private http: HttpWrapper<Array<any>>,
    private predictionService: PredictionService
  ) { }
  getAll(): Observable<Array<EventModel>> {
    let events: Array<EventModel> = []
    const eventListUrl = `${protocol}://${baseUrl}/${version}/${getAllEndpoint}`;
    return this.http.get(eventListUrl)
      .map((response: Array<any>) => {
        events = response.map((event: Event) => {
          return new EventModel({
            id: event.id,
            date: event.date,
            place: event.place,
            event_type: event.event_type,
            team_event: event.team_event,
            tie: {
              isPicked: false
            }
          })
        })
        return events
      })
  }

  markTieAsSelected(response: Prediction[], eventPrediction: EventPredictionModel) {
    eventPrediction.predictions = response ? response : []
    eventPrediction.event.tie.isPicked = !eventPrediction.event.tie.isPicked
    eventPrediction.event.teamA.isPicked = false
    eventPrediction.event.teamB.isPicked = false
    return eventPrediction
  }

  markAsSelected(response: Prediction[], eventPrediction: EventPredictionModel, team: TeamModel) {
    eventPrediction.predictions = response ? response : []
    if (eventPrediction.event.teamA.id === team.id) {
      eventPrediction.event.tie.isPicked = false;
      eventPrediction.event.teamB.isPicked = false;
      eventPrediction.event.teamA.isPicked = !eventPrediction.event.teamA.isPicked;
    } else if (eventPrediction.event.teamB.id === team.id) {
      eventPrediction.event.tie.isPicked = false;
      eventPrediction.event.teamA.isPicked = false;
      eventPrediction.event.teamB.isPicked = !eventPrediction.event.teamB.isPicked;
    }
    return eventPrediction
  }

  selectTie(eventPrediction: EventPredictionModel, action: string): Observable<EventPredictionModel> {
    if (action === 'create') {
      return this.predictionService.createTie(eventPrediction)
        .map((response) => {
          return this.markTieAsSelected(response, eventPrediction)
        })
    } else if (action === 'update') {
      return this.predictionService.updateTie(eventPrediction)
        .map((response) => {
          return this.markTieAsSelected(response, eventPrediction)
        })
    } else if (action === 'delete') {
      return this.predictionService.deleteTie(eventPrediction)
        .map((response) => {
          return this.markTieAsSelected(response, eventPrediction)
        })
    }
  }

  selectTeam(eventPrediction: EventPredictionModel, team: TeamModel, action: string): Observable<EventPredictionModel> {
    if (action === 'create') {
      return this.predictionService.createPrediction(eventPrediction, team)
        .map((response) => {
          return this.markAsSelected(response, eventPrediction, team)
        })
    } else if (action === 'update') {
      const { event: { teamA, teamB } } = eventPrediction
        const notSelectedTeam = team.id !== teamA.id ? teamA : teamB
        const predictionDto: EventPredictionDto[] = [
            {
                id: eventPrediction.predictions[1].id,
                team_event: team.teamEventId,
                team: team.id,
                result_type: first(this.resultTypes).id,
                prediction: "1",
                delta: eventPrediction.event.deltaInHours
            },
            {
                id: eventPrediction.predictions[0].id,
                team_event: notSelectedTeam.teamEventId,
                team: notSelectedTeam.id,
                result_type: first(this.resultTypes).id,
                prediction: "0",
                delta: eventPrediction.event.deltaInHours
            }
        ]
      return this.predictionService.updatePrediction(predictionDto)
        .map((response) => {
          return this.markAsSelected(response, eventPrediction, team)
        })
    } else if (action === 'delete') {
      return this.predictionService.deletePrediction(eventPrediction, team)
        .map((response) => {
          return this.markAsSelected(response, eventPrediction, team)
        })
    }
  }
}
