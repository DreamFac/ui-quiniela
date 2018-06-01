import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { JwtInfo } from 'src/store/types';

import configFile from 'src/config.file';
import { config } from 'src/config';
import { HttpWrapper } from './http-wrapper.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    @select( ['login', 'jwtInfo'] )
    loginStore: Observable<JwtInfo>
    private readonly REQUEST_THRESHOLD = 750
    constructor(private httpWrapper: HttpWrapper<JwtInfo>) {}
    requestThreshold () {
        setTimeout(() => {
            this.httpWrapper.isInRequest = false
        }, this.REQUEST_THRESHOLD)
    }
    intercept ( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        this.httpWrapper.isInRequest = true
        this.loginStore.subscribe( ( response: any ) => {
            const { access } = response
            const authConfig = config( configFile )
            request = request.clone( {
                setHeaders: {
                    Authorization: `${ authConfig.scheme } ${ access }`
                }
            } )
        } )
        return next.handle( request )
            .catch(err => {
                this.requestThreshold()
                return Observable.of(err)
            })
            .map(response => {
                if (response.type){
                    this.requestThreshold()
                }
                return response
            })
    }
}
