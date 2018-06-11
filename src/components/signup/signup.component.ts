import { Component, OnInit } from '@angular/core';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TimeLeft, TimeLeftInitialState } from 'src/models/event.model';
import { getCountdown } from 'src/utils/timeUtils';
import { SignUp, SignUpModel } from './signup.model';
import { config } from '../../config';
import configFile from '../../config.file';
import { Observable } from 'rxjs/Observable';
import { startWith, delay, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import { EventService, channels } from '../../services/emitter.service';

const {
    protocol,
    urlConfig: {
        auth: { baseUrl, version, signup },
        predictions: { globalPredictions },
        teams: { getAll }
    }
} = config(configFile);

const teamsUrl = `${protocol}://${baseUrl}/${version}/${getAll}`;
const globalPredictionsUrl = `${protocol}://${baseUrl}/${version}/${globalPredictions}`;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignUpComponent implements AfterContentInit {
    timeLeft: TimeLeft = TimeLeftInitialState
    readonly startDate: string = '2018-06-14 09:00'
    model: SignUp = new SignUpModel();
    constructor(
        private http: Http, 
        private router: Router,
        private authService: AuthService,
        private emitter: EventService
    ) { }

    ngAfterContentInit () {
        const timeLeftInterval = setInterval(() => {
            this.timeLeft = getCountdown(this.startDate)
            if (this.timeLeft.days < 0) {
                clearInterval(timeLeftInterval)
              }
        })

        // Check if user is logged in
        Observable.of()
            .pipe(
                startWith(null),
                delay(0)
            )
            .subscribe(() => {
                this.authService.checkUserAuth('/signup')
            })
    }

    passwordsMatch () {
        return this.model.password === this.model.passwordConfirmation;
    }

    modelIsPristine () {
        return Object.keys(this.model)
            .filter(key => this.model[key] === '')
            .length === 0 && this.passwordsMatch();
    }

    redirectToLogin () {
        this.router.navigate(['/login'])
    }

    register () {
        const dto = {
            email: this.model.email,
            username: this.model.email,
            password: this.model.password
        };
        const registerUrl = `${protocol}://${baseUrl}/${version}/${signup}`;
        this.http.post(registerUrl, dto)
            .catch(err => {
                const jsonerror = err.json()
                this.emitter.publish(channels.TOASTER_CHANNEL, {
                    text: Object.keys(jsonerror).map(key => jsonerror[key]).join(' - '),
                    response: {status: 400}
                });
                return Observable.throw(err);
            })
            .subscribe(result => {
                this.router.navigate(['/login'])
            });
    }
}
