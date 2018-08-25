import { IQueryObject } from './query-object';
export interface VehicleQuery extends IQueryObject {
    makeId: number;
    modelId: number;
}
