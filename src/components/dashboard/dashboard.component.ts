import {
  Component,
  AfterContentChecked,
  AfterContentInit,
  Output,
  AfterViewInit
} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { startWith, delay, tap } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { DashboardActions } from "./dashboard.actions";
import { EventPrediction, Prediction, EventPredictionDto } from "../../types";
import { select, NgRedux } from "@angular-redux/store";
import { EventPredictionModel } from "../../models/event-prediction.model";
import { first } from "lodash";
import { EventModel } from "../../models/event.model";
import { PredictionService } from "../../services/prediction.service";
import { AppState } from "../../store/model";
import { REHYDRATE } from "redux-persist";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements AfterContentInit {
  @select(["userPoints", "points"])
  points: Observable<number>;
  @select(["dashboard", "eventPredictionList"])
  @Output()
  eventPredictions: Observable<Array<EventPredictionModel>>;
  eventResults: Array<EventModel> = [];
  ptsCount: number = 0
  constructor(
    private store: NgRedux<AppState>,
    private predictionService: PredictionService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngAfterContentInit() {
    Observable.of()
      .pipe(
        startWith(null),
        delay(0),
        tap(() => DashboardActions.mergeEventsPredictions())
      )
      .subscribe();
    // Not implemented
    this.eventPredictions.subscribe(result => {
      if (result && result.length) {
        this.eventResults = result
          .map(eventPrediction => {
            this.ptsCount += eventPrediction.event.rewardPoints
            return first(
              eventPrediction.predictions.map(prediction => {
                if (prediction.team_event.completed && !prediction.read) {
                  if (prediction.prediction === prediction.team_event.result) {
                    eventPrediction.event.wonPrediction = true;
                    eventPrediction.event.rewardPoints = prediction.team_event.result_type.points;                    
                  }
                  return eventPrediction.event;
                }
              })
            );
          })
          .filter(eventPred => eventPred !== undefined);
      }
    });
  }

  markAsRead() {
    let subscription
    let predictionDto: EventPredictionDto[] = [];
    subscription = this.eventPredictions.subscribe(eventPrediction => {
      eventPrediction.forEach(event => {
        event.predictions.map(prediction => {
          if (prediction.team_event.completed && !prediction.read) {
            predictionDto.push({
              id: prediction.id,
              read: true,
              team_event: prediction.team_event.id,
              team: prediction.team,
              result_type: 1,
              prediction: prediction.prediction,
              delta: prediction.delta
            });
          }
        });
      });
      this.predictionService
        .updatePrediction(predictionDto)
        .subscribe(result => {
          if ( subscription ) {
            subscription.unsubscribe()
          }
          DashboardActions.mergeEventsPredictions()
        });
    });
  }
}
