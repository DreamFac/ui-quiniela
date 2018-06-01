import { Component, OnInit, AfterContentInit, Input } from "@angular/core";
import { EventListActions } from "./event-list.actions";
import { select, NgRedux } from "@angular-redux/store";
import { Event, Team, Tie, EventModel } from "../../models/event.model";
import { delay, tap, startWith } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { EventPredictionModel } from "../../models/event-prediction.model";
import { DashboardActions } from "../dashboard/dashboard.actions";

@Component({
  selector: "app-event-list",
  templateUrl: "event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements AfterContentInit {
  title = "Haz click en el ganador (o al centro si crees que sera empate). Tienes hasta la hora indicada.";
  constructor(private store: NgRedux<any>) { }

  @Input() eventPredictions: EventPredictionModel[] = []

  ngAfterContentInit() {
  }

  pick(eventPredictionModel: EventPredictionModel, team: Team) {
    console.log('PICK CLICK --------->', eventPredictionModel)
    EventListActions.selectTeam(eventPredictionModel, team)
  }
  pickTie(eventPrediction: EventPredictionModel) {
    EventListActions.selectTie(eventPrediction);
  }
}
