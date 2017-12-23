import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ClientAms } from './client-ams.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClientAmsService {

    private resourceUrl = SERVER_API_URL + 'api/clients';

    constructor(private http: Http) { }

    create(client: ClientAms): Observable<ClientAms> {
        const copy = this.convert(client);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(client: ClientAms): Observable<ClientAms> {
        const copy = this.convert(client);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ClientAms> {
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
     * Convert a returned JSON object to ClientAms.
     */
    private convertItemFromServer(json: any): ClientAms {
        const entity: ClientAms = Object.assign(new ClientAms(), json);
        return entity;
    }

    /**
     * Convert a ClientAms to a JSON which can be sent to the server.
     */
    private convert(client: ClientAms): ClientAms {
        const copy: ClientAms = Object.assign({}, client);
        return copy;
    }
}
