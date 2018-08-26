import { UploadPhotoEvent } from './../models/upload-photo-event';
import { Photo } from './../models/photo';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, last, filter } from 'rxjs/operators';

@Injectable()
export class PhotoService {
    constructor(private http: HttpClient) { }

    upload(vehicleId: number, photo: File) {
        const formData = new FormData();
        formData.append('file', photo);

        const req = new HttpRequest('POST', `/api/vehicles/${vehicleId}/photos`, formData, {
            responseType: 'json',
            reportProgress: true
        });

        return this.http.request<Photo>(req).pipe(
            map(event => this.getUploadPhotoEvent(event)),
            filter(upe => upe != undefined)
        );
    }

    getPhotos(vehicleId: number) {
        return this.http.get<Photo[]>(`/api/vehicles/${vehicleId}/photos`);
    }

    private getUploadPhotoEvent(event): UploadPhotoEvent {
        let result: UploadPhotoEvent = {
            percentage: 0,
            photo: null
        };
        switch (event.type) {
            case HttpEventType.Sent:
                result.percentage = 0;
                break;
            case HttpEventType.UploadProgress:
                result.percentage = Math.round(100 * event.loaded / event.total);
                break;
            case HttpEventType.Response:
                result = {
                    percentage: 100,
                    photo: event.body
                };
                break;
            default:
                return;
        }

        return result;
    }
}
