import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs, RequestMethod, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/throw'

import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class HttpWrapper {
    isInRequest: boolean = false
    constructor(private http: HttpClient) { }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Get, url, null, options);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Post, url, body, options);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Put, url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Delete, url, null, options);
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Patch, url, body, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Head, url, null, options);
    }

    private request(method: RequestMethod, url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
        let requestOptions = new HttpRequest<any>(RequestMethod[method.toString()], url)
        return Observable.create((observer) => {
            this.isInRequest = true
            this.http.request(requestOptions)
                .subscribe((response: any | HttpResponse) => {
                    if (response.type) {
                        this.isInRequest = false;
                        observer.next(response);
                        observer.complete();
                    }
                }, (error) => {
                    observer.error()
                    this.isInRequest = false
                })
        })
    }
}