import { BaseEntity } from './../../shared';

export class BannerPage implements BaseEntity {
    constructor(
        public id?: number,
        public bannerPage?: string,
        public activate?: boolean,
        public subscriptionPlans?: BaseEntity[],
    ) {
        this.activate = false;
    }
}
