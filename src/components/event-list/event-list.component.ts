import { Component, OnInit } from "@angular/core";
import { EventListActions } from "./event-list.actions";
import { select, NgRedux } from "@angular-redux/store";
import { Event, Team, Tie, EventModel } from "../../models/event.model";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-event-list",
  templateUrl: "event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit {
  title = "Haz click en el ganador (o al centro si crees que sera empate). Tienes hasta la hora indicada.";
  constructor(private store: NgRedux<any>) {}

  @select(["events", "eventList"])
  events: Observable<Array<Event>>;

  ngOnInit() {
    EventListActions.getAll();
  }

  pick(team: Team) {
    EventListActions.selectTeam(team);
  }
  pickTie(event: EventModel) {
    EventListActions.selectTie(event);
  }
}
