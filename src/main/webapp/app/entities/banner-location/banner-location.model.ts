import { BaseEntity } from './../../shared';

export class BannerLocation implements BaseEntity {
    constructor(
        public id?: number,
        public bannerLocation?: string,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
