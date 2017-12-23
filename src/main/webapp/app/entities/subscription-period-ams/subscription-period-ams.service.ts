import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { SubscriptionPeriodAms } from './subscription-period-ams.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SubscriptionPeriodAmsService {

    private resourceUrl = SERVER_API_URL + 'api/subscription-periods';

    constructor(private http: Http) { }

    create(subscriptionPeriod: SubscriptionPeriodAms): Observable<SubscriptionPeriodAms> {
        const copy = this.convert(subscriptionPeriod);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(subscriptionPeriod: SubscriptionPeriodAms): Observable<SubscriptionPeriodAms> {
        const copy = this.convert(subscriptionPeriod);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SubscriptionPeriodAms> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to SubscriptionPeriodAms.
     */
    private convertItemFromServer(json: any): SubscriptionPeriodAms {
        const entity: SubscriptionPeriodAms = Object.assign(new SubscriptionPeriodAms(), json);
        return entity;
    }

    /**
     * Convert a SubscriptionPeriodAms to a JSON which can be sent to the server.
     */
    private convert(subscriptionPeriod: SubscriptionPeriodAms): SubscriptionPeriodAms {
        const copy: SubscriptionPeriodAms = Object.assign({}, subscriptionPeriod);
        return copy;
    }
}
