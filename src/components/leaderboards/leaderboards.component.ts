import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpWrapper } from '../../services/http-wrapper.service';
import { config } from '../../config';
import configFile from '../../config.file';
import { Observable } from "rxjs/Observable";
import { startWith, delay, tap } from "rxjs/operators";

const {
    protocol,
    urlConfig: {
        auth: { baseUrl, version, loginEndpoint },
        leaderboards: { getAllLeaderboards }
    }
} = config(configFile);

@Component({
    selector: 'app-leaderboards',
    templateUrl: './leaderboards.component.html',
    styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements AfterContentInit {
    constructor(
        private http: HttpWrapper<any>
    ) { }

    ngAfterContentInit() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0),
                tap(() => {

                })
            )
            .subscribe(() => {
                this.getAll()
                    .subscribe((result) => {
                        console.log(result)
                    })
            });
    }

    getAll() {
        const leaderboardsUrl = `${protocol}://${baseUrl}/${version}/${getAllLeaderboards}`;
        return this.http.get(leaderboardsUrl)
    }
}
