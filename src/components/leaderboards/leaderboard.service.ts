import { Injectable } from '@angular/core';
import { config } from '../../config';
import configFile from '../../config.file';
import { HttpWrapper } from '../../services/http-wrapper.service';
import { Observable } from 'rxjs/Observable';
import { LeaderboardDto } from '../../types';
import { orderBy, truncate } from 'lodash';
import { AuthService } from '../../services/auth.service';

const {
    protocol,
    urlConfig: {
        auth: { baseUrl, version, loginEndpoint },
        leaderboards: { getAllLeaderboards }
    }
} = config(configFile);

@Injectable()
export class LeaderboardService {
    constructor(private http: HttpWrapper<any>, public authService: AuthService) {

    }

    private getAll() {
        const leaderboardsUrl = `${protocol}://${baseUrl}/${version}/${getAllLeaderboards}`;
        return this.http.get(leaderboardsUrl)
    }

    mapAll(truncateUsername: Boolean = false) {
        return this.getAll()
            .catch(err => Observable.of(err))
            .map((result: Array<LeaderboardDto>) => {
                if (result.length) {
                    return orderBy(result.map((item, index) => {
                        const userInfo = this.authService.getUserInfo()
                        if (item.user.id === userInfo.user_id) {
                            const info = {
                                points: item.points,
                                ranking: index + 1
                            }
                            this.authService.setLeaderboardInfo(info)
                        } else {
                            this.authService.setLeaderboardInfo()
                        }
                        if (truncateUsername) {
                            item.user.username = truncate(item.user.username, {
                                'length': 15,
                                'separator': '...'
                            });
                        }
                        return item
                    }), ['points'], ['desc'])
                }
            })
    }
}