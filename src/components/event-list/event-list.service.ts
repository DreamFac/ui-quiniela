import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { config } from "src/config";
import configFile from "src/config.file";
import { Event, EventModel, Team, Tie, TeamModel } from "../../models/event.model";
import { first } from 'lodash';
import { HttpWrapper } from "../../services/http-wrapper.service";
import { ResultType, EventPredictionDto, PredictionDto } from "src/types";
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

  mapPredicton (response) {
    return response.map((prediction: PredictionDto) => {
      return {
       id: prediction.id,
       prediction: prediction.prediction,
       read: prediction.read,
       result_type: prediction.result_type,
       team: prediction.team,
       team_event: {
         id: prediction.team_event,
         result_type: {
           id: prediction.result_type
         },
         event: prediction.team_event,
         team: {
           id: prediction.team
         },
         result: ''
       },
       user: prediction.user
      }
   })
  }

  markTieAsSelected(response: PredictionDto[], eventPrediction: EventPredictionModel) {
    if (response){
      eventPrediction.predictions = this.mapPredicton(response)
    }
      eventPrediction.event.tie.isPicked = !eventPrediction.event.tie.isPicked
      eventPrediction.event.teamA.isPicked = false
      eventPrediction.event.teamB.isPicked = false
      return eventPrediction
  }

  markAsSelected(response: PredictionDto[], eventPrediction: EventPredictionModel, team: TeamModel) {
    if (response){
      eventPrediction.predictions = this.mapPredicton(response)
    }
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
      return this.predictionService.updatePrediction(eventPrediction, team)
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
