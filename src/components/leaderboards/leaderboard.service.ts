import { Injectable } from '@angular/core';
import { config } from '../../config';
import configFile from '../../config.file';
import { HttpWrapper } from '../../services/http-wrapper.service';
import { Observable } from 'rxjs/Observable';
import { LeaderboardDto, LeaderboardModel, Country } from '../../types';
import { orderBy, truncate, first } from 'lodash';
import { AuthService } from '../../services/auth.service';
import { CountryService } from '../../services/country.service';

const {
    protocol,
    urlConfig: {
        auth: { baseUrl, version, loginEndpoint },
        leaderboards: { getAllLeaderboards }
    }
} = config(configFile);

@Injectable()
export class LeaderboardService {
    constructor(
        private http: HttpWrapper<any>,
        public authService: AuthService,
        private countryService: CountryService
    ) {

    }

    private getAll() {
        const leaderboardsUrl = `${protocol}://${baseUrl}/${version}/${getAllLeaderboards}`;
        return this.http.get(leaderboardsUrl)
    }

    mapAll(truncateUsername: Boolean = false): Observable<Array<any>> {
        return this.getAll()
            .catch(err => Observable.of(err))
            .map((result: Array<any>) => {
                if (result.length) {
                    return orderBy(result.map((item, index) => {
                        const userInfo = this.authService.getUserInfo()
                        if (item.user.id === userInfo.user_id) {
                            const info = {
                                email: item.user.email.substring(0, item.user.email.indexOf('@')),
                                points: item.points,
                                ranking: index + 1
                            }
                            this.authService.setLeaderboardInfo(info)
                        }
                        if (truncateUsername) {
                            item.user.username = truncate(item.user.username, {
                                'length': 12,
                                'separator': '...'
                            });
                        }
                        const country: Country = first(
                            this.countryService.getAll()
                                .filter(x => x.name === item.user.user_profile)
                            )
                        return {
                            delta_points: item.delta_points,
                            points: item.points,
                            user: {
                                email: item.user.email.substring(0, item.user.email.indexOf('@')),
                                id: item.user.id,
                                user_profile: country.alpha2Code.toLowerCase()
                            }
                        }
                    }), ['points'], ['desc'])
                }
            })
    }
}