import { ListVehicle } from './../models/list-vehicle';
import { KeyValuePair } from '../models/key-value-pair';
import { SaveVehicle } from '../models/save-vehicle';
import { Make } from '../models/make';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle';

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

  getAllVehicles(): Observable<ListVehicle[]> {
    return this.http.get('/api/vehicles') as Observable<ListVehicle[]>;
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
}
