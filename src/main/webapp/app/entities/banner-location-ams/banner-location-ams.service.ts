import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { BannerLocationAms } from './banner-location-ams.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BannerLocationAmsService {

    private resourceUrl = SERVER_API_URL + 'api/banner-locations';

    constructor(private http: Http) { }

    create(bannerLocation: BannerLocationAms): Observable<BannerLocationAms> {
        const copy = this.convert(bannerLocation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bannerLocation: BannerLocationAms): Observable<BannerLocationAms> {
        const copy = this.convert(bannerLocation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BannerLocationAms> {
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
     * Convert a returned JSON object to BannerLocationAms.
     */
    private convertItemFromServer(json: any): BannerLocationAms {
        const entity: BannerLocationAms = Object.assign(new BannerLocationAms(), json);
        return entity;
    }

    /**
     * Convert a BannerLocationAms to a JSON which can be sent to the server.
     */
    private convert(bannerLocation: BannerLocationAms): BannerLocationAms {
        const copy: BannerLocationAms = Object.assign({}, bannerLocation);
        return copy;
    }
}
