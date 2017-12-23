import { BaseEntity } from './../../shared';

export class SubscriptionPlan implements BaseEntity {
    constructor(
        public id?: number,
        public planName?: string,
        public price?: number,
        public maxSubscription?: number,
        public bannerTypeId?: number,
        public bannerSizeId?: number,
        public bannerLocationId?: number,
        public bannerPageId?: number,
        public subscriptionPeriodId?: number,
        public cityId?: number,
        public subscriptions?: BaseEntity[],
    ) {
    }
}
