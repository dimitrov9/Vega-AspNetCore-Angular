import { ToastyService } from 'ng2-toasty';
import { KeyValuePair } from '../../models/key-value-pair';
import { SaveVehicle } from '../../models/save-vehicle';
import { Make } from './../../models/make';
import { VehicleService } from '../../services/vehice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: Make[];
  models: KeyValuePair[];
  features: KeyValuePair[];

  saveVehicle = new SaveVehicle();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {

    route.params.subscribe(p => {
      this.saveVehicle.id = +p['id'];
    });
  }

  ngOnInit() {
    const sources: Observable<any>[] = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.saveVehicle.id)
      sources.push(this.vehicleService.getVehicle(this.saveVehicle.id));

    forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.saveVehicle.id) {
        this.saveVehicle.setFromVehicle(data[2]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404) {
        this.router.navigate(['/home']);
      }
    });
  }

  onMakeChange() {
    this.populateModels();
    delete this.saveVehicle.modelId;
  }

  onFeatureToggle(id: number, $event) {
    if ($event.target.checked)
      this.saveVehicle.features.push(id);
    else {
      const index = this.saveVehicle.features.indexOf(id);
      this.saveVehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.saveVehicle.id) {
      this.vehicleService.update(this.saveVehicle)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success',
            msg: 'The vehicle was sucessfully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });

          this.router.navigate(['/vehicles']);
        });
    } else {
      this.vehicleService.create(this.saveVehicle)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success',
            msg: 'The vehicle was sucessfully created.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });

          this.router.navigate(['/vehicles']);
        });
    }
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.saveVehicle.id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        });
    }

  }

  private populateModels() {
    const selectedMake = this.makes.find(make => make.id == this.saveVehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
