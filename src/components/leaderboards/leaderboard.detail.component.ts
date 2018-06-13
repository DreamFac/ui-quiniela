import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, delay } from 'rxjs/operators';
import { LeaderboardDto, LeaderboardModel } from '../../types';
import { LeaderboardService } from './leaderboard.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-leaderboard-detail',
    templateUrl: './leaderboard-detail.component.html',
    styleUrls: ['./leaderboard-detail.component.scss']
})
export class LeaderboardDetailComponent implements AfterContentInit {
    leaderboardList: LeaderboardModel[] = []
    constructor(
        private router: Router,
        public authService: AuthService,
        private leaderboardService: LeaderboardService) { }

    ngAfterContentInit() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0)
            )
            .subscribe(() => {
                this.leaderboardService.mapAll()
                    .subscribe(result => {
                        this.leaderboardList = result
                    })
            });
    }

    goBack () {
        this.router.navigate(['/dashboard'])
    }
}
