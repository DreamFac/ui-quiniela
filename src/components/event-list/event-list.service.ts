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
                        flagUrl: 'ar'
                    },
                    teamB: {
                        name: 'Brazil',
                        flagUrl: 'br'
                    },
                    date: new Date()
                },
                {
                    teamA: {
                        name: 'Spain',
                        flagUrl: 'sn'
                    },
                    teamB: {
                        name: 'Germany',
                        flagUrl: 'gr'
                    },
                    date: new Date()
                },
                {
                    teamA: {
                        name: 'Uruguay',
                        flagUrl: 'ug'
                    },
                    teamB: {
                        name: 'Chile',
                        flagUrl: 'ch'
                    },
                    date: new Date()
                },
                {
                    teamA: {
                        name: 'Sweden',
                        flagUrl: 'sn'
                    },
                    teamB: {
                        name: 'Japan',
                        flagUrl: 'jp'
                    },
                    date: new Date()
                }
            ]
            observer.next(events)
            observer.complete()
        })
    }
}
