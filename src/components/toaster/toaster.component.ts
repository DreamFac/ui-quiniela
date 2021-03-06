import { Component, Input, ViewChild } from '@angular/core';
import { channels, EventService } from '../../services/emitter.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.template.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  constructor (private eventService: EventService) {
    this.registerPop();
  }
  show: boolean;
  toastType: string;
  @Input() textDisplay: string;
  @Input() response: {status: number};

    showHide () {
        this.resolveResponse();
        const toaster = document.getElementById('oraculapp-toaster');
        document.getElementsByClassName('main-container')[0].scrollTo(0,0);
        toaster.classList.add('show');
        setTimeout(() => {
            toaster.classList.remove('show');
        }, 4000);
    }

    registerPop() {
        this.eventService.listen(channels.TOASTER_CHANNEL, (data) => {
            this.textDisplay = data.text;
            this.response = data.response;
            this.showHide();
        });
    }

    resolveResponse () {
        if ( this.response.status >= 200 && this.response.status < 400 ) {
            this.toastType = 'success';
        } else if ( this.response.status >= 400 ) {
            this.toastType = 'error';
        }
    }

}
