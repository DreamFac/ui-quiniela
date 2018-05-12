import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/throw'
import { JwtInfo } from 'src/store/types';
import { LogInModel } from 'src/models/login.model';
import { config } from 'src/config';
import configFile from 'src/config.file';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs';
import { Event, EventModel } from '../../models/event.model';

@Injectable()
export class EventListService {
    constructor ( private http: HttpClient ) { }
    getAll (): Observable<Array<Event>> {
        const { protocol, urlConfig: {
            auth: {
                baseUrl,
                version,
                loginEndpoint
            },
            events: {
                getAllEndpoint
            }
        }
    } = config( configFile )
        const eventListUrl = `${ protocol }://${ baseUrl }/${ version }/${ loginEndpoint }`
        return Observable.create( ( observer: Subscriber<{}> ) => {
            const events: Array<Event> = [
                new EventModel( {
                    teamA: {
                        name: 'Argentina',
                        flagUrl: 'ar'
                    },
                    teamB: {
                        name: 'Brazil',
                        flagUrl: 'br'
                    },
                    date: new Date()
                } ),
                new EventModel( {
                    teamA: {
                        name: 'Spain',
                        flagUrl: 'sn'
                    },
                    teamB: {
                        name: 'Germany',
                        flagUrl: 'gr'
                    },
                    date: new Date()
                } ),
                new EventModel( {
                    teamA: {
                        name: 'Uruguay',
                        flagUrl: 'ug'
                    },
                    teamB: {
                        name: 'Chile',
                        flagUrl: 'ch'
                    },
                    date: new Date()
                } ),
                new EventModel( {
                    teamA: {
                        name: 'Sweden',
                        flagUrl: 'sn'
                    },
                    teamB: {
                        name: 'Japan',
                        flagUrl: 'jp'
                    },
                    date: new Date()
                } )
            ]
            observer.next( events )
            observer.complete()
        } )
    }
}
