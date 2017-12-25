import { BaseEntity } from './../../shared';

export class SubscriptionPeriod implements BaseEntity {
    constructor(
        public id?: number,
        public periodLabel?: string,
        public subscriptionDays?: number,
        public activate?: boolean,
        public subscriptionPlans?: BaseEntity[],
    ) {
        this.activate = false;
    }
}
