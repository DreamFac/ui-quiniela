import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

@Injectable()
export class EventService {
    constructor() { }
    emitter: EventEmitter = new EventEmitter();

    publish(channel, payload) {
        this.emitter.emit(channel, payload);
    }
    listen(channel, handler) {
        this.emitter.on(channel, handler);
    }
}

export const channels = {
    TOASTER_CHANNEL: 'toaster-channel'
};