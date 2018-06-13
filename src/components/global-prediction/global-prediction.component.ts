import {
    Component,
    OnInit,
    ChangeDetectorRef,
    AfterContentInit
} from "@angular/core";

import { config } from "../../config";
import configFile from "../../config.file";

import { HttpWrapper } from "../../services/http-wrapper.service";

import { first, concat, keys, orderBy, isEmpty } from "lodash";
import { Observable, forkJoin, merge } from "rxjs";
import { startWith, delay, tap } from "rxjs/operators";
import { Team } from "../../models/event.model";
import { IMap } from "../../types";

const {
    protocol,
    urlConfig: {
        auth: { baseUrl, version },
        predictions: { globalPredictions },
        teams: { getAll }
    }
} = config( configFile );

const teamsUrl = `${ protocol }://${ baseUrl }/${ version }/${ getAll }`;
const globalPredictionsUrl = `${ protocol }://${ baseUrl }/${ version }/${ globalPredictions }`;

let teamsList: Team[] = []
const mergedPredictions: IMap<GlobalPrediction> = {}

@Component( {
    selector: "app-global-prediction",
    templateUrl: "./global-prediction.component.html",
    styleUrls: [ "./global-prediction.component.scss" ]
} )
export class GlobalPredictionComponent implements AfterContentInit {
    hasError: boolean = false
    constructor (
        private http: HttpWrapper<any>
    ) { }

    gloablPredictionList: GlobalPrediction[] = []

    ngAfterContentInit () {
        this.mergePredictions()
    }

    mergePredictions () {
        Observable.of()
            .pipe(
            startWith( null ),
            delay( 0 ),
            tap( () => {
                const teams$ = this.http.get( teamsUrl );
                const globalPrediction$ = this.http.get( globalPredictionsUrl );
                return forkJoin( [ teams$, globalPrediction$ ] )
                    .map( result => {
                        teamsList = result.shift()
                        result.pop().filter( prediction => {
                            return prediction.place <= 4
                        } )
                            .forEach( prediction => {
                                mergedPredictions[ prediction.team.id ] = prediction
                            } )
                        keys( mergedPredictions )
                            .forEach( key => {
                                this.gloablPredictionList.push( mergedPredictions[ key ] )
                            } )
                        teamsList.forEach( ( team, index ) => {
                            if ( !mergedPredictions[ team.id ] ) {
                                this.gloablPredictionList.push( {
                                    id: undefined,
                                    place: index + 4,
                                    team: team
                                } )
                            }
                        } )
                        this.gloablPredictionList = orderBy( this.gloablPredictionList, [ 'place' ], [ 'asc' ] );
                    } )
                    .subscribe()
            } )
            )
            .subscribe();
    }

    moveUp ( prediction: GlobalPrediction, i: number ) {
        const aboveTeam = this.gloablPredictionList[ i - 1 ]
        aboveTeam.place = aboveTeam.place ? aboveTeam.place + 1 : i + 1
        prediction.place = prediction.place ? prediction.place - 1 : aboveTeam.place - 1
        this.gloablPredictionList = orderBy( this.gloablPredictionList, [ 'place' ], [ 'asc' ] );
    }

    moveDown ( prediction: GlobalPrediction, i: number ) {
        const belowTeam = this.gloablPredictionList[ i + 1 ]
        belowTeam.place = belowTeam.place ? belowTeam.place - 1 : i + 1
        prediction.place = prediction.place ? prediction.place + 1 : belowTeam.place + 1
        this.gloablPredictionList = orderBy( this.gloablPredictionList, [ 'place' ], [ 'asc' ] );
    }

    save () {

        const predictionDto = this.gloablPredictionList.map( ( prediction, index ) => {
            return {
                team: prediction.team.id,
                place: index + 1
            };
        } ).filter( prediction => prediction.place <= 4 )

        this.http.get( globalPredictionsUrl )
            .subscribe( globalResult => {
                if ( !globalResult.length ) {
                    this.http.post( globalPredictionsUrl, predictionDto )
                        .catch( err => {
                            return Observable.of( err )
                        } )
                        .subscribe( ( response ) => {
                            console.log( response )
                        } )
                } else {
                    this.http.delete( `${ globalPredictionsUrl }` )
                        .catch( err => {
                            return Observable.of( err )
                        } )
                        .subscribe( result => {
                            this.http.post( globalPredictionsUrl, predictionDto )
                                .catch( err => {
                                    return Observable.of( err )
                                } )
                                .subscribe( ( response ) => {
                                    console.log( response )
                                } )
                        } )
                }
            } )
    }
}

export interface DraggableModel<T> {
    id?: number;
    type?: string;
    entity: T
}

export interface GlobalPrediction {
    id?: number
    place?: number
    team: Team
}
