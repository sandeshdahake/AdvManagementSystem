import { BaseEntity } from './../../shared';

export class Client implements BaseEntity {
    constructor(
        public id?: number,
        public clientName?: string,
        public clientAddress?: any,
        public activate?: boolean,
        public cities?: BaseEntity[],
        public subscriptions?: BaseEntity[],
    ) {
        this.activate = false;
    }
}
