import { BaseEntity } from './../../shared';

export class BannerPage implements BaseEntity {
    constructor(
        public id?: number,
        public bannerPage?: string,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
