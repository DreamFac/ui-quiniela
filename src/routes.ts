import { Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

import {
    LoginComponent,
    DashboardComponent,
    PredictionListComponent
} from './components/barrel';

export const appRoutes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent }
];

