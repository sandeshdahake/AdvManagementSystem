import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { BannerLocation } from './banner-location.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BannerLocationService {

    private resourceUrl = SERVER_API_URL + 'api/banner-locations';

    constructor(private http: Http) { }

    create(bannerLocation: BannerLocation): Observable<BannerLocation> {
        const copy = this.convert(bannerLocation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bannerLocation: BannerLocation): Observable<BannerLocation> {
        const copy = this.convert(bannerLocation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BannerLocation> {
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
     * Convert a returned JSON object to BannerLocation.
     */
    private convertItemFromServer(json: any): BannerLocation {
        const entity: BannerLocation = Object.assign(new BannerLocation(), json);
        return entity;
    }

    /**
     * Convert a BannerLocation to a JSON which can be sent to the server.
     */
    private convert(bannerLocation: BannerLocation): BannerLocation {
        const copy: BannerLocation = Object.assign({}, bannerLocation);
        return copy;
    }
}
