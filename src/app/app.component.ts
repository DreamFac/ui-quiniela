import { Component, AfterContentInit } from '@angular/core';
import { HttpWrapper } from '../services/http-wrapper.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements AfterContentInit {
  isLoading: boolean
  constructor(private httpWrapper: HttpWrapper<any>) {
    this.isLoading = this.httpWrapper.isInRequest
  }
  ngAfterContentInit () {
    //
  }
}
