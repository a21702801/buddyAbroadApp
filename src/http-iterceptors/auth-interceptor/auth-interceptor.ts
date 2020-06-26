import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storage: Storage) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = req.url.split('/');
        if (url[url.length - 1] === 'login'
            || url[url.length - 1] === 'register'
            || url[url.length - 1] === 'requestEmail'
            || url[url.length - 1] === 'resendVerificationEmail') {
            return next.handle(req);
        } else {
            return fromPromise(this.storage.get('auth_tokens'))
                .pipe(
                switchMap( token => {
                    const cloned = req.clone({
                        headers: req.headers.set('Authorization', [token.access_token, token.refresh_token])
                    });
                    console.log([token.access_token, token.refresh_token]);
                    return next.handle(cloned);
                })
            );
        }
    }
}


