import { Injectable } from '@angular/core'
import { LoginEpics } from './epics/login.epic'
import { EventListEpic } from '../components/event-list/event-list.epic';

@Injectable()
export class Epics {
  constructor(
    private loginEpics: LoginEpics,
    private eventListEpics: EventListEpic
  ) {}

  public createEpics() {
    let epics: any[] = []
    epics = [
      ...this.loginEpics.createEpics(),
      ...this.eventListEpics.createEpics(),
      ...epics
    ]
    return epics
  }
}
