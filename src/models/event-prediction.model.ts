import { EventModel, TeamModel } from "./event.model";
import { Prediction } from "../types";
import { first } from "lodash";

export class EventPredictionModel {
    event: EventModel;
    predictions?: Prediction[];
    constructor(event: EventModel, predictions: Prediction[] = []) {
        this.event = event
        this.predictions = predictions
        this.event.teamA = this.setIsPicked(this.event.teamA)
        this.event.teamB = this.setIsPicked(this.event.teamB)
    }
    setIsPicked (team: TeamModel): TeamModel {
        const predicted = first(this.predictions.filter(x => x.prediction === '1'))
        const tiePredicted = first(this.predictions.filter(x => x.prediction === '-1'))
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