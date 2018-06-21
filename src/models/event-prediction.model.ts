import { EventModel, TeamModel } from "./event.model";
import { Prediction } from "../types";
import { first, last } from "lodash";

export class EventPredictionModel {
    event: EventModel;
    predictions?: Prediction[];
    constructor ( event: EventModel, predictions: Prediction[] = [] ) {
        this.event = event
        this.predictions = predictions
        this.event.wonPrediction = this.predictions.filter( ( prediction ) => {
            return prediction.prediction === '1' || prediction.prediction === "-1"
        } )
        .filter((validPrediction) => {
            return this.event.teamA.id === validPrediction.team &&
                this.event.teamA.teamEvent.result === validPrediction.prediction ||
                    this.event.teamB.id === validPrediction.team &&
                        this.event.teamB.teamEvent.result === validPrediction.prediction
        }).length > 0
        if ( this.event.wonPrediction ) {
            this.event.rewardPoints = this.event.teamA.teamEvent.result_type.points
        }
        this.event.teamA = this.setIsPicked( this.event.teamA )
        this.event.teamB = this.setIsPicked( this.event.teamB )
    }
    setIsPicked ( team: TeamModel ): TeamModel {
        const predicted = first( this.predictions.filter( x => x.prediction === '1' ) )
        const tiePredicted = first( this.predictions.filter( x => x.prediction === '-1' ) )
        if ( predicted ) {
            if ( predicted.team_event.team.id === team.id ) {
                team.isPicked = true
            }
        } else if ( tiePredicted ) {
            if ( tiePredicted.team_event.team.id === team.id ) {
                this.event.tie.isPicked = true
            }
        }
        return team
    }
}