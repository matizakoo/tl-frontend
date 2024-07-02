import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {InfoDTO} from "../../../info-dto";
import {map} from "rxjs/operators";
import {Complaint} from "./complaint";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
    private apiUrl = 'http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/complaint';

  constructor(private http: HttpClient) { }

    createComplaint(complaint: Complaint): Observable<HttpResponse<InfoDTO>> {
        return this.http.post<InfoDTO>(`${this.apiUrl}`, complaint , { observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }

    addComplaintNote(id: number, noteContent: string): Observable<HttpResponse<InfoDTO>> {
      console.log('id: ' + id)
      console.log('note: ' + noteContent)
        let params = new HttpParams()
            .set('id', id)
            .set('noteContent', noteContent)
            .set('principal', localStorage.getItem('principal'))
        return this.http.post<InfoDTO>(`${this.apiUrl + '/note'}`, {} , { params, observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }



    patchComplaintStatus(id: number, status: string): Observable<HttpResponse<InfoDTO>> {
      console.log('stautzz: ' + status)
        let params = new HttpParams()
            .set('id', id)
            .set('status', status)

        // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.patch<InfoDTO>(`${this.apiUrl}`, {}, { params, observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }

    deleteComplaint(data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.delete<any>(this.apiUrl, { headers, body:data, observe: 'response' as 'response' }).pipe(
            catchError(this.handleError)
        );
    }



    getComplaints(): Observable<Complaint[]> {
        return this.http.get<Complaint[]>(this.apiUrl);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('Server error:', error);
        return throwError(() => new Error('Failed to create complaint. Please try again later.'));
    }
}
