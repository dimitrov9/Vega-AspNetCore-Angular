import { Make } from './../../models/make';
import { Filter } from './../../models/filter';
import { Vehicle } from './../../models/vehicle';
import { KeyValuePair } from './../../models/key-value-pair';
import { VehicleService } from './../../services/vehice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[] = [];
  makes: Make[] = [];
  models: KeyValuePair[] = [];
  filter: Filter = <Filter>{};

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }

  onFilterChange() {
    this.populateModels();
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = <Filter>{};
    this.onFilterChange();
  }

  private populateVehicles() {
    this.vehicleService.getAllVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  private populateModels() {
    const selectedMake = this.makes.find(make => make.id == this.filter.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
