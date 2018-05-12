export interface Team {
    name: string
    flagUrl: string
}
export interface Event {
    teamA: Team
    teamB: Team
    date: Date
}
export const TeamInitialState: Team = {
    name: '',
    flagUrl: ''
}
export const InitalState: Event = {
    teamA: TeamInitialState,
    teamB: TeamInitialState,
    date: new Date()
};
export class EventModel {
    teamA;
    teamB;
    date;
    constructor(model: Event = InitalState) {
        this.teamA = model.teamA;
        this.teamB = model.teamB;
        this.date = model.date;
    }
}
