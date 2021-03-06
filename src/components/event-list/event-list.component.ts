import { Component, OnInit, AfterContentInit, Input } from "@angular/core";
import { EventListActions } from "./event-list.actions";
import { select, NgRedux } from "@angular-redux/store";
import { Event, Team, Tie, EventModel } from "../../models/event.model";
import { delay, tap, startWith } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { EventPredictionModel } from "../../models/event-prediction.model";
import { DashboardActions } from "../dashboard/dashboard.actions";
import * as moment from 'moment'

@Component({
  selector: "app-event-list",
  templateUrl: "event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements AfterContentInit {
  title = "Haz click en el Ganador o VS si crees que será empate. El reloj indica el tiempo restante para predecir. Al iniciar el partido, se bloqueará.";
  constructor(private store: NgRedux<any>) { }

  eventPredictionList: EventPredictionModel[] = []
  @Input() eventPredictions: Observable<EventPredictionModel[]>

  ngAfterContentInit() {
    this.eventPredictions
      .subscribe((result) => {
        // make sure timeLeft has been calculated.
        this.eventPredictionList = result
      })
  }

  pick(eventPredictionModel: EventPredictionModel, team: Team) {
    EventListActions.selectTeam(eventPredictionModel, team)
  }
  pickTie(eventPrediction: EventPredictionModel) {
    EventListActions.selectTie(eventPrediction);
  }
}
