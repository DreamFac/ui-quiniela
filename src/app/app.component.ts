import { Component, AfterContentInit } from '@angular/core';
import { HttpWrapper } from '../services/http-wrapper.service';
import { startWith, delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { DashboardActions } from '../components/dashboard/dashboard.actions';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements AfterContentInit {
  isLoading: boolean
  constructor(public httpWrapper: HttpWrapper<any>) {
  }
  ngAfterContentInit () {
    // something after content init
  }
}
