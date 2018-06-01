import { Injectable } from '@angular/core';
import { config } from '../../config';
import configFile from '../../config.file';
import { HttpWrapper } from '../../services/http-wrapper.service';
import { Observable } from 'rxjs/Observable';

const {
    protocol,
    urlConfig: {
        auth: { baseUrl, version },
        userPoints: { getPoints }
    }
} = config(configFile);

@Injectable()
export class UserProfileService {
    constructor ( private http: HttpWrapper<any> ) {}

    getPoints (): Observable<any> {
        const userPointsUrl = `${protocol}://${baseUrl}/${version}/${getPoints}`;
        return this.http.get(userPointsUrl)
    }
}