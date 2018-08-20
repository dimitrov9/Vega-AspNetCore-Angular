import { Make } from '../models/make';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Feature } from '../models/feature';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes(): Observable<Make[]> {
    return this.http.get('/api/makes')
      .pipe(
        map(res => res as Make[])
      );
  }

  getFeatures(): Observable<Feature[]> {
    return this.http.get('/api/features')
      .pipe(
        map(res => res as Feature[])
      );
  }

}
