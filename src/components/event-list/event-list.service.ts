import { Injectable, Inject } from "@angular/core";
import { Headers } from "@angular/http";
import { delay, tap, startWith } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/observable/throw";
import { JwtInfo } from "src/store/types";
import { LogInModel } from "src/models/login.model";
import { config } from "src/config";
import configFile from "src/config.file";
import { HttpClient } from "@angular/common/http";
import { Subscriber } from "rxjs";
import { Event, EventModel, Team, Tie, TeamModel } from "../../models/event.model";
import { first } from 'lodash';
import { HttpWrapper } from "../../services/http-wrapper.service";
import { ResultType, EventPredictionDto } from "src/types";

const {
  protocol,
  urlConfig: {
    auth: { baseUrl, version, loginEndpoint },
    events: { resultTypes, getAllEndpoint, selectTeamEndpoint }
  }
} = config(configFile);

@Injectable()
export class EventListService {
  resultTypes: ResultType[] = []
  constructor(private http: HttpWrapper<Array<any>>) {
    Observable.of()
      .pipe(
        startWith(null),
        delay(100),
        tap(() => {
          const resultTypesUrl = `${protocol}://${baseUrl}/${version}/${resultTypes}`;
          this.http.get(resultTypesUrl)
            .subscribe((response: ResultType[]) => {
              this.resultTypes = response
            })
        })
      ).subscribe()
  }
  getAll(): Observable<Array<EventModel>> {
    let events: Array<EventModel> = []
    const eventListUrl = `${protocol}://${baseUrl}/${version}/${getAllEndpoint}`;
    return this.http.get(eventListUrl)
      .map((response: Array<any>) => {
        events = response.map(event => {
          return new EventModel({
            id: event.id,
            date: event.date,
            place: event.place,
            event_type: event.event_type,
            teamA: event.team_event.shift().team,
            teamB: event.team_event.pop().team,
            tie: {
              isPicked: false
            }
          })
        })
        return events
      })
  }

  selectTie(eventList: Array<EventModel>, event: EventModel): EventModel {
    event.tie.isPicked = !event.tie.isPicked
    event.teamA.isPicked = false
    event.teamB.isPicked = false
    return first(eventList.filter(x => x.teamA.id === event.teamA.id))
  }

  selectTeam(event: EventModel, team: TeamModel): Observable<EventModel> {
    const selectTeamUrl = `${protocol}://${baseUrl}/${version}/predictions/`;
    const notSelectedTeam = team.id !== event.teamA.id ? event.teamA : event.teamB
    const predictionDto: EventPredictionDto[] = [
      {
        team_event: event.id,
        team: {
          id: team.id,
          name: team.name,
          flag: team.flag
        },
        result_type: first(this.resultTypes),
        prediction: "1"
      },
      {
        team_event: event.id,
        team: {
          id: notSelectedTeam.id,
          name: notSelectedTeam.name,
          flag: notSelectedTeam.flag
        },
        result_type: first(this.resultTypes),
        prediction: "0"
      }
    ]
    return this.http.post(selectTeamUrl, predictionDto)
      .catch((error) => {
        return Observable.of(error)
      })
      .map((response) => {
        if (!response.error) {
          if (event.teamA.id === team.id) {
            event.tie.isPicked = false;
            event.teamB.isPicked = false;
            event.teamA.isPicked = !event.teamA.isPicked;
          } else if (event.teamB.id === team.id) {
            event.tie.isPicked = false;
            event.teamA.isPicked = false;
            event.teamB.isPicked = !event.teamB.isPicked;
          }
          return event;
        }
      })
  }
}
