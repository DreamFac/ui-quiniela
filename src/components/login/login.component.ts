import { Component } from '@angular/core';
import { LogInModel } from 'src/models/login.model';
import { Observable } from 'rxjs';
import { select, dispatch } from '@angular-redux/store';
import { JwtInfo } from 'src/store/types';
import { LoginActions } from 'src/store/actions/login.actions';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent {
    model = new LogInModel();

    @select( 'login' )
    jwtInfo: Observable<JwtInfo>

    parseJwtInfo (): Observable<any> {
        return this.jwtInfo.map( result => JSON.stringify( result ) )
    }

    login () {
        this.startLogin( this.model )
    }

    @dispatch()
    startLogin ( model: LogInModel ) {
        return LoginActions.login( model )
    }
}
