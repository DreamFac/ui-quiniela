import { Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

import {
    LoginComponent,
    DashboardComponent,
    PredictionListComponent,
    SignUpComponent,
    LeaderboardsComponent,
    LeaderboardDetailComponent
} from './components/barrel';

export const appRoutes: Routes = [
    { path: '',   redirectTo: '/signup', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'leaderboard-detail', component: LeaderboardDetailComponent }
];

