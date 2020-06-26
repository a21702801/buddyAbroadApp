import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAccessToken } from '../../app/teste/testeInterface';
import { GetTopVisitsRequest } from '../../models/getTopVisitsRequest';
import { GetVisitsNearby } from '../../models/getVisitsNearbyRequest';
import { SearchRequest } from '../../models/serchRequest';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // SERVER_ADRESS = 'http://localhost:3000';
  SERVER_ADRESS = 'http://192.168.1.71:3000';
  AUTH_ADRESS = this.SERVER_ADRESS + '/auth';
  FORGOTPASSWORD_SERVER = this.SERVER_ADRESS + '/forgotPassword';
  HOME_ADRESS = this.SERVER_ADRESS + '/home';
  SEARCH_ADRESS = this.SERVER_ADRESS + '/search';

  constructor(private httpClient: HttpClient) { }

    postForm(form: JSON, adress: string, action: string): Observable<string> {
        return this.httpClient.post<string>(adress + action, form).pipe(catchError(this.errorHandler));
    }

    postToken(token: IAccessToken, adress: string, action: string): Observable<string> {
        return this.httpClient.post<string>(adress + action, token).pipe(catchError(this.errorHandler));
    }

    getTopVisitCards(request: GetTopVisitsRequest, adress: string, action: string): Observable<JSON> {
        return this.httpClient.post<JSON>(adress + action, request).pipe(catchError(this.errorHandler));
    }

    getVisitsNearbyCards(request: GetVisitsNearby, adress: string, action: string): Observable<JSON> {
        return this.httpClient.post<JSON>(adress + action, request).pipe(catchError(this.errorHandler));
    }

    getSearchCards( request: SearchRequest, adress: string, action: string): Observable<JSON> {
        return this.httpClient.post<JSON>(adress + action, request).pipe(catchError(this.errorHandler));
    }

    get() {
        return this.httpClient.get(this.SERVER_ADRESS).pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }


}
