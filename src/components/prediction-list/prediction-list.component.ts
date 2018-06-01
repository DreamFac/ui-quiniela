import { Component, OnInit, AfterContentInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap } from 'rxjs/operators';
import { PredictionActions } from '../../store/actions/prediction.actions';

@Component({
    selector: 'app-prediction-list',
    templateUrl: './prediction-list.component.html',
    styleUrls: ['./prediction-list.component.scss']
})
export class PredictionListComponent implements AfterContentInit {
    @select(["predictions", "predictionList"])
    predictionList: Observable<Array<Event>>;

    constructor() { }

    ngAfterContentInit() {
        // Not Implemented
    }
}
