import {
  Component,
  AfterContentInit,
  Output,
} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { startWith, delay, tap } from "rxjs/operators";
import { DashboardActions } from "./dashboard.actions";
import { EventPredictionDto } from "../../types";
import { select } from "@angular-redux/store";
import { EventPredictionModel } from "../../models/event-prediction.model";
import { first } from "lodash";
import { EventModel } from "../../models/event.model";
import { PredictionService } from "../../services/prediction.service";
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
    let tieCount = 0
    Observable.of()
      .pipe(
        startWith(null),
        delay(0),
        tap(() => DashboardActions.mergeEventsPredictions()),
        tap(() => {
          this.eventPredictions.subscribe(result => {
            if (result && result.length) {
              this.eventResults = result
                .map(eventPrediction => {
                  return first(
                    eventPrediction.predictions
                      .filter(x => x.prediction === '1' || x.prediction === '-1')
                      .map(prediction => {
                      if (prediction.team_event.completed && !prediction.read) {
                        if (prediction.prediction === prediction.team_event.result) {
                          eventPrediction.event.wonPrediction = true;
                          eventPrediction.event.rewardPoints = prediction.team_event.result_type.points;
                          if (tieCount < 1) {
                            this.ptsCount += eventPrediction.event.rewardPoints
                          } else {
                            tieCount = 0
                          }
                          if (prediction.prediction === "-1") {
                            tieCount += 1
                          }
                        }
                        return eventPrediction.event;
                      }
                    })
                  );
                })
                .filter(eventPred => eventPred !== undefined);
            }
          });
        })
      )
      .subscribe()
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
        { image: 'tour1.png', description: 'Es muy fácil jugar. Una vez tengas tu cuenta podrás ver todos los partidos que se jugarán próximamente. Tendrás un pequeno reloj, que te indica cuánto tiempo queda para ingresar tu predicción. ', activeIndex: 1 },
        { image: 'tour2.png', description: 'Haz click en la bandera del país que crees que va a ganar. Asi de fácil ya has ingresado tu quiniela!', activeIndex: 0 },
        { image: 'tour3.png', description: 'Si crees que será empate, haz click al centro de las banderas.', activeIndex: 0 },
        { image: 'tour4.png', description: 'Una vez el tiempo haya terminado, se deshabilitará el poder votar por ese partido. Ve a disfrutar del partido!', activeIndex: 0 },
        { image: 'tour5.png', description: 'Al terminar el juego aparecerá el marcador final al centro y, en lugar del reloj, un cheque si acertaste y la cantidad de puntos que ganaste. Si no acertaste, aparecerá una equis. Puedes ver tu ranking, en la barra derecha.', activeIndex: 0 }
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
    if (index > 3){
      this.tour.isCompleted = 'true'
      localStorage.setItem('tour-completed', JSON.stringify(true))
    } else {
      this.tour.sections[index + 1].activeIndex = 1
    }
  }
}