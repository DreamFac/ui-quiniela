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
import { Event } from '../../models/event.model';

@Injectable()
export class EventListService {
    constructor ( private http: HttpClient ) { }
    getAll (): Observable<Array<Event>> {
        const { protocol,  urlConfig: { baseUrl, version, loginEndpoint } } = config(configFile)
        const eventListUrl = `${protocol}://${baseUrl}/${version}/${loginEndpoint}`
        return Observable.create((observer: Subscriber<{}>) => { 
            const events: Array<Event> = [
                {
                    teamA: {
                        name: 'Argentina',
                        flagUrl: ''
                    },
                    teamB: {
                        name: 'Brazil',
                        flagUrl: ''
                    },
                    date: new Date()
                },
                {
                    teamA: {
                        name: 'Spain',
                        flagUrl: ''
                    },
                    teamB: {
                        name: 'Germany',
                        flagUrl: ''
                    },
                    date: new Date()
                },
                {
                    teamA: {
                        name: 'Uruguay',
                        flagUrl: ''
                    },
                    teamB: {
                        name: 'Chile',
                        flagUrl: ''
                    },
                    date: new Date()
                },
                {
                    teamA: {
                        name: 'Sweden',
                        flagUrl: ''
                    },
                    teamB: {
                        name: 'Japan',
                        flagUrl: ''
                    },
                    date: new Date()
                }
            ]
            observer.next(events)
            observer.complete()
        })
    }
}
