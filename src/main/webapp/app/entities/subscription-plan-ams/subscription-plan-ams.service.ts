import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { SubscriptionPlanAms } from './subscription-plan-ams.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SubscriptionPlanAmsService {

    private resourceUrl = SERVER_API_URL + 'api/subscription-plans';

    constructor(private http: Http) { }

    create(subscriptionPlan: SubscriptionPlanAms): Observable<SubscriptionPlanAms> {
        const copy = this.convert(subscriptionPlan);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(subscriptionPlan: SubscriptionPlanAms): Observable<SubscriptionPlanAms> {
        const copy = this.convert(subscriptionPlan);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SubscriptionPlanAms> {
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
     * Convert a returned JSON object to SubscriptionPlanAms.
     */
    private convertItemFromServer(json: any): SubscriptionPlanAms {
        const entity: SubscriptionPlanAms = Object.assign(new SubscriptionPlanAms(), json);
        return entity;
    }

    /**
     * Convert a SubscriptionPlanAms to a JSON which can be sent to the server.
     */
    private convert(subscriptionPlan: SubscriptionPlanAms): SubscriptionPlanAms {
        const copy: SubscriptionPlanAms = Object.assign({}, subscriptionPlan);
        return copy;
    }
}
