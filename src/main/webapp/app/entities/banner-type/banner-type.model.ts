import { BaseEntity } from './../../shared';

export class BannerType implements BaseEntity {
    constructor(
        public id?: number,
        public bannerType?: string,
        public activate?: boolean,
        public subscriptionPlans?: BaseEntity[],
    ) {
        this.activate = false;
    }
}
