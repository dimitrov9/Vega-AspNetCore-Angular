import { ChartData } from './../models/chart-data';
import { VehicleQuery } from './../models/vehicle-query';
import { KeyValuePair } from '../models/key-value-pair';
import { SaveVehicle } from '../models/save-vehicle';
import { Make } from '../models/make';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle';
import { Result } from '../models/result';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes(): Observable<Make[]> {
    return this.http.get('/api/makes')
      .pipe(
        map(res => res as Make[])
      );
  }

  getFeatures(): Observable<KeyValuePair[]> {
    return this.http.get('/api/features') as Observable<KeyValuePair[]>;
  }

  getAllVehicles(query: VehicleQuery): Observable<Result<Vehicle>> {
    return this.http.get(`/api/vehicles${this.toQueryString(query)}`) as Observable<Result<Vehicle>>;
  }

  toQueryString(obj) {
    const parts = [];
    // tslint:disable-next-line:forin
    for (const property in obj) {
      const value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return '?' + parts.join('&');
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get(`/api/vehicles/${id}`) as Observable<Vehicle>;
  }

  create(vehicle: SaveVehicle): Observable<Vehicle> {
    return this.http.post('/api/vehicles', vehicle) as Observable<Vehicle>;
  }

  update(vehicle: SaveVehicle): Observable<Vehicle> {
    return this.http.put(`/api/vehicles/${vehicle.id}`, vehicle) as Observable<Vehicle>;
  }

  delete(id: number) {
    return this.http.delete(`/api/vehicles/${id}`);
  }

  getChartData() {
    return this.http.get<ChartData[]>('/api/admin');
  }
}
