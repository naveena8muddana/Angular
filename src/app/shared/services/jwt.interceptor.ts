// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// // Import Constant


// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//     constructor() {
//     }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         let accessToken: any;
//         let isLoggedIn: boolean;
//         let token: any;
//         // add auth header with jwt if user is logged in and request is to the api url
//         accessToken = this._ls.getItem('accessToken');
//         if (accessToken) {
//             isLoggedIn = true;
//             token = accessToken
//         }
//         const key = 'App-Secret-Key';
//         const isApiUrl = request.url.startsWith(environment.apiUrl);
//         if (isLoggedIn && isApiUrl) {
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${token}`,
//                     [key]: environment.appSecretKey
//                 }
//             });
//         }
//         else {
//             request = request.clone({
//                 setHeaders: {
//                     [key]: environment.appSecretKey
//                 }
//             });
//         }
//         return next.handle(request).pipe(catchError(err => {
//             if (err instanceof HttpErrorResponse) {
//                 if (err.status === 401) {
//                     this.commonService.sessionLogOut();
//                 }
//             }
//             const errorMessage = { message: (err?.error?.response) ? (err.error.response.message) : (err?.error?.error?.message) ? (err.error.error.message) : messages.ERROR.CUSTOM.sometingWrong, status: err.status };
//             return throwError(errorMessage);
//         }))
//     }
// }