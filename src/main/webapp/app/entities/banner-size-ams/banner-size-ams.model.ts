import { BaseEntity } from './../../shared';

export class BannerSizeAms implements BaseEntity {
    constructor(
        public id?: number,
        public bannerSize?: string,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
