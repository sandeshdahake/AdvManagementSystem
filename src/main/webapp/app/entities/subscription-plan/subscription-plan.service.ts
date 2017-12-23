import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { SubscriptionPlan } from './subscription-plan.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SubscriptionPlanService {

    private resourceUrl = SERVER_API_URL + 'api/subscription-plans';

    constructor(private http: Http) { }

    create(subscriptionPlan: SubscriptionPlan): Observable<SubscriptionPlan> {
        const copy = this.convert(subscriptionPlan);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(subscriptionPlan: SubscriptionPlan): Observable<SubscriptionPlan> {
        const copy = this.convert(subscriptionPlan);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SubscriptionPlan> {
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
     * Convert a returned JSON object to SubscriptionPlan.
     */
    private convertItemFromServer(json: any): SubscriptionPlan {
        const entity: SubscriptionPlan = Object.assign(new SubscriptionPlan(), json);
        return entity;
    }

    /**
     * Convert a SubscriptionPlan to a JSON which can be sent to the server.
     */
    private convert(subscriptionPlan: SubscriptionPlan): SubscriptionPlan {
        const copy: SubscriptionPlan = Object.assign({}, subscriptionPlan);
        return copy;
    }
}
