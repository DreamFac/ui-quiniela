export interface Team {
    id?: string
    name: string
    flag: string
}

export interface Event {
    id?: number
    date: Date
    place: string
    event_type: EventType
}

export interface TeamEvent {
    id?: number
    result_type: ResultType
    event: Event
    team: Team
    result: string
}

export interface ResultType {
    id: number
    name: string
    result_type: string
    description: string
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

export interface EventPrediction {
    id?: number
    team_event: TeamEvent
    team: Team
    result_type: ResultType
    prediction: PredictionEnum
}


