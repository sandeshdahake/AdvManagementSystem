import { BaseEntity } from './../../shared';

export class ClientSubscription implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public link?: string,
        public priorityPrice?: number,
        public discount?: number,
        public totalPrice?: number,
        public activeSubscription?: boolean,
        public cityId?: number,
        public clientId?: number,
        public subscriptionPlanId?: number,
    ) {
        this.activeSubscription = false;
    }
}
