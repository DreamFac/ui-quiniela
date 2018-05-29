import { Component, OnInit, AfterContentInit } from "@angular/core";
import { EventListActions } from "./event-list.actions";
import { select, NgRedux } from "@angular-redux/store";
import { Event, Team, Tie, EventModel } from "../../models/event.model";
import { delay, tap, startWith } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-event-list",
  templateUrl: "event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements AfterContentInit {
  title = "Haz click en el ganador (o al centro si crees que sera empate). Tienes hasta la hora indicada.";
  constructor(private store: NgRedux<any>) {}

  @select(["events", "eventList"])
  events: Observable<Array<Event>>;

  ngAfterContentInit() {
    Observable.of()
      .pipe(
        startWith(null),
        delay(0),
        tap(() => EventListActions.getAll())
      ).subscribe()
  }

  pick(event: Event, team: Team) {
    EventListActions.selectTeam(event, team);
  }
  pickTie(event: EventModel) {
    EventListActions.selectTie(event);
  }
}
