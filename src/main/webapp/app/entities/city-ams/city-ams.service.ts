import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CityAms } from './city-ams.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CityAmsService {

    private resourceUrl = SERVER_API_URL + 'api/cities';

    constructor(private http: Http) { }

    create(city: CityAms): Observable<CityAms> {
        const copy = this.convert(city);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(city: CityAms): Observable<CityAms> {
        const copy = this.convert(city);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CityAms> {
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
     * Convert a returned JSON object to CityAms.
     */
    private convertItemFromServer(json: any): CityAms {
        const entity: CityAms = Object.assign(new CityAms(), json);
        return entity;
    }

    /**
     * Convert a CityAms to a JSON which can be sent to the server.
     */
    private convert(city: CityAms): CityAms {
        const copy: CityAms = Object.assign({}, city);
        return copy;
    }
}
