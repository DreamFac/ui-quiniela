import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap, takeUntil, timeInterval, take } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import { UserPointsActions } from './user-points.actions';
import { select } from '@angular-redux/store';
import { interval, timer } from 'rxjs';

@Component({
    selector: 'app-user-points',
    templateUrl: './user-points.component.html',
    styleUrls: ['./user-points.component.scss']
})
export class UserPointsComponent implements OnInit {
    @select(['userPoints', 'points'])
    points: Observable<number>
    totalPoints: number = 0
    constructor() {
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

    ngOnInit(): void { }

    countPoints (points) {
        return interval(5).pipe(
                startWith(null),
                tap(x => this.totalPoints = this.totalPoints + 1),
                take(points)
            )
    }
}
