import { Make } from './../../models/make';
import { VehicleQuery } from './../../models/vehicle-query';
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
  query: VehicleQuery = <VehicleQuery>{};
  columns: any[] = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    {}
  ];

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
    this.query = <VehicleQuery>{};
    this.onFilterChange();
  }

  sortBy(columnName: string) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getAllVehicles(this.query)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  private populateModels() {
    const selectedMake = this.makes.find(make => make.id == this.query.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
