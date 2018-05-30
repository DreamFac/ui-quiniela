import { EventType } from "../types";

export interface Team {
  id: number;
  name: string;
  flag: string;
  isPicked?: boolean;
}
export interface Tie {
  isPicked: Boolean;
}
export interface Event {
  id?: number;
  date: Date;
  place: string;
  event_type: EventType;
  teamA: Team;
  teamB: Team;
  tie: Tie;
}
export const TieInitialState: Tie = {
    isPicked: false
}
export const TeamInitialState: Team = {
  id: 0,
  name: "",
  flag: "",
  isPicked: false
};
export const InitalState: Event = {
  date: new Date(),
  place: "",
  event_type: {
    id: 1,
    name: '',
    description: ''
  },
  teamA: TeamInitialState,
  teamB: TeamInitialState,
  tie: TieInitialState
};
export class EventModel {
  id?: number;
  date: Date;
  place: string;
  event_type: EventType;
  teamA: TeamModel;
  teamB: TeamModel;
  tie: Tie;
  constructor(model: Event = InitalState) {
    this.id = model.id;
    this.date = model.date;
    this.place = model.place;
    this.event_type = model.event_type;
    this.teamA = new TeamModel(model.teamA);
    this.teamB = new TeamModel(model.teamB);
    this.tie = model.tie;
  }
}

export class TeamModel {
  id: number;
  name: string;
  flag: string;
  isPicked?: boolean;
  constructor(model: Team = TeamInitialState) {
    this.id = model.id;
    this.name = model.name;
    this.flag = model.flag;
    this.isPicked = model.isPicked ? model.isPicked : false;
  }
}