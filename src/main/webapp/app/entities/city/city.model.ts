import { BaseEntity } from './../../shared';

export class City implements BaseEntity {
    constructor(
        public id?: number,
        public cityName?: string,
        public subscriptionPlans?: BaseEntity[],
        public subscriptions?: BaseEntity[],
        public clientNames?: BaseEntity[],
    ) {
    }
}
