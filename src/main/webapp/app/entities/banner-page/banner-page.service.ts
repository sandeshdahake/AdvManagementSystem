import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { BannerPage } from './banner-page.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BannerPageService {

    private resourceUrl = SERVER_API_URL + 'api/banner-pages';

    constructor(private http: Http) { }

    create(bannerPage: BannerPage): Observable<BannerPage> {
        const copy = this.convert(bannerPage);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bannerPage: BannerPage): Observable<BannerPage> {
        const copy = this.convert(bannerPage);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BannerPage> {
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
     * Convert a returned JSON object to BannerPage.
     */
    private convertItemFromServer(json: any): BannerPage {
        const entity: BannerPage = Object.assign(new BannerPage(), json);
        return entity;
    }

    /**
     * Convert a BannerPage to a JSON which can be sent to the server.
     */
    private convert(bannerPage: BannerPage): BannerPage {
        const copy: BannerPage = Object.assign({}, bannerPage);
        return copy;
    }
}
