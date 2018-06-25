import { Component, AfterContentInit, Input } from "@angular/core";
import { EventListActions } from "./event-list.actions";
import { NgRedux } from "@angular-redux/store";
import { Team } from "../../models/event.model";
import { Observable } from "rxjs/Observable";
import { EventPredictionModel } from "../../models/event-prediction.model";
import { first } from "lodash";

@Component({
  selector: "app-event-list",
  templateUrl: "event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements AfterContentInit {
  tabs: Array<Tab> = [{
    id: 1,
    title: 'Predicciones',
    iconUrl: '../../assets/next-events.png',
    isSelected: true
  }, {
    id: 2,
    title: 'Historial',
    iconUrl: '../../assets/history.png',
    isSelected: false
  }]
  selectedTab: Tab = first(this.tabs)
  title = "Haz click en el Ganador o VS si crees que será empate. El reloj indica el tiempo restante para predecir. Al iniciar el partido, se bloqueará.";
  constructor(private store: NgRedux<any>) { }

  eventPredictionList: EventPredictionModel[] = []
  @Input() eventPredictions: Observable<EventPredictionModel[]>

  ngAfterContentInit() {
    this.eventPredictions.subscribe(result => {
      this.eventPredictionList = result.filter(x => !x.event.completed)
    })
  }

  pick(eventPredictionModel: EventPredictionModel, team: Team) {
    EventListActions.selectTeam(eventPredictionModel, team)
  }
  pickTie(eventPrediction: EventPredictionModel) {
    EventListActions.selectTie(eventPrediction);
  }
  selectTab (tab: Tab) {
    this.tabs = this.tabs.map((item) => {
      item.isSelected = false
      if (tab.id === item.id) {
        item.isSelected = true
        this.selectedTab = item
      }
      return item
    })
    this.eventPredictions.subscribe(items => {
      if ( tab.id === 1 ) {
        this.eventPredictionList = items.filter(x => !x.event.completed)
      } else {
        this.eventPredictionList = items.filter(x => x.event.completed)
      }
    })
  }
}

export interface Tab {
  id: number
  title: string
  isSelected: boolean
  iconUrl: string
}
