import { BaseEntity } from './../../shared';

export class BannerLocationAms implements BaseEntity {
    constructor(
        public id?: number,
        public bannerLocation?: string,
        public subscriptionPlans?: BaseEntity[],
    ) {
    }
}
