import { TeamModel, Tie, EventModel } from "./models/event.model";

// oracle app api types

export interface Team {
    id?: number
    name?: string
    flag?: string
}

export interface Event {
    id?: number
    date: Date
    place: string
    event_type: EventType
}

export interface TeamEvent {
    id?: number
    result_type?: ResultType
    event?: number
    team?: Team
    result?: string
    completed?: boolean
}

export interface ResultType {
    id: number
    name?: string
    result_type?: string
    description?: string
}

export interface EventType {
    id: number
    name: string
    description: string
}

export enum PredictionEnum {
    LOSS,
    WIN
}

export interface Prediction {
    id?: number
    prediction: string
    read: Boolean
    result_type: number
    team: number
    team_event: TeamEvent
    user: number
}

export interface PredictionDto {
    id?: number
    prediction: string
    read: Boolean
    result_type: number
    team: number
    team_event: number
    user: number
}

export interface EventPredictionDto {
    id?: number
    team_event: number
    team: number
    result_type: number
    prediction: any
}

export interface EventPrediction {
    event: EventModel,
    prediction?: Prediction
}

