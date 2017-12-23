import { BaseEntity } from './../../shared';

export class BannerType implements BaseEntity {
    constructor(
        public id?: number,
        public bannerType?: string,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
