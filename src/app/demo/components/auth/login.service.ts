import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Header} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

    http = inject(HttpClient);

    login(username: string, password: string): Observable<HttpResponse<any>> {
        return this.http.post<any>(
            'http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/api/v1/login',
            { username, password },
            { observe: 'response' }
        )
    }

    register(username: string, password: string): Observable<void> {
        return this.http.post<void>('/api/v1/register', {
            username,
            password,
        });
    }

    fetchSecureEndpoint(): Observable<{ msg: string }> {
        return this.http.get<{ msg: string }>('/api/v1/secured');
    }

    fetchSecureAdminEndpoint(): Observable<{ msg: string }> {
        return this.http.get<{ msg: string }>('/api/v1/secured-admin');
    }

    fetchUnsecureEndpoint(): Observable<{ msg: string }> {
        return this.http.get<{ msg: string }>('/api/v1/unsecured');
    }
}
