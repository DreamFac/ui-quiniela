import { Component, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap, take, repeat } from 'rxjs/operators';
import { UserPointsActions } from './user-points.actions';
import { select } from '@angular-redux/store';
import { interval } from 'rxjs';

@Component({
    selector: 'app-user-points',
    templateUrl: './user-points.component.html',
    styleUrls: ['./user-points.component.scss']
})
export class UserPointsComponent implements AfterContentInit {
    @select(['userPoints', 'points'])
    points: Observable<number>
    totalPoints: number = 0
    constructor() {
    }

    ngAfterContentInit() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0),
                repeat(1),
                tap(() => UserPointsActions.get()),
                tap(() => {
                    this.points.subscribe(points => {
                        this.countPoints(points).subscribe()
                    })
                })
            ).subscribe()
    }

    countPoints(points) {
        return interval(0).pipe(
            startWith(null),
            tap(x => this.totalPoints = this.totalPoints + 1),
            take(points)
        )
    }
}
