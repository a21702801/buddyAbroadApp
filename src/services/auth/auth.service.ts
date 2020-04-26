import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { RegisterUser } from '../../interfaces/interfaces';
import { } from '../../interfaces/interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER = 'http://localhost:3000/auth';

  constructor(private httpClient: HttpClient) { }

    register(form: JSON): Observable<string> {
        return this.httpClient.post<string>(this.AUTH_SERVER + '/register', form).pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }

}
