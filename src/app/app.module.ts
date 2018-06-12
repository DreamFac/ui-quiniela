import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// store
import { StoreModule } from '../store/module'
import { LoginEpics } from '../store/epics/login.epic';
import { LoginActions } from '../store/actions/login.actions';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/services/token.interceptor';
import { AuthService } from 'src/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

// components
import { APP_COMPONENTS } from 'src/components';
import { LocationStrategy } from '@angular/common';
import { HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { EventListEpic } from '../components/event-list/event-list.epic';
import { EventListActions } from '../components/event-list/event-list.actions';
import { EventListService } from '../components/event-list/event-list.service';
import { HttpWrapper } from '../services/http-wrapper.service';
import { PredictionEpics } from '../store/epics/predictions.epic';
import { PredictionActions } from '../store/actions/prediction.actions';
import { PredictionService } from '../services/prediction.service';
import { DashboardEpics } from '../components/dashboard/dashboard.epic';
import { DashboardService } from '../components/dashboard/dashboard.service';
import { UserProfileService } from '../components/user-points/user-profile.service';
import { UserPointsEpics } from '../components/user-points/user-points.epic';

// dragula
import { HttpModule } from '@angular/http';
import { EventService } from '../services/emitter.service';
import { LeaderboardService } from '../components/leaderboards/leaderboard.service';

const APP_COMMON_MODULES = [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  StoreModule
]

@NgModule( {
  declarations: [
    AppComponent,
    ...APP_COMPONENTS
  ],
  imports: [
    HttpModule,
    ...APP_COMMON_MODULES,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: false }
    )
  ],
  providers: [
    LoginEpics,
    LoginActions,
    EventListEpic,
    EventListActions,
    AuthService,
    EventListService,
    PredictionEpics,
    PredictionActions,
    PredictionService,
    DashboardEpics,
    DashboardService,
    UserPointsEpics,
    UserProfileService,
    LeaderboardService,
    HttpWrapper,
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
