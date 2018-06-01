import { EventType, TeamEvent, ResultType } from "../types";

export interface Team {
  id: number;
  team_event?: TeamEvent;
  name: string;
  flag: string;
}
export interface Tie {
  isPicked: Boolean;
}
export interface Event {
  id?: number;
  team_event?: any[];
  date: Date;
  place: string;
  event_type: EventType;
  tie: Tie;
}
export const ResultTypeInitialState: ResultType = {
  id: 0,
  name: '',
  result_type: '',
  description: ''
}
export const TieInitialState: Tie = {
    isPicked: false
}
export const TeamInitialState: Team = {
  id: 0,
  name: "",
  flag: ""
};
export const InitalState: Event = {
  date: new Date(),
  place: "",
  team_event: [],
  event_type: {
    id: 1,
    name: '',
    description: ''
  },
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
    this.teamA = new TeamModel(model.team_event.shift());
    this.teamB = new TeamModel(model.team_event.pop());
    this.tie = model.tie;
  }
}

export class TeamModel {
  id: number;
  teamEventId: number;
  name: string;
  flag: string;
  isPicked?: boolean;
  constructor(model: TeamEvent) {
    this.id = model.team.id;
    this.teamEventId = model.id;
    this.name = model.team.name;
    this.flag = model.team.flag;
    this.isPicked = false;
  }
}