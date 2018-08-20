import { Feature } from './../../models/feature';
import { Vehicle } from './../../models/vehicle';
import { Model } from './../../models/model';
import { Make } from './../../models/make';
import { VehicleService } from '../../services/vehice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: Make[];
  models: Model[];
  features: Feature[];

  vehicle: Vehicle = {
    make: null
  };

  constructor(
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.vehicleService.getFeatures()
      .subscribe(features => this.features = features);
  }

  onMakeChange() {
    // tslint:disable-next-line:triple-equals
    const selectedMake = this.makes.find(make => make.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
