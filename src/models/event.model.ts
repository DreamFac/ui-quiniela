import * as moment from 'moment'
import { EventType, TeamEvent, ResultType } from "../types";
import { getCountdown } from 'src/utils/timeUtils';
import { first, last } from 'lodash';

export interface TimeLeft {
  days: number
  hours: number
  mins: number
  deltaInDays: number
  deltaInHours: number
}
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
  team_event?: TeamEvent[];
  date: string;
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
  date: '2018-1-1',
  place: "",
  team_event: [],
  event_type: {
    id: 1,
    name: '',
    description: ''
  },
  tie: TieInitialState
};
export const TimeLeftInitialState: TimeLeft = {
  days: 0,
  hours: 0,
  mins: 0,
  deltaInDays: 0,
  deltaInHours: 0
}
export class EventModel {
  id?: number;
  date: string;
  place: string;
  event_type: EventType;
  teamA: TeamModel;
  teamB: TeamModel;
  completed: Boolean;
  tie: Tie;
  started?: Boolean;
  deltaInDays: number;
  deltaInHours: number;
  timeLeft: TimeLeft = TimeLeftInitialState;
  wonPrediction?: boolean = false
  rewardPoints?: number = 0
  constructor ( model: Event = InitalState ) {
    this.id = model.id;
    this.date = model.date;
    this.place = model.place;
    this.event_type = model.event_type;
    this.teamA = new TeamModel( first(model.team_event) );
    this.teamB = new TeamModel( last(model.team_event) );
    this.completed = first(model.team_event).completed;
    this.tie = model.tie;
    let timeLeftInterval;
    timeLeftInterval = setInterval( () => {
      this.timeLeft = this.setTimeLeft( this.date )
      this.deltaInDays = this.timeLeft.deltaInDays
      this.deltaInHours = this.timeLeft.deltaInHours
      this.started = this.timeLeft.days < 0;
      if (this.timeLeft.days < 0) {
        clearInterval(timeLeftInterval)
      }
    }, timeLeftInterval ? 1000 : 0 )
  }
  setTimeLeft ( endDate ) {
    return getCountdown(endDate)
  }
}

export class TeamModel {
  id: number;
  teamEventId: number;
  teamEvent: TeamEvent;
  name: string;
  flag: string;
  isPicked?: boolean;
  constructor ( model: TeamEvent ) {
    this.id = model.team.id;
    this.teamEventId = model.id;
    this.teamEvent = model;
    this.name = model.team.name;
    this.flag = model.team.flag;
    this.isPicked = false;
  }
}