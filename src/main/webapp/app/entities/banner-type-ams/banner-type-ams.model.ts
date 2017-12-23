import { BaseEntity } from './../../shared';

export class BannerTypeAms implements BaseEntity {
    constructor(
        public id?: number,
        public bannerType?: string,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
