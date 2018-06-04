import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterContentInit
} from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { first, concat } from "lodash";
import { HttpWrapper } from "../../services/http-wrapper.service";
import configFile from "../../config.file";
import { config } from "../../config";

import { Observable } from "rxjs/Observable";
import { startWith, delay, tap } from "rxjs/operators";

const {
  protocol,
  urlConfig: {
    auth: { baseUrl, version },
    predictions: { globalPredictions },
    teams: { getAll }
  }
} = config(configFile);

const teamsUrl = `${protocol}://${baseUrl}/${version}/${getAll}`;
const globalPredictionsUrl = `${protocol}://${baseUrl}/${version}/${globalPredictions}`;

@Component({
  selector: "app-global-prediction",
  templateUrl: "./global-prediction.component.html",
  styleUrls: ["./global-prediction.component.scss"]
})
export class GlobalPredictionComponent implements AfterContentInit {
    hasError: boolean = false
  constructor(
    private dragulaService: DragulaService,
    private http: HttpWrapper<any>
  ) {
    dragulaService.dropModel.subscribe(value => {
      this.onDropModel(value.slice(1));
    });
  }

  public teams: Array<DraggableModel> = [];
  public teamsCopy: Array<DraggableModel> = [];

  ngAfterContentInit() {
    Observable.of()
      .pipe(
        startWith(null),
        delay(0),
        tap(() => {
          this.http.get(teamsUrl).subscribe(result => {
            this.teams = result;
            this.teamsCopy = concat([], result);
          });
          this.http.get(globalPredictionsUrl).subscribe(result => {
            console.log(result);
          });
        })
      )
      .subscribe();
  }

  private onDropModel(args) {
    let [el, target, source] = args;
    console.log(this.teams);
    const predictionDto = this.teams.map((team, index) => {
      return {
          team: team.id,
          place: index + 1
      };
    });
    this.http.post(globalPredictionsUrl, predictionDto)
        .catch(err => {
            this.teams = concat([], this.teamsCopy)
            return Observable.of(err)
        })
        .subscribe((response) => {
            console.log(response)
        })
  }
}

export interface DraggableModel {
  id?: number;
  name?: string;
  type?: string;
}
