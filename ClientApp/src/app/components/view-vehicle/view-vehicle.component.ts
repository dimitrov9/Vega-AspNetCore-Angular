import { ToastyService } from 'ng2-toasty';
import { UploadPhotoEvent } from './../../models/upload-photo-event';
import { Photo } from './../../models/photo';
import { PhotoService } from './../../services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from './../../services/vehice.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html'
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: Vehicle;
  vehicleId: number;
  photos: Photo[];
  progress: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService
  ) {
    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        vehicle => this.vehicle = vehicle,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        }
      );
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        });
    }
  }

  uploadPhoto() {
    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    const file = nativeElement.files[0];
    nativeElement.value = '';

    this.photoService.upload(this.vehicle.id, file)
      .subscribe((event: UploadPhotoEvent) => {
        console.log(event);
        if (!event)
          return;

        this.progress = event.percentage;

        if (event.photo)
          this.photos.push(event.photo);
      }, err => {
        this.toastyService.error({
          title: 'Error',
          msg: err.error,
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
      }, () => {
        this.progress = null;
      });

  }

}
