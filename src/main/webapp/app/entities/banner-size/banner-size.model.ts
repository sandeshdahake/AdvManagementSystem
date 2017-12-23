import { BaseEntity } from './../../shared';

export class BannerSize implements BaseEntity {
    constructor(
        public id?: number,
        public bannerSize?: string,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
