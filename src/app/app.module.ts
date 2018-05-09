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
    ...APP_COMMON_MODULES,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: false }
    )
  ],
  providers: [
    LoginEpics,
    LoginActions,
    AuthService,
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
