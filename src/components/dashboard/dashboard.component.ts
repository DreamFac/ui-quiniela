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
import { AuthService } from "../../services/auth.service";

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
  tour: {
    sections: Array<{
      image: string,
      description: string,
      activeIndex: number
    }>,
    isCompleted: string
  }
  constructor(
    private store: NgRedux<AppState>,
    public authService: AuthService,
    private predictionService: PredictionService
  ) { }

  ngOnInit(): void {
    let tourCompleted = localStorage.getItem('tour-completed')
    if (!tourCompleted) {
      localStorage.setItem('tour-completed', JSON.stringify(false))
    }
    this.tourInit(tourCompleted)
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
          if (subscription) {
            subscription.unsubscribe()
          }
          DashboardActions.mergeEventsPredictions()
        });
    });
  }

  // Tour
  tourInit(isCompleted: string) {
    this.tour = {
      sections: [
        { image: 'tour1.png', description: 'desc tour 1', activeIndex: 1 },
        { image: 'tour2.png', description: 'desc tour 2', activeIndex: 0 },
        { image: 'tour3.png', description: 'desc tour 3', activeIndex: 0 },
        { image: 'tour4.png', description: 'desc tour 4', activeIndex: 0 }
      ],
      isCompleted: isCompleted
    }
  }
  next(index: number) {
    this.tour.sections = this.tour.sections
      .map((section) => {
        section.activeIndex = 0
        return section
      })
    if (index > 2){
      this.tour.isCompleted = 'true'
      localStorage.setItem('tour-completed', JSON.stringify(true))
    } else {
      this.tour.sections[index + 1].activeIndex = 1
    }
  }
}
