import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import { UserPointsActions } from './user-points.actions';
import { select } from '@angular-redux/store';

@Component({
    selector: 'app-user-points',
    templateUrl: './user-points.component.html',
    styleUrls: ['./user-points.component.scss']
})
export class UserPointsComponent implements OnInit {
    @select(['userPoints', 'points'])
    points: number
    constructor() {
        Observable.of()
            .pipe(
                startWith(null),
                delay(0),
                tap(() => UserPointsActions.get())
            ).subscribe()
    }

    ngOnInit(): void { }
}
