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
  title = "¡Hola! Haz click en el ganador (o al centro si crees que sera empate). Tienes hasta la hora indicada.";
  constructor(private store: NgRedux<any>) { }

  @Input() eventPredictions: EventPredictionModel[] = []

  ngAfterContentInit() {
  }

  pick(eventPredictionModel: EventPredictionModel, team: Team) {
    EventListActions.selectTeam(eventPredictionModel, team)
  }
  pickTie(eventPrediction: EventPredictionModel) {
    EventListActions.selectTie(eventPrediction);
  }

  parseTimeLeft(endDate) {
    setTimeout(() => {
      const startDate = moment();
      const start_date = moment(startDate, 'YYYY-MM-DD HH:mm');
      const end_date = moment(endDate, 'YYYY-MM-DD HH:mm');
      const duration = moment.duration(end_date.diff(start_date));
      const days = duration.asDays();

      // Convert days 
      const daysInt = Math.floor(days)
      const daysDecimals = days - daysInt
      const hours = daysDecimals * 24
      const hoursInt = Math.floor(hours)
      const hoursDecimals = hours - hoursInt
      const minsInt = hoursDecimals * 60

      return days;
    })
  }
}
