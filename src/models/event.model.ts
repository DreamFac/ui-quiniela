export interface Team {
  id: string;
  name: string;
  flagUrl: string;
  isPicked?: boolean;
}
export interface Tie {
  isPicked: Boolean;
}
export interface Event {
  teamA: Team;
  teamB: Team;
  tie: Tie;
  date: Date;
}
export const TieInitialState: Tie = {
    isPicked: false
}
export const TeamInitialState: Team = {
  id: "",
  name: "",
  flagUrl: "",
  isPicked: false
};
export const InitalState: Event = {
  teamA: TeamInitialState,
  teamB: TeamInitialState,
  tie: TieInitialState,
  date: new Date()
};
export class EventModel {
  teamA: Team;
  teamB: Team;
  tie: Tie;
  date: Date;
  constructor(model: Event = InitalState) {
    this.teamA = model.teamA;
    this.teamB = model.teamB;
    this.tie = model.tie;
    this.date = model.date;
  }
}
