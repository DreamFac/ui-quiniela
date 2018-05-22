import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
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
import { Event, EventModel, Team, Tie } from "../../models/event.model";
import { first } from 'lodash';

const {
  protocol,
  urlConfig: {
    auth: { baseUrl, version, loginEndpoint },
    events: { getAllEndpoint, selectTeamEndpoint }
  }
} = config(configFile);

@Injectable()
export class EventListService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Array<Event>> {
    const eventListUrl = `${protocol}://${baseUrl}/${version}/${loginEndpoint}`;
    return Observable.create((observer: Subscriber<{}>) => {
      const events: Array<Event> = [
        new EventModel({
          teamA: {
            id: "1",
            name: "Argentina",
            flagUrl: "ar"
          },
          teamB: {
            id: "2",
            name: "Italia",
            flagUrl: "it"
          },
          tie: {
            isPicked: false
          },
          date: new Date()
        }),
        new EventModel({
          teamA: {
            id: "3",
            name: "España",
            flagUrl: "sn"
          },
          teamB: {
            id: "4",
            name: "Alemania",
            flagUrl: "gr"
          },
          tie: {
            isPicked: false
          },
          date: new Date()
        }),
        new EventModel({
          teamA: {
            id: "5",
            name: "Uruguay",
            flagUrl: "ug"
          },
          teamB: {
            id: "6",
            name: "Chile",
            flagUrl: "ch"
          },
          tie: {
            isPicked: false
          },
          date: new Date()
        }),
        new EventModel({
          teamA: {
            id: "7",
            name: "Suecia",
            flagUrl: "sn"
          },
          teamB: {
            id: "8",
            name: "Japon",
            flagUrl: "jp"
          },
          tie: {
            isPicked: false
          },
          date: new Date()
        })
      ];
      observer.next(events);
      observer.complete();
    });
  }

  selectTie(eventList: Array<EventModel>, event: EventModel): EventModel {
    event.tie.isPicked = !event.tie.isPicked
    event.teamA.isPicked = false
    event.teamB.isPicked = false
    return first(eventList.filter(x => x.teamA.id === event.teamA.id))
  }

  selectTeam(eventList: Array<EventModel>, team: Team): Observable<EventModel> {
    let index: number;
    const selectTeamUrl = `${protocol}://${baseUrl}/${version}/${selectTeamEndpoint}`;
    return this.http.post(selectTeamUrl, {})
      .catch((error) => {
        return Observable.of(error)
      })
      .map((response) => {
        eventList.map((event: EventModel, i: number) => {
          if (event.teamA.id === team.id) {
            index = i;
            event.tie.isPicked = false;
            event.teamB.isPicked = false;
            event.teamA.isPicked = !event.teamA.isPicked;
          } else if (event.teamB.id === team.id) {
            index = i;
            event.tie.isPicked = false;
            event.teamA.isPicked = false;
            event.teamB.isPicked = !event.teamB.isPicked;
          }
          return event;
        });
        return eventList[index]
      })
  }
}
