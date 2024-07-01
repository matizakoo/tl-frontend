import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {InfoDTO} from "../../../info-dto";
import {map} from "rxjs/operators";
import {Category} from "../category/category";
import {Provider} from "./provider";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
    private apiUrl = 'http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/provider';

    constructor(private http: HttpClient) { }


    createCategory(category: string): Observable<HttpResponse<InfoDTO>> {
        return this.http.post<InfoDTO>(`${this.apiUrl}`, category , { observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }

    changeNameOfCategory(provider: Provider, newProviderName: string): Observable<HttpResponse<InfoDTO>> {
        console.log('category starcie ostateczne: ' + provider.nameOfProvider)
        let params = new HttpParams().set('newCategoryName', newProviderName)
        return this.http.patch<InfoDTO>(`${this.apiUrl}`, provider, { params, observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }

    commonProvider(): Observable<string> {
        return this.http.get(this.apiUrl + '/commonProvider', { responseType: 'text' });
    }

    deleteCategory(data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.delete<any>(this.apiUrl, { headers, body:data, observe: 'response' as 'response' }).pipe(
            catchError(this.handleError)
        );
    }



    private handleError(error: HttpErrorResponse) {
        console.error('Server error:', error);
        return throwError(() => new Error('Failed to create category. Please try again later.'));
    }

    getCategories(): Observable<Provider[]> {
        return this.http.get<Provider[]>(this.apiUrl);
    }
}
