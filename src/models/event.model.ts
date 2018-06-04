import * as moment from 'moment'
import { EventType, TeamEvent, ResultType } from "../types";

export interface TimeLeft {
  days: number
  hours: number
  mins: number
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
  team_event?: any[];
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
  mins: 0
}
export class EventModel {
  id?: number;
  date: string;
  place: string;
  event_type: EventType;
  teamA: TeamModel;
  teamB: TeamModel;
  tie: Tie;
  started?: Boolean;
  timeLeft: TimeLeft = TimeLeftInitialState;
  wonPrediction?: boolean = false
  rewardPoints?: number = 0
  constructor ( model: Event = InitalState ) {
    this.id = model.id;
    this.date = model.date;
    this.place = model.place;
    this.event_type = model.event_type;
    this.teamA = new TeamModel( model.team_event.shift() );
    this.teamB = new TeamModel( model.team_event.pop() );
    this.tie = model.tie;
    let timeLeftInterval;
    timeLeftInterval = setInterval( () => {
      this.timeLeft = this.setTimeLeft( this.date )
      this.started = this.timeLeft.days < 0;
      if (this.timeLeft.days < 0) {
        clearInterval(timeLeftInterval)
      }
    }, timeLeftInterval ? 1000 : 0 )
  }
  setTimeLeft ( endDate ) {
    const startDate = moment();
    const start_date = moment( startDate, 'YYYY-MM-DD HH:mm' );
    const end_date = moment( endDate, 'YYYY-MM-DD HH:mm' );
    const duration = moment.duration( end_date.diff( start_date ) );
    const days = duration.asDays();
    // Convert days
    const daysInt = Math.floor( days )
    const daysDecimals = days - daysInt
    const hours = daysDecimals * 24
    const hoursInt = Math.floor( hours )
    const hoursDecimals = hours - hoursInt
    const mins = hoursDecimals * 60
    const minsInt = Math.floor( mins )
    return {
      days: daysInt,
      hours: hoursInt,
      mins: minsInt
    };
  }
}

export class TeamModel {
  id: number;
  teamEventId: number;
  name: string;
  flag: string;
  isPicked?: boolean;
  constructor ( model: TeamEvent ) {
    this.id = model.team.id;
    this.teamEventId = model.id;
    this.name = model.team.name;
    this.flag = model.team.flag;
    this.isPicked = false;
  }
}
