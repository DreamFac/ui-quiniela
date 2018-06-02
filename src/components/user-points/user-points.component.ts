import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap, takeUntil, timeInterval, take } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import { UserPointsActions } from './user-points.actions';
import { select, NgRedux } from '@angular-redux/store';
import { interval, timer } from 'rxjs';
import { AppState } from '../../store/model';
import { PURGE } from 'redux-persist';
import { rootReducer } from '../../store/reducers';
import { combineReducers } from 'redux';

@Component({
    selector: 'app-user-points',
    templateUrl: './user-points.component.html',
    styleUrls: ['./user-points.component.scss']
})
export class UserPointsComponent implements AfterContentInit {
    @select(['userPoints', 'points'])
    points: Observable<number>
    totalPoints: number = 0
    constructor(private store: NgRedux<AppState>) {
    }

    ngAfterContentInit() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0),
                tap(() => UserPointsActions.get())
            ).subscribe(result => {
                this.points.subscribe(points => {
                    this.countPoints(points).subscribe()
                })
            })
    }

    countPoints(points) {
        return interval(5).pipe(
            startWith(null),
            tap(x => this.totalPoints = this.totalPoints + 1),
            take(points)
        )
    }
}
