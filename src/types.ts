import { TeamModel, Tie, EventModel } from "./models/event.model";

export interface IMap<T> {
    [key: string]: T;
}

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
    points?: number
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
    delta: number
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
    read?: boolean
    team: number
    result_type: number
    prediction: any
    delta: number
}

export interface EventPrediction {
    event: EventModel,
    prediction?: Prediction
}

export interface UserDto {
    email: string
    id: number
    is_active: Boolean
    username: string
    user_profile: UserProfileDto
}

export interface UserModel {
    email: string
    id: number
    is_active: Boolean
    username: string
    user_profile: UserProfile
}

export interface LeaderboardDto {
    delta_points: number
    points: number
    user: UserDto
}

export interface LeaderboardModel {
    delta_points: number
    points: number
    user: UserModel
}

export interface Country {
    name: string
    alpha2Code: string
    alpha3Code: string
}

export interface UserProfileDto {
    id: number
    first_name: string
    last_name: string
    country: string
    user: number
}

export interface UserProfile {
    id: number
    first_name: string
    last_name: string
    country: Country
    user: number
}

export interface UserInfo {
    exp?: number
    jti?: string
    token_type?: string
    user_id?: number
    leaderboardInfo: { email: string, points: number, ranking: number }
}
