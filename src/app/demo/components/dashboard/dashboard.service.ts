import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../complaint/complaint';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    private apiUrl = 'http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/date';

    constructor(private http: HttpClient) { }

    getYear(): Observable<Date> { // Zmieniamy bigint na number
        return this.http.get<Date>(this.apiUrl);
    }

    getAmountOfComplaints(): Observable<number> { // Zmieniamy bigint na number
        return this.http.get<number>('http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/complaint/amountOfReports');
    }

    getAmountOfComplaintsThisWeek(): Observable<number> { // Zmieniamy bigint na number
        return this.http.get<number>('http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/complaint/amountOfComplaintsThisWeek');
    }

    getComplaintsByMonth(): Observable<Map<number, number>> {
        return this.http.get<Map<number, number>>('http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/complaint/complaintsChart');
    }

    getCriticalComplaints(): Observable<Complaint[]> { // Zmieniamy bigint na number
        return this.http.get<Complaint[]>('http://tanielazienkicsms.eu-north-1.elasticbeanstalk.com/complaint/expiresInTwoDays');
    }

}
