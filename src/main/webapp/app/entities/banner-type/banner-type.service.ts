import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { BannerType } from './banner-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BannerTypeService {

    private resourceUrl = SERVER_API_URL + 'api/banner-types';

    constructor(private http: Http) { }

    create(bannerType: BannerType): Observable<BannerType> {
        const copy = this.convert(bannerType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bannerType: BannerType): Observable<BannerType> {
        const copy = this.convert(bannerType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BannerType> {
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
     * Convert a returned JSON object to BannerType.
     */
    private convertItemFromServer(json: any): BannerType {
        const entity: BannerType = Object.assign(new BannerType(), json);
        return entity;
    }

    /**
     * Convert a BannerType to a JSON which can be sent to the server.
     */
    private convert(bannerType: BannerType): BannerType {
        const copy: BannerType = Object.assign({}, bannerType);
        return copy;
    }
}
