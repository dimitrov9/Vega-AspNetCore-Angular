import { Photo } from './photo';
export interface UploadPhotoEvent {
    percentage: number;
    photo: Photo;
}
