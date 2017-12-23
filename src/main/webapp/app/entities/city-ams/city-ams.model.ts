import { BaseEntity } from './../../shared';

export class CityAms implements BaseEntity {
    constructor(
        public id?: number,
        public cityName?: string,
        public subscriptionPlans?: BaseEntity[],
        public subscriptions?: BaseEntity[],
        public clientNames?: BaseEntity[],
    ) {
    }
}
