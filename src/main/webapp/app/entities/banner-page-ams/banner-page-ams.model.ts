import { BaseEntity } from './../../shared';

export class BannerPageAms implements BaseEntity {
    constructor(
        public id?: number,
        public bannerPage?: string,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
