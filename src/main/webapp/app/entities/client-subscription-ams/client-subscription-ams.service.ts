import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ClientSubscriptionAms } from './client-subscription-ams.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClientSubscriptionAmsService {

    private resourceUrl = SERVER_API_URL + 'api/client-subscriptions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(clientSubscription: ClientSubscriptionAms): Observable<ClientSubscriptionAms> {
        const copy = this.convert(clientSubscription);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(clientSubscription: ClientSubscriptionAms): Observable<ClientSubscriptionAms> {
        const copy = this.convert(clientSubscription);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ClientSubscriptionAms> {
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
     * Convert a returned JSON object to ClientSubscriptionAms.
     */
    private convertItemFromServer(json: any): ClientSubscriptionAms {
        const entity: ClientSubscriptionAms = Object.assign(new ClientSubscriptionAms(), json);
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertDateTimeFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a ClientSubscriptionAms to a JSON which can be sent to the server.
     */
    private convert(clientSubscription: ClientSubscriptionAms): ClientSubscriptionAms {
        const copy: ClientSubscriptionAms = Object.assign({}, clientSubscription);

        copy.startDate = this.dateUtils.toDate(clientSubscription.startDate);

        copy.endDate = this.dateUtils.toDate(clientSubscription.endDate);
        return copy;
    }
}
