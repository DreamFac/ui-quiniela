import { Component, AfterContentInit } from '@angular/core';
import { LogInModel } from 'src/models/login.model';
import { Observable } from 'rxjs';
import { select, dispatch } from '@angular-redux/store';
import { JwtInfo } from 'src/store/types';
import { LoginActions } from 'src/store/actions/login.actions';
import { Router } from '@angular/router';
import { startWith, delay, tap } from "rxjs/operators";
import { AuthService } from '../../services/auth.service';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements AfterContentInit {
    model = new LogInModel();
    constructor (
        private router: Router,
        private authService: AuthService
    ) {}

    @select( 'login' )
    jwtInfo: Observable<JwtInfo>

    ngAfterContentInit() {
        // Check if user is logged in
        Observable.of()
            .pipe(
                startWith(null),
                delay(0)
            )
            .subscribe(() => {
                this.authService.checkUserAuth('/login')
            })
    }

    parseJwtInfo (): Observable<any> {
        return this.jwtInfo.map( result => JSON.stringify( result ) )
    }

    login () {
        this.startLogin( this.model )
    }

    redirectToSignup () {
        this.router.navigate(['/signup'])
    }

    @dispatch()
    startLogin ( model: LogInModel ) {
        return LoginActions.login( model )
    }
}
