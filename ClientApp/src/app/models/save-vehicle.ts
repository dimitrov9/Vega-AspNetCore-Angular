import { Vehicle } from './vehicle';
import { Contact } from './contact';
export class SaveVehicle {
    id: number;
    makeId: number;
    modelId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;

    constructor() {
        this.features = [];
        this.contact = <Contact>{};
    }

    setFromVehicle(vehicle: Vehicle) {
        this.id = vehicle.id;
        this.makeId = vehicle.make.id;
        this.modelId = vehicle.model.id;
        this.isRegistered = vehicle.isRegistered;
        this.contact = vehicle.contact;
        vehicle.features.forEach(feature => {
            this.features.push(feature.id);
        });
    }
}
