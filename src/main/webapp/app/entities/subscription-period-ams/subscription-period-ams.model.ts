import { BaseEntity } from './../../shared';

export class SubscriptionPeriodAms implements BaseEntity {
    constructor(
        public id?: number,
        public periodLabel?: string,
        public subscriptionDays?: number,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
