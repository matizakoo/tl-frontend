import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {InfoDTO} from "../../../info-dto";
import {map} from "rxjs/operators";
import {Category} from "../category/category";
import {Contractor} from "./contractor";

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
    private apiUrl = 'http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/contractor';

    constructor(private http: HttpClient) { }


    createCategory(category: string): Observable<HttpResponse<InfoDTO>> {
        return this.http.post<InfoDTO>(`${this.apiUrl}`, category , { observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }

    changeNameOfCategory(category: Contractor, newCategoryName: string): Observable<HttpResponse<InfoDTO>> {
        console.log('category starcie ostateczne: ' + category.contractorName)
        let params = new HttpParams().set('newContractorName', newCategoryName)
        return this.http.patch<InfoDTO>(`${this.apiUrl}`, category, { params, observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
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

    getCategories(): Observable<Contractor[]> {
        return this.http.get<Contractor[]>(this.apiUrl);
    }

    getCommonContractor(): Observable<string> {
        return this.http.get(this.apiUrl + '/commonContractor', { responseType: 'text' });
    }


}
