import { EventModel, TeamModel } from "./event.model";
import { Prediction } from "../types";

export class EventPredictionModel {
    event: EventModel;
    prediction?: Prediction;
    constructor(event: EventModel, prediction?: Prediction) {
        this.event = event
        this.prediction = prediction
        this.event.teamA = this.setIsPicked(this.event.teamA)
        this.event.teamB = this.setIsPicked(this.event.teamB)
    }
    setIsPicked (team: TeamModel): TeamModel {
        if ( this.prediction ) {
            if ( this.prediction.team_event.team.id === team.id ) {
                team.isPicked = true
            }
        }
        return team
    }
}