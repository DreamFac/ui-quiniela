import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-event-list',
    templateUrl: 'event-list.component.html',
    styleUrls: [ './event-list.component.scss' ]
})

export class EventListComponent implements OnInit {
    title = 'Haz click en el ganador (o al centro si crees que sera empate). Tienes hasta la hora indicada.'
    constructor() { }

    ngOnInit() { }
}