import { Injectable } from '@angular/core'
import { LoginEpics } from './epics/login.epic'
import { EventListEpic } from '../components/event-list/event-list.epic';
import { PredictionEpics } from './epics/predictions.epic';
import { DashboardEpics } from '../components/dashboard/dashboard.epic';

@Injectable()
export class Epics {
  constructor(
    private loginEpics: LoginEpics,
    private eventListEpics: EventListEpic,
    private predictionEpics: PredictionEpics,
    private dashboardEpics: DashboardEpics
  ) {}

  public createEpics() {
    let epics: any[] = []
    epics = [
      ...this.loginEpics.createEpics(),
      ...this.eventListEpics.createEpics(),
      ...this.predictionEpics.createEpics(),
      ...this.dashboardEpics.createEpics(),
      ...epics
    ]
    return epics
  }
}
