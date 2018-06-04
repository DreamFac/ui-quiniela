import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { first, concat } from 'lodash';

const teamsInitialState = [
    { id: 1, name: 'Argentina', type: 'team', flag: 'ar' },
    { id: 2, name: 'Spain', type: 'team', flag: 'es' },
    { id: 3, name: 'Chile', type: 'team', flag: 'cr' },
    { id: 4, name: 'Germany', type: 'team', flag: 'de' },
    { id: 1, name: 'Argentina', type: 'team', flag: 'ar' },
    { id: 2, name: 'Spain', type: 'team', flag: 'es' },
    { id: 3, name: 'Chile', type: 'team', flag: 'cr' },
    { id: 4, name: 'Germany', type: 'team', flag: 'de' }
];

@Component({
    selector: 'app-global-prediction',
    templateUrl: './global-prediction.component.html',
    styleUrls: ['./global-prediction.component.scss']
})

export class GlobalPredictionComponent {
    constructor(private dragulaService: DragulaService) {
        dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
    }

    public teams: Array<DraggableModel> = concat(teamsInitialState)
    public predictions: Array<DraggableModel> = []

    private onDropModel(args) {
        let [el, target, source] = args;
        console.log(this.teams)
    }
}

export interface DraggableModel {
    id?: number,
    name?: string,
    type?: string
}