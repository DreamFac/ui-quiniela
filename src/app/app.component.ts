import { Component, AfterContentInit } from '@angular/core';
import { HttpWrapper } from '../services/http-wrapper.service';
import { startWith, delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { DashboardActions } from '../components/dashboard/dashboard.actions';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from '../store/model';
import { LoginState } from '../store/reducers/login.reducer';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements AfterContentInit {
  isLoading: boolean
  @select(['login', 'authenticated'])
  authenticated: Observable<LoginState>

  constructor(
    public httpWrapper: HttpWrapper<any>, 
    private store: NgRedux<AppState>
  ){
  }
  ngAfterContentInit () {
    // something after content init
  }
}
