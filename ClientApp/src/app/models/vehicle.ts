import { KeyValuePair } from './key-value-pair';
import { Contact } from './contact';
export interface Vehicle {
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    isRegistered: boolean;
    lastUpdate: string;
    contact: Contact;
    features: KeyValuePair[];
}
