import { Component, OnInit } from '@angular/core';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TimeLeft, TimeLeftInitialState } from 'src/models/event.model';
import { getCountdown } from 'src/utils/timeUtils';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements AfterContentInit {
    timeLeft: TimeLeft = TimeLeftInitialState
    readonly startDate: string = '2018-06-14 09:00'
    constructor() { }

    ngAfterContentInit () {
        const timeLeftInterval = setInterval(() => {
            this.timeLeft = getCountdown(this.startDate)
            if (this.timeLeft.days < 0) {
                clearInterval(timeLeftInterval)
              }
        })
    }
}
