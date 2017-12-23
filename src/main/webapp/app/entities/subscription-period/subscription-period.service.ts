import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { SubscriptionPeriod } from './subscription-period.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SubscriptionPeriodService {

    private resourceUrl = SERVER_API_URL + 'api/subscription-periods';

    constructor(private http: Http) { }

    create(subscriptionPeriod: SubscriptionPeriod): Observable<SubscriptionPeriod> {
        const copy = this.convert(subscriptionPeriod);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(subscriptionPeriod: SubscriptionPeriod): Observable<SubscriptionPeriod> {
        const copy = this.convert(subscriptionPeriod);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SubscriptionPeriod> {
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
     * Convert a returned JSON object to SubscriptionPeriod.
     */
    private convertItemFromServer(json: any): SubscriptionPeriod {
        const entity: SubscriptionPeriod = Object.assign(new SubscriptionPeriod(), json);
        return entity;
    }

    /**
     * Convert a SubscriptionPeriod to a JSON which can be sent to the server.
     */
    private convert(subscriptionPeriod: SubscriptionPeriod): SubscriptionPeriod {
        const copy: SubscriptionPeriod = Object.assign({}, subscriptionPeriod);
        return copy;
    }
}
