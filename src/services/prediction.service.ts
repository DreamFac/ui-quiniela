import { Injectable } from '@angular/core';
import { HttpWrapper } from './http-wrapper.service';
import { config } from '../config';
import configFile from '../config.file';
import { Observable } from 'rxjs/Observable';
import { Prediction } from '../types';

const {
    protocol,
    urlConfig: {
      auth: { baseUrl, version, loginEndpoint },
      events: { resultTypes, getAllEndpoint,  },
      predictions: { createPrediction, getPredictions }
    }
  } = config(configFile);

@Injectable()
export class PredictionService {
    constructor(private http: HttpWrapper<any>){}

    // createPrediction (): Observable<any> {

    // }

    getAll (): Observable<Array<Prediction>> {
        const getAllPredictionsUrl = `${protocol}://${baseUrl}/${version}/${getPredictions}`;
        return this.http.get(getAllPredictionsUrl)
            .map((result) => {
                return result
            })
    }
}