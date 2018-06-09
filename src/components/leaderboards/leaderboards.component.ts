import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpWrapper } from '../../services/http-wrapper.service';
import { config } from '../../config';
import configFile from '../../config.file';
import { Observable } from "rxjs/Observable";
import { startWith, delay, tap } from "rxjs/operators";
import { LeaderboardDto } from '../../types';
import { trim, orderBy, truncate } from 'lodash';
import { AuthService } from '../../services/auth.service';

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
    leaderboardList: Array<LeaderboardDto> = []
    constructor(
        private http: HttpWrapper<any>,
        private authService: AuthService
    ) { }

    ngAfterContentInit() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0)
            )
            .subscribe(() => {
                this.getAll()
                    .catch(err => Observable.of(err))
                    .subscribe((result: Array<LeaderboardDto>) => {
                        this.leaderboardList = orderBy(result.map((item, index) => {
                            const userInfo = this.authService.getUserInfo()
                            if (item.user.id === userInfo.user_id) {
                                const info = {
                                    points: item.points,
                                    ranking: index + 1
                                }
                                this.authService.setLeaderboardInfo(info)
                            }
                            item.user.username = truncate(item.user.username, {
                                'length': 15,
                                'separator': '...'
                            });
                            return item
                        }), ['points'], ['desc'])
                    })
            });
    }

    getAll() {
        const leaderboardsUrl = `${protocol}://${baseUrl}/${version}/${getAllLeaderboards}`;
        return this.http.get(leaderboardsUrl)
    }
}
