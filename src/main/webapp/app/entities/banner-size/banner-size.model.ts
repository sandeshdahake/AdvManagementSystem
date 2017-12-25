import { BaseEntity } from './../../shared';

export class BannerSize implements BaseEntity {
    constructor(
        public id?: number,
        public bannerSize?: string,
        public activate?: boolean,
        public subscriptionPlans?: BaseEntity[],
    ) {
        this.activate = false;
    }
}
