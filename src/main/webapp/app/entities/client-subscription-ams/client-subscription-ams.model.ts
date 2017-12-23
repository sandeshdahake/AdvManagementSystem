import { BaseEntity } from './../../shared';

export class ClientSubscriptionAms implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public link?: string,
        public price?: number,
        public cityId?: number,
        public clientId?: number,
        public subscriptionPlanId?: number,
    ) {
    }
}
