import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpWrapper } from '../../services/http-wrapper.service';
import { config } from '../../config';
import configFile from '../../config.file';
import { Observable } from "rxjs/Observable";
import { startWith, delay, tap } from "rxjs/operators";
import { LeaderboardDto } from '../../types';
import { trim, orderBy, truncate } from 'lodash';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LeaderboardService } from './leaderboard.service';

@Component({
    selector: 'app-leaderboards',
    templateUrl: './leaderboards.component.html',
    styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements AfterContentInit {
    leaderboardList: Array<LeaderboardDto> = []
    constructor(
        private router: Router,
        private authService: AuthService,
        private leaderboardService: LeaderboardService
    ) { }

    ngAfterContentInit() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0)
            )
            .subscribe(() => {
                this.leaderboardService.mapAll(true)
                    .subscribe(result => {
                        this.leaderboardList = result
                    })
            });
    }

    goTo () {
        this.router.navigate(['/leaderboard-detail'])
    }
}
