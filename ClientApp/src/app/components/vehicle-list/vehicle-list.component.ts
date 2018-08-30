import { AuthService } from './../../services/auth/auth.service';
import { Result } from './../../models/result';
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
  private readonly PAGE_SIZE = 3;

  queryResult = <Result<Vehicle>>{
    items: []
  };
  makes: Make[] = [];
  models: KeyValuePair[] = [];
  query = <VehicleQuery>{
    pageSize: this.PAGE_SIZE
  };
  columns: any[] = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    {}
  ];

  constructor(
    private vehicleService: VehicleService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }

  onFilterChange() {
    this.query.page = 1;
    this.populateModels();
    this.populateVehicles();
  }

  resetFilter() {
    this.query = <VehicleQuery>{
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
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

  onPageChange(page: number) {
    this.query.page = page;
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getAllVehicles(this.query)
      .subscribe(result => this.queryResult = result);
  }

  private populateModels() {
    const selectedMake = this.makes.find(make => make.id == this.query.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
