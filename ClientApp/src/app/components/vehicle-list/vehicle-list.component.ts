import { ListVehicle } from './../../models/list-vehicle';
import { VehicleService } from './../../services/vehice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getAllVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

}
